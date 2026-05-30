import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Heart, Sparkles, ShieldCheck, GraduationCap } from "lucide-react";

const values = [
    {
        title: "Calidad",
        description: "Utilizamos solo los mejores productos del mercado para garantizar resultados duraderos.",
        icon: ShieldCheck,
    },
    {
        title: "Profesionalismo",
        description: "Nuestro equipo está en constante capacitación para dominar las últimas tendencias.",
        icon: GraduationCap,
    },
    {
        title: "Cuidado",
        description: "Priorizamos la salud de tus uñas y tu bienestar en cada sesión.",
        icon: Heart,
    },
    {
        title: "Creatividad",
        description: "Transformamos tus ideas en diseños únicos y personalizados.",
        icon: Sparkles,
    },
];

export default function Values() {
    return (
        <section className="flex items-center justify-center px-4 md:px-8 min-h-screen bg-background">
            <div className="w-[90%] max-w-6xl mx-auto">

                <div className="text-center mb-16">
                    <h3 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">
                        Mis Valores
                    </h3>
                    <Separator className="max-w-16 py-0.5 rounded-xl bg-primary mx-auto" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
                    <Card className="col-span-1 sm:col-span-2 lg:col-span-2 lg:row-span-2 bg-muted/40 border-primary/10 flex flex-col justify-between">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold text-primary">
                                Sobre mí
                            </CardTitle>
                            <CardDescription className="font-semibold uppercase tracking-wider text-muted-foreground/80">
                                La mente detrás del arte
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="text-muted-foreground text-sm sm:text-base leading-relaxed flex flex-col gap-4 pt-2">
                            <p>
                                ¡Hola! Me encanta que quieras vivir la experiencia Manita de Gato.
                                Soy <span className="font-semibold text-secondary-foreground">Sarii Estrada</span>, técnica certificada en Organic Nails con 12 años de experiencia, especialista en nail art, formada en diseño industrial y apasionada del arte.
                            </p>
                            <p className="bg-background/60 p-3 rounded-lg border border-border text-xs sm:text-sm font-medium italic text-muted-foreground">
                                ✨ Para darte el servicio de súper calidad que mereces, mi agenda es muy exclusiva. Los lugares vuelan, ¡te recomiendo reservar tu cita lo antes posible!
                            </p>
                        </CardContent>
                    </Card>
                    {values.map((value, index) => (
                        <Card key={index} className="col-span-1 sm:col-span-1 lg:col-span-2 bg-card hover:bg-muted/30 transition-colors duration-200">
                            <CardHeader className="space-y-3">
                                <CardTitle className="text-lg font-bold tracking-tight flex gap-4 items-center">
                                    <div className="p-2 w-fit bg-primary/10 text-primary rounded-lg">
                                        <value.icon className="w-8 h-8" />
                                    </div>
                                    {value.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                                    {value.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}

                </div>
            </div>
        </section>
    );
}