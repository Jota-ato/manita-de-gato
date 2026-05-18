'use client';
import {
    FieldGroup,
    FieldSet,
    FieldLegend
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import FieldWLabel from "@/components/agenda/AgendaBody/Form/FieldWLabel";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { logInSchema, LogInType } from "@/lib/log/logIn/schemas";
import { email } from "zod";

export default function Form() {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LogInType>({
        resolver: zodResolver(logInSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onValidSubmit = (data: LogInType) => { 
        const { email, password } = data;
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

                <Button type="submit" className="w-full">
                    Entrar
                </Button>
            </FieldSet>
        </form>
    )
}