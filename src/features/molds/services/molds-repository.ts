import { db } from "@/db";
import { NewMold } from "../types/molds.types";
import { molds } from "@/db/schema/molds";

export interface IMoldsRepository {
    insert(data: NewMold): Promise<void> 
}

class MoldsRepository implements IMoldsRepository {
    async insert(data: NewMold): Promise<void> {
        await db.insert(molds).values(data)
    }
}

export const moldsRepository = new MoldsRepository();