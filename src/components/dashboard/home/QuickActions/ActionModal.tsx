'use client';

import { ReactNode } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface NewAppointmentModalProps {
    title: string
    description: string
    children?: ReactNode
    trigger: ReactNode;
}

export default function ActionModal({ title, description, trigger, children }: NewAppointmentModalProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>

                {children ?
                    children :
                    <div className="py-4">
                        <p className="text-sm text-muted-foreground">Formulario en construcción...</p>
                    </div>
                }
            </DialogContent>
        </Dialog>
    );
}