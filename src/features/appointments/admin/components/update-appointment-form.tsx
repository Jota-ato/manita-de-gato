"use client"
import { Field, FieldError, FieldGroup, FieldLabel, FieldSeparator, FieldSet, FieldDescription } from "@/shared/components/ui/field"
import { Input } from "@/shared/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/shared/components/ui/button"
import { Spinner } from "@/shared/components/ui/spinner"
import { appointmentStatusEnum } from "@/db/schema"
import { CustomSelect } from "../../core/components/services-select"
import { DatePickerTime } from "@/shared/components/form/date-picker"
import { translatedStatusMap } from "@/shared/lib/date"
import { showResponse } from "@/shared/lib/client-actions"
import { useMemo } from "react"
import { formatMXN } from "@/shared/lib/currency"
import { AlertDialogCustom } from "@/shared/components/ui/alert-dialog-custom"
import { FullAppointment } from "../../core/types/appointments.types"
import { useAppointmentStore } from "../stores/appointment-store"
import { UpdateApointmentInput, updateAppointmentSchema } from "../schemas/appointment-schema"
import { deleteAppointmentAction, updateAppointmentAction } from "../actions/admin-appointment-actions"
import { ServiceWithExtras } from "@/features/services/types/service.types"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs"
import { ArraySwitchController } from "@/features/services/components/extra-switch-controller"
import { useIsMobile } from "@/hooks/use-mobile"

export function UpdateAppointmentForm({
    appointment,
    services
}: {
    appointment: FullAppointment
    services: ServiceWithExtras[]
}) {
    const { toggleEditDialogOpen: toggleOpen, setActiveEditingAppointment: setActiveAppointment } = useAppointmentStore()
    const isMobile = useIsMobile()

    const initialExtrasIds = appointment.appoinmentExtras?.map(ext => ext.extraId) || [];

    const {
        handleSubmit,
        register,
        watch,
        control,
        reset,
        setValue,
        formState: { errors, isSubmitting }
    } = useForm<UpdateApointmentInput>({
        resolver: zodResolver(updateAppointmentSchema),
        defaultValues: {
            status: appointment.status,
            startTime: new Date(appointment.startTime),
            endTime: new Date(appointment.endTime),
            serviceId: appointment.serviceId,
            adittionalPrice: +appointment.adittionalPrice,
            extrasId: initialExtrasIds 
        }
    })

    const serviceId = watch('serviceId')
    const extrasId = watch('extrasId') || []

    const servicePrice = useMemo(() => {
        if (!serviceId) return 0
        const selected = services.find(service => service.data.id === serviceId)
        return selected ? +selected.data.price : 0
    }, [serviceId, services])

    const availableExtras = useMemo(() => {
        const availableExtras = serviceId ? services.find(service => service.data.id === serviceId)?.serviceExtras : []
        if (!availableExtras) return []
        return availableExtras.filter(extra => !extra.included && extra.extra.isActive)
    }, [serviceId, services])

    const extrasPrice = useMemo(() => {
        if (!availableExtras.length) return 0
        const activeExtras = availableExtras.filter(extra => extrasId.includes(extra.extra.id))
        return activeExtras.reduce((acc, extra) => acc + +extra.extra.price, 0)
    }, [availableExtras, extrasId])

    const update = async (data: UpdateApointmentInput) => {
        const success = showResponse(await updateAppointmentAction(
            { ...data },
            appointment.id
        ));

        if (success) {
            reset(data)
            setActiveAppointment(undefined)
        }
    }

    const deleteAppointment = async () => {
        const success = showResponse(await deleteAppointmentAction(appointment.id))

        if (success) {
            toggleOpen()
            setActiveAppointment(undefined)
            reset()
        }
    }

    return (
        <form onSubmit={handleSubmit(update)}>
            <Tabs className="w-full" defaultValue="general">
                <TabsList>
                    <TabsTrigger className="flex-1" value="general">General</TabsTrigger>
                    <TabsTrigger className="flex-1" value="service">Service & Extras</TabsTrigger>
                </TabsList>

                <TabsContent value="general">
                    <FieldSet>
                        <FieldGroup>
                            <DatePickerTime
                                control={control}
                                setValue={setValue}
                                startTimeName="startTime"
                                endTimeName="endTime"
                            />
                            {errors.startTime && <FieldError>{errors.startTime.message}</FieldError>}
                            {errors.endTime && <FieldError>{errors.endTime.message}</FieldError>}
                            
                            <FieldSeparator />

                            <CustomSelect
                                control={control}
                                name="status"
                                groupLabel="Status"
                                placeholder="Select status"
                                options={appointmentStatusEnum.enumValues.map(s => ({ value: s, label: translatedStatusMap[s] }))}
                            />
                            {errors.status && <FieldError>{errors.status.message}</FieldError>}
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
                                groupLabel="Services"
                                placeholder="Select service"
                            />
                            {errors.serviceId && <FieldError>{errors.serviceId.message}</FieldError>}

                            <FieldSeparator />

                            <Field>
                                <FieldLabel htmlFor="extrasId">Extras</FieldLabel>
                                <FieldDescription>Update the extras included in this appointment</FieldDescription>
                                {availableExtras.length ? (
                                    availableExtras.map(extra => (
                                        <ArraySwitchController
                                            key={extra.id}
                                            control={control}
                                            name="extrasId"
                                            value={extra.extra.id}
                                            label={extra.extra.name}
                                        />
                                    ))
                                ) : (
                                    <p className="p-4 text-muted-foreground text-sm">No extras available</p>
                                )}
                            </Field>

                            <FieldSeparator />

                            <div className="flex items-center justify-between gap-2">
                                <p className="flex flex-col justify-center text-sm">
                                    Service Price
                                    <span className="font-bold text-base">{formatMXN(+servicePrice)}</span>
                                </p>
                                <p className="flex flex-col justify-center text-sm">
                                    Extras Price
                                    <span className="font-bold text-base">{formatMXN(+extrasPrice)}</span>
                                </p>
                            </div>

                            <Field className="mt-2">
                                <FieldLabel>Manual Additional Price</FieldLabel>
                                <Input
                                    id="extraPrice"
                                    type="number"
                                    step={0.01}
                                    {...register('adittionalPrice', {
                                        setValueAs: (value) => value === "" ? 0 : +value,
                                    })}
                                />
                                {errors.adittionalPrice && <FieldError>{errors.adittionalPrice.message}</FieldError>}
                            </Field>
                        </FieldGroup>
                    </FieldSet>
                </TabsContent>
            </Tabs>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-end mt-6">
                <AlertDialogCustom
                    fullWith={isMobile}
                    actionLabel="Delete"
                    triggerLabel="Delete Appointment"
                    dialogDescription="This action cannot be undone"
                    dialogTitle={`Delete ${appointment.customer.name}'s appointment?`}
                    action={deleteAppointment}
                />
                <Button className="w-full sm:w-auto" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? <><Spinner />Updating...</> : 'Update Appointment'}
                </Button>
            </div>
        </form>
    )
}