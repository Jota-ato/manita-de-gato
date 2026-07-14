import { BusinessControls } from "@/db/schema";

export type BusinessControlsUpdate = Partial<Omit<BusinessControls, "id">>