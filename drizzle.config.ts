import { defineConfig } from "drizzle-kit";

const DATABASE_URL = process.env.DATABASE_URL || "postgresql://victor:ITt1d5ZDTRegrHN6h0BltBplWsug5WPS@dpg-d1k4gvvdiees73e2idmg-a.virginia-postgres.render.com/jasanaordenes_z9o2";

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
