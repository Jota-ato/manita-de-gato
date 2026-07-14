import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { generateMetadataTitle } from "@/shared/utils/generateMetadata";
import { ArrowLeft, Home, SearchX } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: generateMetadataTitle("Page not found"),
    description: "The page you are looking for does not exist. The link may be broken, moved, or the address may have been typed incorrectly.",
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
                            Page not found
                        </p>
                        <CardTitle className="text-3xl font-black tracking-tight md:text-4xl">
                            The page you are looking for does not exist.
                        </CardTitle>
                        <CardDescription className="mx-auto max-w-xl text-base leading-7">
                            The link may be broken, moved, or the address may have been typed incorrectly.
                            Use the actions below to continue browsing.
                        </CardDescription>
                    </div>
                </CardHeader>

                <CardContent className="space-y-6">
                    <div className="grid gap-3 rounded-3xl border border-border/70 bg-secondary/40 p-4 sm:grid-cols-3">
                        <div className="rounded-2xl bg-background/70 p-4">
                            <p className="font-medium text-foreground">Check the URL</p>
                            <p className="mt-1 text-sm text-muted-foreground">A small typo can lead here.</p>
                        </div>
                        <div className="rounded-2xl bg-background/70 p-4">
                            <p className="font-medium text-foreground">Return home</p>
                            <p className="mt-1 text-sm text-muted-foreground">Go back to the public site.</p>
                        </div>
                        <div className="rounded-2xl bg-background/70 p-4">
                            <p className="font-medium text-foreground">Sign in</p>
                            <p className="mt-1 text-sm text-muted-foreground">Access protected areas from login.</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                        <Button size="lg" className="rounded-full px-6 shadow-lg shadow-primary/20" asChild>
                            <Link href="/">
                                <Home className="size-4" />
                                Go home
                            </Link>
                        </Button>

                        <Button size="lg" variant="outline" className="rounded-full px-6" asChild>
                            <Link href="/auth/sign-in">
                                <ArrowLeft className="size-4" />
                                Sign in
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </section>
    )
}