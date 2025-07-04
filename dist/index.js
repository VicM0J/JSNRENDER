var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path3 from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default;
var init_vite_config = __esm({
  async "vite.config.ts"() {
    "use strict";
    vite_config_default = defineConfig({
      plugins: [
        react(),
        runtimeErrorOverlay(),
        ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
          await import("@replit/vite-plugin-cartographer").then(
            (m) => m.cartographer()
          )
        ] : []
      ],
      resolve: {
        alias: {
          "@": path3.resolve(import.meta.dirname, "client", "src"),
          "@shared": path3.resolve(import.meta.dirname, "shared"),
          "@assets": path3.resolve(import.meta.dirname, "attached_assets")
        }
      },
      root: path3.resolve(import.meta.dirname, "client"),
      build: {
        outDir: path3.resolve(import.meta.dirname, "dist/public"),
        emptyOutDir: true
      },
      server: {
        fs: {
          strict: true,
          deny: ["**/.*"]
        }
      }
    });
  }
});

// server/vite.ts
var vite_exports = {};
__export(vite_exports, {
  log: () => log,
  serveStatic: () => serveStatic,
  setupVite: () => setupVite
});
import express from "express";
import fs3 from "fs";
import path4 from "path";
import { createServer as createViteServer, createLogger } from "vite";
import { nanoid } from "nanoid";
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path4.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs3.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path4.resolve(import.meta.dirname, "public");
  if (!fs3.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path4.resolve(distPath, "index.html"));
  });
}
var viteLogger;
var init_vite = __esm({
  async "server/vite.ts"() {
    "use strict";
    await init_vite_config();
    viteLogger = createLogger();
  }
});

// server/index.ts
import express2 from "express";

// server/routes.ts
import { Router } from "express";
import { createServer } from "http";
import { WebSocketServer, WebSocket } from "ws";

