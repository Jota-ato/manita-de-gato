'use client';

// External libraries

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { SubmitEvent } from 'react';

// Components
import { FieldGroup } from "@/components/ui/field";
import ServiceSelect from "./ServiceSelect";
import CollapsableField from "./CollapsableField";
import FieldWLabel from "./FieldWLabel";
import FormFooter from "./FormFooter";

// Local types and functions
import { AgendaFormSchema, type AgendaFormData } from '@/schemas/agendaForm';

export default function Form() {

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

    const onValidSubmit = (data: AgendaFormData) => {
        console.log('Datos listos para enviar a Supabase/Prisma:', data);
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
            <FormFooter />
        </form>
    )
}