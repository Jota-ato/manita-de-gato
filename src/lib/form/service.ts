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
    timeMin: Date
    timeMax: Date
};

/**
 * Creates a new appointment in the Supabase 'Appointments' table.
 * Strictly typed using AgendaFormData for consistency with the frontend.
 */
export async function createAppointment(data: createAppointmentProps) {
    const supabase = await createClient();
    const { name, serviceId, phone, secondary_phone, timeMin, timeMax, last_name } = data;

    const client_id = await getClientId({ name, last_name, phone, secondary_phone });

    const { data: insertedData, error } = await supabase
        .from('Appointments')
        .insert({
            client_id,
            service_id: Number(serviceId),
            timeMin: timeMin.toISOString(),
            timeMax: timeMax.toISOString()
        })
        .select()
        .single();

    if (error) {
        console.error("[CREATE_APPOINTMENT_ERROR]:", error.message);
        throw new Error("Failed to create appointment in database.");
    }

    return insertedData;
}

/**
 * Client schema
 * @property name<string>: client name
 * @property phone<string>: primary phone, identifier
 * @property secondary_phone<string | null>: secondary phone
 */
interface ClientInfo {
    name: string;
    last_name: string;
    phone: string;
    secondary_phone?: string | null;
    email?: string | null;
}

/**
 * Checks if the client already exist, if not
 * creates him in the database. Otherwise returns
 * its client id.
 * Search using primary phone.
 * @argument clientInfo: Information of client to search.
 * @see ClientInfo to see properties.
 * @returns <string> A uuid that identifies the client.
 */
export async function getClientId(clientInfo: ClientInfo): Promise<string> {

    const supabase = await createClient();

    const { data: clientFound, error: clientError } = await supabase
        .from('Clients')
        .select('id, email')
        .eq('phone', clientInfo.phone)
        .maybeSingle();

    if (clientError) {
        console.error("[FETCH_CLIENT_ERROR]:", clientError.message);
        throw new Error("Error checking client existence.");
    }

    let clientId = clientFound?.id;

    if (
        clientFound &&
        !clientFound.email &&
        clientInfo.email
    ) {
        const { error: updateError } = await supabase
            .from('Clients')
            .update({
                email: clientInfo.email
            })
            .eq('id', clientId);

        if (updateError) {
            console.error("[UPDATE_CLIENT_EMAIL_ERROR]:", updateError.message);
            throw new Error("Failed to update client email.");
        }
    }
    if (!clientId) {
        const { data: newClient, error: createError } = await supabase
            .from('Clients')
            .insert({
                name: clientInfo.name,
                last_name: clientInfo.last_name,
                phone: clientInfo.phone,
                secondary_phone: clientInfo.secondary_phone || null,
                email: clientInfo.email || null
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