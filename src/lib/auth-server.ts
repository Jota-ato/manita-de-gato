import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { AuthPolicies } from "@/features/auth/policies/auth-policies";
import { User } from "@/db/schema";

export async function getServerSession() {
    return await auth.api.getSession({
        headers: await headers()
    })
}

export async function requireAuth() { 
    const session = await getServerSession()

    if (!session) return {
        session: null,
        isAuth: false,
        isAdmin: false,
        isEmployee: false,
        isOwner: false
    }

    return {
        session,
        isAuth: session ? true : false,
        isAdmin: AuthPolicies.isAdmin(session.user as User) ? true : false,
        isEmployee: AuthPolicies.isEmployee(session.user as User) ? true : false,
        isOwner: AuthPolicies.isOwner(session.user as User) ? true : false
    }
}