
import express, { Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { camelCaseResponseMiddleware } from './middlewares/camelCaseMiddleware';
import { WebSocketServer } from 'ws';
import path from "path";

declare global {
  var wss: WebSocketServer | undefined;
  var upgradeListenerAdded: boolean | undefined;
  var serverStarted: boolean | undefined;
}

const app = express();
app.use(express.json());
app.use(camelCaseResponseMiddleware);
app.use(express.urlencoded({ extended: false }));

// Middleware de logging
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      console.log(`${new Date().toLocaleTimeString()} [express] ${logLine}`);
    }
  });

  next();
});

if (!global.serverStarted) {
  global.serverStarted = true;

  (async () => {
    try {
      const server = await registerRoutes(app);

      // Configuración WebSocket
      if (!global.wss) {
        global.wss = new WebSocketServer({ noServer: true });

        global.wss.on('connection', (ws) => {
          console.log('Nueva conexión WebSocket establecida');

          ws.on('message', (message) => {
            try {
              const data = JSON.parse(message.toString());
              console.log('Mensaje WebSocket recibido:', data);
            } catch (error) {
              console.error('Error al procesar mensaje WebSocket:', error);
            }
          });

          ws.on('close', () => {
            console.log('Conexión WebSocket cerrada');
          });

          ws.on('error', (error) => {
            console.error('Error en WebSocket:', error);
          });
        });
      }

      // Manejador de upgrade (WebSocket)
      if (!global.upgradeListenerAdded) {
        server.removeAllListeners('upgrade');

        server.on('upgrade', (req, socket, head) => {
          if (req.url === '/ws') {
            if (!socket.destroyed) {
              global.wss!.handleUpgrade(req, socket, head, (ws) => {
                global.wss!.emit('connection', ws, req);
              });
            }
          } else {
            socket.destroy();
          }
        });
        global.upgradeListenerAdded = true;
      }

      // Servir archivos estáticos
      const staticPath = path.resolve(import.meta.dirname, "../dist/public");
      app.use(express.static(staticPath));

      // Ruta catch-all para SPA
      app.use("*", (_req, res) => {
        res.sendFile(path.resolve(staticPath, "index.html"));
      });

      // Iniciar servidor
      const port = parseInt(process.env.PORT || "10000");
      server.listen(port, "0.0.0.0", () => {
        console.log(`${new Date().toLocaleTimeString()} [express] Servidor activo en http://0.0.0.0:${port}`);
        console.log(`Environment: ${process.env.NODE_ENV}`);
        console.log(`Database URL configured: ${process.env.DATABASE_URL ? 'Yes' : 'No'}`);
        console.log(`Port: ${port}`);
      });

      server.on('error', (err) => {
        console.error('Server error:', err);
      });

    } catch (error) {
      console.error('Error starting server:', error);
      process.exit(1);
    }
  })();
} else {
  console.log('Servidor ya está iniciado — No se inicia otra vez');
}
