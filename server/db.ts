import pg from "pg";
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from "@shared/schema";

const { Pool } = pg;

// La base de datos en Render se llama jasanaordenes_z9o2
const databaseUrl = process.env.DATABASE_URL || 
  "postgresql://victor:ITt1d5ZDTRegrHN6h0BltBplWsug5WPS@dpg-d1k4gvvdiees73e2idmg-a.virginia-postgres.render.com/jasanaordenes_z9o2";

if (!databaseUrl) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

export const pool = new Pool({ 
  connectionString: databaseUrl,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

export const db = drizzle(pool, { schema });