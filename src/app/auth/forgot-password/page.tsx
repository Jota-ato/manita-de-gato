import { ForgotPasswordForm } from "@/features/auth/components/forgot-password-form";
import GoogleAuthButton from "@/features/auth/components/google-auth-button";
import { Heading } from "@/shared/components/typography/heading";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Separator } from "@/shared/components/ui/separator";
import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <>
      <Heading>Recuperar contraseña</Heading>

      <Separator className="my-8" />

      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle className="text-center">
            ¿Olvidaste tu contraseña?
          </CardTitle>
          <CardDescription className="text-center">
            Ingresa tu correo electrónico para restablecer tu contraseña.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ForgotPasswordForm />
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-4">
          <Separator />
          <p className="text-center text-sm text-muted-foreground">O</p>
          <GoogleAuthButton />
        </CardFooter>
      </Card>
      <div className="max-w-lg w-full mx-auto flex mt-4 items-center justify-between">
        <Button variant={"link"}>
          <Link href="/auth/sign-up">Registrate</Link>
        </Button>
        <Button variant={"link"}>
          <Link href="/auth/forgot-password">Inicia sesión</Link>
        </Button>
      </div>
    </>
  );
}
