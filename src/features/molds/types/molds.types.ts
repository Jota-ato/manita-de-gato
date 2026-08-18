import { Customer } from "@/db/schema";
import { molds, orderStatusEnum } from "@/db/schema/molds";

export type MoldStatus = (typeof orderStatusEnum.enumValues)[number];
export type Mold = typeof molds.$inferSelect;
export type NewMold = typeof molds.$inferInsert;

export type FullMold = Mold & {
  customer: Customer;
};
