import { auth } from "@/lib/auth";
import {
  RequestPasswordResetInput,
  ResetPasswordInput,
  SignInInput,
  SignUpInput,
} from "../schemas/form-schemas";
import { headers } from "next/headers";
import { APIError } from "better-auth";
import { AppError } from "@/shared/lib/errors";

class AuthService {
  async signUp(data: SignUpInput) {
    try {
      await auth.api.signUpEmail({
        body: {
          email: data.email,
          password: data.password,
          name: data.name,
        },
      });
    } catch (err) {
      console.error("Error durante el registro:", err);
      throw err;
    }
  }

  async signIn(data: SignInInput) {
    try {
      const response = await auth.api.signInEmail({
        body: {
          email: data.email,
          password: data.password,
        },
        headers: await headers(),
      });
      return response;
    } catch (err) {
      console.error("Error during sign-in:", err);
      if (err instanceof APIError) {
        if (err.statusCode === 403) throw new AppError("Email no verificado");
        if (err.statusCode === 403)
          throw new AppError("Email o contraseña incorrectos");
      }
      throw new AppError(
        "Algo salió mal durante el inicio de sesión. Por favor, inténtalo de nuevo más tarde.",
      );
    }
  }

  async requestPasswordReset(data: RequestPasswordResetInput) {
    try {
      await auth.api.requestPasswordReset({
        body: {
          email: data.email,
          redirectTo: `${process.env.NEXT_PUBLIC_APP_URL!}/auth/reset-password`,
        },
      });
    } catch (err) {
      console.error(
        "Error durante la solicitud de restablecimiento de contraseña:",
        err,
      );
      throw new AppError(
        "Algo salió mal durante la solicitud de restablecimiento de contraseña. Por favor, inténtalo de nuevo más tarde.",
      );
    }
  }

  async resetPassword(data: ResetPasswordInput, token: string) {
    try {
      await auth.api.resetPassword({
        body: {
          newPassword: data.password,
          token: token,
        },
        headers: await headers(),
      });
    } catch (err) {
      console.error("Error durante el restablecimiento de contraseña:", err);
      throw new AppError(
        "Algo salió mal durante el restablecimiento de contraseña. Por favor, inténtalo de nuevo más tarde.",
      );
    }
  }
}

export const authService = new AuthService();
