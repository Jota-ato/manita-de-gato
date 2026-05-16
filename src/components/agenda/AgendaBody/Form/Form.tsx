'use client';

// External libraries

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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

interface FormProps {
    hour: Date;
    onSuccess: (value: boolean) => void;
}

export default function Form({ hour, onSuccess }: FormProps) {

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
            await createAppointment({timeMin, timeMax, ...data});
            console.log("Appointment created successfully!");
            onSuccess(false);
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