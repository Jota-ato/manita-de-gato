import { MoldForm } from "@/features/molds/components/mold-form";
import { NewMoldPageHeader } from "@/features/molds/components/new-mold-page-header";
import { requireAuth } from "@/lib/auth-server";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Container } from "@/shared/components/ui/container";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nuevo molde | Manita de gato",
  description: "Registra un nuevo molde para una clienta.",
};

export default async function NewMoldPage() {
  const { isAdmin } = await requireAuth();
  if (!isAdmin) redirect("/not-autorized");

  return (
    <section className="min-h-screen py-8 md:py-12 flex items-center justify-center">
      <Container className="space-y-6">
        <NewMoldPageHeader />
        <Card>
            <CardContent>
                <MoldForm />
            </CardContent>
        </Card>
      </Container>
    </section>
  );
}
