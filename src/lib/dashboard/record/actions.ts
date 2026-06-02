'use server';

import { createClient } from "@/lib/supabase/server";
import { Appointment } from "@/lib/supabase/schemas";

export async function getAppointmentsHistory(
    page: number = 1,
    dateFilter?: string
): Promise<{ success: boolean; data: Appointment[]; totalPages: number; message: string }> {
    try {
        const supabase = await createClient();
        const ITEMS_PER_PAGE = 5;

        const from = (page - 1) * ITEMS_PER_PAGE;
        const to = from + ITEMS_PER_PAGE - 1;

        let query = supabase
            .from('Appointments')
            .select('*', { count: 'exact' });

        if (dateFilter) {
            query = query.lte('timeMin', dateFilter); 
        } else {
            query = query.lte('timeMin', new Date().toISOString());
        }

        const { data, count, error } = await query
            .order('timeMin', { ascending: false })
            .range(from, to);

        if (error) throw error;

        const totalPages = count ? Math.ceil(count / ITEMS_PER_PAGE) : 0;

        return {
            success: true,
            data: data as Appointment[],
            totalPages,
            message: 'Historial obtenido'
        };
    } catch (error) {
        console.error('[HISTORY_ERROR]:', error);
        return { success: false, data: [], totalPages: 0, message: 'Error al obtener historial' };
    }
}