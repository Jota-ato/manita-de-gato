import { Card } from "@/components/ui/card";

export default function Hero() {
    return (
        <section className="py-8 px-4 md:px-8 bg-linear-to-b from-secondary to-background flex flex-col items-center gap-8">
            <div className="max-w-6xl text-center space-y-4">
                <h3 className="text-muted-foreground font-bold text-xl">Nuestra Historia</h3>
                <h2 className="text-primary font-black text-4xl md:text-5xl">Donde la belleza encuentra su refugio</h2>
            </div>

            <div className="max-w-3xl text-center">
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                    Manita de Gato nació de una pasión compartida por el detalle y el autocuidado. Lo que comenzó como un pequeño espacio íntimo dedicado al arte de las uñas, se ha transformado en un santuario donde cada cliente recibe una experiencia de lujo sin esfuerzo.
                </p>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                    Nuestra misión es simple: proporcionar un estándar inigualable de cuidado profesional, transformando tu rutina de belleza en un momento de pura relajación y auto-indulgencia.
                </p>
            </div>

            <Card className="relative w-[90%] max-w-6xl h-140">
                <img
                    src="https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&q=80&w=800"
                    alt="Interior del salón Manita de Gato"
                    className="absolute inset-0 w-full h-full object-cover brightness-75 dark:brightness-50"
                />
            </Card>
        </section>
    )
}