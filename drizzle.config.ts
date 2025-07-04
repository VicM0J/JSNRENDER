import { defineConfig } from "drizzle-kit";

const DATABASE_URL = process.env.DATABASE_URL || "postgresql://victor:6EPaBaXniEn8x1rAy6YnZzsSuRO7ueKy@dpg-d1k134vdiees73cljhb0-a.virginia-postgres.render.com/jasanaordenes_izc9";

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL, ensure the database is provisioned");
}

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: DATABASE_URL,
  },
});
