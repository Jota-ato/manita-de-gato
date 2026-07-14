import { Location } from "@/shared/components/public/landing/location";
import { ReviewsSection } from "@/shared/components/public/landing/reviews-section";
import { ServicesSection } from "@/shared/components/public/landing/services-section";
import { Hero } from "@/shared/components/public/ui/hero";
import { getSharedPublicServices } from "@/shared/lib/cache";

import { generateMetadataTitle } from "@/shared/utils/generateMetadata";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: generateMetadataTitle(),
    description: "Manita de gato is a web application that allows customers from the physical salon to book appointments online, providing a convenient and efficient way to schedule their visits.",
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
