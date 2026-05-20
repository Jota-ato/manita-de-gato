import { Appointment } from "../schemas";
import { TZDate } from "@date-fns/tz";
const TIMEZONE = "America/Mexico_City";


export const formatAppointmentDates = (appointment: Appointment) => {
    const { timeMin, timeMax } = appointment;

    const formatedTimeMin = new TZDate(timeMin, TIMEZONE);
    const formatedTimeMax = new TZDate(timeMax, TIMEZONE);
    return {...appointment ,timeMin: formatedTimeMin, timeMax: formatedTimeMax};
};