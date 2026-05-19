import { z } from 'zod';

/**
 * Zod schema for validating login form data.
 *
 * Used on both the client (react-hook-form resolver) and the server
 * (inside the `signIn` action) to ensure data integrity at every layer.
 *
 * ### Fields
 * | Field    | Type   | Rules                        |
 * |----------|--------|------------------------------|
 * | email    | string | Valid email format           |
 * | password | string | 8–72 chars (bcrypt limit)    |
 */
export const logInSchema = z.object({
    email: z.email('Email inválido').describe('Users email'),
    password: z
        .string()
        .min(8, 'La contraseña debe tener al menos 8 caracteres')
        .max(72, 'La contraseña no puede exceder 72 caracteres')
        .describe('Users password'),
});

/**
 * TypeScript type derived from {@link logInSchema}.
 * Prefer this over defining the type manually to keep schema and type in sync.
 */
export type LogInType = z.infer<typeof logInSchema>;