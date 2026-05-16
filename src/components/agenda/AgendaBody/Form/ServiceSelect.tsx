import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Field } from "@/components/ui/field";
import { formatPriceMXN } from "@/lib/utils/currency";

interface ServiceSelectProps {
    services: {
        id: number;
        min_price: number;
        name: string;
        description: string;
    }[]
}

export default function ServiceSelect({ services }: ServiceSelectProps) {
    return (
        <Field>
            <Select>
                <SelectTrigger>
                    <SelectValue placeholder='Elige tu servicio' />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {services.map(service => (
                            <SelectItem
                                key={service.id}
                                value={service.id.toString()}
                                className="w-full"
                            >
                                <h3 className="w-full">{service.name} - <span className="text-muted-foreground ml-auto">{formatPriceMXN(service.min_price)}</span></h3>
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </Field>
    )
}