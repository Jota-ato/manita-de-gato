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
            <Heading>Sign Up</Heading>

            <Separator className="my-8" />

            <Card className="max-w-lg mx-auto">
                <CardHeader>
                    <CardTitle className="text-center">
                        Enter your credentials to create your account.
                    </CardTitle>
                    <CardDescription className="text-center">
                        Only authorized users can access the admin dashboard. Please sign up to continue.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <SignUpForm />
                </CardContent>
                <CardFooter className="flex flex-col items-center gap-4">
                    <Separator />
                    <p className="text-center text-sm text-muted-foreground">
                        Or sign in with
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
                        Sign In
                    </Link>
                </Button>
                <Button
                    variant={'link'}
                >
                    <Link
                        href="/auth/forgot-password"
                    >
                        Forgot Password?
                    </Link>
                </Button>
            </div>
        </div>
    );
}
