import { Heading } from "@/shared/components/typography/heading";
import { Button } from "@/shared/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export function MoldsPageHeader() {
  return (
    <header className="flex flex-col items-start md:items-center md:flex-row justify-between gap-4">
      <div>
        <Heading className="text-left">
          Pedidos{" "}
          <span className="text-muted-foreground text-xl">(moldes)</span>
        </Heading>
        <p>3 en curso - te deben $655</p>
      </div>
      <Button size="lg" className="w-full md:w-auto" asChild>
        <Link href="/dashboard/molds/new">
          <Plus />
          Nuevo pedido
        </Link>
      </Button>
    </header>
  );
}
