import { z } from "zod";

export const customerSchema = z.object({
    name: z.string().min(2, { message: 'Client name is necessary' }),
    lastName: z.string().min(2, { message: 'Client last name is necessary' }),
    countryCode: z.string().min(1, { message: 'Country code is necessary' }),
    phone: z.string().min(10, { message: 'Phone number is necessary' }),
    email: z.email().optional()
});

export type CustomerInput = z.infer<typeof customerSchema>;