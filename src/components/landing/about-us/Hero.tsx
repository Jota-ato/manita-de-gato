import { Card } from "@/components/ui/card";
import Image from "next/image";

export default function Hero() {
    return (
        <section className="py-12 px-4 md:px-8 bg-linear-to-b from-secondary to-background flex justify-center items-center">
            <Card className="w-[90%] max-w-6xl flex flex-col md:flex-row py-0 h-160 overflow-hidden border-none shadow-xl bg-card gap-0">

                <div
                    className="w-full h-80 md:h-full relative"
                    style={{ flex: '0.6 0 0%' }}
                >
                    <Image
                        src="https://dgcujlqcchpijdecowag.supabase.co/storage/v1/object/public/Images/landing/hero_about_us.jpeg"
                        alt="Interior del salón Manita de Gato"
                        width={800}
                        height={800}
                        priority
                        className="absolute object-cover w-full h-full object-right md:object-center"
                    />

                    <div className="absolute inset-0 w-full h-full bg-linear-to-t from-card via-card/40 to-transparent md:bg-linear-to-r md:from-transparent md:via-card/50 md:to-card" />
                </div>

                <div
                    className="flex flex-col justify-center p-8 md:p-12 space-y-6"
                    style={{ flex: '0.4 0 0%' }}
                >
                    <div className="space-y-2">
                        <p className="text-primary font-bold text-sm uppercase tracking-[0.2em] italic">
                            Nuestra Historia
                        </p>
                        <h1 className="text-foreground font-black text-3xl md:text-4xl lg:text-5xl leading-tight">
                            Donde la belleza encuentra su <span className="text-primary">refugio</span>
                        </h1>
                    </div>

                    <div>
                        <p className="text-muted-foreground text-sm sm:text-base lg:text-lg leading-relaxed">
                            Disfruta de una experiencia de lujo sin esfuerzo. Diseños de autor personalizados,
                            técnicas profesionales y el cuidado excepcional que tus uñas merecen.
                        </p>
                    </div>
                </div>

            </Card>
        </section>
    );
}