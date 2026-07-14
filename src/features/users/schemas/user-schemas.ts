import { roles } from "@/db/schema"
import { z } from "zod"

export const roleSchema = z.enum(roles.enumValues, { error: "Invalid role" })

export const userSchema = z.object({
    name: z.string({ error: "Name is necesary" }).min(2, { error: "Name must be at least 2 characters" }),
    email: z.email({ error: "Invalid email" }),
    role: roleSchema,
    image: z.url({ error: "Invalid image URL" }).optional()
})

export type UserInput = z.infer<typeof userSchema>