// server/auth.ts
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import session2 from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  adminPasswords: () => adminPasswords,
  adminPasswordsRelations: () => adminPasswordsRelations,
  agendaEvents: () => agendaEvents,
  areaEnum: () => areaEnum,
  areas: () => areas,
  documents: () => documents,
  insertAdminPasswordSchema: () => insertAdminPasswordSchema,
  insertAgendaEventSchema: () => insertAgendaEventSchema,
  insertNotificationSchema: () => insertNotificationSchema,
  insertOrderSchema: () => insertOrderSchema,
  insertRepositionPieceSchema: () => insertRepositionPieceSchema,
  insertRepositionSchema: () => insertRepositionSchema,
  insertRepositionTransferSchema: () => insertRepositionTransferSchema,
  insertTransferSchema: () => insertTransferSchema,
  insertUserSchema: () => insertUserSchema,
  materialStatusEnum: () => materialStatusEnum,
  notificationTypeEnum: () => notificationTypeEnum,
  notifications: () => notifications,
  notificationsRelations: () => notificationsRelations,
  orderHistory: () => orderHistory,
  orderHistoryRelations: () => orderHistoryRelations,
  orderPieces: () => orderPieces,
  orderPiecesRelations: () => orderPiecesRelations,
  orderStatusEnum: () => orderStatusEnum,
  orders: () => orders,
  ordersRelations: () => ordersRelations,
  repositionContrastFabrics: () => repositionContrastFabrics,
  repositionHistory: () => repositionHistory,
  repositionHistoryRelations: () => repositionHistoryRelations,
  repositionMaterials: () => repositionMaterials,
  repositionMaterialsRelations: () => repositionMaterialsRelations,
  repositionPieces: () => repositionPieces,
  repositionPiecesRelations: () => repositionPiecesRelations,
  repositionProducts: () => repositionProducts,
  repositionStatusEnum: () => repositionStatusEnum,
  repositionTimers: () => repositionTimers,
  repositionTransfers: () => repositionTransfers,
  repositionTransfersRelations: () => repositionTransfersRelations,
  repositionTypeEnum: () => repositionTypeEnum,
  repositions: () => repositions,
  repositionsRelations: () => repositionsRelations,
  transferStatusEnum: () => transferStatusEnum,
  transfers: () => transfers,
  transfersRelations: () => transfersRelations,
  urgencyEnum: () => urgencyEnum,
  users: () => users,
  usersRelations: () => usersRelations
});
import { pgTable, text, serial, integer, boolean, timestamp, pgEnum, varchar, real } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
var areaEnum = pgEnum("area", ["patronaje", "corte", "bordado", "ensamble", "plancha", "calidad", "operaciones", "admin", "almacen", "dise\xF1o"]);
var repositionTypeEnum = pgEnum("reposition_type", ["repocision", "reproceso"]);
var urgencyEnum = pgEnum("urgency", ["urgente", "intermedio", "poco_urgente"]);
var repositionStatusEnum = pgEnum("reposition_status", ["pendiente", "aprobado", "rechazado", "completado", "eliminado"]);
var orderStatusEnum = pgEnum("order_status", ["active", "completed"]);
var transferStatusEnum = pgEnum("transfer_status", ["pending", "accepted", "rejected"]);
var notificationTypeEnum = pgEnum("notification_type", ["transfer_request", "transfer_accepted", "transfer_rejected", "order_completed"]);
var materialStatusEnum = pgEnum("material_status", ["disponible", "falta_parcial", "no_disponible"]);
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  area: areaEnum("area").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  folio: text("folio").notNull().unique(),
  clienteHotel: text("cliente_hotel").notNull(),
  noSolicitud: text("no_solicitud").notNull(),
  noHoja: text("no_hoja"),
  modelo: text("modelo").notNull(),
  tipoPrenda: text("tipo_prenda").notNull(),
  color: text("color").notNull(),
  tela: text("tela").notNull(),
  totalPiezas: integer("total_piezas").notNull(),
  currentArea: areaEnum("current_area").notNull().default("corte"),
  status: orderStatusEnum("status").notNull().default("active"),
  createdBy: integer("created_by").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  completedAt: timestamp("completed_at")
});
var orderPieces = pgTable("order_pieces", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").notNull(),
  area: areaEnum("area").notNull(),
  pieces: integer("pieces").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
var transfers = pgTable("transfers", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").notNull(),
  fromArea: areaEnum("from_area").notNull(),
  toArea: areaEnum("to_area").notNull(),
  pieces: integer("pieces").notNull(),
  status: transferStatusEnum("status").notNull().default("pending"),
  notes: text("notes"),
  createdBy: integer("created_by").notNull(),
  processedBy: integer("processed_by"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  processedAt: timestamp("processed_at")
});
var orderHistory = pgTable("order_history", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").notNull(),
  action: text("action").notNull(),
  description: text("description").notNull(),
  fromArea: areaEnum("from_area"),
  toArea: areaEnum("to_area"),
  pieces: integer("pieces"),
  userId: integer("user_id").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  type: notificationTypeEnum("type").notNull(),
  title: text("title").notNull(),
  message: text("message").notNull(),
  transferId: integer("transfer_id"),
  orderId: integer("order_id"),
  repositionId: integer("reposition_id"),
  read: boolean("read").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var repositions = pgTable("repositions", {
  id: serial("id").primaryKey(),
  folio: text("folio").notNull().unique(),
  type: repositionTypeEnum("type").notNull(),
  solicitanteNombre: text("solicitante_nombre").notNull(),
  solicitanteArea: areaEnum("solicitante_area").notNull(),
  fechaSolicitud: timestamp("fecha_solicitud").defaultNow().notNull(),
  noSolicitud: text("no_solicitud").notNull(),
  noHoja: text("no_hoja"),
  fechaCorte: text("fecha_corte"),
  causanteDano: text("causante_dano").notNull(),
  tipoAccidente: text("tipo_accidente").notNull(),
  otroAccidente: text("otro_accidente"),
  descripcionSuceso: text("descripcion_suceso").notNull(),
  modeloPrenda: text("modelo_prenda").notNull(),
  tela: text("tela").notNull(),
  color: text("color").notNull(),
  tipoPieza: text("tipo_pieza").notNull(),
  consumoTela: real("consumo_tela"),
  urgencia: urgencyEnum("urgencia").notNull(),
  observaciones: text("observaciones"),
  volverHacer: text("volver_hacer"),
  materialesImplicados: text("materiales_implicados"),
  currentArea: areaEnum("current_area").notNull(),
  status: repositionStatusEnum("status").notNull().default("pendiente"),
  createdBy: integer("created_by").notNull(),
  approvedBy: integer("approved_by"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  approvedAt: timestamp("approved_at"),
  completedAt: timestamp("completed_at")
});
var repositionPieces = pgTable("reposition_pieces", {
  id: serial("id").primaryKey(),
  repositionId: integer("reposition_id").notNull(),
  talla: text("talla").notNull(),
  cantidad: integer("cantidad").notNull(),
  folioOriginal: text("folio_original"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var repositionProducts = pgTable("reposition_products", {
  id: serial("id").primaryKey(),
  repositionId: integer("reposition_id").notNull(),
  modeloPrenda: text("modelo_prenda").notNull(),
  tela: text("tela").notNull(),
  color: text("color").notNull(),
  tipoPieza: text("tipo_pieza").notNull(),
  consumoTela: real("consumo_tela"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var repositionContrastFabrics = pgTable("reposition_contrast_fabrics", {
  id: serial("id").primaryKey(),
  repositionId: integer("reposition_id").notNull(),
  tela: text("tela").notNull(),
  color: text("color").notNull(),
  consumo: real("consumo").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var repositionTimers = pgTable("reposition_timers", {
  id: serial("id").primaryKey(),
  repositionId: integer("reposition_id").notNull(),
  area: areaEnum("area").notNull(),
  userId: integer("user_id").notNull(),
  startTime: timestamp("start_time"),
  endTime: timestamp("end_time"),
  elapsedMinutes: real("elapsed_minutes"),
  isRunning: boolean("is_running").default(false),
  manualStartTime: varchar("manual_start_time", { length: 5 }),
  // HH:MM format
  manualEndTime: varchar("manual_end_time", { length: 5 }),
  // HH:MM format
  manualDate: varchar("manual_date", { length: 10 }),
  // YYYY-MM-DD format
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var repositionTransfers = pgTable("reposition_transfers", {
  id: serial("id").primaryKey(),
  repositionId: integer("reposition_id").notNull(),
  fromArea: areaEnum("from_area").notNull(),
  toArea: areaEnum("to_area").notNull(),
  notes: text("notes"),
  createdBy: integer("created_by").notNull(),
  processedBy: integer("processed_by"),
  status: transferStatusEnum("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  processedAt: timestamp("processed_at")
});
var repositionHistory = pgTable("reposition_history", {
  id: serial("id").primaryKey(),
  repositionId: integer("reposition_id").notNull(),
  action: text("action").notNull(),
  description: text("description").notNull(),
  fromArea: areaEnum("from_area"),
  toArea: areaEnum("to_area"),
  userId: integer("user_id").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var adminPasswords = pgTable("admin_passwords", {
  id: serial("id").primaryKey(),
  password: text("password").notNull(),
  createdBy: integer("created_by").notNull(),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var repositionMaterials = pgTable("reposition_materials", {
  id: serial("id").primaryKey(),
  repositionId: integer("reposition_id").notNull(),
  materialStatus: materialStatusEnum("material_status").notNull().default("disponible"),
  missingMaterials: text("missing_materials"),
  notes: text("notes"),
  isPaused: boolean("is_paused").notNull().default(false),
  pauseReason: text("pause_reason"),
  pausedBy: integer("paused_by"),
  pausedAt: timestamp("paused_at"),
  resumedBy: integer("resumed_by"),
  resumedAt: timestamp("resumed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
var documents = pgTable("documents", {
  id: serial("id").primaryKey(),
  filename: text("filename").notNull(),
  originalName: text("original_name").notNull(),
  size: integer("size").notNull(),
  path: text("path").notNull(),
  orderId: integer("order_id"),
  repositionId: integer("reposition_id"),
  uploadedBy: integer("uploaded_by").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var ordersRelations = relations(orders, ({ one, many }) => ({
  creator: one(users, {
    fields: [orders.createdBy],
    references: [users.id]
  }),
  pieces: many(orderPieces),
  transfers: many(transfers),
  history: many(orderHistory)
}));
var orderPiecesRelations = relations(orderPieces, ({ one }) => ({
  order: one(orders, {
    fields: [orderPieces.orderId],
    references: [orders.id]
  })
}));
var transfersRelations = relations(transfers, ({ one }) => ({
  order: one(orders, {
    fields: [transfers.orderId],
    references: [orders.id]
  }),
  creator: one(users, {
    fields: [transfers.createdBy],
    references: [users.id]
  }),
  processor: one(users, {
    fields: [transfers.processedBy],
    references: [users.id]
  })
}));
var orderHistoryRelations = relations(orderHistory, ({ one }) => ({
  order: one(orders, {
    fields: [orderHistory.orderId],
    references: [orders.id]
  }),
  user: one(users, {
    fields: [orderHistory.userId],
    references: [users.id]
  })
}));
var usersRelations = relations(users, ({ many }) => ({
  createdOrders: many(orders),
  transfers: many(transfers),
  notifications: many(notifications),
  orderHistory: many(orderHistory),
  createdRepositions: many(repositions, { relationName: "creator" }),
  approvedRepositions: many(repositions, { relationName: "approver" }),
  repositionTransfers: many(repositionTransfers, { relationName: "transferCreator" }),
  repositionHistory: many(repositionHistory),
  adminPasswords: many(adminPasswords)
}));
var repositionsRelations = relations(repositions, ({ one, many }) => ({
  creator: one(users, {
    fields: [repositions.createdBy],
    references: [users.id],
    relationName: "creator"
  }),
  approver: one(users, {
    fields: [repositions.approvedBy],
    references: [users.id],
    relationName: "approver"
  }),
  pieces: many(repositionPieces),
  transfers: many(repositionTransfers),
  history: many(repositionHistory)
}));
var repositionPiecesRelations = relations(repositionPieces, ({ one }) => ({
  reposition: one(repositions, {
    fields: [repositionPieces.repositionId],
    references: [repositions.id]
  })
}));
var repositionTransfersRelations = relations(repositionTransfers, ({ one }) => ({
  reposition: one(repositions, {
    fields: [repositionTransfers.repositionId],
    references: [repositions.id]
  }),
  creator: one(users, {
    fields: [repositionTransfers.createdBy],
    references: [users.id],
    relationName: "transferCreator"
  }),
  processor: one(users, {
    fields: [repositionTransfers.processedBy],
    references: [users.id],
    relationName: "transferProcessor"
  })
}));
var repositionHistoryRelations = relations(repositionHistory, ({ one }) => ({
  reposition: one(repositions, {
    fields: [repositionHistory.repositionId],
    references: [repositions.id]
  }),
  user: one(users, {
    fields: [repositionHistory.userId],
    references: [users.id]
  })
}));
var adminPasswordsRelations = relations(adminPasswords, ({ one }) => ({
  creator: one(users, {
    fields: [adminPasswords.createdBy],
    references: [users.id]
  })
}));
var repositionMaterialsRelations = relations(repositionMaterials, ({ one }) => ({
  reposition: one(repositions, {
    fields: [repositionMaterials.repositionId],
    references: [repositions.id]
  }),
  pausedByUser: one(users, {
    fields: [repositionMaterials.pausedBy],
    references: [users.id]
  }),
  resumedByUser: one(users, {
    fields: [repositionMaterials.resumedBy],
    references: [users.id]
  })
}));
var notificationsRelations = relations(notifications, ({ one }) => ({
  user: one(users, {
    fields: [notifications.userId],
    references: [users.id]
  }),
  transfer: one(transfers, {
    fields: [notifications.transferId],
    references: [transfers.id]
  }),
  order: one(orders, {
    fields: [notifications.orderId],
    references: [orders.id]
  })
}));
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  name: true,
  area: true
});
var insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
  createdBy: true,
  createdAt: true,
  completedAt: true
});
var insertTransferSchema = createInsertSchema(transfers).omit({
  id: true,
  status: true,
  createdBy: true,
  processedBy: true,
  createdAt: true,
  processedAt: true
});
var insertNotificationSchema = createInsertSchema(notifications).omit({
  id: true,
  read: true,
  createdAt: true
});
var insertRepositionSchema = createInsertSchema(repositions).omit({
  id: true,
  folio: true,
  createdBy: true,
  approvedBy: true,
  createdAt: true,
  approvedAt: true,
  completedAt: true
});
var insertRepositionPieceSchema = createInsertSchema(repositionPieces).omit({
  id: true,
  createdAt: true
});
var insertRepositionTransferSchema = createInsertSchema(repositionTransfers).omit({
  id: true,
  status: true,
  createdBy: true,
  processedBy: true,
  createdAt: true,
  processedAt: true
});
var insertAdminPasswordSchema = createInsertSchema(adminPasswords).omit({
  id: true,
  createdBy: true,
  createdAt: true
});
var agendaEvents = pgTable("agenda_events", {
  id: serial("id").primaryKey(),
  createdBy: integer("created_by").notNull().references(() => users.id),
  // Quién creó la tarea (Admin/Envíos)
  assignedToArea: areaEnum("assigned_to_area").notNull(),
  // Área a la que se asigna la tarea
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  date: varchar("date", { length: 10 }).notNull(),
  // YYYY-MM-DD format
  time: varchar("time", { length: 5 }).notNull(),
  // HH:MM format
  priority: varchar("priority", { length: 10 }).notNull().default("media"),
  // alta, media, baja
  status: varchar("status", { length: 15 }).notNull().default("pendiente"),
  // pendiente, completado, cancelado
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var insertAgendaEventSchema = createInsertSchema(agendaEvents);
var areas = ["corte", "bordado", "ensamble", "plancha", "calidad", "envios", "almacen", "admin", "dise\xF1o"];

// server/db.ts
import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
var { Pool } = pg;
var databaseUrl = process.env.DATABASE_URL || "postgresql://victor:ITt1d5ZDTRegrHN6h0BltBplWsug5WPS@dpg-d1k4gvvdiees73e2idmg-a.virginia-postgres.render.com/jasanaordenes_z9o2";
if (!databaseUrl) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?"
  );
}
var pool = new Pool({
  connectionString: databaseUrl,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
  max: 20,
  idleTimeoutMillis: 3e4,
  connectionTimeoutMillis: 5e3
});
var db = drizzle(pool, { schema: schema_exports });

// server/storage.ts
import { eq, and, or, desc, asc, ne } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";
var PostgresSessionStore = connectPg(session);
function broadcastNotification(notification) {
  const wss = global.wss;
  if (wss) {
    wss.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(JSON.stringify({
          type: "notification",
          data: notification
        }));
      }
    });
    console.log("Notificaci\xF3n enviada por WebSocket:", notification.title);
  } else {
    console.log("WebSocket no disponible para enviar notificaci\xF3n");
  }
}
var DatabaseStorage = class {
  async getAllUsers() {
    return await db.select().from(users).orderBy(asc(users.id));
  }
  async deleteUserById(userId) {
    const result = await db.delete(users).where(eq(users.id, Number(userId))).returning().catch(() => []);
    return result.length > 0;
  }
  sessionStore;
  constructor() {
    this.sessionStore = new PostgresSessionStore({
      pool,
      createTableIfMissing: true
    });
  }
  async getUser(id) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || void 0;
  }
  async getUserByUsername(username) {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || void 0;
  }
  async createUser(insertUser) {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  async getAdminUser() {
    const [admin] = await db.select().from(users).where(eq(users.area, "admin")).limit(1);
    return admin || void 0;
  }
  async resetUserPassword(userId, hashedPassword) {
    await db.update(users).set({ password: hashedPassword }).where(eq(users.id, userId));
  }
  async createOrder(order, createdBy) {
    const [newOrder] = await db.insert(orders).values({ ...order, createdBy }).returning();
    await db.insert(orderPieces).values({
      orderId: newOrder.id,
      area: "corte",
      pieces: order.totalPiezas
    });
    console.log(`Created order ${newOrder.id} with ${order.totalPiezas} pieces in corte area`);
    await this.addOrderHistory(
      newOrder.id,
      "created",
      `Pedido creado con ${order.totalPiezas} piezas`,
      createdBy
    );
    return newOrder;
  }
  async getOrders(area) {
    if (area) {
      return await db.select().from(orders).where(eq(orders.currentArea, area)).orderBy(desc(orders.createdAt));
    }
    return await db.select().from(orders).orderBy(desc(orders.createdAt));
  }
  async getOrderById(id) {
    const [order] = await db.select().from(orders).where(eq(orders.id, id));
    return order || void 0;
  }
  async getOrderByFolio(folio) {
    const [order] = await db.select().from(orders).where(eq(orders.folio, folio));
    return order || void 0;
  }
  async completeOrder(orderId) {
    await db.update(orders).set({
      status: "completed",
      completedAt: /* @__PURE__ */ new Date()
    }).where(eq(orders.id, orderId));
  }
  async deleteOrder(orderId) {
    await db.delete(orderPieces).where(eq(orderPieces.orderId, orderId));
    await db.delete(transfers).where(eq(transfers.orderId, orderId));
    await db.delete(orderHistory).where(eq(orderHistory.orderId, orderId));
    await db.delete(notifications).where(eq(notifications.orderId, orderId));
    await db.delete(orders).where(eq(orders.id, orderId));
  }
  async getOrderPieces(orderId) {
    const pieces = await db.select().from(orderPieces).where(eq(orderPieces.orderId, orderId)).orderBy(asc(orderPieces.area));
    console.log(`Order pieces for order ${orderId}:`, pieces);
    return pieces;
  }
  async updateOrderPieces(orderId, area, pieces) {
    const existing = await db.select().from(orderPieces).where(and(
      eq(orderPieces.orderId, orderId),
      eq(orderPieces.area, area)
    ));
    if (existing.length > 0) {
      await db.update(orderPieces).set({ pieces, updatedAt: /* @__PURE__ */ new Date() }).where(and(
        eq(orderPieces.orderId, orderId),
        eq(orderPieces.area, area)
      ));
    } else {
      await db.insert(orderPieces).values({
        orderId,
        area,
        pieces
      });
    }
  }
  async createTransfer(transfer, createdBy) {
    const [newTransfer] = await db.insert(transfers).values({ ...transfer, createdBy }).returning();
    await this.addOrderHistory(
      transfer.orderId,
      "transfer_created",
      `${transfer.pieces} piezas enviadas a ${transfer.toArea}`,
      createdBy,
      {
        fromArea: transfer.fromArea,
        toArea: transfer.toArea,
        pieces: transfer.pieces
      }
    );
    return newTransfer;
  }
  async getTransfersByArea(area) {
    return await db.select().from(transfers).where(or(
      eq(transfers.fromArea, area),
      eq(transfers.toArea, area)
    )).orderBy(desc(transfers.createdAt));
  }
  async getPendingTransfersForUser(userId) {
    const user = await this.getUser(userId);
    if (!user) return [];
    return await db.select().from(transfers).where(and(
      eq(transfers.toArea, user.area),
      eq(transfers.status, "pending")
    )).orderBy(desc(transfers.createdAt));
  }
  async acceptTransfer(transferId, processedBy) {
    const [transfer] = await db.select().from(transfers).where(eq(transfers.id, transferId));
    if (!transfer) return;
    await db.update(transfers).set({
      status: "accepted",
      processedBy,
      processedAt: /* @__PURE__ */ new Date()
    }).where(eq(transfers.id, transferId));
    const fromAreaPieces = await db.select().from(orderPieces).where(and(
      eq(orderPieces.orderId, transfer.orderId),
      eq(orderPieces.area, transfer.fromArea)
    ));
    if (fromAreaPieces.length > 0) {
      const currentPieces = fromAreaPieces[0].pieces;
      const remainingPieces = currentPieces - transfer.pieces;
      if (remainingPieces > 0) {
        await db.update(orderPieces).set({ pieces: remainingPieces, updatedAt: /* @__PURE__ */ new Date() }).where(and(
          eq(orderPieces.orderId, transfer.orderId),
          eq(orderPieces.area, transfer.fromArea)
        ));
      } else {
        await db.delete(orderPieces).where(and(
          eq(orderPieces.orderId, transfer.orderId),
          eq(orderPieces.area, transfer.fromArea)
        ));
      }
    }
    const toAreaPieces = await db.select().from(orderPieces).where(and(
      eq(orderPieces.orderId, transfer.orderId),
      eq(orderPieces.area, transfer.toArea)
    ));
    if (toAreaPieces.length > 0) {
      await db.update(orderPieces).set({
        pieces: toAreaPieces[0].pieces + transfer.pieces,
        updatedAt: /* @__PURE__ */ new Date()
      }).where(and(
        eq(orderPieces.orderId, transfer.orderId),
        eq(orderPieces.area, transfer.toArea)
      ));
    } else {
      await db.insert(orderPieces).values({
        orderId: transfer.orderId,
        area: transfer.toArea,
        pieces: transfer.pieces
      });
    }
    const allOrderPieces = await db.select().from(orderPieces).where(eq(orderPieces.orderId, transfer.orderId));
    if (allOrderPieces.length === 1 && allOrderPieces[0].area === transfer.toArea) {
      await db.update(orders).set({ currentArea: transfer.toArea }).where(eq(orders.id, transfer.orderId));
    }
    await this.addOrderHistory(
      transfer.orderId,
      "transfer_accepted",
      `Transferencia aceptada - ${transfer.pieces} piezas movidas de ${transfer.fromArea} a ${transfer.toArea}`,
      processedBy,
      {
        fromArea: transfer.fromArea,
        toArea: transfer.toArea,
        pieces: transfer.pieces
      }
    );
  }
  async rejectTransfer(transferId, processedBy) {
    const [transfer] = await db.select().from(transfers).where(eq(transfers.id, transferId));
    if (!transfer) return;
    await db.update(transfers).set({
      status: "rejected",
      processedBy,
      processedAt: /* @__PURE__ */ new Date()
    }).where(eq(transfers.id, transferId));
    await this.addOrderHistory(
      transfer.orderId,
      "transfer_rejected",
      `Transferencia rechazada - ${transfer.pieces} piezas devueltas a ${transfer.fromArea}`,
      processedBy,
      {
        fromArea: transfer.fromArea,
        toArea: transfer.toArea,
        pieces: transfer.pieces
      }
    );
  }
  async addOrderHistory(orderId, action, description, userId, options) {
    await db.insert(orderHistory).values({
      orderId,
      action,
      description,
      userId,
      fromArea: options?.fromArea,
      toArea: options?.toArea,
      pieces: options?.pieces
    });
  }
  async getOrderHistory(orderId) {
    return await db.select().from(orderHistory).where(eq(orderHistory.orderId, orderId)).orderBy(asc(orderHistory.createdAt));
  }
  async createNotification(notification) {
    const [newNotification] = await db.insert(notifications).values(notification).returning();
    broadcastNotification({
      ...newNotification,
      userId: newNotification.userId
    });
    return newNotification;
  }
  async getUserNotifications(userId) {
    const notifications2 = await db.select().from(notifications2).where(eq(notifications2.userId, userId)).orderBy(desc(notifications2.createdAt));
    console.log(`getUserNotifications: Found ${notifications2.length} notifications for user ${userId}`);
    return notifications2;
  }
  async markNotificationRead(notificationId) {
    await db.update(notifications).set({ read: true }).where(eq(notifications.id, notificationId));
  }
  async createReposition(repositionData, pieces, createdBy) {
    const { productos, telaContraste, ...mainRepositionData } = repositionData;
    const [reposition] = await db.insert(repositions).values({
      ...mainRepositionData,
      createdBy
    }).returning();
    if (pieces.length > 0) {
      await db.insert(repositionPieces).values(pieces.map((piece) => ({
        ...piece,
        repositionId: reposition.id
      })));
    }
    if (productos && productos.length > 0) {
      await db.insert(repositionProducts).values(productos.map((producto) => ({
        repositionId: reposition.id,
        modeloPrenda: producto.modeloPrenda,
        tela: producto.tela,
        color: producto.color,
        tipoPieza: producto.tipoPieza,
        consumoTela: producto.consumoTela || 0
      })));
    }
    if (telaContraste) {
      await db.insert(repositionContrastFabrics).values({
        repositionId: reposition.id,
        tela: telaContraste.tela,
        color: telaContraste.color,
        consumo: telaContraste.consumo
      });
      if (telaContraste.pieces && telaContraste.pieces.length > 0) {
      }
    }
    await db.insert(repositionHistory).values({
      repositionId: reposition.id,
      action: "created",
      description: `Reposition ${reposition.type} created`,
      userId: createdBy
    });
    const adminUsers = await db.select().from(users).where(or(eq(users.area, "admin"), eq(users.area, "operaciones")));
    for (const admin of adminUsers) {
      await this.createNotification({
        userId: admin.id,
        type: "new_reposition",
        title: "Nueva Solicitud de Reposici\xF3n",
        message: `Se ha creado una nueva solicitud de ${reposition.type}: ${reposition.folio}`,
        repositionId: reposition.id
      });
    }
    return reposition;
  }
  async getRepositions(area, userArea) {
    let query = db.select().from(repositions);
    if (userArea === "dise\xF1o") {
      query = query.where(
        and(
          eq(repositions.status, "aprobado"),
          ne(repositions.status, "eliminado")
        )
      );
    } else if (userArea !== "admin" && userArea !== "envios") {
      query = query.where(
        and(
          ne(repositions.status, "eliminado"),
          ne(repositions.status, "completado")
        )
      );
    }
    return await query.orderBy(desc(repositions.createdAt));
  }
  async getRepositionsByArea(area, userId) {
    let whereCondition;
    if (userId) {
      whereCondition = and(
        or(
          eq(repositions.currentArea, area),
          eq(repositions.createdBy, userId)
        ),
        ne(repositions.status, "eliminado"),
        ne(repositions.status, "completado")
      );
    } else {
      whereCondition = and(
        eq(repositions.currentArea, area),
        ne(repositions.status, "eliminado"),
        ne(repositions.status, "completado")
      );
    }
    return await db.select().from(repositions).where(whereCondition).orderBy(desc(repositions.createdAt));
  }
  async getRepositionById(id) {
    const [reposition] = await db.select().from(repositions).where(eq(repositions.id, id));
    return reposition || void 0;
  }
  async getNextRepositionCounter() {
    const now = /* @__PURE__ */ new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const yearStr = year.toString();
    const monthStr = String(month).padStart(2, "0");
    const folioPrefix = `JN-REQ-${monthStr}-${yearStr.slice(-2)}-`;
    const result = await db.select().from(repositions);
    const thisMonthCount = result.filter((r) => r.folio.startsWith(folioPrefix)).length;
    return thisMonthCount + 1;
  }
  async approveReposition(repositionId, action, userId, notes) {
    const [reposition] = await db.update(repositions).set({
      status: action,
      approvedBy: userId,
      approvedAt: /* @__PURE__ */ new Date()
      // NO cambiar área automáticamente, mantener en área actual
    }).where(eq(repositions.id, repositionId)).returning();
    await db.insert(repositionHistory).values({
      repositionId,
      action: action === "aprobado" ? "approved" : "rejected",
      description: `Reposici\xF3n ${action === "aprobado" ? "aprobada" : "rechazada"}${notes ? `: ${notes}` : ""}`,
      userId
    });
    await this.createNotification({
      userId: reposition.createdBy,
      type: action === "aprobado" ? "transfer_accepted" : "transfer_rejected",
      title: action === "aprobado" ? "Reposici\xF3n Aprobada" : "Reposici\xF3n Rechazada",
      message: `Tu reposici\xF3n ${reposition.folio} ha sido ${action === "aprobado" ? "aprobada" : "rechazada"}${notes ? `: ${notes}` : ""}`,
      repositionId
    });
    return reposition;
  }
  async createRepositionTransfer(transfer, createdBy) {
    const [repositionTransfer] = await db.insert(repositionTransfers).values({
      ...transfer,
      createdBy
    }).returning();
    await db.insert(repositionHistory).values({
      repositionId: transfer.repositionId,
      action: "transfer_requested",
      description: `Transfer requested from ${transfer.fromArea} to ${transfer.toArea}`,
      fromArea: transfer.fromArea,
      toArea: transfer.toArea,
      userId: createdBy
    });
    const reposition = await this.getRepositionById(transfer.repositionId);
    const targetAreaUsers = await db.select().from(users).where(eq(users.area, transfer.toArea));
    for (const user of targetAreaUsers) {
      await this.createNotification({
        userId: user.id,
        type: "reposition_transfer",
        title: "Nueva Transferencia de Reposici\xF3n",
        message: `Se ha solicitado transferir la reposici\xF3n ${reposition?.folio} de ${transfer.fromArea} a ${transfer.toArea}`,
        repositionId: transfer.repositionId
      });
    }
    return repositionTransfer;
  }
  async processRepositionTransfer(transferId, action, userId) {
    const [transfer] = await db.update(repositionTransfers).set({
      status: action,
      processedBy: userId,
      processedAt: /* @__PURE__ */ new Date()
    }).where(eq(repositionTransfers.id, transferId)).returning();
    if (action === "accepted") {
      await db.update(repositions).set({ currentArea: transfer.toArea }).where(eq(repositions.id, transfer.repositionId));
    }
    await db.insert(repositionHistory).values({
      repositionId: transfer.repositionId,
      action: `transfer_${action}`,
      description: `Transfer ${action} from ${transfer.fromArea} to ${transfer.toArea}`,
      fromArea: transfer.fromArea,
      toArea: transfer.toArea,
      userId
    });
    const reposition = await this.getRepositionById(transfer.repositionId);
    await this.createNotification({
      userId: transfer.createdBy,
      type: "transfer_processed",
      title: `Transferencia ${action === "accepted" ? "Aceptada" : "Rechazada"}`,
      message: `La transferencia de la reposici\xF3n ${reposition?.folio} ha sido ${action === "accepted" ? "aceptada" : "rechazada"}`,
      repositionId: transfer.repositionId
    });
    if (action === "accepted") {
      const targetAreaUsers = await db.select().from(users).where(eq(users.area, transfer.toArea));
      for (const user of targetAreaUsers) {
        if (user.id !== userId) {
          await this.createNotification({
            userId: user.id,
            type: "reposition_received",
            title: "Nueva Reposici\xF3n Recibida",
            message: `La reposici\xF3n ${reposition?.folio} ha llegado a tu \xE1rea`,
            repositionId: transfer.repositionId
          });
        }
      }
    }
    return transfer;
  }
  async getRepositionHistory(repositionId) {
    return await db.select().from(repositionHistory).where(eq(repositionHistory.repositionId, repositionId)).orderBy(asc(repositionHistory.createdAt));
  }
  async createAdminPassword(password, createdBy) {
    const [adminPassword] = await db.insert(adminPasswords).values({
      password,
      createdBy
    }).returning();
    return adminPassword;
  }
  async verifyAdminPassword(password) {
    const [adminPassword] = await db.select().from(adminPasswords).where(and(eq(adminPasswords.password, password), eq(adminPasswords.isActive, true))).orderBy(desc(adminPasswords.createdAt));
    return !!adminPassword;
  }
  async updateRepositionConsumo(repositionId, consumoTela) {
    await db.update(repositions).set({ consumoTela }).where(eq(repositions.id, repositionId));
  }
  async deleteReposition(repositionId, userId, reason) {
    console.log("Deleting reposition:", repositionId, "by user:", userId, "reason:", reason);
    const reposition = await this.getRepositionById(repositionId);
    if (!reposition) {
      throw new Error("Reposici\xF3n no encontrada");
    }
    console.log("Found reposition:", reposition.folio);
    await db.update(repositions).set({
      status: "eliminado",
      completedAt: /* @__PURE__ */ new Date()
    }).where(eq(repositions.id, repositionId));
    console.log("Updated reposition status to eliminado");
    await db.insert(repositionHistory).values({
      repositionId,
      action: "deleted",
      description: `Reposici\xF3n eliminada. Motivo: ${reason}`,
      userId
    });
    console.log("Added history entry");
    if (reposition.createdBy !== userId) {
      await this.createNotification({
        userId: reposition.createdBy,
        type: "reposition_deleted",
        title: "Reposici\xF3n Eliminada",
        message: `La reposici\xF3n ${reposition.folio} ha sido eliminada. Motivo: ${reason}`,
        repositionId
      });
      console.log("Created notification for user:", reposition.createdBy);
    }
  }
  async completeReposition(repositionId, userId, notes) {
    await db.update(repositions).set({
      status: "completado",
      completedAt: /* @__PURE__ */ new Date(),
      approvedBy: userId
    }).where(eq(repositions.id, repositionId));
    await db.insert(repositionHistory).values({
      repositionId,
      action: "completed",
      description: `Reposici\xF3n finalizada${notes ? `: ${notes}` : ""}`,
      userId
    });
    const reposition = await this.getRepositionById(repositionId);
    if (reposition) {
      await this.createNotification({
        userId: reposition.createdBy,
        type: "reposition_completed",
        title: "Reposici\xF3n Completada",
        message: `La reposici\xF3n ${reposition.folio} ha sido completada${notes ? `: ${notes}` : ""}`,
        repositionId
      });
    }
  }
  async requestCompletionApproval(repositionId, userId, notes) {
    await db.insert(repositionHistory).values({
      repositionId,
      action: "completion_requested",
      description: `Solicitud de finalizaci\xF3n enviada${notes ? `: ${notes}` : ""}`,
      userId
    });
    const adminUsers = await db.select().from(users).where(eq(users.area, "admin"));
    const enviosUsers = await db.select().from(users).where(eq(users.area, "envios"));
    const operacionesUsers = await db.select().from(users).where(eq(users.area, "operaciones"));
    const allTargetUsers = [...adminUsers, ...enviosUsers, ...operacionesUsers];
    const reposition = await this.getRepositionById(repositionId);
    if (reposition) {
      for (const targetUser of allTargetUsers) {
        await this.createNotification({
          userId: targetUser.id,
          type: "completion_approval_needed",
          title: "Solicitud de Finalizaci\xF3n",
          message: `Se solicita aprobaci\xF3n para finalizar la reposici\xF3n ${reposition.folio}${notes ? `: ${notes}` : ""}`,
          repositionId
        });
      }
    }
  }
  async getPendingRepositionsCount() {
    const repositions2 = await this.getAllRepositions(false);
    return repositions2.filter((r) => r.status === "pendiente").length;
  }
  async getAllRepositions(includeDeleted = false) {
    let query;
    if (!includeDeleted) {
      query = db.select().from(repositions).where(ne(repositions.status, "eliminado"));
    } else {
      query = db.select().from(repositions);
    }
    return await query.orderBy(desc(repositions.createdAt));
  }
  async getRecentOrders(area, limit = 10) {
    let query;
    if (area && area !== "admin") {
      query = db.select().from(orders).where(eq(orders.currentArea, area));
    } else {
      query = db.select().from(orders);
    }
    return await query.orderBy(desc(orders.createdAt)).limit(limit);
  }
  async getRecentRepositions(area, limit = 10) {
    let whereCondition = ne(repositions.status, "eliminado");
    if (area && area !== "admin") {
      whereCondition = and(
        ne(repositions.status, "eliminado"),
        eq(repositions.currentArea, area)
      );
    }
    return await db.select().from(repositions).where(whereCondition).orderBy(desc(repositions.createdAt)).limit(limit);
  }
  async getRepositionTracking(repositionId) {
    console.log("Getting tracking for reposition ID:", repositionId);
    const reposition = await this.getRepositionById(repositionId);
    if (!reposition) {
      console.log("Reposition not found for ID:", repositionId);
      throw new Error("Reposition not found");
    }
    console.log("Found reposition:", reposition.folio);
    const history = await this.getRepositionHistory(repositionId);
    console.log("History entries:", history.length);
    const timers = await db.select().from(repositionTimers).where(eq(repositionTimers.repositionId, repositionId));
    console.log("Timers found:", timers.length);
    const areas2 = ["patronaje", "corte", "bordado", "ensamble", "plancha", "calidad"];
    const currentAreaIndex = areas2.indexOf(reposition.currentArea);
    const steps = areas2.map((area, index) => {
      const areaTimer = timers.find((t) => t.area === area);
      let status = "pending";
      if (index < currentAreaIndex || reposition.status === "completado") {
        status = "completed";
      } else if (index === currentAreaIndex && reposition.status !== "completado") {
        status = "current";
      }
      let timeSpent = void 0;
      let timeInMinutes = 0;
      if (areaTimer && areaTimer.manualStartTime && areaTimer.manualEndTime) {
        const startTime = new Date(areaTimer.manualStartTime);
        const endTime = new Date(areaTimer.manualEndTime);
        timeInMinutes = Math.abs(endTime.getTime() - startTime.getTime()) / (1e3 * 60);
        const hours = Math.floor(timeInMinutes / 60);
        const minutes = Math.round(timeInMinutes % 60);
        timeSpent = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
      }
      const areaHistory = history.find((h) => h.toArea === area || area === "patronaje" && h.action === "created");
      return {
        id: index + 1,
        area,
        status,
        timestamp: areaHistory?.timestamp,
        user: areaHistory?.userName,
        timeSpent,
        timeInMinutes
      };
    });
    const areaTimes = {};
    areas2.forEach((area) => {
      areaTimes[area] = 0;
    });
    timers.forEach((timer) => {
      if (timer.manualStartTime && timer.manualEndTime) {
        const startTime = new Date(timer.manualStartTime);
        const endTime = new Date(timer.manualEndTime);
        const timeInMinutes = Math.abs(endTime.getTime() - startTime.getTime()) / (1e3 * 60);
        areaTimes[timer.area] = timeInMinutes;
      }
    });
    console.log("Area times calculated:", areaTimes);
    const totalMinutes = Object.values(areaTimes).reduce((sum, minutes) => sum + minutes, 0);
    const totalHours = Math.floor(totalMinutes / 60);
    const remainingMinutes = Math.round(totalMinutes % 60);
    const totalTimeFormatted = totalHours > 0 ? `${totalHours}h ${remainingMinutes}m` : `${remainingMinutes}m`;
    const completedSteps = steps.filter((s) => s.status === "completed").length;
    const progress = Math.round(completedSteps / areas2.length * 100);
    const result = {
      reposition: {
        folio: reposition.folio,
        status: reposition.status,
        currentArea: reposition.currentArea,
        progress
      },
      steps,
      history,
      totalTime: {
        formatted: totalTimeFormatted,
        minutes: totalMinutes
      },
      areaTimes
    };
    console.log("Returning tracking data:", JSON.stringify(result, null, 2));
    return result;
  }
  async getPendingRepositionTransfers(userArea) {
    return await db.select().from(repositionTransfers).where(and(
      eq(repositionTransfers.toArea, userArea),
      eq(repositionTransfers.status, "pending")
    )).orderBy(desc(repositionTransfers.createdAt));
  }
  // Agenda Events
  async getAgendaEvents(user) {
    if (user.area === "admin" || user.area === "envios") {
      return await db.select({
        id: agendaEvents.id,
        createdBy: agendaEvents.createdBy,
        assignedToArea: agendaEvents.assignedToArea,
        title: agendaEvents.title,
        description: agendaEvents.description,
        date: agendaEvents.date,
        time: agendaEvents.time,
        priority: agendaEvents.priority,
        status: agendaEvents.status,
        createdAt: agendaEvents.createdAt,
        updatedAt: agendaEvents.updatedAt,
        creatorName: users.name
      }).from(agendaEvents).leftJoin(users, eq(agendaEvents.createdBy, users.id)).orderBy(asc(agendaEvents.date), asc(agendaEvents.time));
    } else {
      return await db.select({
        id: agendaEvents.id,
        createdBy: agendaEvents.createdBy,
        assignedToArea: agendaEvents.assignedToArea,
        title: agendaEvents.title,
        description: agendaEvents.description,
        date: agendaEvents.date,
        time: agendaEvents.time,
        priority: agendaEvents.priority,
        status: agendaEvents.status,
        createdAt: agendaEvents.createdAt,
        updatedAt: agendaEvents.updatedAt,
        creatorName: users.name
      }).from(agendaEvents).leftJoin(users, eq(agendaEvents.createdBy, users.id)).where(eq(agendaEvents.assignedToArea, user.area)).orderBy(asc(agendaEvents.date), asc(agendaEvents.time));
    }
  }
  async createAgendaEvent(eventData) {
    const [event] = await db.insert(agendaEvents).values(eventData).returning();
    return event;
  }
  async updateAgendaEvent(eventId, eventData) {
    const [event] = await db.update(agendaEvents).set(eventData).where(eq(agendaEvents.id, eventId)).returning();
    if (!event) {
      throw new Error("Tarea no encontrada");
    }
    return event;
  }
  async updateTaskStatus(eventId, userArea, status) {
    const [event] = await db.update(agendaEvents).set({ status, updatedAt: /* @__PURE__ */ new Date() }).where(and(
      eq(agendaEvents.id, eventId),
      eq(agendaEvents.assignedToArea, userArea)
    )).returning();
    if (!event) {
      throw new Error("Tarea no encontrada o no asignada a tu \xE1rea");
    }
    return event;
  }
  async deleteAgendaEvent(eventId) {
    const result = await db.delete(agendaEvents).where(eq(agendaEvents.id, eventId));
    if (result.rowCount === 0) {
      throw new Error("Tarea no encontrada");
    }
  }
  async exportHistoryToExcel(orders2) {
    const ExcelJS = __require("exceljs");
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Historial de Pedidos");
    worksheet.columns = [
      { header: "Folio", key: "folio", width: 15 },
      { header: "Cliente/Hotel", key: "clienteHotel", width: 20 },
      { header: "Modelo", key: "modelo", width: 15 },
      { header: "Tipo Prenda", key: "tipoPrenda", width: 15 },
      { header: "Color", key: "color", width: 12 },
      { header: "Tela", key: "tela", width: 15 },
      { header: "Total Piezas", key: "totalPiezas", width: 12 },
      { header: "No. Solicitud", key: "noSolicitud", width: 15 },
      { header: "\xC1rea Actual", key: "currentArea", width: 15 },
      { header: "Estado", key: "status", width: 12 },
      { header: "Fecha Creaci\xF3n", key: "createdAt", width: 18 },
      { header: "Fecha Finalizaci\xF3n", key: "completedAt", width: 18 }
    ];
    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFE0E0E0" }
    };
    const getAreaDisplayName = (area) => {
      const names = {
        corte: "Corte",
        bordado: "Bordado",
        ensamble: "Ensamble",
        plancha: "Plancha/Empaque",
        calidad: "Calidad",
        envios: "Env\xEDos",
        admin: "Admin"
      };
      return names[area] || area;
    };
    orders2.forEach((order) => {
      worksheet.addRow({
        folio: order.folio,
        clienteHotel: order.clienteHotel,
        modelo: order.modelo,
        tipoPrenda: order.tipoPrenda,
        color: order.color,
        tela: order.tela,
        totalPiezas: order.totalPiezas,
        noSolicitud: order.noSolicitud,
        currentArea: getAreaDisplayName(order.currentArea),
        status: order.status === "completed" ? "Finalizado" : "En Proceso",
        createdAt: new Date(order.createdAt).toLocaleString("es-ES"),
        completedAt: order.completedAt ? new Date(order.completedAt).toLocaleString("es-ES") : ""
      });
    });
    worksheet.eachRow((row, rowNumber) => {
      row.eachCell((cell) => {
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" }
        };
      });
    });
    return await workbook.xlsx.writeBuffer();
  }
  async generateReport(type, format, startDate, endDate, filters) {
    throw new Error("Method not implemented.");
  }
  async saveReportToOneDrive(type, startDate, endDate, filters) {
    throw new Error("Method not implemented.");
  }
  async startRepositionTimer(repositionId, userId, area) {
    const existingTimer = await db.select().from(repositionTimers).where(and(
      eq(repositionTimers.repositionId, repositionId),
      eq(repositionTimers.area, area),
      eq(repositionTimers.isRunning, true)
    )).limit(1);
    if (existingTimer.length > 0) {
      throw new Error("Ya existe un timer activo para esta reposici\xF3n en esta \xE1rea");
    }
    const [timer] = await db.insert(repositionTimers).values({
      repositionId,
      area,
      userId,
      startTime: /* @__PURE__ */ new Date(),
      isRunning: true
    }).returning();
    return timer;
  }
  async stopRepositionTimer(repositionId, area, userId) {
    const [activeTimer] = await db.select().from(repositionTimers).where(and(
      eq(repositionTimers.repositionId, repositionId),
      eq(repositionTimers.isRunning, true)
    )).orderBy(desc(repositionTimers.startTime));
    if (!activeTimer) {
      throw new Error("No hay cron\xF3metro activo para esta reposici\xF3n");
    }
    const endTime = /* @__PURE__ */ new Date();
    const startTime = new Date(activeTimer.startTime);
    const elapsedMilliseconds = endTime.getTime() - startTime.getTime();
    const elapsedMinutes = Math.floor(elapsedMilliseconds / (1e3 * 60));
    const hours = Math.floor(elapsedMinutes / 60);
    const minutes = elapsedMinutes % 60;
    const elapsedTimeFormatted = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:00`;
    await db.update(repositionTimers).set({
      endTime,
      elapsedMinutes,
      isRunning: false
    }).where(eq(repositionTimers.id, activeTimer.id));
    const user = await this.getUser(userId);
    await db.insert(repositionHistory).values({
      repositionId,
      action: "timer_stopped",
      description: `Cron\xF3metro detenido por ${user?.name || "Usuario"} en \xE1rea ${area}. Tiempo transcurrido: ${elapsedTimeFormatted}`,
      userId
    });
    console.log(`Timer stopped for reposition ${repositionId} by user ${userId} in area ${area}. Elapsed: ${elapsedTimeFormatted}`);
    return { elapsedTime: elapsedTimeFormatted };
  }
  async getRepositionTimers(repositionId) {
    console.log(`Retrieving timers for reposition ${repositionId}`);
    const timers = await db.select().from(repositionTimers).where(eq(repositionTimers.repositionId, repositionId));
    const localTimers = timers.map((timer) => {
      const startTime = timer.startTime ? new Date(timer.startTime) : null;
      const endTime = timer.endTime ? new Date(timer.endTime) : null;
      let elapsedMinutes = timer.elapsedMinutes || 0;
      if (startTime && endTime) {
        elapsedMinutes = (endTime.getTime() - startTime.getTime()) / (1e3 * 60);
      }
      const hours = Math.floor(elapsedMinutes / 60);
      const minutes = Math.floor(elapsedMinutes % 60);
      const elapsedTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:00`;
      return {
        id: timer.id,
        repositionId: timer.repositionId,
        userId: timer.userId,
        area: timer.area,
        startTime,
        endTime,
        elapsedTime
      };
    });
    return localTimers;
  }
  async getReportData(type, startDate, endDate, filters) {
    throw new Error("Method not implemented.");
  }
  async getUserAgendaEvents(userId) {
    throw new Error("Method not implemented.");
  }
  async setManualRepositionTime(repositionId, area, userId, startTime, endTime, date) {
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(startTime) || !timeRegex.test(endTime)) {
      throw new Error("Formato de tiempo inv\xE1lido. Use HH:MM");
    }
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      throw new Error("Formato de fecha inv\xE1lido. Use YYYY-MM-DD");
    }
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);
    const startTotalMinutes = startHour * 60 + startMinute;
    const endTotalMinutes = endHour * 60 + endMinute;
    let elapsedMinutes = endTotalMinutes - startTotalMinutes;
    if (elapsedMinutes < 0) {
      elapsedMinutes += 24 * 60;
    }
    const existingTimer = await db.select().from(repositionTimers).where(and(
      eq(repositionTimers.repositionId, repositionId),
      eq(repositionTimers.area, area)
    )).limit(1);
    if (existingTimer.length > 0) {
      const [updatedTimer] = await db.update(repositionTimers).set({
        manualStartTime: startTime,
        manualEndTime: endTime,
        manualDate: date,
        elapsedMinutes,
        isRunning: false
      }).where(eq(repositionTimers.id, existingTimer[0].id)).returning();
      return updatedTimer;
    } else {
      const [timer] = await db.insert(repositionTimers).values({
        repositionId,
        area,
        userId,
        manualStartTime: startTime,
        manualEndTime: endTime,
        manualDate: date,
        elapsedMinutes,
        isRunning: false
      }).returning();
      return timer;
    }
  }
  async getRepositionTimer(repositionId, area) {
    const [timer] = await db.select().from(repositionTimers).where(and(
      eq(repositionTimers.repositionId, repositionId),
      eq(repositionTimers.area, area)
    )).limit(1);
    return timer || null;
  }
  // Funciones para gestión de materiales
  async updateRepositionMaterialStatus(repositionId, materialStatus, missingMaterials, notes) {
    const existingMaterial = await db.select().from(repositionMaterials).where(eq(repositionMaterials.repositionId, repositionId)).limit(1);
    if (existingMaterial.length > 0) {
      await db.update(repositionMaterials).set({
        materialStatus,
        missingMaterials,
        notes,
        updatedAt: /* @__PURE__ */ new Date()
      }).where(eq(repositionMaterials.repositionId, repositionId));
    } else {
      await db.insert(repositionMaterials).values({
        repositionId,
        materialStatus,
        missingMaterials,
        notes
      });
    }
    await db.insert(repositionHistory).values({
      repositionId,
      action: "material_status_updated",
      description: `Estado de materiales actualizado: ${materialStatus}${missingMaterials ? ` - Faltantes: ${missingMaterials}` : ""}`,
      userId: 1
      // Esto debería ser el ID del usuario actual
    });
  }
  async pauseReposition(repositionId, reason, userId) {
    const existingMaterial = await db.select().from(repositionMaterials).where(eq(repositionMaterials.repositionId, repositionId)).limit(1);
    if (existingMaterial.length > 0) {
      await db.update(repositionMaterials).set({
        isPaused: true,
        pauseReason: reason,
        pausedBy: userId,
        pausedAt: /* @__PURE__ */ new Date(),
        updatedAt: /* @__PURE__ */ new Date()
      }).where(eq(repositionMaterials.repositionId, repositionId));
    } else {
      await db.insert(repositionMaterials).values({
        repositionId,
        isPaused: true,
        pauseReason: reason,
        pausedBy: userId,
        pausedAt: /* @__PURE__ */ new Date()
      });
    }
    await db.insert(repositionHistory).values({
      repositionId,
      action: "paused",
      description: `Reposici\xF3n pausada por almac\xE9n. Motivo: ${reason}`,
      userId
    });
    const areaUsers = await db.select().from(users).where(or(
      eq(users.area, "admin"),
      eq(users.area, "operaciones"),
      eq(users.area, "envios")
    ));
    for (const user of areaUsers) {
      await this.createNotification({
        userId: user.id,
        type: "reposition_paused",
        title: "Reposici\xF3n Pausada",
        message: `La reposici\xF3n ha sido pausada por almac\xE9n. Motivo: ${reason}`,
        repositionId
      });
    }
  }
  async resumeReposition(repositionId, userId) {
    await db.update(repositionMaterials).set({
      isPaused: false,
      resumedBy: userId,
      resumedAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq(repositionMaterials.repositionId, repositionId));
    await db.insert(repositionHistory).values({
      repositionId,
      action: "resumed",
      description: "Reposici\xF3n reanudada por almac\xE9n",
      userId
    });
  }
  async getRepositionMaterialStatus(repositionId) {
    const material = await db.select().from(repositionMaterials).where(eq(repositionMaterials.repositionId, repositionId)).limit(1);
    return material[0] || null;
  }
  async saveRepositionDocument(documentData) {
    const allowedExtensions = [".pdf", ".xml", ".jpg", ".jpeg", ".png"];
    const fileExtension = documentData.originalName.toLowerCase().split(".").pop();
    if (!fileExtension || !allowedExtensions.includes(`.${fileExtension}`)) {
      throw new Error("Tipo de archivo no permitido. Solo se permiten archivos PDF, XML, JPG, PNG y JPEG.");
    }
    const [document] = await db.insert(documents).values({
      filename: documentData.filename,
      originalName: documentData.originalName,
      size: documentData.size,
      path: documentData.path,
      repositionId: documentData.repositionId,
      uploadedBy: documentData.uploadedBy
    }).returning();
    return document;
  }
  async getRepositionDocuments(repositionId) {
    const docs = await db.select({
      id: documents.id,
      filename: documents.filename,
      originalName: documents.originalName,
      size: documents.size,
      uploadedBy: documents.uploadedBy,
      createdAt: documents.createdAt,
      uploaderName: users.name
    }).from(documents).leftJoin(users, eq(documents.uploadedBy, users.id)).where(eq(documents.repositionId, repositionId)).orderBy(documents.createdAt);
    return docs;
  }
  async getAllRepositionsForAlmacen() {
    const result = await db.select({
      id: repositions.id,
      folio: repositions.folio,
      type: repositions.type,
      solicitanteNombre: repositions.solicitanteNombre,
      solicitanteArea: repositions.solicitanteArea,
      modeloPrenda: repositions.modeloPrenda,
      tela: repositions.tela,
      color: repositions.color,
      tipoPieza: repositions.tipoPieza,
      consumoTela: repositions.consumoTela,
      urgencia: repositions.urgencia,
      currentArea: repositions.currentArea,
      status: repositions.status,
      createdAt: repositions.createdAt,
      isPaused: repositionMaterials.isPaused,
      pauseReason: repositionMaterials.pauseReason
    }).from(repositions).leftJoin(repositionMaterials, eq(repositions.id, repositionMaterials.repositionId)).where(and(
      ne(repositions.status, "eliminado"),
      ne(repositions.status, "completado")
    )).orderBy(desc(repositions.createdAt));
    return result;
  }
  async createReposition(data, pieces, createdBy) {
    const { productos, telaContraste, volverHacer, materialesImplicados, observaciones, ...mainRepositionData } = data;
    const [reposition] = await db.insert(repositions).values({
      ...mainRepositionData,
      createdBy,
      volverHacer,
      descripcionSuceso: data.descripcionSuceso,
      materialesImplicados,
      observaciones
    }).returning();
    if (pieces.length > 0) {
      await db.insert(repositionPieces).values(pieces.map((piece) => ({
        ...piece,
        repositionId: reposition.id
      })));
    }
    if (productos && productos.length > 0) {
      await db.insert(repositionProducts).values(productos.map((producto) => ({
        repositionId: reposition.id,
        modeloPrenda: producto.modeloPrenda,
        tela: producto.tela,
        color: producto.color,
        tipoPieza: producto.tipoPieza,
        consumoTela: producto.consumoTela || 0
      })));
    }
    if (telaContraste) {
      await db.insert(repositionContrastFabrics).values({
        repositionId: reposition.id,
        tela: telaContraste.tela,
        color: telaContraste.color,
        consumo: telaContraste.consumo
      });
      if (telaContraste.pieces && telaContraste.pieces.length > 0) {
      }
    }
    await db.insert(repositionHistory).values({
      repositionId: reposition.id,
      action: "created",
      description: `Reposition ${reposition.type} created`,
      userId: createdBy
    });
    const adminUsers = await db.select().from(users).where(eq(users.area, "admin"));
    const operacionesUsers = await db.select().from(users).where(eq(users.area, "operaciones"));
    const enviosUsers = await db.select().from(users).where(eq(users.area, "envios"));
    const allTargetUsers = [...adminUsers, ...operacionesUsers, ...enviosUsers];
    for (const targetUser of allTargetUsers) {
      await this.createNotification({
        userId: targetUser.id,
        type: "new_reposition",
        title: "Nueva Solicitud de Reposici\xF3n",
        message: `Se ha creado una nueva solicitud de ${data.type}: ${data.folio}`,
        repositionId: reposition.id
      });
    }
    return reposition;
  }
  async getRepositionById(id) {
    const [reposition] = await db.select().from(repositions).where(eq(repositions.id, id));
    if (!reposition) return void 0;
    return {
      id: reposition.id,
      folio: reposition.folio,
      type: reposition.type,
      solicitanteNombre: reposition.solicitanteNombre,
      solicitanteArea: reposition.solicitanteArea,
      fechaSolicitud: reposition.fechaSolicitud,
      noSolicitud: reposition.noSolicitud,
      noHoja: reposition.noHoja,
      fechaCorte: reposition.fechaCorte,
      causanteDano: reposition.causanteDano,
      descripcionSuceso: reposition.descripcionSuceso,
      modeloPrenda: reposition.modeloPrenda,
      tela: reposition.tela,
      color: reposition.color,
      tipoPieza: reposition.tipoPieza,
      urgencia: reposition.urgencia,
      observaciones: reposition.observaciones,
      currentArea: reposition.currentArea,
      status: reposition.status,
      createdAt: reposition.createdAt,
      approvedAt: reposition.approvedAt,
      consumoTela: reposition.consumoTela,
      tipoAccidente: reposition.tipoAccidente,
      otroAccidente: reposition.otroAccidente,
      volverHacer: reposition.volverHacer,
      materialesImplicados: reposition.materialesImplicados
    };
  }
};
var storage = new DatabaseStorage();

// server/auth.ts
import connectPg2 from "connect-pg-simple";
var scryptAsync = promisify(scrypt);
async function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const buf = await scryptAsync(password, salt, 64);
  return `${buf.toString("hex")}.${salt}`;
}
async function comparePasswords(supplied, stored) {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = await scryptAsync(supplied, salt, 64);
  return timingSafeEqual(hashedBuf, suppliedBuf);
}
function authenticateToken(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Autenticaci\xF3n requerida" });
  }
  next();
}
function setupAuth(app2) {
  const PostgresSessionStore2 = connectPg2(session2);
  const sessionSettings = {
    secret: process.env.SESSION_SECRET || "jasana-secret-key-12345",
    resave: false,
    saveUninitialized: false,
    store: new PostgresSessionStore2({
      pool,
      createTableIfMissing: true
    }),
    cookie: {
      secure: false,
      // Render handles HTTPS termination
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1e3,
      // 24 hours
      sameSite: "lax"
    }
  };
  app2.set("trust proxy", 1);
  app2.use(session2(sessionSettings));
  app2.use(passport.initialize());
  app2.use(passport.session());
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      const user = await storage.getUserByUsername(username);
      if (!user || !await comparePasswords(password, user.password)) {
        return done(null, false);
      } else {
        return done(null, user);
      }
    })
  );
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    const user = await storage.getUser(id);
    done(null, user);
  });
  app2.post("/api/register", async (req, res, next) => {
    try {
      const { username, password, name, area, adminPassword } = req.body;
      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ message: "Usuario ya existe" });
      }
      if (area !== "admin") {
        const adminUser = await storage.getAdminUser();
        if (!adminUser || !adminPassword) {
          return res.status(400).json({ message: "Se requiere clave de admin" });
        }
        const isAdminPasswordValid = await comparePasswords(adminPassword, adminUser.password);
        if (!isAdminPasswordValid) {
          return res.status(400).json({ message: "Contrase\xF1a no valida" });
        }
      }
      const user = await storage.createUser({
        username,
        password: await hashPassword(password),
        name,
        area
      });
      req.login(user, (err) => {
        if (err) return next(err);
        res.status(201).json(user);
      });
    } catch (error) {
      next(error);
    }
  });
  app2.post("/api/login", passport.authenticate("local"), (req, res) => {
    res.status(200).json(req.user);
  });
  app2.post("/api/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.sendStatus(200);
    });
  });
  app2.get("/api/user", (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    res.json(req.user);
  });
  app2.post("/api/admin/reset-password", async (req, res) => {
    try {
      if (!req.isAuthenticated() || req.user?.area !== "admin") {
        return res.status(403).json({ message: "Clave admin requerida" });
      }
      const { userId, newPassword } = req.body;
      const hashedPassword = await hashPassword(newPassword);
      await storage.resetUserPassword(userId, hashedPassword);
      res.json({ message: "Se restablecio la contrase\xF1a" });
    } catch (error) {
      res.status(500).json({ message: "No se restablecio la contrase\xF1a" });
    }
  });
}

