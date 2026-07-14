import { z } from "zod"

const baseSchema = z.object({
    name: z.string().min(2, { error: "Name must be at least 2 characters long." }),
    email: z.email({ error: "Please enter a valid email address." }),
    password: z.string().min(8, { error: "Password must be at least 8 characters long." }),
})

export const signInSchema = baseSchema.pick({
    email: true,
    password: true,
})

export type SignInInput = z.infer<typeof signInSchema>

export const signUpSchema = baseSchema.pick({
    name: true,
    email: true,
    password: true,
})
    .extend({
        confirmPassword: z.string().min(8, { error: "Confirm Password must be at least 8 characters long." }),
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match.",
        path: ["confirmPassword"]
    })

export const requestPasswordResetSchema = baseSchema.pick({
    email: true
})

export const resetPasswordSchema = baseSchema.pick({
    password: true,
})
    .extend({
        confirmPassword: z.string().min(8, { error: "Confirm Password must be at least 8 characters long." }),
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match.",
        path: ["confirmPassword"]
    })

export type SignUpInput = z.infer<typeof signUpSchema>
export type RequestPasswordResetInput = z.infer<typeof requestPasswordResetSchema>
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>