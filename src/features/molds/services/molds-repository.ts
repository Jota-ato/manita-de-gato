import { db } from "@/db";
import { FullMold, NewMold } from "../types/molds.types";
import { molds } from "@/db/schema/molds";
import { count, eq } from "drizzle-orm";

export interface IMoldsRepository {
  getById(id: string): Promise<FullMold | null>;
  insert(data: NewMold): Promise<void>;
  update(id: string, data: Partial<NewMold>): Promise<void>;
  getAll(limit: number, page: number): Promise<FullMold[]>;
  getCount(): Promise<number>;
}

class MoldsRepository implements IMoldsRepository {
  async getById(id: string): Promise<FullMold | null> {
    return (
      (await db.query.molds.findFirst({
        where: eq(molds.id, id),
        with: {
          customer: true,
        },
      })) || null
    );
  }

  async insert(data: NewMold): Promise<void> {
    await db.insert(molds).values(data);
  }

  async update(id: string, data: Partial<NewMold>): Promise<void> {
    await db.update(molds).set(data).where(eq(molds.id, id));
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
