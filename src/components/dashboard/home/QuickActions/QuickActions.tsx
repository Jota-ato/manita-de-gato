'use client';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Plus, CalendarOff, CalendarRange, Ban, Trash2Icon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Appointment } from "@/lib/supabase/schemas";
import ActionModal from "./ActionModal";
import { ReactNode } from "react";
import NewApointmentForm from "./Forms/NewApointmentForm";
import QuickActionsButton from "./QuickActionsButton";
import { Service } from "@/schemas/services";

import { TZDate } from "@date-fns/tz";
import CancelModal from "./CancelModal";

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
            children: 'Bloquear Día / Horario'
        },
        {
            title: 'Bloquear Periodo',
            description: '',
            trigger: <QuickActionsButton variant="outline" label="Bloquear Periodo" Icon={CalendarRange} />,
            children: 'Bloquear Periodo'
        },
    ];

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
                    today={today}
                />
            </CardContent>
        </Card>
    );
}