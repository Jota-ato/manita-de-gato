'use client';

import { Appointment } from "@/lib/supabase/schemas";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from "recharts";

const CHART_COLORS = [
    'var(--chart-1)',
    'var(--chart-2)',
    'var(--chart-3)',
    'var(--chart-4)',
    'var(--chart-5)'
];

export default function ServiceIncomeChart({ appointments }: { appointments: Appointment[] }) {

    const incomeByServiceRaw = appointments.reduce((acc, app) => {
        const serviceName = app.service_name_snapshot;
        acc[serviceName] = (acc[serviceName] || 0) + app.total_price;
        return acc;
    }, {} as Record<string, number>);

    const pieChartData = Object.entries(incomeByServiceRaw)
        .sort(([, valA], [, valB]) => valB - valA)
        .map(([name, value], index) => ({
            name,
            value,
            fill: CHART_COLORS[index % CHART_COLORS.length]
        }));


    return (
        <Card className="col-span-1">
            <CardHeader>
                <CardTitle>Ingresos por Servicio</CardTitle>
            </CardHeader>
            <CardContent className="h-75 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={pieChartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={90}
                            paddingAngle={5}
                            dataKey="value"
                        />
                        <Tooltip />
                        <Legend verticalAlign="bottom" height={36} iconType="circle" />
                    </PieChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}