'use client';
import FieldWLabel from "@/components/agenda/AgendaBody/Form/FieldWLabel";
import { Button } from "@/components/ui/button";
import { FieldGroup, FieldSet } from "@/components/ui/field";
import { deleteService, createService, updateService } from "@/lib/dashboard/services/actions"; // 👈 Asegúrate de importar create y update
import { Service, serviceSchema } from "@/schemas/services";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import CancelModal from "../home/QuickActions/CancelModal";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";

interface ServiceFormProps {
    service?: Service
    onSuccess?: () => void // Opcional, por si lo abres en un modal y quieres cerrarlo al terminar
}

interface FieldsType {
    label: string
    type: 'text' | 'email' | 'tel' | 'textarea' | 'number'
    id: keyof Service
}

const Fields: FieldsType[] = [
    { label: 'Nombre del servicio', id: 'name', type: 'text' },
    { label: 'Descripción del servicio', id: 'description', type: 'text' },
    { label: '¿Qué es el servicio?', id: 'what_is', type: 'textarea' },
    { label: 'Precio mínimo', id: 'min_price', type: 'number' },
]

export default function ServiceForm({ service, onSuccess }: ServiceFormProps) {
    const [isDeleting, setIsDeleting] = useState(false);

    const isEditing = !!service;

    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<Service>(
        {
            resolver: zodResolver(serviceSchema),
            defaultValues: {
                name: isEditing ? service.name : '',
                description: isEditing ? service.description : '',
                what_is: isEditing ? service.what_is : '',
                min_price: isEditing ? service.min_price : 0,
                image_url: isEditing ? (service.image_url || '') : '',
                available_extras: isEditing ? service.available_extras : [],
                included_items: isEditing ? service.included_items : [],
                isDisabled: isEditing ? service.isDisabled : false
            }
        }
    );

    const onValidSubmit = async (formData: Service) => {
        const response = isEditing
            ? await updateService(formData)
            : await createService(formData);

        if (response.success) {
            toast.success(response.message);
            if (!isEditing) reset();
            if (onSuccess) onSuccess();
        } else {
            toast.error(response.message);
        }
    }

    const deleteAction = async () => {
        if (!service) return;
        setIsDeleting(true);
        const response = await deleteService(service.id);

        if (response.success) {
            toast.success(response.message);
            if (onSuccess) onSuccess();
        }
        else {
            toast.error(response.message);
        }
        setIsDeleting(false);
    }

    const isAnyLoading = isSubmitting || isDeleting;

    return (
        <form onSubmit={handleSubmit(onValidSubmit)}>
            <FieldSet disabled={isAnyLoading}>
                <FieldGroup>
                    {Fields.map(field => (
                        <FieldWLabel
                            key={field.id}
                            id={field.id}
                            label={field.label}
                            type={field.type}
                            textarea={field.type === 'textarea'}
                            error={errors[field.id]?.message as string}
                            {...register(field.id)}
                        />
                    ))}
                </FieldGroup>

                <div className="flex flex-col-reverse sm:flex-row gap-4 items-center justify-end mt-6">
                    {isEditing && (
                        <CancelModal
                            action={deleteAction}
                            triggerLabel={isDeleting ? "Eliminando..." : "Eliminar servicio"}
                            cardTitle="¿Seguro que quieres eliminar este servicio?"
                            cardDescription={`Estás a punto de eliminar "${service.name}". Esta acción no se puede deshacer.`}
                            cardButtonLabel="Eliminar servicio"
                        />
                    )}

                    <Button
                        type="submit"
                        disabled={isAnyLoading}
                    >
                        {isSubmitting ? (
                            <span className="flex items-center gap-2"><Spinner /> Guardando...</span>
                        ) : (
                            isEditing ? 'Guardar Cambios' : 'Crear Servicio'
                        )}
                    </Button>
                </div>
            </FieldSet>
        </form>
    )
}