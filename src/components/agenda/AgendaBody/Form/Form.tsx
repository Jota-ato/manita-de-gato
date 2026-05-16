'use client';

import { useEffect, useState } from 'react'
import { FieldGroup } from "@/components/ui/field";
import ServiceSelect from "./ServiceSelect";
import SecondaryCollapsable from "./SecondaryCollapsable";
import FieldWLabel from "./FieldWLabel";
import FormFooter from "./FormFooter";
import { Service } from '@/schemas/services';
import { getServices } from "@/lib/form/service";

export default function Form() {
    const [services, setServices] = useState<Service[]>([])

    useEffect(() => {
        const fetchServices = async () => {
            setServices(await getServices());
        }
        fetchServices()
    }, [])

    return (
        <form>
            <FieldGroup>
                <FieldWLabel
                    field={{ name: 'name', type: 'text' }}
                    label="¿Cuál es tu nombre?"
                />
                <ServiceSelect
                    services={services}
                />
                <FieldWLabel
                    field={{ name: 'phone', type: 'string' }}
                    label="Ingresa tu número de teléfono para contactarte"
                />
                <SecondaryCollapsable />
            </FieldGroup>
            <FormFooter />
        </form>
    )
}