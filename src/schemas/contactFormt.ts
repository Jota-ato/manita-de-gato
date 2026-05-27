import { z } from "zod";

export const contactFormSchema = z.object({
    name: z.string().min(2, 'Nombre muy corto').describe('Client name'),
    last_name: z.string().min(2, 'Apellido muy corto').describe('Client last name'),
    phone: z.string().regex(/^\d{10}$/, "El teléfono debe tener 10 dígitos").describe('10 digits format in Mexico, does not include starting code'),
    email: z.email(),
    reason: z.string().min(20, 'Motivo muy corto, da un poco más de detalle').describe('Reason for the contact'),
})

export type contactFormType = z.infer<typeof contactFormSchema>;