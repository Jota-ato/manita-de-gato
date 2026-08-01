import { CalendarX, TrendingUp, Users } from "lucide-react";
import { StatCard } from "./stat-card";

interface ClientsStatsGridProps {
    totalCustomers: number;
    newCustomersThisMonth: number;
    noShowRate: number;
}

export function CustomersStatsGrid({
    totalCustomers,
    newCustomersThisMonth,
    noShowRate,
}: ClientsStatsGridProps) {
    const noShowDisplay = `${noShowRate.toFixed(1)}%`;

    const noShowVariant =
        noShowRate < 5
            ? "success"
            : noShowRate < 15
                ? "warning"
                : "destructive";

    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <StatCard
                label="Clientes totales"
                value={totalCustomers.toLocaleString()}
                description="Todos los clientes registrados"
                icon={Users}
                variant="default"
            />
            <StatCard
                label="Nuevos este mes"
                value={newCustomersThisMonth.toLocaleString()}
                description="Se unieron en el periodo actual"
                icon={TrendingUp}
                variant="success"
            />
            <StatCard
                label="Tasa de inasistencias"
                value={noShowDisplay}
                className="sm:col-span-2 lg:col-span-1"
                description="Citas no atendidas este mes"
                icon={CalendarX}
                variant={noShowVariant}
            />
        </div>
    );
}