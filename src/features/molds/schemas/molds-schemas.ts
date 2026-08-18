import { orderStatusEnum } from "@/db/schema/molds";
import { customerSchema } from "@/features/customers/schemas/customer-schemas";
import { is } from "drizzle-orm";
import z from "zod";

export const baseMoldSchema = z.object({
  design: z.string().min(1, { error: "El diseño es requerido" }),
  shape: z.string().min(1, { error: "La forma es requerida" }),
  referenceImageUrl: z
    .url({ error: "La URL de la imagen de referencia debe ser válida" })
    .optional()
    .nullable(),
  deliveryDate: z.date({ error: "La fecha de entrega es requerida" }),
  totalPrice: z.number({ error: "El precio total es requerido" }),
  amountPaid: z.number().optional(),
  leftHandMeasures: z.array(z.number().int().nonnegative(), {
    error:
      "Las medidas de la mano izquierda deben ser números enteros no negativos",
  }),
  rightHandMeasures: z.array(z.number().int().nonnegative(), {
    error:
      "Las medidas de la mano derecha deben ser números enteros no negativos",
  }),
  note: z.string().optional().nullable(),
  status: z.enum(orderStatusEnum.enumValues),
  clientCountryCode: z.string(),
  clientPhone: z.string().min(10, {
    message: "El número de teléfono debe tener al menos 10 dígitos",
  }),
});

export const MoldSchema = z.discriminatedUnion("isRegisterClient", [
  baseMoldSchema.extend({
    isRegisterClient: z.literal(true),
    customerId: z.string({ error: "El ID del cliente es requerido" }),
  }),
  baseMoldSchema
    .extend({
      isRegisterClient: z.literal(false),
    })
    .extend(customerSchema.shape),
]);

export type MoldInput = z.infer<typeof MoldSchema>;
