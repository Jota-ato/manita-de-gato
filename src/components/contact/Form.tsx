'use client';
import {
    FieldGroup,
} from "@/components/ui/field";

import { Button } from "@/components/ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, contactFormType } from "@/schemas/contactFormt";
import { useForm } from "react-hook-form";
import FieldWLabel from "../agenda/AgendaBody/Form/FieldWLabel";
import { cn } from "@/lib/utils";
import { Spinner } from "../ui/spinner";
import { createContactMessage } from "@/lib/contact/actions";
import { appToast } from "@/lib/utils/toast";

interface ContactFormField {
    label: string,
    type: 'text' | 'email' | 'tel' | 'textarea'
    placeholder: string
    id: keyof contactFormType
    className?: string
}

const contactFormFields: ContactFormField[] = [
    {
        label: 'Nombre',
        type: 'text',
        placeholder: 'Juan',
        id: 'name',
    },
    {
        label: 'Apellido',
        type: 'text',
        placeholder: 'Pérez',
        id: 'last_name',
    },
    {
        label: 'Número de teléfono',
        type: 'tel',
        placeholder: '+52 55 1234 5678',
        id: 'phone',
        className: 'cols-span-2'
    },
    {
        label: 'Correo electrónico',
        type: 'email',
        placeholder: 'correo@ejemplo.com',
        id: 'email',
        className: 'cols-span-2'
    },
    {
        label: 'Motivo',
        type: 'textarea',
        placeholder: 'Cuéntanos cómo podemos ayudarte...',
        id: 'reason',
        className: 'cols-span-2'
    }
];

export default function Form() {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<contactFormType>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            name: '',
            last_name: '',
            phone: '',
            email: '',
            reason: ''
        }
    });

    const onValidSubmit = async (data: contactFormType) => {
        const response = await createContactMessage(data);

        if (response.success) appToast('Formulario enviado', {
            variant: 'success',
            description: `Te contactaremos en breve ${data.name}`
        })
        if (!response.success) appToast('Error al envíar el formulario', {
            variant: 'error',
            description: `Lo sentimos, intenta otra vez en un rato`
        })

        reset();
    }

    return (
        <form onSubmit={handleSubmit(onValidSubmit)} className="space-y-6">
            <FieldGroup className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {contactFormFields.slice(0, 2).map((field) => (
                    <FieldWLabel
                        key={field.id}
                        label={field.label}
                        id={field.id}
                        type={field.type}
                        placeholder={field.placeholder}
                        error={errors[field.id]?.message}
                        {...register(field.id)}
                    />
                ))}
            </FieldGroup>
            <FieldGroup>
                {contactFormFields.slice(2).map((field) => (
                    <FieldWLabel
                        key={field.id}
                        label={field.label}
                        id={field.id}
                        type={field.type}
                        placeholder={field.placeholder}
                        error={errors[field.id]?.message}
                        {...register(field.id)}
                    />
                ))}
            </FieldGroup>
            <Button
                size={'lg'}
                type="submit"
                disabled={isSubmitting}
                className={cn(isSubmitting && 'cursor-not-allowed')}
            >
                {isSubmitting ? <p className="flex items-center gap-2"><Spinner />Enviando...</p> : 'Enviar'}
            </Button>
        </form>
    )
}