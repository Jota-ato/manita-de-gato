'use server'
import { createClient } from "@/lib/supabase/server";
import { Service, serviceExtrasEnum, serviceSchema } from "@/schemas/services";
import { revalidatePath } from "next/cache";

export async function createService(data: Service) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('Services')
        .insert(data);

    if (error) {
        console.error("[CREATE_SERVICE_ERROR]:", error.message);
        return { success: false, message: "Error al crear el servicio." };
    }

    revalidatePath('/dashboard/servicios');
    return { success: true, message: "Servicio creado exitosamente." };
}

export async function updateService(id: string | number, data: Service) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('Services')
        .update(data)
        .eq('id', id);

    if (error) {
        console.error("[UPDATE_SERVICE_ERROR]:", error.message);
        return { success: false, message: "Error al actualizar el servicio." };
    }

    revalidatePath('/dashboard/servicios');
    return { success: true, message: "Servicio actualizado exitosamente." };
}

export async function deleteService(id: string | number) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('Services')
        .update({
            'is_disabled': true
        })
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error("[DELETE_SERVICE_ERROR]:", error.message);
        return { success: false, message: "No se puede eliminar un servicio que ya tiene citas asociadas." };
    }


    revalidatePath('/dashboard/servicios');
    const response = serviceSchema.safeParse(data);
    if (response.error) { 
        return {
            succes: true,
            message: 'Servicio eliminado correctamente.'
        }
    }

    return { success: true, message: `Servicio ${response.data.name} eliminado correctamente.` };
}