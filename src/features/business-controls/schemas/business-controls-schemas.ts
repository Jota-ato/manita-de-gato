import { z } from "zod";

export const businessControlsSchema = z.object({
  startHour: z.string({ error: "La hora de inicio es necesaria" }),
  slotsPerDay: z
    .number()
    .int()
    .min(1, "La cantidad de slots por día debe ser al menos 1"),
  slotDuration: z
    .number()
    .int()
    .min(1, "La duración del slot debe ser al menos 1 minuto"),
  bannerImage: z
    .url("La imagen del banner debe ser una URL válida")
    .optional()
    .nullable(),
});

export type BusinessControlsInput = z.infer<typeof businessControlsSchema>;
