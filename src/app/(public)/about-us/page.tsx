import { Hero } from "@/shared/components/public/about-us/hero"
import { Values } from "@/shared/components/public/about-us/values"
import { Heading } from "@/shared/components/typography/heading"


const title = "Sobre nosotras"

import { generateMetadataTitle } from "@/shared/utils/generateMetadata";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: generateMetadataTitle(title),
    description: "Conoce más sobre Manita de gato, nuestros valores y la experiencia que ofrecemos en cada servicio.",
}

export default function AboutUsPage() {
    return (
        <section className="my-8">
            <Heading>{title}</Heading>
            <Hero />
            <Values />
        </section>
    )
}