import { NewMoldPageHeader } from "@/features/molds/components/new-mold-page-header";
import { requireAuth } from "@/lib/auth-server";
import { Container } from "@/shared/components/ui/container";
import { redirect } from "next/navigation";

export default async function NewMoldPage() {
  const { isAdmin } = await requireAuth();
  if (!isAdmin) redirect("/not-autorized");

  return (
    <section className="min-h-screen py-8 md:py-12 flex items-center justify-center">
      <Container>
        <NewMoldPageHeader />
      </Container>
    </section>
  );
}
