import { Appointment } from "@/lib/supabase/schemas";
import { format, differenceInMinutes } from "date-fns";
import ActionModal from "../home/QuickActions/ActionModal";
import EventBackGround from "./EventBackground";
import NewApointmentForm from "../home/QuickActions/Forms/NewApointmentForm";
import { useEffect, useState } from "react";
import { Service } from "@/schemas/services";
import { getServices } from "@/lib/form/service";

interface EventProps {
    event: Appointment
    START_HOUR: number
    ROW_HEIGHT_REM: number
}



export default function Event({ event, START_HOUR, ROW_HEIGHT_REM }: EventProps) {

    const [services, setServices] = useState<Service[]>([]);

    useEffect(() => {
        const fetchServices = async () => {
            setServices(await getServices());
        }
        fetchServices()
    }, []);

    const start = new Date(event.timeMin);
    const end = new Date(event.timeMax);

    const startDate = start.toISOString();
    const endDate = end.toISOString();

    // Calculate minutes from start (08:00)
    const startBase = new Date(startDate);
    startBase.setHours(START_HOUR, 0, 0, 0);

    const minutesFromStart = differenceInMinutes(startDate, startBase);
    const durationMinutes = differenceInMinutes(endDate, startDate);

    // Convert minuts to rem (5rem = 60min)
    const topOffset = (minutesFromStart * ROW_HEIGHT_REM) / 120;
    const height = (durationMinutes * ROW_HEIGHT_REM) / 120;
    if (height < 5) return

    return (
        <ActionModal
            trigger={
                <EventBackGround
                    event={event}
                    topOffset={topOffset}
                    height={height}
                    startDate={startDate}
                    endDate={endDate}
                />
            }
            title={`Editando cita de ${event.client_name_snapshot}`}
            description={`Hora: ${format(startDate, 'HH:mm')}-${format(endDate, 'HH:mm')}`}
        >
            <NewApointmentForm
                services={services}
            />
        </ActionModal>
    )
}