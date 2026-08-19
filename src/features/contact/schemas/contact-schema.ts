import { z } from "zod"

export const contactSchema = z.object({
    name: z.string().min(1, { message: "El nombre es necesario" }),
    lastName: z.string().min(1, { message: "El apellido es necesario" }),
    email: z.email({ message: "Dirección de correo electrónico inválida" }),
    message: z.string().min(1, { message: "El mensaje es necesario" }),
})

export type ContactInput = z.infer<typeof contactSchema>