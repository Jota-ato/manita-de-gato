"use client"
import { User } from "@/db/schema"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog"
import { useUserStore } from "../stores/user-store"
import { UserForm } from "./user-form"

export function EditDialog({
    currentUser
}: {
    currentUser: User
}) {

    const {
        activeUser,
        setActiveUser,
        editDialogOpen,
        setEditDialogOpen
    } = useUserStore()

    if (!activeUser) return null
    const isSameUser = activeUser.id === currentUser.id
    const title = isSameUser ? "Editing your own account" : `Editing ${activeUser.name}`

    return (
        <Dialog open={editDialogOpen} onOpenChange={() => {
            setActiveUser(null)
            setEditDialogOpen(false)
        }}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <UserForm 
                    currentUser={currentUser}
                    user={activeUser}
                />
            </DialogContent>
        </Dialog>
    )
}