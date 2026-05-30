import { Card } from "@/components/ui/card";

export default function Hero() {
    return (
        <section className="py-8 px-4 md:px-8 bg-linear-to-b from-secondary to-background flex flex-col items-center gap-8">
            <div className="max-w-6xl text-center space-y-4">
                <h3 className="text-muted-foreground font-bold text-xl">Nuestra Historia</h3>
                <h2 className="text-primary font-black text-4xl md:text-5xl">Donde la belleza encuentra su refugio</h2>
            </div>

            <div className="max-w-3xl px-4 text-center">
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                    Disfruta de una experiencia de lujo sin esfuerzo. Diseños de autor personalizados,
                    técnicas profesionales y el cuidado excepcional que tus uñas merecen.
                </p>
            </div>

            <Card className="relative w-full max-w-6xl h-87.5 md:h-125 mt-6 overflow-hidden rounded-2xl border-none shadow-xl">
                <img
                    src="https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&q=80&w=800"
                    alt="Interior del salón Manita de Gato"
                    className="absolute inset-0 w-full h-full object-cover brightness-90 dark:brightness-60"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
            </Card>
        </section>
    )
}