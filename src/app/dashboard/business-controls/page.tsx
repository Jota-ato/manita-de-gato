import { BusinessControlsForm } from "@/features/business-controls/components/business-controls-form";
import { businessControlsService } from "@/features/business-controls/services/business-controls-service";
import { Heading } from "@/shared/components/typography/heading";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Container } from "@/shared/components/ui/container";
import { Separator } from "@/shared/components/ui/separator";

export default async function BusinessControlsPage() {
  const businessControls = await businessControlsService.getBusinessControls();

  if (!businessControls) return null;

  return (
    <section className="min-h-screen py-8 md:py-12">
      <Container>
        <Heading>Controles del negocio</Heading>
        <Separator className="my-4" />
        <Card className="max-w-xl mx-auto">
          <CardHeader>
            <CardTitle>Administrar los controles del negocio</CardTitle>
            <CardDescription>
              Aquí puedes gestionar los controles del negocio de tu
              organización. Puedes agregar, editar o eliminar controles según
              sea necesario para asegurar que tus operaciones comerciales se
              ejecuten de manera fluida y eficiente.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BusinessControlsForm controls={businessControls} />
          </CardContent>
        </Card>
      </Container>
    </section>
  );
}
