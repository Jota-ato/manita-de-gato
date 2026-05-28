import { Appointment } from "@/lib/supabase/schemas";

export function getExpectedPaidAppointments(appointments: Appointment[]): {expected: number, paid: number} { 

    const confirmedAppintments = appointments.filter(apt => (apt.status === 'approved' || apt.status === 'paid'));
    const expected = confirmedAppintments.reduce((acc, apt) => acc + apt.total_price, 0);
    const paidAppointments = appointments.filter(apt => apt.status === 'paid');
    const paid = paidAppointments.reduce((acc, apt) => acc + apt.total_price, 0);

    return {
        expected,
        paid
    }
}