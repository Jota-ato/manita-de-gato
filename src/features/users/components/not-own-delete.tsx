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
                    Are you sure you want to delete your own account, {currentUser.name}?
                </AlertDialogTitle>
                <AlertDialogDescription>
                    There is no way to recover your account after deletion. This action cannot be undone.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>
                    Close
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