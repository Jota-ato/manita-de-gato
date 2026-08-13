import GoogleAuthButton from "@/features/auth/components/google-auth-button";
import { SignUpForm } from "@/features/auth/components/sign-up-form";
import { Heading } from "@/shared/components/typography/heading";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Separator } from "@/shared/components/ui/separator";
import Link from "next/link";

export default function SignInPage() {
    return (
        <div>
            <Heading>Registrate</Heading>

            <Separator className="my-8" />

            <Card className="max-w-lg mx-auto">
                <CardHeader>
                    <CardTitle className="text-center">
                        Ingresa tus datos para crear una cuenta
                    </CardTitle>
                    <CardDescription className="text-center">
                        Solo usuarios autorizados pueden registrarse. Si no tienes una cuenta, por favor contacta al administrador.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <SignUpForm />
                </CardContent>
                <CardFooter className="flex flex-col items-center gap-4">
                    <Separator />
                    <p className="text-center text-sm text-muted-foreground">
                        O
                    </p>
                    <GoogleAuthButton
                        mode="signup"
                    />
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
                        href="/auth/forgot-password"
                    >
                        ¿Olvidaste tu contraseña?
                    </Link>
                </Button>
            </div>
        </div>
    );
}
