import { User } from "@/db/schema"

export type UpdateUserInput = Partial<Omit<User, "id">>
export type UserWithProvider = User & {
    accounts: {
        providerId: string
    }[]
}