"use client"

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog"
import { useBookingStore } from "../store/booking-store"
import { format } from "date-fns"
import { Button } from "@/shared/components/ui/button"

export function HourSlotConfirmationDialog() {

    const {
        setTimeConfirmationOpen,
        timeConfirmationOpen,
        setTime,
        time,
        setStep
    } = useBookingStore()

    if (!time) return null

    const { startTime, endTime } = time

    return (
        <Dialog open={timeConfirmationOpen} onOpenChange={() => {
            setTimeConfirmationOpen(false)
            setTime(null)
        }}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Seleccionaste {format(startTime, "EE dd MMMM yyyy")}</DialogTitle>
                    <DialogDescription>
                        De {format(startTime, "HH:mm")} a {format(endTime, "HH:mm")}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose
                        asChild
                    >
                        <Button
                            variant={"destructive"}
                        >
                            Cancelar
                        </Button>
                    </DialogClose>
                    <Button
                        variant={"outline"}
                        onClick={() => {
                            const safeStartTime = new Date(startTime)
                            const safeEndTime = new Date(endTime)
                            setTime({ startTime: safeStartTime, endTime: safeEndTime })
                            setTimeConfirmationOpen(false)
                            setStep(3)
                        }}
                    >
                        Confirmar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}