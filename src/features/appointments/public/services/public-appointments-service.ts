import { customersRepository, ICustomersRepository } from "@/features/customers/services/customers-repository";
import { appointmentsService } from "../../core/services/appointments-service";
import { NewPublicAppointment } from "../types/public-appointments.types";
import { IPublicAppointmentsRepository, publicAppointmentsRepository } from "./public-appointments-repository";
import { AppError } from "@/shared/lib/errors";
import { IServicesRepository, servicesRepository } from "@/features/services/services/services-repository";
import { extrasRepository, IExtrasRepository } from "@/features/services/services/extras-repository";
import { appointmentExtrasRepository, IAppointmentExtrasRepository } from "../../core/services/appoinment-extras-repository";
import { Extra } from "@/db/schema/extras";
import { TZDate } from "@date-fns/tz";

class PublicAppointmentsService {
    constructor(
        private publicAppointmentsRepository: IPublicAppointmentsRepository,
        private customersRespository: ICustomersRepository,
        private servicesRepository: IServicesRepository,
        private extrasRepository: IExtrasRepository,
        private appointmentExtrasRepository: IAppointmentExtrasRepository
    ) { }

    async createAppointment(data: NewPublicAppointment) {
        await appointmentsService.avoidCollision(data.startTime, data.endTime)
        const [customer, service, resolvedExtras] = await Promise.all([
            this.customersRespository.getById(data.customerId),
            this.servicesRepository.getById(data.serviceId),
            Promise.all(
                data.extras.map((extra) => this.extrasRepository.getExtraById(extra.id))
            )
        ])

        if (!customer) throw new AppError("Customer not found")
        if (!service) throw new AppError("Service not found")
        const extras = resolvedExtras.filter((extra): extra is Extra => extra !== undefined)
        if (extras.length !== data.extras.length) {
            throw new AppError("Extras not found")
        }

        const safeStartTime = new Date(data.startTime)
        const safeEndTime = new Date(data.endTime)

        const appointment = await this.publicAppointmentsRepository.createAppointment({
            customerId: customer.id,
            serviceId: service.id,
            startTime: safeStartTime.toISOString(),
            endTime: safeEndTime.toISOString()
        })

        if (extras.length)
            await this.appointmentExtrasRepository.insert(extras.map(extra => ({
                appointmentId: appointment.id,
                extraId: extra.id,
                extraPriceSnapshot: extra.price,
            })))

        return {
            appointment,
            customer,
            service,
            extras
        }
    }

    async getPublicAppointmentsFromDay(day: TZDate) {
        const appointments = await this.publicAppointmentsRepository.getFromDay(day)

        return appointments
            .filter(apt => apt.status === "CONFIRMED" || apt.status === "PAID" || apt.status === "COMPLETED" || apt.status === "BLOCKED")
            .map(apt => ({
                startTime: new Date(apt.startTime),
                endTime: new Date(apt.endTime)
            }))
    }
}

export const publicAppointmentsService = new PublicAppointmentsService(publicAppointmentsRepository, customersRepository, servicesRepository, extrasRepository, appointmentExtrasRepository)