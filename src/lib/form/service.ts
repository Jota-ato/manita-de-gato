import { serviceSchema, Service } from '@/schemas/services';
import { createClient } from "@/lib/supabase/client";

export async function getServices(): Promise<Service[]> {
    const supabase = createClient()

    const { data, error } = await supabase
        .from('Services')
        .select("*");

    if (error) {
        console.error('Error while fetching services');
        return [];
    };

    if (data) {
        const validateServices = data.map(element => serviceSchema.safeParse(element).data).filter(element => typeof element === 'object');
        return validateServices;
    }
    
    return [];
}