import { MoldForm } from "@/features/molds/components/mold-form";
import { moldsService } from "@/features/molds/services/molds-service";
import { requireAuth } from "@/lib/auth-server";
import { Heading } from "@/shared/components/typography/heading";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Container } from "@/shared/components/ui/container";
import { notFound, redirect } from "next/navigation";

export default async function EditMoldPage({
  params,
}: {
  params: Promise<{ moldId: string }>;
}) {
  const { isAdmin } = await requireAuth();
  if (!isAdmin) redirect("/not-autorized");

  const { moldId } = await params;

  if (!moldId) notFound();

  const mold = await moldsService.getMoldById(moldId);
  if (!mold) notFound();

  return (
    <section className="min-h-screen py-8 md:py-12 flex items-center justify-center">
      <Container className="space-y-6">
        <Heading>
          Editando molde de {mold.customer.name} {mold.customer.lastName}
        </Heading>
        <Card>
          <CardContent>
            <MoldForm mold={mold} />
          </CardContent>
        </Card>
      </Container>
    </section>
  );
}
