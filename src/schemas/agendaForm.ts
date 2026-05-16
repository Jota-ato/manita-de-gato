import { z } from 'zod';

export const AgendaFormSchema = z.object({
    name: z.string().min(2, "El nombre es muy corto").describe('Client name'),
    serviceId: z.string().min(1, "Debes seleccionar un servicio").describe('Service ID, from 1 to n in DB'),
    phone: z.string().regex(/^\d{10}$/, "El teléfono debe tener 10 dígitos").describe('10 digits format in Mexico, does not include starting code'),
    secondary_phone: z
        .string()
        .regex(/^\d{10}$/, "El teléfono debe tener 10 dígitos")
        .optional()
        .or(z.literal("")),
});

export type AgendaFormData = z.infer<typeof AgendaFormSchema>;