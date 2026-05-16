import { Button } from "@/components/ui/button";
import {
    DialogClose,
    DialogFooter,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";

interface FormFooterProps {
    isSubmitting: boolean
}

export default function FormFooter({ isSubmitting }: FormFooterProps) {
    return (
        <DialogFooter>
            <div>
                <DialogClose asChild>
                    <Button variant={'outline'}>Cerrar</Button>
                </DialogClose>
                <Button type="submit">¡Agendar!</Button>
            </div>
            {isSubmitting && <Spinner />}
        </DialogFooter>
    )
}