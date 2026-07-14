import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import { Separator } from "@/shared/components/ui/separator";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
    return (
        <section className="px-4 md:px-8 py-12 flex justify-center items-center min-h-screen">
            <Card className="w-[90%] max-w-6xl flex flex-col md:flex-row py-0 md:h-160 overflow-hidden border-none shadow-xl bg-card gap-0">

                <div
                    className="w-full min-h-68 md:h-full relative"
                    style={{ flex: '0.6 0 0%' }}
                >
                    <Image
                        src="https://3znc0tm3cy.ufs.sh/f/DWXg3fIaM0N2UCpIwRcOcLaPYky3q4zXUHSr8utQWf79lohC"
                        alt="Interior del salón Manita de Gato"
                        width={800}
                        height={800}
                        priority
                        className="absolute object-cover w-full h-full object-left md:object-center"
                    />

                    <div className="absolute inset-0 w-full h-full bg-linear-to-t from-card via-card/40 to-transparent md:bg-linear-to-r md:from-transparent md:via-card/50 md:to-card" />
                </div>

                <div
                    className="flex flex-col justify-center p-8 md:p-12 space-y-6"
                    style={{ flex: '0.4 0 0%' }}
                >
                    <div className="space-y-2">
                        <p className="text-primary font-bold text-sm uppercase tracking-[0.2em] italic">
                            Our Story
                        </p>
                        <h2 className="text-foreground font-black text-3xl md:text-4xl lg:text-5xl leading-tight">
                            Where beauty finds its <span className="text-primary">refuge</span>
                        </h2>
                    </div>

                    <div>
                        <p className="text-muted-foreground text-sm sm:text-base lg:text-lg leading-relaxed">
                            Enjoy a luxurious effortless experience. Custom author designs,
                            professional techniques and the exceptional care your nails deserve.
                        </p>
                        <Separator className="my-4" />
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button
                                size="lg"
                                className="rounded-full h-14 px-8 text-base shadow-lg shadow-primary/20 transition-all hover:scale-105"
                                asChild
                            >
                                <Link
                                    href={'/agenda'}
                                >
                                    View Availability <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="rounded-full h-14 px-8 text-base border-primary/20 hover:bg-primary/5 transition-all"
                                asChild
                            >
                                <Link href="/#servicios">
                                    Our Services
                                </Link>
                            </Button>
                        </div>
                    </div>

                </div>
            </Card>
        </section>
    );
}