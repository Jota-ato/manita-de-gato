import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Input } from "@/components/ui/input";
import { format, addHours } from "date-fns";
import { ChevronDown } from "lucide-react";


interface HourCellProps {
    hour: Date
}

export default function HourCell({ hour }: HourCellProps) {

    const startHour = format(hour, 'HH:mm');
    const endHour = format(addHours(hour, 2), 'HH:mm')

    return (
        <form>
            <Dialog>
                <DialogTrigger asChild>
                    <div
                        className="w-full h-20 border-b border-pink-50 cursor-pointer transition-colors hover:bg-pink-50/50 group relative"
                    >
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 border-2 border-pink-200/50 m-1 pointer-events-none transition-opacity" />
                    </div>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Has seleccionado el horario {startHour}-{endHour}</DialogTitle>
                        <DialogDescription>¿Qué te interesa más?</DialogDescription>
                    </DialogHeader>

                    <FieldGroup>
                        <Field>
                            <FieldLabel
                                htmlFor="name"
                            >
                                ¿Cuál es tu nombre?
                            </FieldLabel>
                            <Input
                                type="text"
                                name="name"
                                id="name"
                            />
                        </Field>
                        <Field>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder='Elige tu servicio' />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem
                                            value="uñas"
                                        >
                                            Uñas
                                        </SelectItem>
                                        <SelectItem
                                            value="corteCabello"
                                        >
                                            Corte de cabello
                                        </SelectItem>
                                        <SelectItem
                                            value="pedicure"
                                        >
                                            Pedicure
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </Field>
                        <Field>
                            <FieldLabel
                                htmlFor="phone"
                            >
                                Proporciona un número de teléfono para contactarte
                            </FieldLabel>
                            <Input
                                type="text"
                                name="phone"
                                id="phone"
                            />
                        </Field>
                    </FieldGroup>
                    <Collapsible>
                        <CollapsibleTrigger asChild>
                            <p className="flex items-center gap-2 cursor-pointer">
                                ¿Te gustaría compartir un teléfono alternativo?
                                <ChevronDown />
                            </p>
                        </CollapsibleTrigger>
                        <CollapsibleContent asChild>
                            <Field>
                                <Input
                                    type="text"
                                    name="phone"
                                    id="phone"
                                />
                            </Field>
                        </CollapsibleContent>
                    </Collapsible>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant={'outline'}>Cerrar</Button>
                        </DialogClose>
                        <Button type="submit">¡Agendar!</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </form>
    )
}