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
                    switch (payload.eventType) {
                        case 'DELETE': {
                            const result = AppointmentSchema.safeParse(payload.old);
                            if (result.success) {
                                toast.error('Cita eliminada', {
                                    description: `La cita de ${result.data.client_name_snapshot} ha sido eliminada.`,
                                });
                            }
                            break;
                        }

                        case 'INSERT': {
                            const result = AppointmentSchema.safeParse(payload.new);
                            if (result.success) {
                                toast.success('¡Nueva cita recibida!', {
                                    description: `${result.data.client_name_snapshot} acaba de agendar una cita.`,
                                });
                            }
                            break;
                        }

                        case 'UPDATE': {
                            const result = AppointmentSchema.safeParse(payload.new);
                            if (result.success) {
                                // Corrección del mensaje para diferenciarlo de un INSERT
                                toast.info('Cita actualizada', {
                                    description: `Se han modificado los datos de ${result.data.client_name_snapshot}.`,
                                });
                            }
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