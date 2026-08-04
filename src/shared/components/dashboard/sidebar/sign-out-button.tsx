"use client"
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth-client";
import { toast } from "sonner";
import { LogOut } from "lucide-react";
import { AlertDialogCustom } from "../../ui/alert-dialog-custom";

export function SignOutButton({
    isCollapse
}: {
    isCollapse: boolean
}) {
    const router = useRouter();

    const handleSignOut = async () => {
        await signOut({
            fetchOptions: {
                onSuccess: () => {
                    toast.success("Sesión cerrada correctamente");
                    router.push("/auth/sign-in");
                },
                onError: () => {
                    toast.error("Algo salió mal al cerrar la sesión. Por favor inténtalo de nuevo.");
                },
            },
        });
    };

    return (
        <>
            <AlertDialogCustom
                triggerIcon={LogOut}
                action={handleSignOut}
                actionLabel="Cerrar sesión"
                dialogTitle="¿Estás seguro de que quieres cerrar sesión?"
                triggerLabel="Cerrar sesión"
                dialogDescription="Deberás iniciar sesión nuevamente para acceder a tu panel."
                srOnlyDescription
                showText={isCollapse}
            />
        </>
    )
}