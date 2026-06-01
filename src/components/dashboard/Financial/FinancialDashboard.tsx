'use client';

import { Appointment } from "@/lib/supabase/schemas";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, CheckSquare, TrendingUp } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Legend
} from "recharts";

interface FinancialDashboardProps {
    appointments: Appointment[];
}

const CHART_COLORS = [
    'var(--chart-1)',
    'var(--chart-2)',
    'var(--chart-3)',
    'var(--chart-4)',
    'var(--chart-5)'
];

export default function FinancialDashboard({ appointments }: FinancialDashboardProps) {

    const totalIncome = appointments.reduce((sum, apt) => sum + apt.total_price, 0);
    const totalAppointments = appointments.length;
    const averageTicket = totalAppointments > 0 ? totalIncome / totalAppointments : 0;

    const incomeByDayRaw = appointments.reduce((acc, app) => {
        const dateStr = format(new Date(app.timeMin), "dd MMM", { locale: es });
        acc[dateStr] = (acc[dateStr] || 0) + app.total_price;
        return acc;
    }, {} as Record<string, number>);

    const barChartData = Object.entries(incomeByDayRaw).map(([date, income]) => ({
        date,
        income,
        fill: 'var(--success)'
    }));

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

    const formatCurrency = (value: number) => `$${value.toFixed(2)}`;

    return (
        <div className="space-y-8 w-[90%] max-w-6xl mx-auto">

            {/* --- TARJETAS DE MÉTRICAS --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
                        <DollarSign className="w-4 h-4 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-emerald-600">{formatCurrency(totalIncome)}</div>
                        <p className="text-xs text-muted-foreground mt-1">En el periodo seleccionado</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Citas Pagadas</CardTitle>
                        <CheckSquare className="w-4 h-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-600">{totalAppointments}</div>
                        <p className="text-xs text-muted-foreground mt-1">Trabajos completados</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Ticket Promedio</CardTitle>
                        <TrendingUp className="w-4 h-4 text-amber-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-amber-600">{formatCurrency(averageTicket)}</div>
                        <p className="text-xs text-muted-foreground mt-1">Gasto promedio por cita</p>
                    </CardContent>
                </Card>
            </div>

            {/* --- GRÁFICAS --- */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

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
                                <Tooltip cursor={{ fill: 'transparent' }} />
                                <Bar dataKey="income" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

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

            </div>
        </div>
    );
}