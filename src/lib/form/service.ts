'use server';

import { serviceSchema, Service } from '@/schemas/services';
import { createClient } from "@/lib/supabase/server";
import { AgendaFormData } from "@/schemas/agendaForm";

export async function getServices(): Promise<Service[]> {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('Services')
        .select("*");

    if (error) {
        console.error('Error while fetching services');
        return [];
    };

    if (data) {
        const validateServices = data.map(element => serviceSchema.safeParse(element).data).filter((element): element is Service => typeof element === 'object');
        return validateServices;
    }

    return [];
}

type createAppointmentProps = AgendaFormData & {
    minTime: Date
    maxTime: Date
};

/**
 * Creates a new appointment in the Supabase 'Appointments' table.
 * Strictly typed using AgendaFormData for consistency with the frontend.
 */
export async function createAppointment(data: createAppointmentProps) {
    const supabase = await createClient();
    const { name, serviceId, phone, secondary_phone, minTime, maxTime } = data;

    const client_id = await getClientId({name, phone,secondary_phone});

    // 2. Realizamos la inserción mapeando los campos del formulario
    const { data: insertedData, error } = await supabase
        .from('Appointments')
        .insert({
            client_id,
            phone,
            service_id: Number(serviceId),
            secondary_phone: secondary_phone || null,
            minTime,
            maxTime
        })
        .select()
        .single();

    if (error) {
        console.error("[CREATE_APPOINTMENT_ERROR]:", error.message);
        throw new Error("Failed to create appointment in database.");
    }

    return insertedData;
}

interface Client {
    name: string;
    phone: string;
    secondary_phone?: string;
}

export async function getClientId(clientInfo: Client): Promise<string> {

    const supabase = await createClient();

    const { data: clientFound, error: clientError } = await supabase
        .from('Clients')
        .select('id')
        .eq('phone', clientInfo.phone)
        .maybeSingle();

    if (clientError) {
        console.error("[FETCH_CLIENT_ERROR]:", clientError.message);
        throw new Error("Error checking client existence.");
    }

    let clientId = clientFound?.id;

    if (!clientId) {
        const { data: newClient, error: createError } = await supabase
            .from('Clients')
            .insert({
                name: clientInfo.name,
                phone: clientInfo.phone,
                secondary_phone: clientInfo.secondary_phone || null
            })
            .select('id')
            .single();

        if (createError) {
            console.error("[CREATE_CLIENT_ERROR]:", createError.message);
            throw new Error("Failed to register new client.");
        }
        clientId = newClient.id;
    }

    return clientId as string;
}