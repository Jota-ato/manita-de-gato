import AppointmentsTable from "@/components/dashboard/home/DailyAppointments/table/AppointmentsTable";
import PaginationControls from "@/components/dashboard/record/PaginationControls";
import DateFilter from "@/components/dashboard/record/DateFilter";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Appointment } from "@/lib/supabase/schemas";

interface HistoryCardProps {
    currentPage: number;
    totalPages: number;
    appointments: Appointment[];
    success: boolean;
}

export default function RecordCard({
    currentPage,
    totalPages,
    appointments,
    success
}: HistoryCardProps) {
    return (
        <Card className="w-[90%] max-w-6xl">
            <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <CardTitle>Historial de citas</CardTitle>
                    <CardDescription>
                        Mostrando página {currentPage} de {totalPages || 1}
                    </CardDescription>
                </div>
                <DateFilter />
            </CardHeader>

            <CardContent>
                {success ? (
                    <AppointmentsTable showDate={true} appointments={appointments} />
                ) : (
                    <p className="text-destructive font-medium">Error cargando los datos.</p>
                )}
            </CardContent>

            <CardFooter className="flex justify-end">
                <PaginationControls
                    currentPage={currentPage}
                    totalPages={totalPages}
                />
            </CardFooter>
        </Card>
    );
}