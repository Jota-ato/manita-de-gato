import { Booking } from "@/features/appointments/public/components/booking"
import { publicAppointmentsService } from "@/features/appointments/public/services/public-appointments-service"
import { Heading } from "@/shared/components/typography/heading"
import { getSharedBusinessControls, getSharedPublicServices } from "@/shared/lib/cache"
import { TIMEZONE } from "@/shared/lib/date"
import { TZDate } from "@date-fns/tz"
import { startOfDay } from "date-fns"
import {
    AnimatePresence
} from "motion/react"

const title = "Book online"

import { generateMetadataTitle } from "@/shared/utils/generateMetadata";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: generateMetadataTitle(title),
    description: "Contact us for any inquiries, questions, or feedback. We are here to assist you and provide the information you need.",
}

export default async function PublicAgendaPage() {

    const today = new TZDate(startOfDay(new Date()), TIMEZONE)
    const services = await getSharedPublicServices()
    const appointments = await publicAppointmentsService.getPublicAppointmentsFromDay(today)
    const businessControls = await getSharedBusinessControls()

    if (!businessControls) return null

    return (
        <section
            className="space-y-8 my-8"
        >
            <Heading>{title}</Heading>
            <AnimatePresence>
                <Booking
                    services={services}
                    appointments={appointments}
                    businessControls={businessControls}
                />
            </AnimatePresence>
        </section>
    )
}