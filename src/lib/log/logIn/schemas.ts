import { z } from 'zod';

export const logInSchema = z.object({
    email: z.email().describe('Users email'),
    password: z.string()
})

export type LogInType = z.infer<typeof logInSchema>;