import { db } from "@/db";
import { eq } from "drizzle-orm";
import { User, UserRole, users } from "@/db/schema";
import { UpdateUserInput, UserWithProvider } from "../types/user.types";

export interface IUserRepository {
    getAll(): Promise<UserWithProvider[]>
    getById(id: string): Promise<User | null>
    getByRole(role: UserRole): Promise<User[]>
    update(data: UpdateUserInput, id: string): Promise<User>
    delete(id: string): Promise<void>
}

class UserRepository implements IUserRepository {
    async getAll(): Promise<UserWithProvider[]> {
        return await db
            .query
            .users
            .findMany({
                with: {
                    accounts: {
                        columns: {
                            providerId: true
                        }
                    }
                }
            })
    }

    async getById(id: string): Promise<User | null> {
        const result = await db
            .query
            .users
            .findFirst({
                where: (user, { eq }) => eq(user.id, id),

            })

        return result ? result : null
    }

    async getByRole(role: UserRole): Promise<User[]> {
        return await db
            .query
            .users
            .findMany({
                where: (user, { eq }) => eq(user.role, role)
            })
    }

    async update(data: UpdateUserInput, id: string): Promise<User> {
        return (await db
            .update(users)
            .set(data)
            .where(eq(users.id, id))
            .returning()
        )[0]
    }

    async delete(id: string): Promise<void> {
        await db
            .delete(users)
            .where(eq(users.id, id))
    }
}

export const usersRepository = new UserRepository();