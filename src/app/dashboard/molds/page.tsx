import { MoldCard } from "@/features/molds/components/mold-card";
import { MoldsPageHeader } from "@/features/molds/components/molds-page-header";
import { MoldsPagination } from "@/features/molds/components/molds-pagination";
import { moldsService } from "@/features/molds/services/molds-service";
import { requireAuth } from "@/lib/auth-server";

import { Container } from "@/shared/components/ui/container";
import { redirect } from "next/navigation";

const PAGE_SIZE = 1;

export default async function MoldsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: number }>;
}) {
  const { isAdmin } = await requireAuth();
  if (!isAdmin) redirect("/not-autorized");

  const { page = 1 } = await searchParams;
  const currentPage = Number(page) || 1;

  const { molds, totalCount } = await moldsService.getAllMolds(
    PAGE_SIZE,
    currentPage,
  );

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  return (
    <section className="min-h-screen py-8 md:py-12 flex items-center justify-center">
      <Container>
        <MoldsPageHeader />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {molds.map((mold) => (
            <MoldCard key={mold.id} mold={mold} />
          ))}
        </div>
        <MoldsPagination currentPage={currentPage} totalPages={totalPages} />
      </Container>
    </section>
  );
}
