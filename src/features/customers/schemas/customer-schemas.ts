import { z } from "zod";

export const customerSchema = z.object({
    name: z.string().min(2, { message: 'El nombre del cliente es necesario' }),
    lastName: z.string().min(2, { message: 'El apellido del cliente es necesario' }),
    countryCode: z.string().min(1, { message: 'El código del país es necesario' }),
    phone: z.string().min(10, { message: 'El número de teléfono es necesario' }),
    email: z.email().optional()
});

export type CustomerInput = z.infer<typeof customerSchema>;