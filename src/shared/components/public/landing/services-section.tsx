"use client"
import { ServiceImage } from "@/features/appointments/public/components/service-image"
import { ServiceWithExtras } from "@/features/services/types/service.types"
import { Heading } from "../../typography/heading"
import { motion, AnimatePresence } from "motion/react"
import { ScrollAnimateItem } from "../../animate/scroll-animate-item"
import { Button } from "../../ui/button"
import { Separator } from "../../ui/separator"
import { useBookingStore } from "@/features/appointments/public/store/booking-store"
import { redirect } from "next/dist/client/components/navigation"
import { differenceInYears } from "date-fns"

export function ServicesSection({
    services
}: {
    services: ServiceWithExtras[]
}) {

    const { setStep, setSelectedService } = useBookingStore()
    const yearsOfExperience = differenceInYears(new Date(), new Date("2013-01-01"))
    return (

        <AnimatePresence>
        <section className="space-y-4 py-8" id="services">

                <ScrollAnimateItem>
                    <Heading className="text-left" level={2}>Nuestros servicios</Heading>
                    <p className="text-muted-foreground">Técnica certificada con más de {yearsOfExperience} años de experiencia.</p>
                </ScrollAnimateItem>
                <Separator />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {services.map((service, idx) => (
                        <ScrollAnimateItem
                            key={service.data.id}
                            delay={Math.min(idx * 0.1, 0.4)}
                        >
                            <ServiceImage
                                service={service}
                                trigger={
                                    <Button
                                        variant={"secondary"}
                                        onClick={() => {
                                            setSelectedService(service)
                                            setStep(2)
                                            redirect("/booking")
                                        }}
                                    >
                                        Agendar
                                    </Button>
                                }
                            />
                        </ScrollAnimateItem>
                    ))}
                </div>
            </section>
        </AnimatePresence>
    )
}