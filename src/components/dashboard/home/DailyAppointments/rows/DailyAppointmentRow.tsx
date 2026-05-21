import { getClientById } from "@/lib/dashboard/actions";
import { Appointment } from "@/lib/supabase/schemas";
import { Service } from "@/schemas/services";
import AppointmentRowClient from "./AppointmentRowClient";

interface DailyAppointmentRowProps {
    apt: Appointment;
    services: Service[];
}

export default async function DailyAppointmentRow({ apt, services }: DailyAppointmentRowProps) {
    const client = await getClientById(apt.client_id);

    return (
        <AppointmentRowClient
            apt={apt}
            services={services}
            client={client}
        />);
}