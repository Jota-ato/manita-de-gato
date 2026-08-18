"use client"

import {
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
    FieldSet
} from "@/shared/components/ui/field"
import { useForm, FieldErrors } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/shared/components/ui/input"
import { CustomSelect } from "../../core/components/services-select"
import { Service } from "@/db/schema"
import { useMemo } from "react"
import { formatMXN } from "@/shared/lib/currency"
import { Button } from "@/shared/components/ui/button"
import { Spinner } from "@/shared/components/ui/spinner"
import { DatePickerTime } from "@/shared/components/form/date-picker-time"
import { FieldSwitch } from "@/shared/components/form/field-switch"
import { showResponse } from "@/shared/lib/client-actions"
import { NewAppointmentManuallyInput, newAppointmentManuallySchema } from "../schemas/appointment-schema"
import { createManualAppointmentAction } from "../actions/admin-appointment-actions"
import { redirect } from "next/navigation"
import { ServiceWithExtras } from "@/features/services/types/service.types"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs"
import { ArraySwitchController } from "@/features/services/components/extra-switch-controller"

export function NewAppointmentManuallyForm({
    services
}: {
    services: ServiceWithExtras[]
}) {

    const {
        handleSubmit,
        watch,
        register,
        reset,
        control,
        setValue,
        formState: { errors, isSubmitting }
    } = useForm<NewAppointmentManuallyInput>({
        resolver: zodResolver(newAppointmentManuallySchema),
        defaultValues: {
            isRegisterClient: true,
            adittionalPrice: 0,
            clientPhone: "",
            clientCountryCode: "52",
            startTime: new Date(),
            endTime: new Date(),
            extrasId: []
        }
    })

    const isRegisterCLient = watch('isRegisterClient')
    const serviceId = watch('serviceId')
    const extrasId = watch('extrasId')

    const clientErrors = errors as FieldErrors<Extract<NewAppointmentManuallyInput, { isRegisterClient: false }>>;

    const servicePrice = useMemo(() => {
        if (!serviceId) return 0
        const selected = services.find(service => service.data.id === serviceId)
        return selected ? +selected.data.price : 0
    }, [serviceId, services])

    const availableExtras = useMemo(() => {
        const availableExtras = serviceId ? services.find(service => service.data.id === serviceId)?.serviceExtras : []
        if (!availableExtras) return []
        return availableExtras.filter(extra => !extra.included)
    }, [serviceId])

    const extrasPrice = useMemo(() => {
        if (!availableExtras.length) return 0
        const activeExtras = availableExtras.filter(extra => extrasId.includes(extra.extra.id))
        return activeExtras.reduce((acc, extra) => acc + +extra.extra.price, 0)
    }, [availableExtras, extrasId])

    const create = async (data: NewAppointmentManuallyInput) => {
        const success = showResponse(await createManualAppointmentAction({
            ...data,
            clientPhone: `+${data.clientCountryCode}${data.clientPhone}`
        }))

        if (success) {
            reset()
            redirect('/dashboard/agenda')
        }
    }

    return (
        <form onSubmit={handleSubmit(create)}>
            <Tabs defaultValue="general">
                <TabsList>
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="service">Servicio</TabsTrigger>
                </TabsList>
                <TabsContent value="general">
                    <FieldSet>
                        <FieldGroup>
                            <FieldSwitch
                                control={control}
                                name="isRegisterClient"
                                label="¿El cliente está registrado?"
                                description="Marca esto si el cliente ya tiene una cita o la creaste manualmente para él."
                            />

                            <FieldGroup>
                                <DatePickerTime control={control} setValue={setValue} startTimeName="startTime" endTimeName="endTime" />
                                {errors.endTime && <FieldError>{errors.endTime.message}</FieldError>}
                            </FieldGroup>
                            <FieldSeparator />

                            <Field>
                                <FieldLabel htmlFor="clientPhone">Teléfono del cliente</FieldLabel>
                                <FieldDescription>Con código de país (ej. +52 para México)</FieldDescription>
                                <div className="flex gap-2">
                                    <Input
                                        className="w-20"
                                        id="countryCode"
                                        type="tel"
                                        placeholder="+52"
                                        {...register('countryCode')}
                                    />
                                    <Input
                                        id="clientPhone"
                                        type="tel"
                                        {...register('clientPhone')}
                                    />
                                </div>
                                {errors.clientPhone && (
                                    <FieldError>{errors.clientPhone.message}</FieldError>
                                )}
                            </Field>

                            {(!isRegisterCLient) && (
                                <>
                                    <Field>
                                        <FieldLabel htmlFor="clientName">Nombre del cliente</FieldLabel>
                                        <Input
                                            id="clientName"
                                            {...register('name')}
                                        />
                                        {clientErrors.name && (
                                            <FieldError>{clientErrors.name.message}</FieldError>
                                        )}
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="clientLastName">Apellido del cliente</FieldLabel>
                                        <Input
                                            id="clientLastName"
                                            {...register('lastName')}
                                        />
                                        {clientErrors.lastName && (
                                            <FieldError>{clientErrors.lastName.message}</FieldError>
                                        )}
                                    </Field>
                                </>
                            )}
                        </FieldGroup>

                    </FieldSet>
                </TabsContent>
                <TabsContent value="service">
                    <FieldSet>
                        <FieldGroup>
                            <CustomSelect
                                control={control}
                                name="serviceId"
                                options={services.map((s) => ({ value: s.data.id, label: s.data.name }))}
                                groupLabel="Servicios"
                                placeholder="Selecciona un servicio"
                            />
                            {errors.serviceId && (
                                <FieldError>{errors.serviceId.message}</FieldError>
                            )}
                            <FieldSeparator />
                            <Field>
                                <FieldLabel htmlFor="extrasId">Extras</FieldLabel>
                                <FieldDescription>Selecciona los extras para esta cita</FieldDescription>
                                {
                                    availableExtras.length ?
                                        availableExtras.map(extra => (
                                            <ArraySwitchController
                                                key={extra.extra.id}
                                                control={control}
                                                name="extrasId"
                                                value={extra.extra.id}
                                                label={extra.extra.name}
                                            />
                                        ))
                                        : <p className="p-4 text-muted-foreground text-sm">No hay extras disponibles</p>
                                }
                            </Field>
                            <FieldSeparator />
                            <div className="flex items-center justify-between gap-2">
                                <p className="flex flex-col justify-center text-sm">
                                    Precio del servicio
                                    <span className="font-bold text-base">{formatMXN(+servicePrice)}</span>
                                </p>
                                <p className="flex flex-col justify-center text-sm">
                                    Precio de extras
                                    <span className="font-bold text-base">{formatMXN(+extrasPrice)}</span>
                                </p>
                            </div>
                            <Field className="flex-1">
                                <FieldLabel htmlFor="adittionalPrice">Precio adicional</FieldLabel>
                                <Input
                                    id="adittionalPrice"
                                    type="number"
                                    {...register('adittionalPrice', {
                                        setValueAs: (value) => value === "" ? 0 : +value,
                                    })}
                                />
                                {errors.adittionalPrice && (
                                    <FieldError>{errors.adittionalPrice.message}</FieldError>
                                )}
                            </Field>
                        </FieldGroup>
                    </FieldSet>
                </TabsContent>
            </Tabs>
            <Button
                type="submit"
                className="w-full mt-4"
                disabled={isSubmitting}
            >
                {isSubmitting ? <><Spinner />Creando...</> : 'Crear'}
            </Button>
        </form>
    )
}