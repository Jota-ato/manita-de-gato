import { pgTable, uuid, integer, timestamp, varchar } from "drizzle-orm/pg-core";

export const businessControls = pgTable("business_controls", {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    startHour: timestamp("start_hour").notNull(),
    slotDuration: integer("slot_duration").notNull(),
    slotsPerDay: integer("slots_per_day").notNull(),
    bannerImage: varchar("banner_image", { length: 130 }),
})

export type BusinessControls = typeof businessControls.$inferSelect