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
        <section className="py-20 bg-surface-container-lowest dark:bg-background border-y border-border/50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h3 className="text-3xl font-bold mb-4">Nuestros Valores</h3>
                    <div className="w-20 h-1 bg-primary mx-auto rounded-full opacity-30"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {values.map((value, index) => (
                        <div key={index} className="p-8 bg-background dark:bg-surface-dim border border-border rounded-2xl hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                                <value.icon className="w-6 h-6" />
                            </div>
                            <h4 className="text-xl font-bold mb-3">{value.title}</h4>
                            <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}