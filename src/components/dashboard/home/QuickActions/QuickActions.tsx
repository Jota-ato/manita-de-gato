'use client';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Plus, CalendarOff, CalendarRange } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Appointment } from "@/lib/supabase/schemas";
import ActionModal from "./ActionModal";
import { ReactNode } from "react";
import NewApointmentForm from "./Forms/NewApointmentForm";
import QuickActionsButton from "./QuickActionsButton";
import { Service } from "@/schemas/services";

import { TZDate } from "@date-fns/tz";
import CancelModal from "./CancelModal";
import BlockTimeForm from "./Forms/BlockTimeForm";
import BlockPeriodForm from "./Forms/BlockPeriodForm";
import { cancellAllAppointmentsDay } from "@/lib/dashboard/quickactions/actions";
import { toast } from "sonner";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface QuickActionsProps {
    todayAppointments: Appointment[]
    services: Service[]
    today: TZDate
}

interface quickActionsType {
    title: string
    description: string
    trigger: ReactNode
    children?: ReactNode
}



export default function QuickActions({ services, today }: QuickActionsProps) {

    const quickActions: quickActionsType[] = [
        {
            title: 'Crear cita manualmente',
            description: '',
            trigger: <QuickActionsButton label="Nueva Cita Manual" Icon={Plus} />,
            children: <NewApointmentForm services={services} />
        },
        {
            title: 'Bloquear Día / Horario',
            description: '',
            trigger: <QuickActionsButton variant="outline" label="Bloquear Día / Horario" Icon={CalendarOff} />,
            children: <BlockTimeForm />
        },
        {
            title: 'Bloquear Periodo',
            description: '',
            trigger: <QuickActionsButton variant="outline" label="Bloquear Periodo" Icon={CalendarRange} />,
            children: <BlockPeriodForm />
        },
    ];

    const handleClick = async () => {
        const response = await cancellAllAppointmentsDay(today);

        if (response.success) toast.success(response.message)
        if (!response.success) toast.error(response.message)
    }

    return (
        <Card className="h-full flex flex-col border-border shadow-sm">
            <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold">Acciones Rápidas</CardTitle>
                <CardDescription>
                    Centro de control de tu agenda diaria
                </CardDescription>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col gap-3">

                {quickActions.map(action => (
                    <ActionModal
                        key={action.title}
                        title={action.title}
                        description={action.description}
                        trigger={action.trigger}
                    >
                        {action.children}
                    </ActionModal>
                ))}

                <Separator />

                <CancelModal
                    action={handleClick}
                    triggerLabel="Cancelar todo hoy"
                    cardTitle="¿Cancelar todas las citas de hoy?"
                    cardDescription={`Cancelarias todas las citas del ${format(today, "eeee, d 'de' MMMM 'de' yyyy", { locale: es })}`}
                    cardButtonLabel="Cancelar todas las citas"
                />
            </CardContent>
        </Card>
    );
}