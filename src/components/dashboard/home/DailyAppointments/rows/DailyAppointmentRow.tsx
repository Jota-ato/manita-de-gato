import { getClientById } from "@/lib/dashboard/actions";
import { Appointment } from "@/lib/supabase/schemas";
import { Service } from "@/schemas/services";
import AppointmentRowClient from "./AppointmentRowClient";

interface DailyAppointmentRowProps {
    apt: Appointment;
    services: Service[];
    showDate?: boolean
}

export default async function DailyAppointmentRow({ apt, services, showDate }: DailyAppointmentRowProps) {
    const client = await getClientById(apt.client_id);

    return (
        <AppointmentRowClient
            showDate={showDate}
            apt={apt}
            services={services}
            client={client}
        />);
}