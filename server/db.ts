import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { Pool } from 'pg';
import * as schema from '@shared/schema';

// Configuración de la base de datos para PostgreSQL en Render
const connectionString = process.env.DATABASE_URL || 
  'postgresql://victor:6EPaBaXniEn8x1rAy6YnZzsSuRO7ueKy@dpg-d1k134vdiees73cljhb0-a.virginia-postgres.render.com/jasanaordenes_izc9';

// Cliente para Drizzle
const client = postgres(connectionString, {
  ssl: process.env.NODE_ENV === 'production' ? 'require' : false,
  max: 1,
  connect_timeout: 10
});

export const db = drizzle(client, { schema });

// Pool para sesiones (express-session requiere pg.Pool)
export const pool = new Pool({
  connectionString,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});