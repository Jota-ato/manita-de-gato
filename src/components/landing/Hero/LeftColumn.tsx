import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function LeftColumn() {
    return (
        <div className="flex flex-col space-y-8 z-10">
            <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
                    Tus manos merecen una <br />
                    <span className="relative inline-block">
                        <span className="text-primary text-6xl md:text-8xl font-cavalier tracking-wider">Manita de Gato</span>
                        <svg
                            className="absolute -bottom-2 left-0 w-full h-2 text-primary/30"
                            viewBox="0 0 100 10"
                            preserveAspectRatio="none"
                        >
                            <path
                                d="M0 5 Q 25 0, 50 5 T 100 5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="4"
                            />
                        </svg>
                    </span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed">
                    Diseños exclusivos, cuidado profesional y un momento de relajación total para ti.
                    Especialistas en uñas acrílicas, gelish y spa de manos.
                </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <Button
                    size="lg"
                    className="rounded-full h-14 px-8 text-base shadow-lg shadow-primary/20 transition-all hover:scale-105"
                    asChild
                >
                    <Link
                        href={'/agenda'}
                    >
                        Ver Disponibilidad <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
                <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full h-14 px-8 text-base border-primary/20 hover:bg-primary/5 transition-all"
                    asChild
                >
                    <Link href="#servicios">
                        Nuestros Servicios
                    </Link>
                </Button>
            </div>
        </div>
    )
}