import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface DailyAppointmentsHeaderProps {
    appointmentNumber: number
    capitalizedDate: string
}


export default function DailyAppointmentsHeader({ appointmentNumber, capitalizedDate }: DailyAppointmentsHeaderProps) {
    return (
        <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
                <CardTitle className="text-base font-medium">Citas del día</CardTitle>
                <CardDescription className="text-sm">{capitalizedDate}</CardDescription>
            </div>
            <span className="text-xs font-medium bg-muted text-muted-foreground px-2.5 py-1 rounded-full">
                {appointmentNumber} citas
            </span>
        </CardHeader>
    )
}