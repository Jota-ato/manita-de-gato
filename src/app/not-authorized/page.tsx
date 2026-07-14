import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Separator } from "@/shared/components/ui/separator";
import { ArrowLeft, LogIn, ShieldAlert, Sparkles } from "lucide-react";
import Link from "next/link";

import { generateMetadataTitle } from "@/shared/utils/generateMetadata";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: generateMetadataTitle("Not authorized"),
  description: "You are not authorized to view this page.",
}

export default function NotAuthorized() {
  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden bg-linear-to-b from-secondary/70 via-background to-background px-4 py-12 md:px-8">
      <div className="pointer-events-none absolute inset-0 opacity-70 bg-[radial-gradient(circle_at_top_left,var(--color-primary)_0%,transparent_30%),radial-gradient(circle_at_top_right,var(--color-accent)_0%,transparent_26%),radial-gradient(circle_at_bottom,var(--color-muted)_0%,transparent_24%)]" />

      <Card className="relative z-10 mx-auto w-full max-w-2xl border-none bg-card/95 shadow-xl shadow-primary/10 backdrop-blur">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/15">
            <ShieldAlert className="size-8" />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary">
              Restricted access
            </p>
            <CardTitle className="text-3xl font-black tracking-tight md:text-4xl">
              You do not have permission to view this area.
            </CardTitle>
            <CardDescription className="mx-auto max-w-xl text-base leading-7">
              This section is reserved for authorized users. If you believe this is an
              error, sign in again or return to the public area of the app.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid gap-3 rounded-3xl border border-border/70 bg-secondary/40 p-4 sm:grid-cols-3">
            <div className="flex items-start gap-3 rounded-2xl bg-background/70 p-4">
              <div className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <LogIn className="size-5" />
              </div>
              <div>
                <p className="font-medium text-foreground">Sign in</p>
                <p className="text-sm text-muted-foreground">Use the correct account.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-2xl bg-background/70 p-4">
              <div className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                <ShieldAlert className="size-5" />
              </div>
              <div>
                <p className="font-medium text-foreground">Access check</p>
                <p className="text-sm text-muted-foreground">Permissions are enforced.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-2xl bg-background/70 p-4">
              <div className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                <Sparkles className="size-5" />
              </div>
              <div>
                <p className="font-medium text-foreground">Public pages</p>
                <p className="text-sm text-muted-foreground">Keep browsing the site.</p>
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button size="lg" className="rounded-full px-6 shadow-lg shadow-primary/20" asChild>
              <Link href="/auth/sign-in">
                <LogIn className="size-4" />
                Sign in
              </Link>
            </Button>

            <Button size="lg" variant="outline" className="rounded-full px-6" asChild>
              <Link href="/">
                <ArrowLeft className="size-4" />
                Go back home
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}