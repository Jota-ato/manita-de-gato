import { ContactCard } from "@/features/contact/components/contact-card"
import { Heading } from "@/shared/components/typography/heading"
import { Separator } from "@/shared/components/ui/separator"


const title = "Contáctanos"
import { generateMetadataTitle } from "@/shared/utils/generateMetadata";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: generateMetadataTitle(title),
    description: "Contáctanos para cualquier consulta, pregunta o comentario. Estamos aquí para ayudarte y proporcionarte la información que necesitas.",
}

export default function ContactPage() {
    return (
        <section className="space-y-8 my-8">
            <Heading>{title}</Heading>
            <Separator />
            <ContactCard />
        </section>
    )
}