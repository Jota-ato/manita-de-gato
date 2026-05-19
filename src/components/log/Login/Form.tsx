'use client';
import {
    FieldGroup,
    FieldSet,
    FieldLegend
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import FieldWLabel from "@/components/agenda/AgendaBody/Form/FieldWLabel";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { logInSchema, LogInType } from "@/lib/log/logIn/schemas";
import { signIn } from "@/lib/log/logIn/actions";

export default function Form() {

    const [serverError, setServerError] = useState<string | null>('');

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<LogInType>({
        resolver: zodResolver(logInSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onValidSubmit = async (data: LogInType) => {
        setServerError(null);
        const result = await signIn(data);

        if (result.error) setServerError(result.error);
    }

    return (
        <form onSubmit={handleSubmit(onValidSubmit)}>
            <FieldSet>
                <FieldLegend className="sr-only">
                    Credenciales de acceso
                </FieldLegend>
                <FieldGroup>
                    <FieldWLabel
                        label="Correo electrónico"
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="tu@correo.com"
                        error={errors.email?.message}
                        {...register('email')}
                    />
                    <FieldWLabel
                        label="Contraseña"
                        id="password"
                        type="password"
                        autoComplete="current-password"
                        error={errors.password?.message}
                        {...register('password')}
                    />
                </FieldGroup>

                {serverError &&
                    <p role="alert" className="text-sm text-destructive">
                        {serverError}
                    </p>
                }

                <Button type="submit" className="w-full">
                    {isSubmitting ? 'Ingresando' : 'Entrar'}
                </Button>
            </FieldSet>
        </form>
    )
}