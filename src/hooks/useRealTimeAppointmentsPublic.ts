import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client'


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
                    router.refresh();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [supabase, router]);
}