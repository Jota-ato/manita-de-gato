'use server';
import { getClientId } from "../form/service";
import { Client } from "../supabase/schemas";
import { createClient } from "../supabase/server";

interface CreateContactMessageParams extends Omit<Client, 'id'> {
    email: string;
    reason: string;
}

interface CreateContactMessageReturn {
    success: boolean
    message: string
}

export async function createContactMessage(params: CreateContactMessageParams): Promise<CreateContactMessageReturn> {

    const supabase = await createClient();

    const { name, last_name, phone, secondary_phone, email, reason } = params;

    const client_id = await getClientId({ name, last_name, phone, secondary_phone, email });

    const { error } = await supabase
        .from('Contacts')
        .insert({
            client_id,
            reason
        })

    if (error) {
        console.error(error);
        return {
            success: false,
            message: 'Error enviando el contacto',
        }
    }

    return {
        success: true,
        message: 'Mensaje envíado, te contactaremos pronto :)'
    }
}