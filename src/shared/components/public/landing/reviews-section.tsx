"use client"

import { Star } from "lucide-react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter
} from "@/shared/components/ui/card";
import { motion, AnimatePresence } from "motion/react"
import { Heading } from "../../typography/heading";
import { ScrollAnimateItem } from "../../animate/scroll-animate-item";

const reviewsData = [
    {
        nombre: "Mariana R.",
        inicial: "M",
        servicio: "Uñas Acrílicas",
        texto: "Me encantó el servicio. El personal es muy amable y profesional. Mis uñas se ven increíbles y duraron mucho tiempo sin romperse. Definitivamente volveré."
    },
    {
        nombre: "Valeria G.",
        inicial: "V",
        servicio: "Manicure & Gel Polish",
        texto: "El servicio es excelente. El gel polish dura más de tres semanas sin descascararse y te ofrecen un delicioso cafecito durante tu cita."
    },
    {
        nombre: "Laura M.",
        inicial: "L",
        servicio: "Spa Pedicure",
        texto: "El Spa Pedicure es maravilloso. Trabajan con paciencia y los productos que usan huelen increíble. Un espacio 10/10 para consentirte."
    }
];

export function ReviewsSection() {
    return (
        <section id="reviews" className="py-8 text-secondary-foreground min-h-screen flex items-center justify-center">
            <AnimatePresence>
                <div className="max-w-6xl mx-auto">
                    <motion.header
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                        <Heading level={2} className="text-3xl font-bold mb-4">Lo que nuestros clientes dicen</Heading>
                        <div className="flex justify-center items-center gap-1 mb-3">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-6 w-6 fill-primary text-primary" />
                            ))}
                        </div>
                        <p className="text-muted-foreground font-medium">+5 estrellas por nuestro cuidado y calidad.</p>
                    </motion.header>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {reviewsData.map((review, idx) => (
                            <ScrollAnimateItem
                                key={review.nombre}
                                delay={0.1 * idx * 1.8}
                            >
                                <Card key={idx} className="rounded-3xl border-border shadow-md flex flex-col h-full bg-card text-card-foreground">
                                    <CardHeader className="pl-8">
                                        <div className="flex gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                                            ))}
                                        </div>
                                    </CardHeader>

                                    <CardContent className="flex-1 text-sm md:text-base italic leading-relaxed">
                                        &quot;{review.texto}&quot;
                                    </CardContent>

                                    <CardFooter className="flex items-center gap-3">
                                        <div className="h-10 w-10 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-bold shrink-0 border border-border">
                                            {review.inicial}
                                        </div>
                                        <div>
                                            <CardTitle className="text-sm font-semibold text-foreground">
                                                {review.nombre}
                                            </CardTitle>
                                            <span className="text-xs text-muted-foreground block mt-0.5">
                                                {review.servicio}
                                            </span>
                                        </div>
                                    </CardFooter>
                                </Card>
                            </ScrollAnimateItem>
                        ))}
                    </div>
                </div>
            </AnimatePresence>
        </section>
    );
}