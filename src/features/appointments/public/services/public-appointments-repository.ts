import { db } from "@/db"
import { Appointment, appointments, NewAppointment } from "@/db/schema"
import { TZDate } from "@date-fns/tz"

export interface IPublicAppointmentsRepository {
    createAppointment(data: NewAppointment): Promise<Appointment>
    getFromDay(day: TZDate): Promise<Appointment[]>
}

class PublicAppointmentsRepository implements IPublicAppointmentsRepository {
    async createAppointment(data: NewAppointment): Promise<Appointment> {
        return (await db
            .insert(appointments)
            .values(data)
            .returning()
        )[0]
    }

    async getFromDay(day: TZDate): Promise<Appointment[]> {
        return await db
            .query
            .appointments
            .findMany({
                where: (appointments, { gte }) => gte(appointments.startTime, day.toISOString())
            })
    }
}

export const publicAppointmentsRepository = new PublicAppointmentsRepository()