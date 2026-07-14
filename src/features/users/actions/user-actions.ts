"use server"

import { adminAction } from "@/shared/lib/actions"
import { usersService } from "../services/users-service"
import { UserInput, userSchema } from "../schemas/user-schemas"

export const deleteUserAction = adminAction(async (id: string, currentUserId: string) => {
    await usersService.deleteUser(id, currentUserId)

    return "User deleted successfully"
})

export const updateUserAction = adminAction(async (data: UserInput, id:string,currentUserId: string) => {
    const zodResponse = userSchema.safeParse(data)

    if (!zodResponse.success) {
        throw new Error("Invalid user data")
    }

    await usersService.udpateUser(zodResponse.data, id, currentUserId)

    return "User updated successfully"
})