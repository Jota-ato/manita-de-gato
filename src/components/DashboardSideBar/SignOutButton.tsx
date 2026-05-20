'use client';
import { Button } from "../ui/button";
import { signOut } from "@/lib/auth/SignOut/actions";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";
import { toast } from "sonner"
import { LogOut } from "lucide-react";

export default function SignOutButton({ isExpanded }: { isExpanded: boolean }) {

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const onSignOut = async () => {
        setIsLoading(true);
        const { error } = await signOut()
        setErrorMessage(error);
        setIsLoading(false);
        if (errorMessage) toast.warning(error, { position: 'top-right' });
    }

    return (
        <Button
            variant={'destructive'}
            onClick={onSignOut}
        >
            {isExpanded ?
                <OpenText isLoading={isLoading} />
                : <ClosedText isLoading={isLoading} />
            }

        </Button>
    )
}

function OpenText({ isLoading }: { isLoading: boolean }) {
    return (
        <>
            {isLoading && <Spinner className="mr-2" />}
            {isLoading ? 'Cerrando...' : 'Cerrar sesión'}
        </>
    );
}

function ClosedText({ isLoading }: { isLoading: boolean }) {
    return (
        <>
            {isLoading && <Spinner />}
            {isLoading ? '' : <LogOut className="size-4" />}
        </>
    );
}