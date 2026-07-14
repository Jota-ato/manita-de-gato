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
                                Are you sure you want to delete user {activeUser.name}?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the user and remove all their data.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>
                                Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                                onClick={handleDelete}
                            >
                                Delete
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </>
                )
                }
            </AlertDialogContent >
        </AlertDialog >
    )
}