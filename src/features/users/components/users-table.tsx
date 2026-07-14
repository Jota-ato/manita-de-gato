import { User } from "@/db/schema"
import { UsersTableHeader } from "./users-table-header"
import { UserRow } from "./user-row"
import { NoUsersRow } from "./no-users-row"
import { UserWithProvider } from "../types/user.types"

export function UsersTable({
    users,
    currentUser
}: {
    users: UserWithProvider[]
    currentUser: UserWithProvider
}) {
    return (
        <section className="overflow-auto">
            <div className="min-w-xl">
                <UsersTableHeader />
                {users.length ? (
                    users.map(user => (
                        <UserRow key={user.id} user={user} currentUser={currentUser} />
                    ))
                ) : (
                    <NoUsersRow />
                )}
            </div>
        </section>
    )
}