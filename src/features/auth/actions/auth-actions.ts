"use server"
import { customerAction } from "@/shared/lib/actions"
import { RequestPasswordResetInput, requestPasswordResetSchema, ResetPasswordInput, resetPasswordSchema, SignInInput, signInSchema, SignUpInput, signUpSchema } from "../schemas/form-schemas"
import { authService } from "../services/auth-service"

export const signUpAction = customerAction(async (data: SignUpInput) => {
    const zodResponse = signUpSchema.safeParse(data)

    if (!zodResponse.success) {
        return {
            success: false,
            message: "Datos de entrada inválidos",
        }
    }

    await authService.signUp(data)
    return {
        success: true,
        message: "Registro exitoso. Revisa tu correo electrónico para verificar tu cuenta.",
    }
})

export const signInAction = customerAction(async (data: SignInInput) => {
    const zodResponse = signInSchema.safeParse(data)

    if (!zodResponse.success) {
        return {
            success: false,
            message: "Datos de entrada inválidos",
        }
    }

    const response = await authService.signIn(data)
    return {
        success: true,
        message: "Inicio de sesión correcto.",
        data: response,
    }
})

export const requestPasswordResetAction = customerAction(async (data: RequestPasswordResetInput) => {
    const zodResponse = requestPasswordResetSchema.safeParse(data)

    if (!zodResponse.success) {
        return {
            success: false,
            message: "Datos de entrada inválidos",
        }
    }

    await authService.requestPasswordReset(data)
    return {
        success: true,
        message: "Solicitud de restablecimiento de contraseña enviada correctamente. Revisa tu correo electrónico para obtener más instrucciones.",
    }
})

export const resetPasswordAction = customerAction(async (data: ResetPasswordInput, token: string) => {
    const zodResponse = resetPasswordSchema.safeParse(data)

    if (!zodResponse.success) {
        return {
            success: false,
            message: "Datos de entrada inválidos",
        }
    }

    await authService.resetPassword(data, token)
    return {
        success: true,
        message: "Contraseña restablecida correctamente. Ya puedes iniciar sesión con tu nueva contraseña.",
    }
})