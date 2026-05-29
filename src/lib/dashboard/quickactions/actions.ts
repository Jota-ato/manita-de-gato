'use server';

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

// Definimos una interfaz limpia para la respuesta de nuestras Server Actions
interface ActionResponse {
    success: boolean;
    message: string;
}

export async function cancellAllAppointmentsDay(dayStr: string | Date): Promise<ActionResponse> {
    const supabase = await createClient();

    const dateTarget = new Date(dayStr);

    const startOfDay = new Date(dateTarget);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(dateTarget);
    endOfDay.setHours(23, 59, 59, 999);

    const { error } = await supabase
        .from('Appointments')
        .update({ status: 'cancelled' })
        .gte('timeMin', startOfDay.toISOString())
        .lte('timeMin', endOfDay.toISOString())
        .neq('status', 'cancelled');

    if (error) {
        console.error("Supabase bulk cancellation error:", error);
        return {
            success: false,
            message: `No se pudieron cancelar las citas: ${error.message}`
        };
    }

    revalidatePath('/');
    return {
        success: true,
        message: "Todas las citas de este día han sido canceladas exitosamente."
    };
}