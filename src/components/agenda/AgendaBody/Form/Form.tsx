'use client';

// External libraries

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
// Components
import { FieldGroup } from "@/components/ui/field";
import ServiceSelect from "./ServiceSelect";
import CollapsableField from "./CollapsableField";
import FieldWLabel from "./FieldWLabel";
import FormFooter from "./FormFooter";

// Local types and functions
import { AgendaFormSchema, type AgendaFormData } from '@/schemas/agendaForm';
import { addHours } from 'date-fns';
import { createAppointment } from "@/lib/form/service";
import { getServices } from "@/lib/form/service";
import { Service } from '@/schemas/services';
import { buildWhatsAppRedirectUrl } from "@/lib/form/helpers";

interface FormProps {
    hour: Date;
    onSuccess: (value: boolean) => void;
}

export default function Form({ hour, onSuccess }: FormProps) {

    const [services, setServices] = useState<Service[]>([])
    useEffect(() => {
        const fetchServices = async () => {
            setServices(await getServices());
        }
        fetchServices()
    }, [])

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting }
    } = useForm<AgendaFormData>({
        resolver: zodResolver(AgendaFormSchema),
        defaultValues: {
            name: '',
            phone: '',
            serviceId: '',
            secondary_phone: ''
        }
    });

    const onValidSubmit = async (data: AgendaFormData) => {
        const timeMin = hour;
        const timeMax = addHours(hour, 2);
        try {
            await createAppointment({ timeMin, timeMax, ...data });
            const service = services.filter(service => service.id.toString() === data.serviceId)[0];
            const redirectURL = buildWhatsAppRedirectUrl({ timeMin, timeMax, clientName: data.name, service: service.name });
            onSuccess(false);
            console.log(redirectURL);
            window.open(redirectURL, '_blank');
        } catch (error) {
            console.error("Submission failed", error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onValidSubmit)}>
            <FieldGroup>
                <FieldWLabel
                    id='name'
                    type='text'
                    label='¿Cuál es tu nombre?'
                    error={errors.name?.message}
                    {...register('name')}
                />
                <ServiceSelect
                    control={control}
                    error={errors.serviceId?.message}
                    services={services}
                />
                <FieldWLabel
                    id='phone'
                    type='tel'
                    label='Ingresa tu número de teléfono para contactarte'
                    error={errors.phone?.message}
                    {...register('phone')}
                />
                <CollapsableField
                    id='secondary_phone'
                    type='tel'
                    label='¿Te gustaría compartir un teléfono alternativo?'
                    error={errors.secondary_phone?.message}
                    {...register('secondary_phone')}
                />
            </FieldGroup>
            <FormFooter
                isSubmitting={isSubmitting}
            />
        </form>
    )
}