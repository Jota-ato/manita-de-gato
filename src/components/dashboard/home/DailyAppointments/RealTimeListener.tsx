"use client";
import { useRealtimeAppointments } from "@/hooks/useRealTimeAppointments";

export default function RealtimeListener() {
    useRealtimeAppointments();

    return null;
}