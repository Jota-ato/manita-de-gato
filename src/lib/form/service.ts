'use server';

import { serviceSchema, Service } from '@/schemas/services';
import { createClient } from "@/lib/supabase/server";
import { AgendaFormData } from "@/schemas/agendaForm";
import { AppointmentStatus, Client, ClientSchema } from '../supabase/schemas';

export async function getServices(): Promise<Service[]> {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('Services')
        .select("*")
        .neq('isDisabled', true);

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

export type createAppointmentProps = AgendaFormData & {
    timeMin: Date
    timeMax: Date
    status?: AppointmentStatus
};

/**
 * Creates a new appointment in the Supabase 'Appointments' table.
 * Strictly typed using AgendaFormData for consistency with the frontend.
 */
export async function createAppointment(data: createAppointmentProps) {
    const supabase = await createClient();
    const { name, serviceId, phone, secondary_phone, timeMin, timeMax, last_name, status } = data;

    const safeTimeMin = new Date(timeMin);
    const safeTimeMax = new Date(timeMax);

    const response = await getClient({ name, last_name, phone, secondary_phone });
    const client_id = response.client?.id

    const { error } = await supabase
        .from('Appointments')
        .insert({
            client_id,
            service_id: Number(serviceId),
            timeMin: safeTimeMin.toISOString(),
            timeMax: safeTimeMax.toISOString(),
            status: status ? status : 'pending'
        })
        .select()
        .single();

    if (error) {
        console.error("[CREATE_APPOINTMENT_ERROR]:", error.message);
        return {
            success: false,
            message: `Error creando la cita`
        };
    }

    return {
        success: true,
        message: `Cita de ${name} creada con éxito`
    };
}

/**
 * Client schema
 * @property name<string>: client name
 * @property phone<string>: primary phone, identifier
 * @property secondary_phone<string | null>: secondary phone
 */
export interface ClientInfo {
    id?: string
    name: string;
    last_name: string;
    phone?: string;
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
// import { createClient } from "@/lib/supabase/server";
// import { ClientSchema, ClientInfo, Client } from "..."; 

export async function getClient(clientInfo: ClientInfo): Promise<{
    id: string,
    message: string,
    client?: Client
}> {
    const supabase = await createClient();

    let query = supabase.from('Clients').select('*');

    if (clientInfo.id) {
        query = query.eq('id', clientInfo.id);
    } else {
        query = query.eq('phone', clientInfo.phone);
    }

    const { data: clientFound, error: clientError } = await query.maybeSingle();

    if (clientError) {
        console.error("[FETCH_CLIENT_ERROR]:", clientError.message);
        throw new Error("Error checking client existence.");
    }

    let clientId = clientFound?.id;
    let client = clientFound;

    if (clientFound) {
        const response = ClientSchema.safeParse(clientFound);

        if (!response.success) {
            console.error("[ZOD_PARSE_EXISTING_ERROR]:", response.error);
            return {
                id: '',
                message: 'Error validando los datos del cliente existente.'
            };
        }

        if (!clientFound.email && clientInfo.email) {
            const { error: updateError } = await supabase
                .from('Clients')
                .update({ email: clientInfo.email })
                .eq('id', clientId);

            if (updateError) {
                console.error("[UPDATE_CLIENT_EMAIL_ERROR]:", updateError.message);
                throw new Error("Failed to update client email.");
            }

            client.email = clientInfo.email;
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
            .select('*')
            .single();

        if (createError) {
            console.error("[CREATE_CLIENT_ERROR]:", createError.message);
            throw new Error("Failed to register new client.");
        }

        const response = ClientSchema.safeParse(newClient);

        if (!response.success) {
            console.error("[ZOD_PARSE_NEW_ERROR]:", response.error);
            return {
                id: '',
                message: 'Error validando la creación del cliente.'
            };
        }

        clientId = response.data.id;
        client = response.data;
    }

    return {
        id: clientId,
        message: 'Cliente procesado correctamente',
        client: client
    };
}