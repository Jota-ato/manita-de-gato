import { FullAppointment } from "@/features/appointments/core/types/appointments.types";
import { cn } from "@/shared/lib/utils";

export function CustomerStatsGrid({
  customerAppointments,
}: {
  customerAppointments: Omit<FullAppointment, "customer">[];
}) {
  const totalAppointments = customerAppointments.length;

  const completedVisits = customerAppointments.filter(
    (app: any) => app.status === "COMPLETED" || app.status === "PAID",
  ).length;

  const noShows = customerAppointments.filter(
    (app: any) => app.status === "NO_SHOW",
  ).length;

  const noShowRate =
    totalAppointments > 0
      ? ((noShows / totalAppointments) * 100).toFixed(1)
      : "0.0";

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <CustomerStat title="Citas totales" value={totalAppointments} />

      <CustomerStat
        title="Citas completadas"
        value={completedVisits}
        valueClassName="text-success"
      />

      <CustomerStat
        title="Tasa de ausencias"
        value={noShowRate}
        valueClassName="text-destructive"
        description={`${noShows} ausencias de ${totalAppointments}`}
      />
    </div>
  );
}

function CustomerStat({
  title,
  value,
  description,
  valueClassName,
}: {
  title: string;
  value: string | number;
  description?: string;
  valueClassName?: string;
}) {
  return (
    <div className="p-6 border rounded-lg shadow-sm bg-card flex flex-col justify-center">
      <span className="text-sm font-medium text-muted-foreground">{title}</span>
      <span
        className={cn("text-4xl font-bold mt-2 text-primary", valueClassName)}
      >
        {value}
      </span>
      {description && (
        <span className="text-xs text-muted-foreground mt-1">
          {description}
        </span>
      )}
    </div>
  );
}
