import { Button } from "@/components/ui/button";
import {
    DialogClose,
    DialogFooter,
} from "@/components/ui/dialog";

export default function FormFooter() {
    return (
        <DialogFooter>
            <DialogClose asChild>
                <Button variant={'outline'}>Cerrar</Button>
            </DialogClose>
            <Button type="submit">¡Agendar!</Button>
        </DialogFooter>
    )
}