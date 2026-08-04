import { AppError } from "@/shared/lib/errors";
import { IUserRepository, usersRepository } from "./users-repository";
import { User } from "@/db/schema";
import { AuthPolicies } from "@/features/auth/policies/auth-policies";
import { UserInput } from "../schemas/user-schemas";

class UsersService {
    constructor(
        private usersRepository: IUserRepository
    ) { }

    async getAllUsers() {
        return await this.usersRepository.getAll()
    }

    async getUserById(id: string) {
        return await this.usersRepository.getById(id)
    }

    async deleteUser(id: string, currentUserId: string) {
        const user = await this.usersRepository.getById(id)
        const currentUser = await this.usersRepository.getById(currentUserId)
        if (!user) {
            throw new AppError('Usuario no encontrado')
        }

        if (!currentUser) {
            throw new AppError('Usuario actual no encontrado')
        }

        const isOwner = AuthPolicies.isOwner(currentUser)
        const isSameUser = user.id === currentUserId

        if (user.role === "owner") {
            const owners = await this.usersRepository.getByRole("owner")
            if (owners.length === 1) {
                throw new AppError('Debe haber al menos un owner en el sistema')
            }
        }

        if (!isOwner && user.role === "admin" && !isSameUser) {
            throw new AppError('Solo el owner puede eliminar usuarios admin')
        }

        await this.usersRepository.delete(id)
    }

    async udpateUser(
        data: UserInput,
        id: string,
        currentUserId: string) {
        const currentUser = await this.usersRepository.getById(currentUserId)
        if (!currentUser) {
            throw new AppError('Usuario actual no encontrado')
        }

        const isOwner = AuthPolicies.isOwner(currentUser)
        const isAdmin = AuthPolicies.isAdmin(currentUser)

        const user = await this.usersRepository.getById(id)
        if (!user) {
            throw new AppError('Usuario no encontrado')
        }

        if (data.role === "owner" && !isOwner) {
            throw new AppError('Solo el owner puede asignar el rol owner')
        }

        if (user.role === "admin" && !isAdmin && user.id !== currentUser.id) {
            throw new AppError('Solo los owner pueden actualizar a otros admin')
        }

        if (user.role === "owner" && user.id !== currentUser.id) {
            throw new AppError('Solo los owner pueden editarse a sí mismos')
        }

        await this.usersRepository.update(data, user.id)
    }
}

export const usersService = new UsersService(usersRepository);