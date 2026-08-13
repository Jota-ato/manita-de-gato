import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { generateMetadataTitle } from "@/shared/utils/generateMetadata";
import { ArrowLeft, Home, SearchX } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: generateMetadataTitle("Página no encontrada"),
    description: "La página que buscas no existe. El enlace puede estar roto, haber sido movido o la dirección puede haber sido escrita incorrectamente.",
}

export default function NotFound() {
    return (
        <section className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden bg-linear-to-b from-secondary/60 via-background to-background px-4 py-12 md:px-8">
            <div className="pointer-events-none absolute inset-0 opacity-70 bg-[radial-gradient(circle_at_top,var(--color-primary)_0%,transparent_28%),radial-gradient(circle_at_bottom_right,var(--color-accent)_0%,transparent_24%),radial-gradient(circle_at_bottom_left,var(--color-muted)_0%,transparent_22%)]" />

            <Card className="relative z-10 mx-auto w-full max-w-2xl border-none bg-card/95 shadow-xl shadow-primary/10 backdrop-blur">
                <CardHeader className="space-y-4 text-center">
                    <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/15">
                        <SearchX className="size-8" />
                    </div>
                    <div className="space-y-2">
                        <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary">
                            Página no encontrada
                        </p>
                        <CardTitle className="text-3xl font-black tracking-tight md:text-4xl">
                            La página que buscas no existe.
                        </CardTitle>
                        <CardDescription className="mx-auto max-w-xl text-base leading-7">
                            El enlace puede estar roto, haber sido movido o la dirección puede haber sido escrita incorrectamente.
                            Utiliza las acciones a continuación para seguir navegando.
                        </CardDescription>
                    </div>
                </CardHeader>

                <CardContent className="space-y-6">
                    <div className="grid gap-3 rounded-3xl border border-border/70 bg-secondary/40 p-4 sm:grid-cols-3">
                        <div className="rounded-2xl bg-background/70 p-4">
                            <p className="font-medium text-foreground">Comprueba la URL</p>
                            <p className="mt-1 text-sm text-muted-foreground">Un pequeño error tipográfico puede llevarte aquí.</p>
                        </div>
                        <div className="rounded-2xl bg-background/70 p-4">
                            <p className="font-medium text-foreground">Volver al inicio</p>
                            <p className="mt-1 text-sm text-muted-foreground">Regresa al sitio público.</p>
                        </div>
                        <div className="rounded-2xl bg-background/70 p-4">
                            <p className="font-medium text-foreground">Iniciar sesión</p>
                            <p className="mt-1 text-sm text-muted-foreground">Accede a áreas protegidas iniciando sesión.</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                        <Button size="lg" className="rounded-full px-6 shadow-lg shadow-primary/20" asChild>
                            <Link href="/">
                                <Home className="size-4" />
                                Ir al inicio
                            </Link>
                        </Button>

                        <Button size="lg" variant="outline" className="rounded-full px-6" asChild>
                            <Link href="/auth/sign-in">
                                <ArrowLeft className="size-4" />
                                Iniciar sesión
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </section>
    )
}