// server/routes.ts
import bcrypt from "bcrypt";

// server/upload.ts
import multer from "multer";
import path from "path";
import fs from "fs";
var uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
var storage2 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  }
});
var fileFilter = (req, file, cb) => {
  const allowedTypes = [".pdf", ".xml", ".jpg", ".jpeg", ".png"];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Solo se permiten archivos PDF, XML y im\xE1genes (JPG, PNG, JPEG)"), false);
  }
};
var upload = multer({
  storage: storage2,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024
    // 10MB
  }
});
var handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ error: "El archivo es demasiado grande (m\xE1ximo 10MB)" });
    }
    if (err.code === "LIMIT_FILE_COUNT") {
      return res.status(400).json({ error: "Demasiados archivos" });
    }
  }
  if (err) {
    return res.status(400).json({ error: err.message });
  }
  next();
};

// server/routes.ts
import path2 from "path";
import fs2 from "fs";
function registerRoutes(app2) {
  setupAuth(app2);
  registerOrderRoutes(app2);
  registerTransferRoutes(app2);
  registerNotificationRoutes(app2);
  registerRepositionRoutes(app2);
  registerAdminRoutes(app2);
  registerDashboardRoutes(app2);
  registerReportsRoutes(app2);
  registerHistoryRoutes(app2);
  registerAgendaRoutes(app2);
  registerAlmacenRoutes(app2);
  const httpServer = configureWebSocket(app2);
  return httpServer;
}
function registerOrderRoutes(app2) {
  const router = Router();
  router.post("/", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Autenticaci\xF3n requerida" });
    try {
      const user = req.user;
      if (user.area !== "corte" && user.area !== "admin" && user.area !== "envios") {
        return res.status(403).json({ message: "\xC1rea restringida" });
      }
      const validatedData = insertOrderSchema.parse(req.body);
      const order = await storage.createOrder(validatedData, user.id);
      res.status(201).json(order);
    } catch (error) {
      console.error("Create order error:", error);
      res.status(400).json({ message: "Datos de orden incorrectos" });
    }
  });
  router.get("/", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Autenticaci\xF3n requerida" });
    try {
      const area = req.query.area;
      const orders2 = await storage.getOrders(area);
      res.json(orders2);
    } catch (error) {
      console.error("Get orders error:", error);
      res.status(500).json({ message: "Error al cargar \xF3rdenes" });
    }
  });
  router.get("/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Autenticaci\xF3n requerida" });
    try {
      const order = await storage.getOrderById(parseInt(req.params.id));
      if (!order) return res.status(404).json({ message: "Orden no encontrada" });
      res.json(order);
    } catch (error) {
      console.error("Get order error:", error);
      res.status(500).json({ message: "Error al cargar orden" });
    }
  });
  router.get("/:id/pieces", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Autenticaci\xF3n requerida" });
    try {
      const orderId = parseInt(req.params.id);
      const pieces = await storage.getOrderPieces(orderId);
      res.json(pieces);
    } catch (error) {
      console.error("Get order pieces error:", error);
      res.status(500).json({ message: "Error al cargar piezas" });
    }
  });
  router.get("/:id/history", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Autenticaci\xF3n requerida" });
    try {
      const history = await storage.getOrderHistory(parseInt(req.params.id));
      res.json(history);
    } catch (error) {
      console.error("Get order history error:", error);
      res.status(500).json({ message: "Error al cargar historial" });
    }
  });
  router.post("/:id/complete", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Autenticaci\xF3n requerida" });
    try {
      const user = req.user;
      if (user.area !== "envios") {
        return res.status(403).json({ message: "Solo el \xE1rea de env\xEDos puede completar la orden" });
      }
      const orderId = parseInt(req.params.id);
      await storage.completeOrder(orderId);
      await storage.addOrderHistory(orderId, "completed", "Pedido finalizado", user.id);
      res.json({ message: "Orden completada" });
    } catch (error) {
      console.error("Complete order error:", error);
      res.status(500).json({ message: "Error al completar orden" });
    }
  });
  app2.use("/api/orders", router);
}
function registerTransferRoutes(app2) {
  const router = Router();
  router.post("/", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Autenticaci\xF3n requerida" });
    try {
      const user = req.user;
      const { orderId, toArea, pieces, notes } = req.body;
      const orderPieces2 = await storage.getOrderPieces(orderId);
      const userAreaPieces = orderPieces2.find((p) => p.area === user.area);
      if (!userAreaPieces || userAreaPieces.pieces < pieces) {
        return res.status(400).json({
          message: `No hay suficientes piezas disponibles en ${user.area}. Disponibles: ${userAreaPieces?.pieces || 0}`
        });
      }
      const validatedData = insertTransferSchema.parse({
        orderId,
        fromArea: user.area,
        toArea,
        pieces: parseInt(pieces),
        notes
      });
      const transfer = await storage.createTransfer(validatedData, user.id);
      res.status(201).json(transfer);
    } catch (error) {
      console.error("Create transfer error:", error);
      res.status(400).json({ message: "Error al crear transferencia" });
    }
  });
  router.get("/pending", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Autenticaci\xF3n requerida" });
    try {
      const user = req.user;
      const transfers2 = await storage.getPendingTransfersForUser(user.id);
      res.json(transfers2);
    } catch (error) {
      console.error("Get pending transfers error:", error);
      res.status(500).json({ message: "Error al obtener transferencias pendientes" });
    }
  });
  router.post("/:id/accept", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Autenticaci\xF3n requerida" });
    try {
      const user = req.user;
      await storage.acceptTransfer(parseInt(req.params.id), user.id);
      res.json({ message: "Transferencia aceptada correctamente" });
    } catch (error) {
      console.error("Accept transfer error:", error);
      res.status(500).json({ message: "Error al aceptar la transferencia" });
    }
  });
  router.post("/:id/reject", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Autenticaci\xF3n requerida" });
    try {
      const user = req.user;
      await storage.rejectTransfer(parseInt(req.params.id), user.id);
      res.json({ message: "Transferencia rechazada correctamente" });
    } catch (error) {
      console.error("Reject transfer error:", error);
      res.status(500).json({ message: "Error al rechazar la transferencia" });
    }
  });
  app2.use("/api/transfers", router);
}
function registerNotificationRoutes(app2) {
  const router = Router();
  router.get("/", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Autenticaci\xF3n requerida" });
    try {
      const user = req.user;
      const notifications2 = await storage.getUserNotifications(user.id);
      console.log(`Fetched ${notifications2.length} notifications for user ${user.id} (${user.area})`);
      res.json(notifications2);
    } catch (error) {
      console.error("Get notifications error:", error);
      res.status(500).json({ message: "Error al obtener notificaciones" });
    }
  });
  router.post("/:id/read", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Autenticaci\xF3n requerida" });
    try {
      await storage.markNotificationRead(parseInt(req.params.id));
      res.json({ message: "Notificaci\xF3n marcada como le\xEDda" });
    } catch (error) {
      console.error("Mark notification read error:", error);
      res.status(500).json({ message: "Error al marcar la notificaci\xF3n" });
    }
  });
  app2.use("/api/notifications", router);
}
function registerAdminRoutes(app2) {
  const router = Router();
  router.use((req, res, next) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Autenticaci\xF3n requerida" });
    const user = req.user;
    if (user.area !== "admin") return res.status(403).json({ message: "Se requiere acceso de administrador" });
    next();
  });
  router.get("/users", async (req, res) => {
    try {
      const users2 = await storage.getAllUsers();
      res.json(users2);
    } catch (error) {
      console.error("Get users error:", error);
      res.status(500).json({ message: "Error al obtener usuarios" });
    }
  });
  router.delete("/users/:id", async (req, res) => {
    try {
      const result = await storage.deleteUserById(req.params.id);
      if (result) {
        return res.status(200).json({ message: "Usuario eliminado correctamente" });
      } else {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Error al eliminar el usuario" });
    }
  });
  router.post("/reset-password", async (req, res) => {
    try {
      const { userId, newPassword } = req.body;
      if (!userId || !newPassword) return res.status(400).json({ message: "Faltan campos requeridos" });
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await storage.resetUserPassword(userId, hashedPassword);
      res.json({ message: "Contrase\xF1a restablecida correctamente" });
    } catch (error) {
      console.error("Reset password error:", error);
      res.status(500).json({ message: "Error al restablecer la contrase\xF1a" });
    }
  });
  app2.use("/api/admin", router);
}
function registerDashboardRoutes(app2) {
  app2.get("/api/dashboard/stats", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Autenticaci\xF3n requerida" });
    try {
      const user = req.user;
      const allOrders = await storage.getOrders();
      const userAreaOrders = await storage.getOrders(user.area);
      const pendingTransfers = await storage.getPendingTransfersForUser(user.id);
      const repositions2 = await storage.getRepositions(user.area, user.area);
      const stats = {
        activeOrders: allOrders.filter((o) => o.status === "active").length,
        myAreaOrders: userAreaOrders.length,
        pendingTransfers: pendingTransfers.length,
        activeRepositions: repositions2.filter((r) => r.status !== "completado" && r.status !== "eliminado").length,
        completedToday: allOrders.filter(
          (o) => o.status === "completed" && o.completedAt && new Date(o.completedAt).toDateString() === (/* @__PURE__ */ new Date()).toDateString()
        ).length
      };
      res.json(stats);
    } catch (error) {
      console.error("Get dashboard stats error:", error);
      res.status(500).json({ message: "Error al obtener estad\xEDsticas del tablero" });
    }
  });
  app2.get("/api/dashboard/recent-activity", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Autenticaci\xF3n requerida" });
    try {
      const user = req.user;
      const recentOrders = await storage.getRecentOrders(user.area, 5);
      const recentRepositions = await storage.getRecentRepositions(user.area, 5);
      res.json({
        orders: recentOrders,
        repositions: recentRepositions
      });
    } catch (error) {
      console.error("Get recent activity error:", error);
      res.status(500).json({ message: "Error al obtener actividad reciente" });
    }
  });
}
function configureWebSocket(app2) {
  const httpServer = createServer(app2);
  const wss = new WebSocketServer({ server: httpServer, path: "/ws" });
  const broadcastToAll = (notification) => {
    console.log("Enviando notificaci\xF3n a todos los usuarios conectados:", notification);
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        try {
          client.send(JSON.stringify({
            type: "notification",
            data: notification
          }));
        } catch (error) {
          console.error("Error al enviar notificaci\xF3n WebSocket:", error);
        }
      }
    });
  };
  wss.on("connection", (ws) => {
    console.log("Nueva conexi\xF3n WebSocket establecida");
    ws.on("message", (message) => {
      try {
        const data = JSON.parse(message.toString());
        console.log("Mensaje WebSocket recibido:", data);
        broadcastToAll(data);
      } catch (error) {
        console.error("Error al procesar mensaje WebSocket:", error);
      }
    });
    ws.on("close", () => {
      console.log("Conexi\xF3n WebSocket cerrada");
    });
    ws.on("error", (error) => {
      console.error("Error en conexi\xF3n WebSocket:", error);
    });
    ws.send(JSON.stringify({
      type: "connection",
      data: { message: "Conectado exitosamente al sistema de notificaciones" }
    }));
  });
  httpServer.wss = wss;
  httpServer.broadcast = broadcastToAll;
  return httpServer;
}
function registerRepositionRoutes(app2) {
  const router = Router();
  router.post("/", authenticateToken, upload.array("documents", 5), handleMulterError, async (req, res) => {
    try {
      const user = req.user;
      let repositionData;
      if (req.body.repositionData) {
        repositionData = JSON.parse(req.body.repositionData);
      } else {
        repositionData = req.body;
      }
      const { pieces, productos, telaContraste, ...mainData } = repositionData;
      if (mainData.type === "reproceso") {
        if (!mainData.volverHacer || !mainData.materialesImplicados) {
          return res.status(400).json({ message: "Los campos 'volverHacer' y 'materialesImplicados' son requeridos para reprocesos" });
        }
      }
      const files = req.files;
      const now = /* @__PURE__ */ new Date();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const year = String(now.getFullYear()).slice(-2);
      const counter = await storage.getNextRepositionCounter();
      const folio = `JN-REQ-${month}-${year}-${String(counter).padStart(3, "0")}`;
      const reposition = await storage.createReposition({
        ...mainData,
        folio,
        currentArea: user.area,
        solicitanteArea: user.area,
        productos,
        telaContraste
      }, pieces || [], user.id);
      if (files && files.length > 0) {
        for (const file of files) {
          await storage.saveRepositionDocument({
            repositionId: reposition.id,
            filename: file.filename,
            originalName: file.originalname,
            size: file.size,
            path: file.path,
            uploadedBy: user.id
          });
        }
      }
      res.status(201).json(reposition);
    } catch (error) {
      console.error("Create reposition error:", error);
      res.status(400).json({ message: "Error al crear la solicitud de reposici\xF3n" });
    }
  });
  router.get("/", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Autenticaci\xF3n requerida" });
    try {
      const user = req.user;
      const area = req.query.area;
      let repositions2;
      if ((user.area === "admin" || user.area === "envios") && (!area || area === "all")) {
        repositions2 = await storage.getAllRepositions(false);
      } else if (user.area === "dise\xF1o") {
        repositions2 = await storage.getRepositions(void 0, "dise\xF1o");
      } else if (area && area !== "all") {
        repositions2 = await storage.getRepositionsByArea(area, user.id);
      } else {
        repositions2 = await storage.getRepositionsByArea(user.area, user.id);
      }
      res.json(repositions2);
    } catch (error) {
      console.error("Get repositions error:", error);
      res.status(500).json({ message: "Error al cargar las reposiciones" });
    }
  });
  router.get("/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Autenticaci\xF3n requerida" });
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "ID de reposici\xF3n inv\xE1lido" });
      }
      const reposition = await storage.getRepositionById(id);
      if (!reposition) {
        return res.status(404).json({ message: "Reposici\xF3n no encontrada" });
      }
      res.json(reposition);
    } catch (error) {
      console.error("Get reposition error:", error);
      res.status(500).json({ message: "Error al obtener la reposici\xF3n" });
    }
  });
  router.post("/:id/transfer", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Autenticaci\xF3n requerida" });
    try {
      const user = req.user;
      const repositionId = parseInt(req.params.id);
      if (isNaN(repositionId)) {
        return res.status(400).json({ message: "ID de reposici\xF3n inv\xE1lido" });
      }
      const { toArea, notes, consumoTela } = req.body;
      const reposition = await storage.getRepositionById(repositionId);
      if (!reposition) {
        return res.status(404).json({ message: "Reposici\xF3n no encontrada" });
      }
      if (reposition.status !== "aprobado") {
        return res.status(400).json({ message: "Solo se pueden transferir reposiciones aprobadas" });
      }
      if (reposition.status === "eliminado") {
        return res.status(400).json({ message: "No se puede transferir una reposici\xF3n eliminada" });
      }
      if (user.area === "corte" && consumoTela !== void 0) {
        await storage.updateRepositionConsumo(repositionId, consumoTela);
      }
      const transfer = await storage.createRepositionTransfer({
        repositionId,
        fromArea: user.area,
        toArea,
        notes
      }, user.id);
      res.status(201).json(transfer);
    } catch (error) {
      console.error("Transfer reposition error:", error);
      res.status(400).json({ message: "Error al crear transferencia de reposici\xF3n" });
    }
  });
  router.post("/:id/approval", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Autenticaci\xF3n requerida" });
    try {
      const user = req.user;
      if (user.area !== "operaciones" && user.area !== "admin" && user.area !== "envios") {
        return res.status(403).json({ message: "Solo Operaciones, Administraci\xF3n o Env\xEDos pueden aprobar o rechazar" });
      }
      const repositionId = parseInt(req.params.id);
      if (isNaN(repositionId)) {
        return res.status(400).json({ message: "ID de reposici\xF3n inv\xE1lido" });
      }
      const { action, notes } = req.body;
      const result = await storage.approveReposition(repositionId, action, user.id, notes);
      res.json(result);
    } catch (error) {
      console.error("Approve reposition error:", error);
      res.status(400).json({ message: "Error al procesar la aprobaci\xF3n" });
    }
  });
  router.post("/transfers/:id/process", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Autenticaci\xF3n requerida" });
    try {
      const user = req.user;
      const transferId = parseInt(req.params.id);
      if (isNaN(transferId)) {
        return res.status(400).json({ message: "ID de transferencia inv\xE1lido" });
      }
      const { action } = req.body;
      const result = await storage.processRepositionTransfer(transferId, action, user.id);
      res.json(result);
    } catch (error) {
      console.error("Process transfer error:", error);
      res.status(400).json({ message: "Error al procesar la transferencia" });
    }
  });
  router.get("/:id/history", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Autenticaci\xF3n requerida" });
    try {
      const repositionId = parseInt(req.params.id);
      if (isNaN(repositionId)) {
        return res.status(400).json({ message: "ID de reposici\xF3n inv\xE1lido" });
      }
      const history = await storage.getRepositionHistory(repositionId);
      res.json(history);
    } catch (error) {
      console.error("Get reposition history error:", error);
      res.status(500).json({ message: "Error al obtener historial de la reposici\xF3n" });
    }
  });
  router.get("/:id/tracking", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Autenticaci\xF3n requerida" });
    try {
      const repositionId = parseInt(req.params.id);
      console.log("Tracking request for reposition ID:", repositionId);
      if (isNaN(repositionId)) {
        console.log("Invalid reposition ID:", req.params.id);
        return res.status(400).json({ message: "ID de reposici\xF3n inv\xE1lido" });
      }
      console.log("Getting tracking data for reposition:", repositionId);
      const tracking = await storage.getRepositionTracking(repositionId);
      console.log("Tracking data retrieved:", tracking);
      res.json(tracking);
    } catch (error) {
      console.error("Get reposition tracking error:", error);
      res.status(500).json({ message: "Error al obtener seguimiento de la reposici\xF3n", error: error.message });
    }
  });
  router.delete("/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Autenticaci\xF3n requerida" });
    try {
      const user = req.user;
      console.log("Delete request from user:", user.area, "for reposition:", req.params.id);
      if (user.area !== "admin" && user.area !== "envios") {
        return res.status(403).json({ message: "Solo Admin o Env\xEDos pueden eliminar reposiciones" });
      }
      const repositionId = parseInt(req.params.id);
      if (isNaN(repositionId)) {
        return res.status(400).json({ message: "ID de reposici\xF3n inv\xE1lido" });
      }
      const { reason } = req.body;
      console.log("Delete request data:", { repositionId, reason });
      if (!reason || reason.trim().length === 0) {
        return res.status(400).json({ message: "El motivo de eliminaci\xF3n es obligatorio" });
      }
      if (reason.trim().length < 10) {
        return res.status(400).json({ message: "El motivo debe tener al menos 10 caracteres" });
      }
      await storage.deleteReposition(repositionId, user.id, reason.trim());
      console.log("Reposition deleted successfully:", repositionId);
      res.json({ message: "Reposici\xF3n eliminada correctamente" });
    } catch (error) {
      console.error("Delete reposition error:", error);
      res.status(500).json({ message: "Error al eliminar reposici\xF3n" });
    }
  });
  router.post("/:id/complete", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Autenticaci\xF3n requerida" });
    try {
      const user = req.user;
      const repositionId = parseInt(req.params.id);
      if (isNaN(repositionId)) {
        return res.status(400).json({ message: "ID de reposici\xF3n inv\xE1lido" });
      }
      const { notes } = req.body;
      if (user.area === "admin" || user.area === "envios") {
        await storage.completeReposition(repositionId, user.id, notes);
        res.json({ message: "Reposici\xF3n finalizada correctamente" });
      } else {
        await storage.requestCompletionApproval(repositionId, user.id, notes);
        res.json({ message: "Solicitud de finalizaci\xF3n enviada a administraci\xF3n" });
      }
    } catch (error) {
      console.error("Complete reposition error:", error);
      res.status(500).json({ message: "Error al procesar solicitud de finalizaci\xF3n" });
    }
  });
  router.get("/all", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Autenticaci\xF3n requerida" });
    try {
      const user = req.user;
      if (user.area !== "admin" && user.area !== "envios") {
        return res.status(403).json({ message: "Solo administradores o env\xEDos pueden ver el historial completo" });
      }
      const { includeDeleted } = req.query;
      const repositions2 = await storage.getAllRepositions(includeDeleted === "true");
      res.json(repositions2);
    } catch (error) {
      console.error("Get all repositions error:", error);
      res.status(500).json({ message: "Error al obtener historial de reposiciones" });
    }
  });
  router.get("/notifications", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Autenticaci\xF3n requerida" });
    try {
      const user = req.user;
      const notifications2 = await storage.getUserNotifications(user.id);
      const repositionNotifications = notifications2.filter(
        (n) => !n.read && (n.type?.includes("reposition") || n.type?.includes("completion") || n.type === "new_reposition" || n.type === "reposition_transfer" || n.type === "reposition_approved" || n.type === "reposition_rejected" || n.type === "reposition_completed" || n.type === "reposition_deleted" || n.type === "completion_approval_needed")
      );
      res.json(repositionNotifications);
    } catch (error) {
      console.error("Get reposition notifications error:", error);
      res.status(500).json({ message: "Error al obtener notificaciones de reposici\xF3n" });
    }
  });
  router.get("/pending-count", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Autenticaci\xF3n requerida" });
    try {
      const user = req.user;
      if (user.area !== "admin" && user.area !== "envios" && user.area !== "operaciones") {
        return res.json({ count: 0, repositions: [] });
      }
      const repositions2 = await storage.getAllRepositions(false);
      const pendingRepositions = repositions2.filter((r) => r.status === "pendiente");
      console.log("Pending repositions found:", pendingRepositions.length);
      res.json({
        count: pendingRepositions.length,
        repositions: pendingRepositions
      });
    } catch (error) {
      console.error("Get pending repositions count error:", error);
      res.status(500).json({ message: "Error al obtener conteo de reposiciones pendientes" });
    }
  });
  router.post("/:id/read", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Autenticaci\xF3n requerida" });
    try {
      const notificationId = parseInt(req.params.id);
      if (!notificationId) {
        return res.status(400).json({ message: "ID de notificaci\xF3n inv\xE1lido" });
      }
      await storage.markNotificationRead(notificationId);
      res.json({ message: "Notificaci\xF3n marcada como le\xEDda" });
    } catch (error) {
      console.error("Mark notification read error:", error);
      res.status(500).json({ message: "Error al marcar notificaci\xF3n como le\xEDda" });
    }
  });
  router.get("/transfers/pending", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Autenticaci\xF3n requerida" });
    try {
      const user = req.user;
      const transfers2 = await storage.getPendingRepositionTransfers(user.area);
      res.json(transfers2);
    } catch (error) {
      console.error("Get pending reposition transfers error:", error);
      res.status(500).json({ message: "Error al obtener transferencias pendientes" });
    }
  });
  router.post("/:id/timer/start", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Autenticaci\xF3n requerida" });
    try {
      const user = req.user;
      const repositionId = parseInt(req.params.id);
      const { area } = req.body;
      console.log("Timer start request:", { repositionId, userId: user.id, area, userArea: user.area });
      if (isNaN(repositionId)) {
        return res.status(400).json({ message: "ID de reposici\xF3n inv\xE1lido" });
      }
      if (!area) {
        return res.status(400).json({ message: "\xC1rea requerida" });
      }
      await storage.startRepositionTimer(repositionId, user.id, area);
      res.json({
        message: "Cron\xF3metro iniciado correctamente",
        repositionId,
        area
      });
    } catch (error) {
      console.error("Start timer error:", error);
      const errorMessage = error instanceof Error ? error.message : "Error al iniciar cron\xF3metro";
      res.status(500).json({ message: errorMessage });
    }
  });
  router.post("/:id/timer/stop", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Autenticaci\xF3n requerida" });
    try {
      const user = req.user;
      const repositionId = parseInt(req.params.id);
      if (isNaN(repositionId)) {
        return res.status(400).json({ message: "ID de reposici\xF3n inv\xE1lido" });
      }
      const timer = await storage.stopRepositionTimer(repositionId, user.area, user.id);
      res.json(timer);
    } catch (error) {
      console.error("Stop timer error:", error);
      res.status(400).json({ message: error.message });
    }
  });
  router.post("/:id/timer/manual", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Autenticaci\xF3n requerida" });
    try {
      const user = req.user;
      const repositionId = parseInt(req.params.id);
      if (isNaN(repositionId)) {
        return res.status(400).json({ message: "ID de reposici\xF3n inv\xE1lido" });
      }
      const { startTime, endTime, date } = req.body;
      if (!startTime || !endTime || !date) {
        return res.status(400).json({ message: "Hora de inicio, fin y fecha son requeridas" });
      }
      const timer = await storage.setManualRepositionTime(repositionId, user.area, user.id, startTime, endTime, date);
      res.json(timer);
    } catch (error) {
      console.error("Set manual time error:", error);
      res.status(400).json({ message: error.message });
    }
  });
  router.get("/:id/timer", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Autenticaci\xF3n requerida" });
    try {
      const user = req.user;
      const repositionId = parseInt(req.params.id);
      if (isNaN(repositionId)) {
        return res.status(400).json({ message: "ID de reposici\xF3n inv\xE1lido" });
      }
      const timer = await storage.getRepositionTimer(repositionId, user.area);
      res.json(timer);
    } catch (error) {
      console.error("Get timer error:", error);
      res.status(500).json({ message: "Error al obtener el timer" });
    }
  });
  router.post("/:id/documents", authenticateToken, upload.array("documents", 5), handleMulterError, async (req, res) => {
    try {
      const user = req.user;
      const repositionId = parseInt(req.params.id);
      const files = req.files;
      if (isNaN(repositionId)) {
        return res.status(400).json({ message: "ID de reposici\xF3n inv\xE1lido" });
      }
      if (!files || files.length === 0) {
        return res.status(400).json({ message: "No se han seleccionado archivos" });
      }
      const reposition = await storage.getRepositionById(repositionId);
      if (!reposition) {
        return res.status(404).json({ message: "Reposici\xF3n no encontrada" });
      }
      const savedDocuments = [];
      for (const file of files) {
        const document = await storage.saveRepositionDocument({
          repositionId,
          filename: file.filename,
          originalName: file.originalname,
          size: file.size,
          path: file.path,
          uploadedBy: user.id
        });
        savedDocuments.push(document);
      }
      res.json({
        message: `${savedDocuments.length} documento(s) a\xF1adido(s) correctamente`,
        documents: savedDocuments
      });
    } catch (error) {
      console.error("Upload documents error:", error);
      res.status(500).json({ message: "Error al subir documentos" });
    }
  });
  router.get("/:id/documents", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Autenticaci\xF3n requerida" });
    try {
      const repositionId = parseInt(req.params.id);
      if (isNaN(repositionId)) {
        return res.status(400).json({ message: "ID de reposici\xF3n inv\xE1lido" });
      }
      const documents2 = await storage.getRepositionDocuments(repositionId);
      res.json(documents2);
    } catch (error) {
      console.error("Get documents error:", error);
      res.status(500).json({ message: "Error al obtener documentos" });
    }
  });
  app2.use("/api/repositions", router);
}
function registerHistoryRoutes(app2) {
  const router = Router();
  router.post("/export", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Autenticaci\xF3n requerida" });
    try {
      const { orders: orders2 } = req.body;
      const buffer = await storage.exportHistoryToExcel(orders2);
      res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
      res.setHeader("Content-Disposition", `attachment; filename="historial-pedidos-${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.xlsx"`);
      res.send(buffer);
    } catch (error) {
      console.error("Export history error:", error);
      res.status(500).json({ message: "Error al exportar historial" });
    }
  });
  app2.use("/api/history", router);
}
function registerReportsRoutes(app2) {
  const router = Router();
  router.get("/data", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Autenticaci\xF3n requerida" });
    try {
      const { type, startDate, endDate, area, status, urgency } = req.query;
      const data = await storage.getReportData(
        type,
        startDate,
        endDate,
        { area, status, urgency }
      );
      res.json(data);
    } catch (error) {
      console.error("Get report data error:", error);
      res.status(500).json({ message: "Error al obtener datos del reporte" });
    }
  });
  router.get("/generate", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Autenticaci\xF3n requerida" });
    try {
      const { type, format, startDate, endDate, area, status, urgency } = req.query;
      const buffer = await storage.generateReport(
        type,
        format,
        startDate,
        endDate,
        { area, status, urgency }
      );
      const contentType = format === "excel" ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" : "application/pdf";
      const filename = `reporte-${type}-${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.${format === "excel" ? "xlsx" : "pdf"}`;
      res.setHeader("Content-Type", contentType);
      res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
      res.send(buffer);
    } catch (error) {
      console.error("Generate report error:", error);
      res.status(500).json({ message: "Error al generar reporte" });
    }
  });
  router.post("/onedrive", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Autenticaci\xF3n requerida" });
    try {
      const { type, startDate, endDate, area, status, urgency } = req.query;
      const result = await storage.saveReportToOneDrive(
        type,
        startDate,
        endDate,
        { area, status, urgency }
      );
      res.json(result);
    } catch (error) {
      console.error("Save to OneDrive error:", error);
      res.status(500).json({ message: "Error al guardar en OneDrive" });
    }
  });
  app2.use("/api/reports", router);
}
function registerAgendaRoutes(app2) {
  const router = Router();
  router.get("/", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Autenticaci\xF3n requerida" });
    try {
      const user = req.user;
      const events = await storage.getAgendaEvents(user);
      res.json(events);
    } catch (error) {
      console.error("Get agenda events error:", error);
      res.status(500).json({ message: "Error al obtener tareas de la agenda" });
    }
  });
  router.post("/", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Autenticaci\xF3n requerida" });
    try {
      const user = req.user;
      if (user.area !== "admin" && user.area !== "envios") {
        return res.status(403).json({ message: "Solo Admin y Env\xEDos pueden crear tareas" });
      }
      const { assignedToArea, title, description, date, time, priority, status } = req.body;
      const event = await storage.createAgendaEvent({
        createdBy: user.id,
        assignedToArea,
        title,
        description,
        date,
        time,
        priority,
        status
      });
      res.status(201).json(event);
    } catch (error) {
      console.error("Create agenda event error:", error);
      res.status(400).json({ message: "Error al crear tarea de la agenda" });
    }
  });
  router.put("/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Autenticaci\xF3n requerida" });
    try {
      const user = req.user;
      const eventId = parseInt(req.params.id);
      if (isNaN(eventId)) {
        return res.status(400).json({ message: "ID de tarea inv\xE1lido" });
      }
      const { assignedToArea, title, description, date, time, priority, status } = req.body;
      if (user.area !== "admin" && user.area !== "envios") {
        const event = await storage.updateTaskStatus(eventId, user.area, status);
        res.json(event);
      } else {
        const event = await storage.updateAgendaEvent(eventId, {
          assignedToArea,
          title,
          description,
          date,
          time,
          priority,
          status
        });
        res.json(event);
      }
    } catch (error) {
      console.error("Update agenda event error:", error);
      res.status(500).json({ message: "Error al actualizar tarea de la agenda" });
    }
  });
  router.delete("/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Autenticaci\xF3n requerida" });
    try {
      const user = req.user;
      if (user.area !== "admin" && user.area !== "envios") {
        return res.status(403).json({ message: "Solo Admin y Env\xEDos pueden eliminar tareas" });
      }
      const eventId = parseInt(req.params.id);
      if (isNaN(eventId)) {
        return res.status(400).json({ message: "ID de tarea inv\xE1lido" });
      }
      await storage.deleteAgendaEvent(eventId);
      res.json({ message: "Tarea eliminada correctamente" });
    } catch (error) {
      console.error("Delete agenda event error:", error);
      res.status(500).json({ message: "Error al eliminar tarea" });
    }
  });
  app2.use("/api/agenda", router);
}
function registerAlmacenRoutes(app2) {
  const router = Router();
  router.use((req, res, next) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Autenticaci\xF3n requerida" });
    const user = req.user;
    if (user.area !== "almacen") return res.status(403).json({ message: "Acceso restringido al \xE1rea de almac\xE9n" });
    next();
  });
  router.get("/repositions", async (req, res) => {
    try {
      const repositions2 = await storage.getAllRepositionsForAlmacen();
      res.json(repositions2);
    } catch (error) {
      console.error("Get repositions for almacen error:", error);
      res.status(500).json({ message: "Error al obtener reposiciones" });
    }
  });
  router.post("/repositions/:id/pause", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Autenticaci\xF3n requerida" });
    try {
      const user = req.user;
      const repositionId = parseInt(req.params.id);
      const { reason } = req.body;
      if (isNaN(repositionId)) {
        return res.status(400).json({ message: "ID de reposici\xF3n inv\xE1lido" });
      }
      if (!reason || reason.trim().length === 0) {
        return res.status(400).json({ message: "El motivo de pausa es obligatorio" });
      }
      await storage.pauseReposition(repositionId, reason.trim(), user.id);
      if (app2.wss) {
        const notification = {
          type: "notification",
          data: {
            type: "reposition_paused",
            message: `Reposici\xF3n pausada por almac\xE9n`,
            repositionId
          }
        };
        app2.wss.clients.forEach((client) => {
          if (client.readyState === 1) {
            client.send(JSON.stringify(notification));
          }
        });
      }
      res.json({ message: "Reposici\xF3n pausada correctamente" });
    } catch (error) {
      console.error("Pause reposition error:", error);
      res.status(500).json({ message: "Error al pausar reposici\xF3n" });
    }
  });
  router.post("/repositions/:id/resume", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Autenticaci\xF3n requerida" });
    try {
      const user = req.user;
      const repositionId = parseInt(req.params.id);
      if (isNaN(repositionId)) {
        return res.status(400).json({ message: "ID de reposici\xF3n inv\xE1lido" });
      }
      await storage.resumeReposition(repositionId, user.id);
      if (app2.wss) {
        const notification = {
          type: "notification",
          data: {
            type: "reposition_resumed",
            message: `Reposici\xF3n reanudada por almac\xE9n`,
            repositionId
          }
        };
        app2.wss.clients.forEach((client) => {
          if (client.readyState === 1) {
            client.send(JSON.stringify(notification));
          }
        });
      }
      res.json({ message: "Reposici\xF3n reanudada correctamente" });
    } catch (error) {
      console.error("Resume reposition error:", error);
      res.status(500).json({ message: "Error al reanudar reposici\xF3n" });
    }
  });
  app2.use("/api/almacen", router);
  app2.get("/api/files/:filename", authenticateToken, async (req, res) => {
    try {
      const { filename } = req.params;
      const filePath = path2.join(process.cwd(), "uploads", filename);
      if (!fs2.existsSync(filePath)) {
        return res.status(404).json({ error: "Archivo no encontrado" });
      }
      res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
      res.download(filePath, (err) => {
        if (err) {
          console.error("Error sending file:", err);
          if (!res.headersSent) {
            res.status(500).json({ error: "Error al descargar el archivo" });
          }
        }
      });
    } catch (error) {
      console.error("Error downloading file:", error);
      res.status(500).json({ error: "Error al descargar el archivo" });
    }
  });
}

