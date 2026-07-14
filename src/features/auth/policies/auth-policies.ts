import { User } from "@/db/schema";

export class AuthPolicies {
    static isOwner(user: User): boolean {
        return user.role === "owner"
    }

    static isAdmin(user: User): boolean {
        return user.role === "admin" || this.isOwner(user)
    }

    static isEmployee(user: User): boolean {
        return user.role === "employee" || this.isAdmin(user)
    }
}