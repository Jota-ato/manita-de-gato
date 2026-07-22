"use client"
import { cancellAllDayAction } from "@/features/appointments/admin/actions/admin-appointment-actions";
import { BlockPeriodForm } from "@/features/appointments/admin/components/block-period-form";
import { BlockTimeForm } from "@/features/appointments/admin/components/block-time-form";
import { NewAppointmentManuallyForm } from "@/features/appointments/admin/components/new-appointment-manual";
import { ServiceWithExtras } from "@/features/services/types/service.types";
import { ActionModal } from "@/shared/components/form/action-modal";
import QuickActionsButton from "@/shared/components/form/quick-action-button";
import { AlertDialogCustom } from "@/shared/components/ui/alert-dialog-custom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Separator } from "@/shared/components/ui/separator";
import { showResponse } from "@/shared/lib/client-actions";
import { CalendarOff, CalendarRange, CalendarX, Plus } from "lucide-react";
import { ReactNode } from "react";

interface quickActionsType {
    title: string
    description: string
    trigger: ReactNode
    children?: ReactNode
}

export function QuickActions({
    services,
    today
}: {
    services: ServiceWithExtras[]
    today: Date
}) {

    const quickActions: quickActionsType[] = [
        {
            title: 'Crear una nueva cita manualmnente',
            description: '',
            trigger: <QuickActionsButton label="Crear cita manualmente" Icon={Plus} />,
            children: <NewAppointmentManuallyForm services={services} />
        },
        {
            title: 'Bloquear día / hora',
            description: '',
            trigger: <QuickActionsButton variant="outline" label="Block day / time" Icon={CalendarOff} />,
            children: <BlockTimeForm />
        },
        {
            title: 'Bloquear periodo',
            description: '',
            trigger: <QuickActionsButton variant="outline" label="Block period" Icon={CalendarRange} />,
            children: <BlockPeriodForm />
        },
    ];

    const cancelAllDay = async () => {
        showResponse(await cancellAllDayAction(today))
    }

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>
                    Quick actions
                </CardTitle>
                <CardDescription>
                    Create, cancel, create block time
                </CardDescription>
                <Separator />
            </CardHeader>

            <CardContent className="space-y-2">
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
                <Separator className="my-4" />

            </CardContent>
            <CardFooter>
                <AlertDialogCustom
                    fullWith
                    action={cancelAllDay}
                    actionLabel="Cancelar todo el día"
                    dialogTitle="¿Estás seguro de que quieres cancelar?"
                    triggerLabel="Cancelar todo el día"
                    dialogDescription="Si te arrepientes, tendrás que cambiar cada estado manualmente."
                    showText
                    triggerIcon={CalendarX}
                />
            </CardFooter>
        </Card>
    )
}