'use client';
import { Button } from "../ui/button";
import { signOut } from "@/lib/auth/SignOut/actions";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";

export default function SignOutButton() {

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const onSignOut = async () => {
        setIsLoading(true);
        const { error } = await signOut()
        setErrorMessage(error);
        setIsLoading(false);
    }

    return (
        <>
            <Button
                variant={'destructive'}
                onClick={onSignOut}
            >
                {isLoading && <Spinner className="mr-2" />}
                {isLoading ? 'Cerrando...' : 'Cerrar sesión'}
            </Button>
            {errorMessage && (
                <p className="text-xs text-destructive text-center font-medium">
                    {errorMessage}
                </p>
            )}
        </>
    )
}