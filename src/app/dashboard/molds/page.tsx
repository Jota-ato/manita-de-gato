import { MoldCard } from "@/features/molds/components/mold-card";
import { FullMold } from "@/features/molds/types/molds.types";
import { Heading } from "@/shared/components/typography/heading";
import { Container } from "@/shared/components/ui/container";

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
  return (
    <section className="min-h-screen py-8 md:py-12 flex items-center justify-center">
      <Container>
        <header>
            <Heading className="text-left">
                Pedidos
            </Heading>
            <p>
                3 en curso - te deben $655
            </p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {molds.map(mold => (
            <MoldCard 
                key={mold.id}
                mold={mold}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
