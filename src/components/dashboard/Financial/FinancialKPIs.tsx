'use client';

import { Appointment } from "@/lib/supabase/schemas";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, CheckSquare, TrendingUp } from "lucide-react";

export default function FinancialKPIs({ appointments }: { appointments: Appointment[] }) {

    const totalIncome = appointments.reduce((sum, apt) => sum + apt.total_price, 0);
    const totalAppointments = appointments.length;
    const averageTicket = totalAppointments > 0 ? totalIncome / totalAppointments : 0;

    const formatCurrency = (value: number) => `$${value.toFixed(2)}`;

    return (
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
    );
}