import { ContactCard } from "@/features/contact/components/contact-card"
import { Heading } from "@/shared/components/typography/heading"
import { Separator } from "@/shared/components/ui/separator"


const title = "Contact us"
import { generateMetadataTitle } from "@/shared/utils/generateMetadata";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: generateMetadataTitle(title),
    description: "Contact us for any inquiries, questions, or feedback. We are here to assist you and provide the information you need.",
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