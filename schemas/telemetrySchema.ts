import { integer, pgTable, varchar, timestamp, real } from "drizzle-orm/pg-core";

export const telemetryTable = pgTable("telemetry", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  humidity: real().notNull(),
  temperature: real().notNull(),
  timestamp: timestamp().notNull().defaultNow(),
});