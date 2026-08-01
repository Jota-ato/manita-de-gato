// SUGGESTED TRANSLATION: No changes required — original labels are already Spanish.
import { User } from "@/db/schema";
import { AlertDialogAction, AlertDialogCancel, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/shared/components/ui/alert-dialog";

export function OwnDelete({
    currentUser,
    handleDelete
}: {
    currentUser: User
    handleDelete: () => Promise<void>
}) {
    return (
        <>
            <AlertDialogHeader>
                <AlertDialogTitle>
                    ¿Estás seguro de que deseas eliminar tu propia cuenta, {currentUser.name}?
                </AlertDialogTitle>
                <AlertDialogDescription>
                    No hay forma de recuperar tu cuenta después de la eliminación. Esta acción no se puede deshacer.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>
                    Cerrar
                </AlertDialogCancel>
                <AlertDialogAction
                    onClick={handleDelete}
                >
                    Eliminar
                </AlertDialogAction>
            </AlertDialogFooter>
        </>
    )
}
