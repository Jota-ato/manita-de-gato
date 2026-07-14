"use client"

import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldSet
} from "@/shared/components/ui/field"
import { Input } from "@/shared/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SignInInput, signInSchema } from "../schemas/form-schemas"
import { showResponse } from "@/shared/lib/client-actions"
import { signInAction } from "../actions/auth-actions"
import { redirect } from "next/navigation"
import { FormSubmit } from "@/shared/components/form/form-submit"

export function SignInForm() {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<SignInInput>({
        resolver: zodResolver(signInSchema)
    })

    const handleSignIn =  async (data: SignInInput) => {
        console.log("Sign-in data:", data)
        const response = showResponse(await signInAction(data))
        if (response && response.data && (response.data.user.role === "admin" || response.data.user.role === "employee" || response.data.user.role === "owner")) redirect("/dashboard")
    }

    return (
        <form onSubmit={handleSubmit(handleSignIn)}>
            <FieldSet>
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="email">
                            Email
                        </FieldLabel>
                        <Input 
                        id="email" 
                        type="email" 
                        {...register("email")}
                        />
                        <FieldError>
                            {errors.email && errors.email.message}
                        </FieldError>
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="password">
                            Password
                        </FieldLabel>
                        <Input 
                        id="password" 
                        type="password" 
                        {...register("password")}
                        />
                        <FieldError>
                            {errors.password && errors.password.message}
                        </FieldError>
                    </Field>
                </FieldGroup>
                <FormSubmit 
                    isSubmitting={isSubmitting}
                    label="Sign in"
                    submittingLabel="Signing in..."
                />
            </FieldSet>
        </form>
    )
}