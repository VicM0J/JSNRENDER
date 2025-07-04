import pg from "pg";
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from "@shared/schema";

const { Pool } = pg;

// URL de la base de datos principal
const databaseUrl = process.env.DATABASE_URL || 
  "postgresql://victor:ITt1d5ZDTRegrHN6h0BltBplWsug5WPS@dpg-d1k4gvvdiees73e2idmg-a/jasanaordenes_z9o2";

if (!databaseUrl) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

export const pool = new Pool({ 
  connectionString: databaseUrl,
  ssl: databaseUrl.includes('postgres://') && databaseUrl.includes('render.com') ? { rejectUnauthorized: false } : false,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

export const db = drizzle(pool, { schema });