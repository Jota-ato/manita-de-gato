import { Heading } from "@/shared/components/typography/heading";
import { Container } from "@/shared/components/ui/container";

export default async function MoldsPage() {
  return (
    <section className="min-h-screen py-8 md:py-12 flex items-center justify-center">
        <Container>
            <Heading>
                Moldes
            </Heading>
        </Container>
    </section>
  );
}
