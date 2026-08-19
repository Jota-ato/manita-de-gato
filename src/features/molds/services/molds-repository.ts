import { db } from "@/db";
import { FullMold, NewMold } from "../types/molds.types";
import { molds } from "@/db/schema/molds";
import { count } from "drizzle-orm";

export interface IMoldsRepository {
  insert(data: NewMold): Promise<void>;
  getAll(limit: number, page: number): Promise<FullMold[]>;
  getCount(): Promise<number>;
}

class MoldsRepository implements IMoldsRepository {
  async insert(data: NewMold): Promise<void> {
    await db.insert(molds).values(data);
  }

  async getAll(limit: number, page: number): Promise<FullMold[]> {
    const offset = (page - 1) * limit;
    return await db.query.molds.findMany({
      with: {
        customer: true,
      },
      limit,
      offset,
      orderBy: (molds, { desc }) => desc(molds.createdAt),
    });
  }

  async getCount(): Promise<number> {
    const [result] = await db.select({ count: count() }).from(molds);
    return result.count;
  }
}

export const moldsRepository = new MoldsRepository();
