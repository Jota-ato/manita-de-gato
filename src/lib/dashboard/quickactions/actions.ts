'use server';

import { deleteGoogleCalendarEvent } from "@/lib/calendar/service";
import { createAppointment, createAppointmentProps } from "@/lib/form/service";
import { createClient } from "@/lib/supabase/server";
import { TIMEZONE } from "@/lib/supabase/utils/helpers";
import { TZDate } from "@date-fns/tz";
import { endOfDay, startOfDay } from "date-fns";
import { revalidatePath } from "next/cache";

interface ActionResponse {
    success: boolean;
    message: string;
}

// Reutilizamos tu lógica auxiliar de borrado interno en Google
// Asumimos que esta función ya la tienes exportada en tus servicios

export async function cancellAllAppointmentsDay(dayStr: string | Date): Promise<ActionResponse> {
    const supabase = await createClient();
    const dateTarget = new Date(dayStr);

    const startOfDay = new TZDate(dateTarget, TIMEZONE);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new TZDate(dateTarget, TIMEZONE);
    endOfDay.setHours(23, 59, 59, 999);

    try {
        // STEP 1: Obtener todas las citas del día que tengan evento de Google y no estén canceladas
        const { data: appointments, error: fetchError } = await supabase
            .from('Appointments') // Respeta las mayúsculas de tu base de datos
            .select('id, google_event_id')
            .gte('timeMin', startOfDay.toISOString())
            .lte('timeMin', endOfDay.toISOString())
            .neq('status', 'cancelled');

        if (fetchError) throw fetchError;

        if (!appointments || appointments.length === 0) {
            return { success: true, message: "No hay citas activas para cancelar en este día." };
        }

        const googleEventIds = appointments
            .map(app => app.google_event_id)
            .filter((id): id is string => !!id);

        if (googleEventIds.length > 0) {
            const googlePromises = googleEventIds.map(eventId => deleteGoogleCalendarEvent(eventId));
            const results = await Promise.allSettled(googlePromises);

            results.forEach((result, index) => {
                if (result.status === 'rejected' || (result.value && !result.value.success)) {
                    console.warn(`Warning: Failed to delete Google Event ${googleEventIds[index]} from calendar.`);
                }
            });
        }

        const { error: updateError } = await supabase
            .from('Appointments')
            .update({
                status: 'cancelled',
                google_event_id: null
            })
            .gte('timeMin', startOfDay.toISOString())
            .lte('timeMin', endOfDay.toISOString());

        if (updateError) throw updateError;

        revalidatePath('/dashboard');

        return {
            success: true,
            message: `Se han cancelado exitosamente ${appointments.length} citas y se limpió la agenda externa.`
        };

    } catch (error) {
        console.error("CRITICAL ERROR IN BULK CANCELLATION:", error);
        return {
            success: false,
            message: error instanceof Error ? error.message : "Error crítico al ejecutar la cancelación masiva."
        };
    }
}

interface createBlockTimeProps {
    timeMin?: string | Date
    timeMax?: string | Date
}

export async function createBlockTime({
    timeMin = startOfDay(new TZDate(new Date(), TIMEZONE)),
    timeMax = endOfDay(new TZDate(new Date(), TIMEZONE))
}: createBlockTimeProps)
    : Promise<{
        success: boolean;
        message: string;
    }> {

    let safeTimeMin, safeTimeMax;

    if (!timeMin || !timeMax) {
        const today = new Date();
        safeTimeMin = startOfDay(today);
        safeTimeMax = endOfDay(today);
    } else {
        const parsedMin = new Date(timeMin);
        const parsedMax = new Date(timeMax);

        if (isNaN(parsedMin.getTime()) || !isNaN(parsedMax.getTime())) {
            safeTimeMin = parsedMin;
            safeTimeMax = parsedMax;
        } else {
            const today = new Date();
            safeTimeMin = startOfDay(today);
            safeTimeMax = endOfDay(today);
        }
    }

    console.log(`Inicio del bloqueo: ${safeTimeMin.toISOString()}, fin del bloqueo: ${safeTimeMax.toISOString()}`)

    const payload: createAppointmentProps = {
        name: 'BLOQUEO MANUAL',
        last_name: '',
        phone: 'BLOQUEO MANUAL',
        serviceId: '0',
        timeMin: safeTimeMin,
        timeMax: safeTimeMax,
        status: 'no_show'
    }

    return await createAppointment(payload);
}