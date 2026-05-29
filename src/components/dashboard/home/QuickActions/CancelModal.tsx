'use client';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogMedia, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Ban, Trash2Icon } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { TZDate } from "@date-fns/tz";
import { cancellAllAppointmentsDay } from "@/lib/dashboard/quickactions/actions";
import { toast } from "sonner";


export default function CancelModal({ today }: { today: TZDate }) {

    const handleClick = async () => { 
        const response = await cancellAllAppointmentsDay(today);

        if (response.success) toast.success(response.message)
        if (!response.success) toast.error(response.message)
    }
    
    return (
        <AlertDialog>
            <AlertDialogTrigger
                asChild
            >
                <Button
                    variant="destructive"
                    className="w-full justify-start gap-3"
                    size="lg"
                >
                    <Ban className="size-5" />
                    Cancelar todo hoy
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogMedia className="bg-destructive/10 text-destructive">
                        <Trash2Icon />
                    </AlertDialogMedia>
                    <AlertDialogTitle>¿Cancelar todas las citas de hoy?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Cancelarias todas las citas del {format(today, 'dd MMMM yyyy', { locale: es })}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleClick} variant="destructive">Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}