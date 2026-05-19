'use server'
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function signOut() {
    const supabase = await createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
        console.error(error);
        return { error: 'Ocurrió un problema al cerrar sesión. Intenta nuevamente.' };;
    }

    redirect('/sign-in');
}