'use server';

import { createClient } from "@/lib/supabase/server";
import { TIMEZONE } from "@/lib/supabase/utils/helpers";
import { TZDate } from "@date-fns/tz";
import { format } from "date-fns";
import { es } from "date-fns/locale";

// Definimos el tipo aquí para poder usarlo en la función
export type TimeRange = 'day' | 'week' | 'month' | 'year';

export interface FinancialMetricsDTO {
    kpis: {
        totalIncome: number;
        totalAppointments: number;
        averageTicket: number;
        expected: number;
        paid: number;
    };
    dailyIncome: { date: string; income: number }[];
    serviceIncome: { name: string; value: number }[];
}

export async function getFinancialData(
    startDate: TZDate,
    endDate: TZDate,
    range: TimeRange 
): Promise<{ success: boolean; data: FinancialMetricsDTO | null; message: string }> {
    try {
        const supabase = await createClient();
        const safeStartDate = new TZDate(startDate, TIMEZONE);
        const safeEndDate = new TZDate(endDate, TIMEZONE);

        const { data, error } = await supabase
            .from('Appointments')
            .select('id, total_price, timeMin, status, service_name_snapshot')
            .in('status', ['paid', 'approved'])
            .gte('timeMin', safeStartDate.toISOString())
            .lte('timeMin', safeEndDate.toISOString())
            .order('timeMin', { ascending: true });

        if (error) {
            console.error('[FINANCE_FETCH_ERROR]:', error.message);
            return { success: false, data: null, message: 'Error al obtener los datos financieros.' };
        }

        let dateFormatStr = "dd MMM";
        switch (range) {
            case 'year':
                dateFormatStr = "MMM";
                break;
            case 'month':
                dateFormatStr = "dd MMM";
                break;
            case 'week':
                dateFormatStr = "EEEE"; 
                break;
            case 'day':
                dateFormatStr = "HH:00";
                break;
        }

        let totalIncome = 0;
        let totalAppointments = 0;
        let expected = 0;
        let paid = 0;

        const incomeByDayRaw: Record<string, number> = {};
        const incomeByServiceRaw: Record<string, number> = {};

        (data || []).forEach((app) => {
            const price = Number(app.total_price || 0);

            if (app.status === 'approved' || app.status === 'paid') {
                expected += price;
            }

            if (app.status === 'paid') {
                paid += price;
                totalIncome += price;
                totalAppointments++;

                const rawDateStr = format(new Date(app.timeMin), dateFormatStr, { locale: es });
                const dateStr = rawDateStr.charAt(0).toUpperCase() + rawDateStr.slice(1);

                incomeByDayRaw[dateStr] = (incomeByDayRaw[dateStr] || 0) + price;

                const serviceName = app.service_name_snapshot || 'General';
                incomeByServiceRaw[serviceName] = (incomeByServiceRaw[serviceName] || 0) + price;
            }
        });

        const averageTicket = totalAppointments > 0 ? totalIncome / totalAppointments : 0;

        return {
            success: true,
            data: {
                kpis: { totalIncome, totalAppointments, averageTicket, expected, paid },
                dailyIncome: Object.entries(incomeByDayRaw).map(([date, income]) => ({ date, income })),
                serviceIncome: Object.entries(incomeByServiceRaw)
                    .sort(([, valA], [, valB]) => valB - valA)
                    .map(([name, value], index) => ({ name, value, index }))
            },
            message: 'Datos financieros calculados.'
        };

    } catch (error) {
        console.error('[FINANCE_CRITICAL_ERROR]:', error);
        return { success: false, data: null, message: 'Error interno del servidor.' };
    }
}