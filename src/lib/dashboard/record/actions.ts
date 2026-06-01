'use server';

import { createClient } from "@/lib/supabase/server";
import { Appointment } from "@/lib/supabase/schemas"; // Asumiendo tu schema

export async function getAppointmentsHistory(
    page: number = 1,
    dateFilter?: string
): Promise<{ success: boolean; data: Appointment[]; totalPages: number; message: string }> {
    try {
        const supabase = await createClient();
        const ITEMS_PER_PAGE = 5;

        // 1. La matemática de paginación
        const from = (page - 1) * ITEMS_PER_PAGE;
        const to = from + ITEMS_PER_PAGE - 1;

        // 2. Construimos la consulta base. 
        // Pedimos count: 'exact' para que Postgres cuente por nosotros.
        let query = supabase
            .from('Appointments')
            .select('*', { count: 'exact' });

        // 3. Filtro de fecha: Desde la fecha seleccionada hacia atrás
        if (dateFilter) {
            // lte = Less Than or Equal (Menor o igual a la fecha)
            query = query.lte('timeMin', dateFilter); 
        } else {
            // Si no hay filtro, por defecto desde HOY hacia atrás
            query = query.lte('timeMin', new Date().toISOString());
        }

        // 4. Ordenamos descendente (más recientes primero) y aplicamos el rango
        const { data, count, error } = await query
            .order('timeMin', { ascending: false })
            .range(from, to);

        if (error) throw error;

        // 5. Calculamos el total de páginas (ej. 12 items / 5 = 2.4 -> 3 páginas)
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