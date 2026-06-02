import { getAppointmentsHistory } from "@/lib/dashboard/record/actions";
import RecordCard from "@/components/dashboard/record/RecordCard";

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
            <RecordCard 
                currentPage={currentPage}
                totalPages={totalPages}
                appointments={data}
                success={success}
            />
        </section>
    );
}