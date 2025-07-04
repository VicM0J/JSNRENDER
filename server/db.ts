import pg from "pg";
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from "@shared/schema";

const { Pool } = pg;

// URL de la base de datos principal
const databaseUrl = process.env.DATABASE_URL || 
  "postgresql://victor:6EPaBaXniEn8x1rAy6YnZzsSuRO7ueKy@dpg-d1k134vdiees73cljhb0-a.virginia-postgres.render.com/jasanaordenes";

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