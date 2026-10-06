import { Location } from "@/shared/components/public/landing/location";
import { ReviewsSection } from "@/shared/components/public/landing/reviews-section";
import { ServicesSection } from "@/shared/components/public/landing/services-section";
import { Hero } from "@/shared/components/public/ui/hero";
import { getSharedPublicServices } from "@/shared/lib/cache";

import { generateMetadataTitle } from "@/shared/utils/generateMetadata";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: generateMetadataTitle(),
    description: "Reserva tu cita en Manita de gato de forma práctica y sencilla. Consulta nuestros servicios y encuentra el horario que mejor se adapte a ti.",
}

export default async function Home() {

    const services = await getSharedPublicServices()

    return (
        <section className="w-full">
            <Hero />
            <ServicesSection
                services={services}
            />
            <ReviewsSection />
            <Location />
        </section>
    );
}
