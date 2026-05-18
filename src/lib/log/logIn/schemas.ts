import { z } from 'zod';

export const logInSchema = z.object({
    email: z.email('Email inválido').describe('Users email'),
    password: z
        .string()
        .min(8, 'La contraseña debe tener al menos 8 caracteres')
        .max(72, 'La contraseña no puede exceder 72 caracteres') 
        .describe('Users password'),
});

export type LogInType = z.infer<typeof logInSchema>;