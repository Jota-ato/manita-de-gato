'use server';
import { createClient } from '@/lib/supabase/server';
import { logInSchema } from './schemas';

/**
 * Server Action that authenticates a user against Supabase Auth.
 *
 * Intentionally accepts `unknown` as input — validation happens
 * inside via Zod before any data reaches Supabase, so it is safe
 * to call from the client without trusting the shape of the payload.
 *
 * The error message on failed login is intentionally generic
 * ("Correo o contraseña incorrectos") to avoid leaking whether
 * the email exists in the system (user enumeration attack).
 *
 * ### Flow
 * 1. Validate `data` with {@link logInSchema}
 * 2. Call `supabase.auth.signInWithPassword`
 * 3. Return `{ success: true }` or `{ error: string }`
 *
 * ### Responses
 * | Case                        | Return value                          |
 * |-----------------------------|---------------------------------------|
 * | Invalid shape               | `{ error: 'Datos inválidos' }`        |
 * | Wrong credentials           | `{ error: 'Correo o contraseña...' }` |
 * | Success                     | `{ success: true }`                   |
 *
 * @param data - Unknown payload from the login form.
 * @returns An object indicating success or describing the error.
 */
export async function signIn(data: unknown) {
    const parsed = logInSchema.safeParse(data);
    if (!parsed.success) return { error: 'Datos inválidos' };

    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword({
        email: parsed.data.email,
        password: parsed.data.password,
    });

    if (error) return { error: 'Correo o contraseña incorrectos' };

    return { success: true };
}