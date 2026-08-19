"use server";

import { adminAction } from "@/shared/lib/actions";
import { MoldInput, MoldSchema } from "../schemas/molds-schemas";
import { AppError } from "@/shared/lib/errors";
import { moldsService } from "../services/molds-service";

export const createMoldAction = adminAction(async (data: MoldInput) => {
  const zodResponse = MoldSchema.safeParse(data);

  if (!zodResponse.success) {
    throw new AppError("Invalid data");
  }

  await moldsService.createMold(data);

  return `Molde creado correctamente`;
});

export const updateMoldAction = adminAction(
  async ({ id, data }: { id: string; data: MoldInput }) => {
    const zodResponse = MoldSchema.safeParse(data);

    if (!zodResponse.success) {
      throw new AppError("Invalid data");
    }

    await moldsService.updateMold(id, data);

    return `Molde actualizado correctamente`;
  },
);
