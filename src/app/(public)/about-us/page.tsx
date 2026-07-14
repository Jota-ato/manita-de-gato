import { Hero } from "@/shared/components/public/about-us/hero"
import { Values } from "@/shared/components/public/about-us/values"
import { Heading } from "@/shared/components/typography/heading"


const title = "About Us"

import { generateMetadataTitle } from "@/shared/utils/generateMetadata";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: generateMetadataTitle(title),
    description: "Contact us for any inquiries, questions, or feedback. We are here to assist you and provide the information you need.",
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