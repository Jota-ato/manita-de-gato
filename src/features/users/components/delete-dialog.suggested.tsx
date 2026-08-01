// SUGGESTED TRANSLATION: No changes required — original labels are already Spanish.
"use client"

import { User } from "@/db/schema"
import { useUserStore } from "../stores/user-store"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/shared/components/ui/alert-dialog"
import { OwnDelete } from "./not-own-delete"
import { showResponse } from "@/shared/lib/client-actions"
import { deleteUserAction } from "../actions/user-actions"

export function DeleteDialog({
    currentUser
}: {
    currentUser: User
}) {

    const { deleteDialogOpen, setDeleteDialogOpen, activeUser, setActiveUser } = useUserStore()

    if (!activeUser) return null

    const handleDelete = async () => {
        showResponse(await deleteUserAction(activeUser.id, currentUser.id))
    }

    return (
        <AlertDialog open={deleteDialogOpen} onOpenChange={() => {
            setDeleteDialogOpen(false)
            setActiveUser(null)
        }}>
            <AlertDialogContent>
                {currentUser.id === activeUser.id ? (
                    <OwnDelete  currentUser={currentUser} handleDelete={handleDelete} />
                ) : (
                    <>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                ¿Estás seguro de que deseas eliminar al usuario {activeUser.name}?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                Esta acción no se puede deshacer. Esto eliminará permanentemente al usuario y quitará todos sus datos.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>
                                Cancelar
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
            </AlertDialogContent >
        </AlertDialog >
    )
}
