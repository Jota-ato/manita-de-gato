'use client';
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { createClient } from "@/lib/supabase/client";

export default function GoogleButton() {

    const supabase = createClient();

    const handleSignInWithGoogle = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            }
        });

        if (error) console.error('Error iniciando sesión', error);
    }

    return (
        <Button
            type="button"
            variant="outline"
            className="w-full h-11 rounded-full border-[#dadce0] hover:bg-[#f8f9fa] font-medium gap-3 text-sm"
            onClick={handleSignInWithGoogle}
        >
            <FcGoogle className="size-5 shrink-0" aria-hidden="true" />
            Continuar con Google
        </Button>
    )
}