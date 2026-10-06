import { EditAppointmentDialog } from "@/features/appointments/admin/components/edit-appointment-dialog";
import { RecordCard } from "@/features/appointments/admin/components/record-card";
import { appointmentsService } from "@/features/appointments/core/services/appointments-service";
import { servicesService } from "@/features/services/services/services-service";
import { Container } from "@/shared/components/ui/container";

import { generateMetadataTitle } from "@/shared/utils/generateMetadata";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: generateMetadataTitle("Registro de citas"),
    description: "Consulta el historial de citas, incluyendo fecha, hora, servicio e información de cada cliente. Lleva un registro completo de tus citas anteriores.",
}

interface RecordPageProps {
  searchParams: Promise<{ page?: string; date?: string }>;
}

export default async function RecordPage({ searchParams }: RecordPageProps) {
  const resolvedParams = await searchParams;
  const currentPage = Number(resolvedParams?.page) || 1;
  const searchDate = resolvedParams?.date;

  const { data, totalPages } = await appointmentsService.getAppointmentsHistory(currentPage, searchDate);
  const services = await servicesService.getActiveServices()

  return (
    <section className="min-h-screen py-8 md:py-12 flex items-center justify-center">
      <Container>
        <RecordCard
          currentPage={currentPage}
          totalPages={totalPages}
          appointments={data}
        />
        <EditAppointmentDialog
          services={services}
        />
      </Container>
    </section>
  );
}