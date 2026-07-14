import { db } from "@/db";
import { businessControls, BusinessControls } from "@/db/schema";
import { eq } from "drizzle-orm";
import { BusinessControlsUpdate } from "../types/business-controls.types";

export interface IBusinessControlsRepository {
    get(): Promise<BusinessControls | null>
    update(data: BusinessControlsUpdate, id: string): Promise<void>
}

class BusinessControlsRepository implements IBusinessControlsRepository {
    async get(): Promise<BusinessControls | null> {
        return await db
            .query
            .businessControls
            .findFirst() || null
    }

    async update(data: BusinessControlsUpdate, id: string): Promise<void> {
        await db
            .update(businessControls)
            .set(data)
            .where(eq(businessControls.id, id))
    }
}

export const businessControlsRepository = new BusinessControlsRepository()