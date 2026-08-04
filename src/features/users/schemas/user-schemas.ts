import { roles } from "@/db/schema"
import { z } from "zod"

export const roleSchema = z.enum(roles.enumValues, { error: "Rol inválido" })

export const userSchema = z.object({
    name: z.string({ error: "El nombre es obligatorio" }).min(2, { error: "El nombre debe tener al menos 2 caracteres" }),
    email: z.email({ error: "Correo electrónico inválido" }),
    role: roleSchema,
    image: z.url({ error: "URL de imagen inválida" }).optional()
})

export type UserInput = z.infer<typeof userSchema>