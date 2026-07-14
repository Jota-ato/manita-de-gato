"use client"

import { roles, User } from "@/db/schema"
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from "@/shared/components/ui/field"
import { useForm } from "react-hook-form"
import { UserInput, userSchema } from "../schemas/user-schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/shared/components/ui/input"
import { CustomSelect } from "@/features/appointments/core/components/services-select"
import { FormSubmit } from "@/shared/components/form/form-submit"
import { AuthPolicies } from "@/features/auth/policies/auth-policies"
import { showResponse } from "@/shared/lib/client-actions"
import { updateUserAction } from "../actions/user-actions"
import ImageUploader from "@/shared/components/upload/image-uploader"

export function UserForm({
    user,
    currentUser
}: {
    user: User,
    currentUser: User
}) {

    const isOwner = AuthPolicies.isOwner(currentUser)

    const defaultValues: UserInput = {
        email: user.email,
        name: user.name,
        role: user.role,
        image: user.image || undefined
    }

    const {
        handleSubmit,
        register,
        control,
        watch,
        setValue,
        formState: { errors, isSubmitting }
    } = useForm<UserInput>({
        resolver: zodResolver(userSchema),
        defaultValues
    })

    const image = watch("image")

    const validRoles = isOwner ?
        roles.enumValues
        : roles.enumValues.filter((role) => role !== "owner")

    const edit = async (data: UserInput) => {
        showResponse(await updateUserAction(data, user.id, currentUser.id))
    }

    return (
        <form onSubmit={handleSubmit(edit)}>
            <FieldSet>
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="name">Name</FieldLabel>
                        <Input
                            id="name"
                            {...register("name")}
                            disabled={isSubmitting}
                        />
                        {errors.name &&
                            <FieldError>
                                {errors.name.message}
                            </FieldError>
                        }
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input
                            id="email"
                            {...register("email")}
                            disabled={isSubmitting}
                        />
                        {errors.email &&
                            <FieldError>
                                {errors.email.message}
                            </FieldError>
                        }
                    </Field>
                    <CustomSelect
                        control={control}
                        name="role"
                        placeholder="Role"
                        options={validRoles.map((role) => ({ value: role, label: role }))}
                    />
                    {errors.role &&
                        <FieldError>
                            {errors.role.message}
                        </FieldError>
                    }
                    <ImageUploader
                        label="User image"
                        image={image}
                        onChange={(url) => setValue("image", url ? url : "", { shouldValidate: true })}
                    />
                </FieldGroup>
                <FormSubmit
                    isSubmitting={isSubmitting}
                    label={"Update"}
                    submittingLabel={"Updating..."}
                />
            </FieldSet>
        </form>
    )
}