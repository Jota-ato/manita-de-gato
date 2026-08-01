import { z } from "zod"

export const baseUserSchema = z.object({
    countryCode: z.string().min(1, "El código de país es obligatorio").max(5, "El código de país debe tener como máximo 5 caracteres"),
    phone: z.string().min(10, "El número de teléfono debe tener al menos 10 dígitos").max(15, "El número de teléfono debe tener como máximo 15 dígitos"),
    name: z.string().min(1, "El nombre es obligatorio").max(100, "El nombre debe tener como máximo 100 caracteres"),
    lastName: z.string().min(1, "El apellido es obligatorio").max(100, "El apellido debe tener como máximo 100 caracteres"),
    email: z.email({ message: "Correo electrónico inválido" }).optional()
})

export const registerUserSchema = baseUserSchema.pick({
    countryCode: true,
    phone: true
})

export const notRegisterUserSchema = baseUserSchema.pick({
    name: true,
    lastName: true,
    phone: true,
    countryCode: true,
    email: true
})

export const userSchema = z.discriminatedUnion("isFirstTime", [
    notRegisterUserSchema.extend({ isFirstTime: z.literal(true) }),
    registerUserSchema.extend({ isFirstTime: z.literal(false) })
])

export type RegisterUserInput = z.infer<typeof registerUserSchema>
export type NotRegisterUserInput = z.infer<typeof notRegisterUserSchema>
export type UserInput = z.infer<typeof userSchema>
