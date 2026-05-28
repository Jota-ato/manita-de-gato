'use client';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, CalendarOff, CalendarRange, Ban } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Appointment } from "@/lib/supabase/schemas";
import ActionModal from "./ActionModal";
import { ReactNode } from "react";
import NewApointmentForm from "./Forms/NewApointmentForm";
import QuickActionsButton from "./QuickActionsButton";
import { Service } from "@/schemas/services";

interface QuickActionsProps {
    todayAppointments: Appointment[]
    services: Service[]
}

interface quickActionsType {
    title: string
    description: string
    trigger: ReactNode
    children?: ReactNode
}

const quickActions: quickActionsType[] = [
    {
        title: 'Crear cita manualmente',
        description: '',
        trigger: <QuickActionsButton label="Nueva Cita Manual" Icon={Plus} />,
        children: <NewApointmentForm />
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

export default function QuickActions({ }: QuickActionsProps) {
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

                <Button
                    variant="destructive"
                    className="w-full justify-start gap-3"
                    size="lg"
                // onClick={() => openAlertDialog('cancel-all')}
                >
                    <Ban className="size-5" />
                    Cancelar todo hoy
                </Button>

            </CardContent>
        </Card>
    );
}