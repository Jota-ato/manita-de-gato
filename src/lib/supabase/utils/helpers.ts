import { Appointment } from "../schemas";
import { TZDate } from "@date-fns/tz";
export const TIMEZONE = "America/Mexico_City";


export const formatAppointmentDates = (appointment: Appointment) => {
    const { timeMin, timeMax } = appointment;
    console.log(`Inicio anterior: ${timeMin}`)

    const formatedTimeMin = new TZDate(timeMin, TIMEZONE);
     console.log(`Inicio nuevo: ${formatedTimeMin}`)
    const formatedTimeMax = new TZDate(timeMax, TIMEZONE);
    return {...appointment ,timeMin: formatedTimeMin, timeMax: formatedTimeMax};
};