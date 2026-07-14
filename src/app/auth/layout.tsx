import { requireAuth } from "@/lib/auth-server";
import { Container } from "@/shared/components/ui/container";
import { redirect } from "next/navigation";

export default async function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const { session } = await requireAuth()

    if (session && session.user.role === 'dashboard')
        redirect('/dashboard')

    return (
        <section className="min-h-screen py-8 md:py-12 flex flex-col items-center justify-center w-full">
            <Container>
                {children}
            </Container>
        </section>
    );
}
