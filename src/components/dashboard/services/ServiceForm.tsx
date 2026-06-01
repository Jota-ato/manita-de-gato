'use client';

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { FieldGroup, FieldSet } from "@/components/ui/field";
import FieldWLabel from "@/components/agenda/AgendaBody/Form/FieldWLabel"; // Reutilizando tu input
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { createService, updateService, deleteService } from "@/lib/dashboard/services/actions";
import { Service, serviceSchema } from "@/schemas/services";

interface ServiceFormProps {
    service?: Service;
    onSuccess?: () => void;
}

export default function ServiceForm({ service, onSuccess }: ServiceFormProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const isEditing = !!service;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<Service>({
        resolver: zodResolver(serviceSchema),
        defaultValues: {
            name: isEditing ? service.name : '',
            description: isEditing ? (service.description || '') : '',
            min_price: isEditing ? service.min_price : 0,
        }
    });

    const isAnyLoading = isSubmitting || isDeleting;

    const onSubmit = async (data: Service) => {
        const response = isEditing
            ? await updateService(service.id, data)
            : await createService(data);

        if (response.success) {
            toast.success(response.message);
            if (!isEditing) reset();
            if (onSuccess) onSuccess();
        } else {
            toast.error(response.message);
        }
    };

    const handleDelete = async () => {
        if (!isEditing) return;
        setIsDeleting(true);
        const response = await deleteService(service.id);

        if (response.success) {
            toast.success(response.message);
            if (onSuccess) onSuccess();
        } else {
            toast.error(response.message);
        }
        setIsDeleting(false);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FieldSet disabled={isAnyLoading}>
                <FieldGroup>
                    <FieldWLabel
                        label="Nombre del servicio"
                        id="name"
                        placeholder="Ej. Pro Manicure"
                        error={errors.name?.message}
                        {...register('name')}
                    />

                    <FieldWLabel
                        label="Descripción (Opcional)"
                        id="description"
                        placeholder="Detalles del tratamiento..."
                        error={errors.description?.message}
                        {...register('description')}
                    />
                </FieldGroup>

                <div className="flex gap-2 justify-end mt-6">
                    {isEditing && (
                        <Button
                            type="button"
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={isAnyLoading}
                        >
                            {isDeleting ? <Spinner /> : 'Eliminar'}
                        </Button>
                    )}

                    <Button type="submit" disabled={isAnyLoading}>
                        {isSubmitting ? (
                            <span className="flex items-center gap-2"><Spinner /> Guardando...</span>
                        ) : (
                            isEditing ? 'Guardar Cambios' : 'Crear Servicio'
                        )}
                    </Button>
                </div>
            </FieldSet>
        </form>
    );
}