import { AdminAgendaDialog } from "@/features/appointments/admin/components/admin-agenda-dialog";
import { EditAppointmentDialog } from "@/features/appointments/admin/components/edit-appointment-dialog";
import { Agenda } from "@/features/appointments/core/components/agenda";
import { appointmentsService } from "@/features/appointments/core/services/appointments-service";
import { businessControlsService } from "@/features/business-controls/services/business-controls-service";
import { servicesService } from "@/features/services/services/services-service";
import { Container } from "@/shared/components/ui/container";
import { TIMEZONE } from "@/shared/lib/date";
import { TZDate } from "@date-fns/tz";
import { Heading } from "@/shared/components/typography/heading";
import { Separator } from "@/shared/components/ui/separator";

const title = "Customers"
import { generateMetadataTitle } from "@/shared/utils/generateMetadata";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: generateMetadataTitle(title),
    description: "Manage your customer information, view their details, and track their interactions. This page provides a comprehensive overview of your customer base.",
}

export default async function AgendaPage() {

    const today = new TZDate(new Date(), TIMEZONE)
    const appointments = await appointmentsService.getFromDay(today, true)
    const services = await servicesService.getActiveServices()
    const businessControls = await businessControlsService.getBusinessControls()

    if (!businessControls) return null

    return (
        <section className="h-full w-full flex flex-col items-center justify-center py-8 md:p-12">
            <Container>
                <Heading>{title}</Heading>
                <Separator className="my-4" />
                <Agenda
                    businessControls={businessControls}
                    isAdmin={true}
                    events={appointments}
                    today={today}
                />
            </Container>
            <AdminAgendaDialog 
                services={services}
            />
            <EditAppointmentDialog 
                services={services}
            />
        </section>
    )
}