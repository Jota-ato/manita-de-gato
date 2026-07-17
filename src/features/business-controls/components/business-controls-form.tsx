"use client"

import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from "@/shared/components/ui/field"
import { Input } from "@/shared/components/ui/input"
import { useForm } from "react-hook-form"
import { BusinessControlsInput, businessControlsSchema } from "../schemas/business-controls-schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { BusinessControls } from "@/db/schema"
import { FormSubmit } from "@/shared/components/form/form-submit"
import { formatTime, TIMEZONE } from "@/shared/lib/date"
import { TZDate } from "@date-fns/tz"
import { showResponse } from "@/shared/lib/client-actions"
import { updateBusinessControlsAction } from "../actions/business-controls-actions"
import ImageUploader from "@/shared/components/upload/image-uploader"

export function BusinessControlsForm({
    controls
}: {
    controls: BusinessControls
}) {

    const {
        handleSubmit,
        register,
        setValue,
        watch,
        formState: { errors, isSubmitting }
    } = useForm<BusinessControlsInput>({
        resolver: zodResolver(businessControlsSchema),
        defaultValues: {
            ...controls,
            startHour: formatTime(new TZDate(controls.startHour, TIMEZONE))
        }
    })

    const updateControls = async (data: BusinessControlsInput) => {
        showResponse(await updateBusinessControlsAction({
            ...data,
            startHour: formatTime(new TZDate(data.startHour, TIMEZONE))
        }, controls.id))
    }

    const image = watch("bannerImage")

    return (
        <form onSubmit={handleSubmit(updateControls)}>
            <FieldSet>
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="startHour">
                            Start hour
                        </FieldLabel>
                        <Input
                            id="startHour"
                            type="time"
                            {...register("startHour")}
                        />
                        {errors.startHour && (
                            <FieldError>
                                {errors.startHour.message}
                            </FieldError>
                        )}
                    </Field>
                    <div className="grid grid-cols-2 gap-4">
                        <Field>
                            <FieldLabel htmlFor="slotsPerDay">
                                Slots per day
                            </FieldLabel>
                            <Input
                                id="slotsPerDay"
                                type="number"
                                min="1"
                                {...register("slotsPerDay", { valueAsNumber: true })}
                            />
                            {errors.slotsPerDay && (
                                <FieldError>
                                    {errors.slotsPerDay.message}
                                </FieldError>
                            )}
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="slotDuration">
                                Slot duration (minutes)
                            </FieldLabel>
                            <Input
                                id="slotDuration"
                                type="number"
                                min="1"
                                {...register("slotDuration", { valueAsNumber: true })}
                            />
                            {errors.slotDuration && (
                                <FieldError>
                                    {errors.slotDuration.message}
                                </FieldError>
                            )}
                        </Field>
                    </div>
                    <ImageUploader
                        label="Banner image"
                        image={image!}
                        onChange={(url) => setValue("bannerImage", url ?? null, { shouldValidate: true })}
                    />
                </FieldGroup>
                <FormSubmit
                    isSubmitting={isSubmitting}
                    label="Save Changes"
                    submittingLabel="Saving..."
                />
            </FieldSet>
        </form>
    )
}