"use client";
import { useRealtimeAppointments } from "@/hooks/useRealTimeAppointmentsDashboard";

export default function RealtimeListenerDashboard() {
    useRealtimeAppointments();

    return null;
}