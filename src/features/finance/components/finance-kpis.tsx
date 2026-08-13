"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { DollarSign, CheckSquare, TrendingUp } from "lucide-react";
import { FinancialMetricsDTO } from "../types/finance.type";
import { formatMXN } from "@/shared/lib/currency";

export function FinancialKPIs({ data }: { data: FinancialMetricsDTO["kpis"] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">
            Ingresos totales
          </CardTitle>
          <DollarSign className="w-4 h-4 text-success" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold  text-success">
            {formatMXN(data.totalIncome)}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Citas pagadas</CardTitle>
          <CheckSquare className="w-4 h-4 text-info" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-info">
            {data.totalAppointments}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">
            Costo promedio por cita
          </CardTitle>
          <TrendingUp className="w-4 h-4 text-amber-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-amber-600">
            {formatMXN(data.averageTicket)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
