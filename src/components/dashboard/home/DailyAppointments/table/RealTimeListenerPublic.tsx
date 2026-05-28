"use client";
import { useRealtimeAppointments } from "@/hooks/useRealTimeAppointmentsPublic";

export default function RealtimeListenerPublic() {
    useRealtimeAppointments();

    return null;
}