export function UsersTableHeader() {
    return (
        <div className="overflow-auto rounded-t-md border border-border bg-muted grid grid-cols-5 p-4">
            <div className="col-span-2">
                User
            </div>
            <div>
                Role
            </div>
            <div>
                Image
            </div>
            <div>
                Actions
            </div>
        </div>
    )
}