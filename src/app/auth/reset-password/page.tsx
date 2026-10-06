import GoogleAuthButton from "@/features/auth/components/google-auth-button";
import { ResetPasswordForm } from "@/features/auth/components/reset-password-form";
import { Heading } from "@/shared/components/typography/heading";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Container } from "@/shared/components/ui/container";
import { Separator } from "@/shared/components/ui/separator";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Restablecer contraseña | Manita de gato",
  description: "Define una nueva contraseña para recuperar el acceso a tu cuenta.",
};

export default async function ResetPasswordPage({
  searchParams
}: {
  searchParams: Promise<{ token?: string }>
}) {

  const { token } = await searchParams

  return (
    <>
      <Heading>Restablecer contraseña</Heading>

      <Separator className="my-8" />

      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle className="text-center">
            Restablecer contraseña
          </CardTitle>
          <CardDescription className="text-center">
            Ingresa tu correo electrónico para restablecer tu contraseña.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResetPasswordForm token={token!} />
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-4">
          <Separator />
          <p className="text-center text-sm text-muted-foreground">
            O inicia sesión con
          </p>
          <GoogleAuthButton />
        </CardFooter>
      </Card>
      <div className="max-w-lg w-full mx-auto flex mt-4 items-center justify-between">
        <Button
          variant={'link'}
        >
          <Link
            href="/auth/sign-in"
          >
            Iniciar sesión
          </Link>
        </Button>
        <Button
          variant={'link'}
        >
          <Link
            href="/auth/sign-up"
          >
            Registrarse
          </Link>
        </Button>
      </div>
    </>
  )
}