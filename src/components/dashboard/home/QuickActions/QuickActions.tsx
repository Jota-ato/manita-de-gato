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

export default function QuickActions() {
    return (
        <Card className="h-full flex flex-col border-border shadow-sm">
            <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold">Acciones Rápidas</CardTitle>
                <CardDescription>
                    Centro de control de tu agenda diaria
                </CardDescription>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col gap-3">

                {/* Acción Primaria: Creación */}
                <Button
                    className="w-full justify-start gap-3 shadow-sm"
                    size="lg"
                // onClick={() => openModal('new-appointment')}
                >
                    <Plus className="size-5" />
                    Nueva Cita Manual
                </Button>

                {/* Acciones Secundarias: Bloqueos temporales */}
                <Button
                    variant="outline"
                    className="w-full justify-start gap-3"
                    size="lg"
                // onClick={() => openModal('block-time')}
                >
                    <CalendarOff className="size-5 text-muted-foreground" />
                    Bloquear Día / Horario
                </Button>

                <Button
                    variant="outline"
                    className="w-full justify-start gap-3"
                    size="lg"
                // onClick={() => openModal('block-period')}
                >
                    <CalendarRange className="size-5 text-muted-foreground" />
                    Bloquear Periodo
                </Button>

                {/* Separador visual para aislar la acción destructiva */}
                <Separator />

                {/* Acción Destructiva: Mutación Masiva (Requiere AlertDialog en el futuro) */}
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