// server/middlewares/camelCaseMiddleware.ts
import camelcaseKeys from "camelcase-keys";
function camelCaseResponseMiddleware(req, res, next) {
  const oldJson = res.json;
  res.json = function(data) {
    const camelCasedData = camelcaseKeys(data, { deep: true });
    return oldJson.call(this, camelCasedData);
  };
  next();
}

// server/index.ts
import { WebSocketServer as WebSocketServer2 } from "ws";
var app = express2();
app.use(express2.json());
app.use(camelCaseResponseMiddleware);
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path5 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path5.startsWith("/api")) {
      let logLine = `${req.method} ${path5} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      console.log(`${(/* @__PURE__ */ new Date()).toLocaleTimeString()} [express] ${logLine}`);
    }
  });
  next();
});
if (!global.serverStarted) {
  global.serverStarted = true;
  (async () => {
    try {
      const server = await registerRoutes(app);
      if (!global.wss) {
        global.wss = new WebSocketServer2({ noServer: true });
        global.wss.on("connection", (ws) => {
          console.log("Nueva conexi\xF3n WebSocket establecida");
          ws.on("message", (message) => {
            try {
              const data = JSON.parse(message.toString());
              console.log("Mensaje WebSocket recibido:", data);
            } catch (error) {
              console.error("Error al procesar mensaje WebSocket:", error);
            }
          });
          ws.on("close", () => {
            console.log("Conexi\xF3n WebSocket cerrada");
          });
          ws.on("error", (error) => {
            console.error("Error en WebSocket:", error);
          });
        });
      }
      if (!global.upgradeListenerAdded) {
        server.removeAllListeners("upgrade");
        server.on("upgrade", (req, socket, head) => {
          if (req.url === "/ws") {
            if (!socket.destroyed) {
              global.wss.handleUpgrade(req, socket, head, (ws) => {
                global.wss.emit("connection", ws, req);
              });
            }
          } else {
            socket.destroy();
          }
        });
        global.upgradeListenerAdded = true;
      }
      if (process.env.NODE_ENV === "development") {
        const { setupVite: setupVite2 } = await init_vite().then(() => vite_exports);
        await setupVite2(app, server);
      } else {
        const { serveStatic: serveStatic2 } = await init_vite().then(() => vite_exports);
        serveStatic2(app);
      }
      const port = parseInt(process.env.PORT || "5000");
      server.listen(port, "0.0.0.0", () => {
        console.log(`${(/* @__PURE__ */ new Date()).toLocaleTimeString()} [express] Servidor activo en http://0.0.0.0:${port}`);
        console.log(`Environment: ${process.env.NODE_ENV}`);
        console.log(`Database URL configured: ${process.env.DATABASE_URL ? "Yes" : "No"}`);
        console.log(`Port: ${port}`);
      });
      server.on("error", (err) => {
        console.error("Server error:", err);
      });
    } catch (error) {
      console.error("Error starting server:", error);
      process.exit(1);
    }
  })();
} else {
  console.log("Servidor ya est\xE1 iniciado \u2014 No se inicia otra vez");
}
