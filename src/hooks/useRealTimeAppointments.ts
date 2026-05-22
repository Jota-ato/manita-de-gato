import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner';
import { AppointmentSchema } from '@/lib/supabase/schemas';

export type PayloadType = {
    schema: string
    table: string
    commit_timestamp: string
    eventType: 'INSERT' | 'UPDATE' | 'DELETE'
    new: object
    old: object
}

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
                (payload: PayloadType) => {
                    const data = payload.eventType === 'DELETE' ? payload.old : payload.new;
                    const result = AppointmentSchema.safeParse(data);

                    if (!result.success) {
                        router.refresh();
                        return;
                    }

                    switch (payload.eventType) {
                        case 'DELETE': {
                            toast.error('Cita eliminada', {
                                description: `La cita de ${result.data.client_name_snapshot} ha sido eliminada.`,
                            });
                            break;
                        }

                        case 'INSERT': {
                            toast.success('¡Nueva cita recibida!', {
                                description: `${result.data.client_name_snapshot} acaba de agendar una cita.`,
                            });
                            break;
                        }

                        case 'UPDATE': {
                            toast.info('Cita actualizada', {
                                description: `Se han modificado los datos de ${result.data.client_name_snapshot}.`,
                            });
                            break;
                        }
                    }
                    router.refresh();
                }
            )
            .subscribe();

        // 3. Limpieza de memoria garantizada
        return () => {
            supabase.removeChannel(channel);
        };
    }, [supabase, router]);
}