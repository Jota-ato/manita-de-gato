'use client';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogMedia, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Ban, Trash2Icon } from "lucide-react";

interface CancelModalProps { 
    action: () => void
    triggerLabel: string
    cardTitle: string
    cardDescription: string
    cardButtonLabel: string
}

export default function CancelModal({ action, cardTitle, cardDescription, cardButtonLabel, triggerLabel }: CancelModalProps) {
    
    return (
        <AlertDialog>
            <AlertDialogTrigger
                asChild
            >
                <Button
                    variant="destructive"
                    className="justify-start gap-3"
                    size="lg"
                >
                    <Ban className="size-5" />
                    {triggerLabel}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogMedia className="bg-destructive/10 text-destructive">
                        <Trash2Icon />
                    </AlertDialogMedia>
                    <AlertDialogTitle>{cardTitle}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {cardDescription}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel variant="outline">Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={action} variant="destructive">{cardButtonLabel}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}