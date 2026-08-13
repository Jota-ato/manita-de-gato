import { ExtraDialog } from "@/features/services/components/extra-dialog";
import { ServiceDialog } from "@/features/services/components/service-dialog";
import { ServicePageTabs } from "@/features/services/components/service-page-tabs";
import { extrasService } from "@/features/services/services/extras-service";
import { servicesService } from "@/features/services/services/services-service";
import { Heading } from "@/shared/components/typography/heading";
import { Container } from "@/shared/components/ui/container";
import { Separator } from "@/shared/components/ui/separator";

const title = "Servicios";
import { generateMetadataTitle } from "@/shared/utils/generateMetadata";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: generateMetadataTitle(title),
  description:
    "Panel de administración para gestionar servicios y extras. Esta página permite a los administradores ver, agregar, editar y eliminar servicios y extras ofrecidos por la empresa, proporcionando una visión general completa de las ofertas disponibles.",
};

export default async function ServicesPage() {
  const services = await servicesService.getAllServices();
  const activeServices = services.filter((service) => service.data.isActive);
  const unactiveServices = services.filter((service) => !service.data.isActive);
  const extras = await extrasService.getExtras();
  const activeExtras = extras.filter((extra) => extra.isActive);
  const unactiveExtras = extras.filter((extra) => !extra.isActive);

  return (
    <section className="min-h-screen py-8 md:py-12 flex items-center justify-center">
      <Container>
        <Heading>{title}</Heading>
        <Separator className="my-8" />
        <ServicePageTabs
          activeExtras={activeExtras}
          activeServices={activeServices}
          extras={extras}
          unactiveExtras={unactiveExtras}
          unactiveServices={unactiveServices}
        />
      </Container>
      <ServiceDialog extras={activeExtras} />
      <ExtraDialog />
    </section>
  );
}
