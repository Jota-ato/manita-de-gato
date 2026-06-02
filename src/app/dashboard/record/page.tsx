import AppointmentsTable from "@/components/dashboard/home/DailyAppointments/table/AppointmentsTable";
import PaginationControls from "@/components/dashboard/record/PaginationControls";
import DateFilter from "@/components/dashboard/record/DateFilter";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getAppointmentsHistory } from "@/lib/dashboard/record/actions";

interface RecordPageProps {
    searchParams: Promise<{ page?: string; date?: string }>;
}

export default async function RecordPage({ searchParams }: RecordPageProps) {
    const resolvedParams = await searchParams;
    const currentPage = Number(resolvedParams?.page) || 1;
    const searchDate = resolvedParams?.date;

    const { data, totalPages, success } = await getAppointmentsHistory(currentPage, searchDate);

    return (
        <section className="min-h-screen p-8 md:p-12 flex items-center justify-center">
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
                        <AppointmentsTable showDate={true} appointments={data} />
                    ) : (
                        <p>Error cargando los datos.</p>
                    )}
                </CardContent>

                <CardFooter className="flex justify-end">
                    <PaginationControls
                        currentPage={currentPage}
                        totalPages={totalPages}
                    />
                </CardFooter>
            </Card>
        </section>
    );
}