import {
  index,
  integer,
  numeric,
  pgEnum,
  pgTable,
  smallint,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { customers } from "./customers";

export const orderStatusEnum = pgEnum("order_status", [
  "reserved",
  "in_production",
  "sent",
  "delivered",
]);

export const molds = pgTable(
  "molds",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    customerId: uuid("customer_id")
      .notNull()
      .references(() => customers.id, { onDelete: "cascade" }),

    design: varchar("design", { length: 150 }).notNull(),
    shape: varchar("shape", { length: 100 }).notNull(),
    referenceImageUrl: text("reference_image_url"),

    deliveryDate: timestamp("delivery_date", { withTimezone: true }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),

    totalPrice: numeric("total_price", { precision: 10, scale: 2 }).notNull(),
    amountPaid: numeric("amount_paid", { precision: 10, scale: 2 })
      .notNull()
      .default("0.00"),

    leftHandMeasures: smallint("left_hand_measures").array().notNull(),
    rightHandMeasures: smallint("right_hand_measures").array().notNull(),

    note: text("note"),

    status: orderStatusEnum("status").notNull().default("reserved"),
  },
  (table) => [
    index("idx_molds_customer_id").on(table.customerId),
    index("idx_molds_status").on(table.status),
  ],
);

export type Mold = typeof molds.$inferSelect;
export type NewMold = typeof molds.$inferInsert;
