import { orderStatusEnum } from "@/db/schema/molds";
import { customerSchema } from "@/features/customers/schemas/customer-schemas";
import z from "zod";

const handMeasuresSchema = z
  .array(
    z
      .number({ error: "Ingresa la medida en mm" })
      .int({ error: "Usa números enteros (mm)" })
      .min(5, { error: "Mínimo 5 mm" })
      .max(25, { error: "Máximo 25 mm" }),
  )
  .length(5, { error: "Debes capturar las 5 medidas" });

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
  leftHandMeasures: handMeasuresSchema,
  rightHandMeasures: handMeasuresSchema,
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
