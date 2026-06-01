'use server';

import { Appointment, AppointmentSchema } from "@/lib/supabase/schemas";
import { createClient } from "@/lib/supabase/server";

export async function getFinancialData(
    startDate: Date,
    endDate: Date
): Promise<{ success: boolean; data: Appointment[]; message: string }> {
    try {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from('Appointments')
            .select('*')
            .eq('status', 'paid')
            .gte('timeMin', startDate.toISOString())
            .lte('timeMin', endDate.toISOString());

        if (error) {
            console.error('[FINANCE_FETCH_ERROR]:', error.message);
            return { success: false, data: [], message: 'Error al obtener los datos financieros.' };
        }

        const validAppointments = (data || []).flatMap((appointment) => {
            const result = AppointmentSchema.safeParse(appointment);
            return result.success ? result.data : [];
        }).sort((a, b) => new Date(a.timeMin).getTime() - new Date(b.timeMin).getTime());

        return {
            success: true,
            data: validAppointments,
            message: 'Datos financieros obtenidos correctamente.'
        };

    } catch (error) {
        console.error('[FINANCE_CRITICAL_ERROR]:', error);
        return { success: false, data: [], message: 'Error interno del servidor.' };
    }
}