'use client';

import { Appointment } from "@/lib/supabase/schemas";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function DailyIncomeChart({ appointments }: { appointments: Appointment[] }) {

    const incomeByDayRaw = appointments.reduce((acc, app) => {
        const dateStr = format(new Date(app.timeMin), "dd MMM", { locale: es });
        acc[dateStr] = (acc[dateStr] || 0) + app.total_price;
        return acc;
    }, {} as Record<string, number>);

    const barChartData = Object.entries(incomeByDayRaw).map(([date, income]) => ({
        date,
        income,
        fill: 'var(--chart-1)'
    }));


    return (
        <Card className="col-span-1">
            <CardHeader>
                <CardTitle>Flujo de Ingresos Diarios</CardTitle>
            </CardHeader>
            <CardContent className="h-75 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                        <XAxis dataKey="date" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}`} />
                        <Tooltip
                            cursor={{ fill: 'transparent' }}
                        />
                        <Bar dataKey="income" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}