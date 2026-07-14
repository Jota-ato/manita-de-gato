import { User } from "@/db/schema";
import { DeleteDialog } from "@/features/users/components/delete-dialog";
import { EditDialog } from "@/features/users/components/edit-dialog";
import { UsersTable } from "@/features/users/components/users-table";
import { usersService } from "@/features/users/services/users-service";
import { UserWithProvider } from "@/features/users/types/user.types";
import { requireAuth } from "@/lib/auth-server";
import { Heading } from "@/shared/components/typography/heading";
import { Container } from "@/shared/components/ui/container";
import { Separator } from "@/shared/components/ui/separator";
import { redirect } from "next/navigation";

const title = "Users"
import { generateMetadataTitle } from "@/shared/utils/generateMetadata";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: generateMetadataTitle(title),
    description: "List of all users in the system, including their roles and permissions. This page allows administrators to manage user accounts, view user details, and perform actions such as editing or deleting users.",
}

export default async function UsersPage() {
    const { isAdmin, isOwner, session } = await requireAuth()
    const users = await usersService.getAllUsers();

    if (!session) redirect("/auth/sign-in")
    if (!isAdmin && !isOwner) redirect("/not-authorized")
    const { user } = session

    return (
        <section className="min-h-screen py-8 md:py-12">
            <Container className="space-y-8">
                <Heading>{title}</Heading>
                <Separator />

                <UsersTable
                    currentUser={user as UserWithProvider}
                    users={users}
                />
            </Container>
            <DeleteDialog
                currentUser={user as User}
            />
            <EditDialog
                currentUser={user as User}
            />
        </section>
    )
}