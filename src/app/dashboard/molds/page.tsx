import { MoldCard } from "@/features/molds/components/mold-card";
import { MoldsPageHeader } from "@/features/molds/components/molds-page-header";
import { FullMold } from "@/features/molds/types/molds.types";
import { requireAuth } from "@/lib/auth-server";

import { Container } from "@/shared/components/ui/container";
import { redirect } from "next/navigation";

const molds: FullMold[] = [
  {
    deliveryDate: new Date(),
    design: "Mármol Blanco",
    shape: "Coffin",
    status: "in_production",
    amountPaid: "0",
    totalPrice: "225",
    id: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
    customerId: "1",
    leftHandMeasures: [],
    rightHandMeasures: [],
    referenceImageUrl: "",
    note: "",
    customer: {
      id: "1",
      name: "Melissa",
      lastName: "Ponce",
      email: "melissa@example.com",
      phone: "123-456-7890",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  },
  {
    deliveryDate: new Date(),
    design: "Francesa de Color",
    shape: "Almendra",
    status: "reserved",
    amountPaid: "170",
    totalPrice: "225",
    id: "2",
    createdAt: new Date(),
    updatedAt: new Date(),
    customerId: "1",
    leftHandMeasures: [],
    rightHandMeasures: [],
    referenceImageUrl: "",
    note: "",
    customer: {
      id: "1",
      name: "Melissa",
      lastName: "Ponce",
      email: "melissa@example.com",
      phone: "123-456-7890",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  },
  {
    deliveryDate: new Date(),
    design: "Ojo de Gato",
    shape: "Almendra",
    status: "delivered",
    amountPaid: "230",
    totalPrice: "230",
    id: "3",
    createdAt: new Date(),
    updatedAt: new Date(),
    customerId: "2",
    leftHandMeasures: [],
    rightHandMeasures: [],
    referenceImageUrl: "",
    note: "",
    customer: {
      id: "2",
      name: "Ivonne",
      lastName: "Salas",
      email: "ivonne@example.com",
      phone: "987-654-3210",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  },
];

export default async function MoldsPage() {
  const { isAdmin } = await requireAuth();
  if (!isAdmin) redirect("/not-autorized");

  return (
    <section className="min-h-screen py-8 md:py-12 flex items-center justify-center">
      <Container>
        <MoldsPageHeader />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {molds.map((mold) => (
            <MoldCard key={mold.id} mold={mold} />
          ))}
        </div>
      </Container>
    </section>
  );
}
