"use server"
import { customerAction } from "@/shared/lib/actions"
import { RequestPasswordResetInput, requestPasswordResetSchema, ResetPasswordInput, resetPasswordSchema, SignInInput, signInSchema, SignUpInput, signUpSchema } from "../schemas/form-schemas"
import { authService } from "../services/auth-service"

export const signUpAction = customerAction(async (data: SignUpInput) => {
    const zodResponse = signUpSchema.safeParse(data)

    if (!zodResponse.success) {
        return {
            success: false,
            message: "Invalid input data",
        }
    }

    await authService.signUp(data)
    return {
        success: true,
        message: "Sign-up successful. Please check your email to verify your account.",
    }
})

export const signInAction = customerAction(async (data: SignInInput) => {
    const zodResponse = signInSchema.safeParse(data)

    if (!zodResponse.success) {
        return {
            success: false,
            message: "Invalid input data",
        }
    }

    const response = await authService.signIn(data)
    return {
        success: true,
        message: "Sign-in successful.",
        data: response,
    }
})

export const requestPasswordResetAction = customerAction(async (data: RequestPasswordResetInput) => {
    const zodResponse = requestPasswordResetSchema.safeParse(data)

    if (!zodResponse.success) {
        return {
            success: false,
            message: "Invalid input data",
        }
    }

    await authService.requestPasswordReset(data)
    return {
        success: true,
        message: "Password reset request successful. Please check your email for further instructions.",
    }
})

export const resetPasswordAction = customerAction(async (data: ResetPasswordInput, token: string) => {
    const zodResponse = resetPasswordSchema.safeParse(data)

    if (!zodResponse.success) {
        return {
            success: false,
            message: "Invalid input data",
        }
    }

    await authService.resetPassword(data, token)
    return {
        success: true,
        message: "Password reset successful. You can now sign in with your new password.",
    }
})