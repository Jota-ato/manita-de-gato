import { Button } from "@/components/ui/button";
import {
    DialogClose,
    DialogFooter,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

interface FormFooterProps {
    isSubmitting: boolean
}

export default function FormFooter({ isSubmitting }: FormFooterProps) {
    return (
        <DialogFooter className={cn("flex items-center gap-2", isSubmitting ? 'justify-between' : 'justify-end' )}>
            {isSubmitting && <div className="flex items-center justify-center p-2">
                <Spinner /></div>}
            <div className="flex items-center gap-2">
                <DialogClose asChild>
                    <Button variant={'outline'}>Cerrar</Button>
                </DialogClose>
                <Button type="submit">¡Agendar!</Button>
            </div>
        </DialogFooter>
    )
}