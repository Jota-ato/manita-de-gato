"use client"

import { format, differenceInMinutes } from "date-fns"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/shared/components/ui/dialog"
import { Button } from "@/shared/components/ui/button"
import { Separator } from "@/shared/components/ui/separator"
import { formatMXN } from "@/shared/lib/currency"
import { Calendar, Clock, Mail, Phone, Sparkles, User } from "lucide-react"
import { useBookingStore } from "../store/booking-store"
import { showResponse } from "@/shared/lib/client-actions"
import { createAppointmentAction } from "../actions/booking-actions"
import { useState } from "react"
import { Spinner } from "@/shared/components/ui/spinner"
import { buildCustomWhatsappMessageURL, buildWhatsappMessage } from "@/shared/utils/whatsapp"

export function ConfirmationDialog() {

    const [isLoading, setIsLoading] = useState(false)

    const {
        openConfirmationDialog,
        setOpenConfirmationDialog,
        selectedExtras,
        time,
        selectedService,
        customer,
    } = useBookingStore()

    if (!selectedService || !time || !customer) {
        return null
    }


    const createAppointment = async () => {
        setIsLoading(true)
        const response = showResponse(await createAppointmentAction({
            startTime: time.startTime,
            endTime: time.endTime,
            customerId: customer.id,
            serviceId: selectedService.data.id,
            extras: selectedExtras
        }))
        setIsLoading(false)
        if (!response || !response.data) return
        const whatsappMessage = buildWhatsappMessage({
            customer: response.data.customer,
            serviceName: response.data.service.name,
            startTime: response.data.appointment.startTime,
            endTime: response.data.appointment.endTime
        })

        const whatsappURL = buildCustomWhatsappMessageURL(whatsappMessage)

        window.open(whatsappURL, "_blank")
    }

    const includedExtras = selectedService.serviceExtras.filter((extra) => extra.included)

    const durationMinutes = differenceInMinutes(time.endTime, time.startTime)
    const servicePrice = +selectedService.data.price
    const extrasTotal = selectedExtras.reduce(
        (sum, extra) => sum + +extra.price,
        0
    )
    const total = servicePrice + extrasTotal

    return (
        <Dialog open={openConfirmationDialog} onOpenChange={setOpenConfirmationDialog}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Confirm your booking</DialogTitle>
                    <DialogDescription>
                        Review the details before finishing.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-5">
                    {/* Service */}
                    <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <Sparkles className="h-4 w-4" />
                            </span>
                            <div>
                                <p className="font-semibold text-foreground leading-tight">
                                    {selectedService.data.name}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {durationMinutes} min
                                </p>
                            </div>
                        </div>
                        <p className="font-medium text-foreground shrink-0">
                            {formatMXN(servicePrice)}
                        </p>
                    </div>

                    {/* Date & time */}
                    <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                        </span>
                        <div>
                            <p className="font-medium text-foreground leading-tight">
                                {format(time.startTime, "MMM do, yyyy")}
                            </p>
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {format(time.startTime, "h:mm a")} - {format(time.endTime, "h:mm a")}
                            </p>
                        </div>
                    </div>

                    {/* Customer */}
                    <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                            <User className="h-4 w-4" />
                        </span>
                        <div>
                            <p className="font-medium text-foreground leading-tight">
                                {customer.name} {customer.lastName}
                            </p>
                            <div className="text-sm text-muted-foreground space-y-0.5">
                                {customer.email && (
                                    <p className="flex items-center gap-1">
                                        <Mail className="h-3 w-3" />
                                        {customer.email}
                                    </p>
                                )}
                                {customer.phone && (
                                    <p className="flex items-center gap-1">
                                        <Phone className="h-3 w-3" />
                                        {customer.phone}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Extras */}
                    {(includedExtras.length > 0 || selectedExtras.length > 0) && (
                        <>
                            <Separator />
                            <div className="space-y-2">
                                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                    Extras
                                </p>
                                <div className="space-y-1.5">
                                    {includedExtras.map((se) => (
                                        <div
                                            key={se.id}
                                            className="flex items-center justify-between text-sm"
                                        >
                                            <span className="text-foreground">{se.extra.name}</span>
                                            <span className="text-muted-foreground">Included</span>
                                        </div>
                                    ))}
                                    {selectedExtras.map((extra) => (
                                        <div
                                            key={extra.id}
                                            className="flex items-center justify-between text-sm"
                                        >
                                            <span className="text-foreground">{extra.name}</span>
                                            <span className="text-muted-foreground">
                                                {formatMXN(+extra.price)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}

                    <Separator />

                    {/* Total */}
                    <div className="flex items-center justify-between">
                        <p className="font-semibold text-foreground">Total</p>
                        <p className="font-semibold text-lg text-foreground">
                            {formatMXN(total)}
                        </p>
                    </div>
                </div>

                <DialogFooter className="gap-2">
                    <DialogClose asChild>
                        <Button variant="outline" className="w-full sm:w-auto">
                            Go back
                        </Button>
                    </DialogClose>
                    <Button
                        className="w-full sm:w-auto"
                        onClick={createAppointment}
                        disabled={isLoading}
                    >
                        {isLoading ? <span className="flex items-center gap-2"><Spinner />Finishing...</span> : "Finish"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}