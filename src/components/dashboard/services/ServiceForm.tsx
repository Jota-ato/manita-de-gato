'use client';
import FieldWLabel from "@/components/agenda/AgendaBody/Form/FieldWLabel";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldSet } from "@/components/ui/field";
import { deleteService, createService, updateService } from "@/lib/dashboard/services/actions";
import { Service, serviceSchema, serviceItemsEnum, serviceExtrasEnum } from "@/schemas/services";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import CancelModal from "../home/QuickActions/CancelModal";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { uploadServiceImage } from "@/lib/supabase/storage";

const formSchema = serviceSchema.omit({ id: true });

type FormValues = z.infer<typeof formSchema>;
interface ServiceFormProps {
    service?: Service
    onSuccess?: () => void
}

interface FieldsType {
    label: string
    type: 'text' | 'email' | 'tel' | 'textarea' | 'number'
    id: keyof FormValues
}

const Fields: FieldsType[] = [
    { label: 'Nombre del servicio', id: 'name', type: 'text' },
    { label: 'Descripción del servicio', id: 'description', type: 'text' },
    { label: '¿Qué es el servicio?', id: 'what_is', type: 'textarea' },
    { label: 'Precio mínimo', id: 'min_price', type: 'number' },
]


export default function ServiceForm({ service, onSuccess }: ServiceFormProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const isEditing = !!service;

    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<FormValues>(
        {
            resolver: zodResolver(formSchema),
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

    const onValidSubmit = async (formData: FormValues) => {
        setIsUploading(true);
        try {
            let finalImageUrl = formData.image_url;

            if (imageFile) {
                finalImageUrl = await uploadServiceImage(imageFile, service?.image_url);
            }

            const payloadToUpdate = { ...formData, image_url: finalImageUrl };

            let response;
            if (isEditing) {
                response = await updateService({ ...payloadToUpdate, id: service!.id } as Service);
            } else {
                response = await createService(payloadToUpdate);
            }

            if (response.success) {
                toast.success(response.message);
                if (!isEditing) reset();
                if (onSuccess) onSuccess();
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error("Ocurrió un error al procesar la imagen.");
        } finally {
            setIsUploading(false);
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

    const isAnyLoading = isSubmitting || isDeleting || isUploading;

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
                            error={errors[field.id]?.message}
                            {...register(field.id, {
                                valueAsNumber: field.type === 'number'
                            })}
                        />
                    ))}
                    <Field>
                        <Label className="cursor-pointer" htmlFor="imageFile">Imagen del servicio (Opcional)</Label>
                        <Input
                            className="cursor-pointer"
                            id="imageFile"
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) setImageFile(file);
                            }}
                        />
                        {isEditing && service?.image_url && !imageFile && (
                            <p className="text-xs text-muted-foreground">Ya existe una imagen. Sube una nueva para reemplazarla.</p>
                        )}
                    </Field>
                </FieldGroup>

                <Separator className="my-6" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">

                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold text-sm">Elementos Incluidos</h4>
                            <p className="text-xs text-muted-foreground">Selecciona lo que incluye el precio base.</p>
                        </div>
                        <Controller
                            name="included_items"
                            control={control}
                            render={({ field }) => (
                                <div className="grid grid-cols-1 gap-3">
                                    {serviceItemsEnum.map((item) => (
                                        <div key={item} className="flex flex-row items-start space-x-3">
                                            <Checkbox
                                                id={`included-${item}`}
                                                checked={field.value?.includes(item)}
                                                onCheckedChange={(checked) => {
                                                    return checked
                                                        ? field.onChange([...(field.value || []), item])
                                                        : field.onChange(field.value?.filter((value) => value !== item));
                                                }}
                                            />
                                            <Label htmlFor={`included-${item}`} className="font-normal text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                                                {item}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            )}
                        />
                        {errors.included_items && <p className="text-destructive text-xs font-medium">{errors.included_items.message}</p>}
                    </div>

                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold text-sm">Extras Disponibles</h4>
                            <p className="text-xs text-muted-foreground">Opciones con costo adicional.</p>
                        </div>
                        <Controller
                            name="available_extras"
                            control={control}
                            render={({ field }) => (
                                <div className="grid grid-cols-1 gap-3">
                                    {serviceExtrasEnum.map((extra) => (
                                        <div key={extra} className="flex flex-row items-start space-x-3">
                                            <Checkbox
                                                id={`extra-${extra}`}
                                                checked={field.value?.includes(extra)}
                                                onCheckedChange={(checked) => {
                                                    return checked
                                                        ? field.onChange([...(field.value || []), extra])
                                                        : field.onChange(field.value?.filter((value) => value !== extra));
                                                }}
                                            />
                                            <Label htmlFor={`extra-${extra}`} className="font-normal text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                                                {extra}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            )}
                        />
                        {errors.available_extras && <p className="text-destructive text-xs font-medium">{errors.available_extras.message}</p>}
                    </div>
                </div>

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