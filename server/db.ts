import pg from "pg";
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from "@shared/schema";

const { Pool } = pg;

// URL de la base de datos principal
let databaseUrl = process.env.DATABASE_URL || 
  "postgresql://victor:ITt1d5ZDTRegrHN6h0BltBplWsug5WPS@dpg-d1k4gvvdiees73e2idmg-a/jasanaordenes_z9o2";

// Usar el connection pooler de Neon para mejor rendimiento
if (databaseUrl.includes('dpg-') && databaseUrl.includes('.com/')) {
  databaseUrl = databaseUrl.replace('.com/', '-pooler.us-east-2.postgres.render.com/');
}

if (!databaseUrl) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

export const pool = new Pool({ 
  connectionString: databaseUrl,
  ssl: databaseUrl.includes('postgres://') && databaseUrl.includes('render.com') ? { rejectUnauthorized: false } : false,
  max: 10,
  min: 2,
  idleTimeoutMillis: 60000,
  connectionTimeoutMillis: 10000,
  acquireTimeoutMillis: 10000,
  allowExitOnIdle: true,
});

// Manejo de errores del pool
pool.on('error', (err) => {
  console.error('Error en el pool de conexiones PostgreSQL:', err);
});

pool.on('connect', () => {
  console.log('Nueva conexión establecida a PostgreSQL');
});

// Función para probar la conexión
export async function testConnection() {
  try {
    const client = await pool.connect();
    await client.query('SELECT 1');
    client.release();
    console.log('Conexión a la base de datos: ✓ Exitosa');
    return true;
  } catch (error) {
    console.error('Error de conexión a la base de datos:', error);
    return false;
  }
}

export const db = drizzle(pool, { schema });