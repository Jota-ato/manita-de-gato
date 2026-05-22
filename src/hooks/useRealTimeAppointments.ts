import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner';
import { AppointmentSchema } from '@/lib/supabase/schemas';

export function useRealtimeAppointments() {
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        const channel = supabase
            .channel('realtime-appointments')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'Appointments',
                },
                (payload) => {
                    const result = AppointmentSchema.safeParse(payload.new);
                    if (result.error) return;

                    const newAppointment = result.data;
                    const clientName = newAppointment.client_name_snapshot; 

                    toast(`¡Nueva cita recibida!`, {
                        description: `${clientName} acaba de agendar una cita.`
                    });

                    router.refresh();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [supabase, router]);
}