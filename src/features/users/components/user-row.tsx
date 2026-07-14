"use client"
import { User } from "@/db/schema"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar"
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import { Mail, PenSquare, Trash } from "lucide-react";
import { useUserStore } from "../stores/user-store";
import { AuthPolicies } from "@/features/auth/policies/auth-policies";
import { UserWithProvider } from "../types/user.types";
import { BsGoogle, BsMailbox } from "react-icons/bs";
import { GoogleLogo } from "@/shared/components/icons/google-logo";

function getInitials(name: string) {
    return name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? "")
        .join("");
}

export function UserRow({
    user,
    currentUser
}: {
    user: UserWithProvider
    currentUser: UserWithProvider
}) {

    const {
        setActiveUser,
        setDeleteDialogOpen,
        setEditDialogOpen
    } = useUserStore()

    const isRowOwner = AuthPolicies.isOwner(user)
    const isOwner = AuthPolicies.isOwner(currentUser)
    const isAdmin = AuthPolicies.isAdmin(currentUser)

    const handleEditClick = () => {
        setActiveUser(user)
        setEditDialogOpen(true)
    }

    const handleDeleteClick = () => {
        setActiveUser(user)
        setDeleteDialogOpen(true)
    }

    return (
        <div className={cn("grid grid-cols-5 rounded-b-md border border-border p-4 items-center transition-colors  group",
            user.id === currentUser.id ? "bg-secondary" : "bg-card hover:bg-muted/80"
        )}>
            <div className="col-span-2 grid">
                <p className="text-sm text-accent-foreground group-hover:text-primary">{user.name}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-2">
                    {user.email}
                    <span>
                        {user.accounts.length && (
                            user.accounts.map(account => (
                                account.providerId === "google" ?
                                    <GoogleLogo key={account.providerId} className="w-3 h-3" /> :
                                    <Mail key={account.providerId} className="w-3 h-3" />
                            ))
                        )}
                    </span>
                </p>
            </div>
            <div>
                <Badge
                    variant={"secondary"}
                >
                    {user.role}
                </Badge>
            </div>
            <div>
                <Avatar>
                    <AvatarImage src={user.image ?? ""} alt={user.name ?? ""} />
                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                </Avatar>
            </div>
            <div className="flex items-center gap-2">
                {(isOwner && (!isRowOwner || user.id === currentUser.id)) && (
                    <>
                        <Button
                            size="icon"
                            variant={"outline"}
                            onClick={handleEditClick}
                        >
                            <PenSquare />
                        </Button>
                        <Button
                            size="icon" variant={"destructive"}
                            onClick={handleDeleteClick}
                        >
                            <Trash />
                        </Button>
                    </>
                )}
                {(isAdmin && !isOwner) && user.id === currentUser.id && (
                    <>
                        <Button
                            size="icon"
                            variant={"outline"}
                            onClick={handleEditClick}
                        >
                            <PenSquare />
                        </Button>
                        <Button
                            size="icon" variant={"destructive"}
                            onClick={handleDeleteClick}
                        >
                            <Trash />
                        </Button>
                    </>
                )}
            </div>
        </div>
    )
}