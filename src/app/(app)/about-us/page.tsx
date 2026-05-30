import Hero from "@/components/landing/about-us/Hero";
import Values from "@/components/landing/about-us/Values";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function AboutUs() {




    return (
        <div className="bg-background text-foreground">
            {/* Hero Section - Nuestra Historia */}
            <Hero />

            {/* Values Section */}
            <Values />

            {/* Team Section */}

            {/* CTA Section */}
            <section className="py-20 px-6 flex items-center justify-center">
                <Card className="w-[90%] max-w-6xl bg-secondary text-secondary-foreground">
                    <CardHeader>
                        <CardTitle className="text-center text-4xl font-bold">
                            ¿Lista para tu próxima Manita de Gato?
                        </CardTitle>
                        <CardDescription className="sr-only">
                            Card hacia la agenda
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center">
                        <Button
                            className="px-4 py-8 text-2xl"
                            asChild
                        >
                            <Link
                                href={'/agenda'}
                            >
                                Reserva tu Cita Ahora
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </section>
        </div>
    );
}
