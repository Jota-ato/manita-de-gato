import { Heading } from "@/shared/components/typography/heading";

export function NewMoldPageHeader() {
  return (
    <header>
      <Heading className="text-left">Nuevo pedido</Heading>
      <p className="text-muted-foreground mt-4">
        Aquí puedes crear un nuevo pedido de moldes para tus clientes. Asegúrate
        de ingresar toda la información necesaria para procesar el pedido
        correctamente.
      </p>
    </header>
  );
}
