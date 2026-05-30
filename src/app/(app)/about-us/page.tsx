import { Heart, Sparkles, ShieldCheck, GraduationCap } from "lucide-react";

export default function AboutUs() {
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

    const team = [
        {
            name: "Elena Rodríguez",
            role: "Fundadora & Lead Technician",
            image: "https://images.unsplash.com/photo-1594744803329-a584af1dd51a?auto=format&fit=crop&q=80&w=400&h=400",
        },
        {
            name: "Sofia Martínez",
            role: "Senior Nail Artist",
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400&h=400",
        },
        {
            name: "Lucía Vega",
            role: "Spa Specialist",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400&h=400",
        },
    ];

    return (
        <div className="bg-background text-foreground">
            {/* Hero Section - Nuestra Historia */}
            <section className="py-20 px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-surface-container-low dark:bg-surface-dim rounded-[2rem] overflow-hidden border border-border shadow-sm">
                    <div className="p-8 md:p-16 space-y-6">
                        <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary italic">Nuestra Historia</h2>
                        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                            Donde la belleza <br /> encuentra su <span className="text-primary">refugio</span>
                        </h1>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            Manita de Gato nació de una pasión compartida por el detalle y el autocuidado. Lo que comenzó como un pequeño espacio íntimo dedicado al arte de las uñas, se ha transformado en un santuario donde cada cliente recibe una experiencia de lujo sin esfuerzo.
                        </p>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            Nuestra misión es simple: proporcionar un estándar inigualable de cuidado profesional, transformando tu rutina de belleza en un momento de pura relajación y auto-indulgencia.
                        </p>
                    </div>
                    <div className="h-full min-h-100 relative">
                        <img
                            src="https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&q=80&w=800"
                            alt="Interior del salón Manita de Gato"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* Values Section */}
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

            {/* Team Section */}
            <section className="py-24 max-w-7xl mx-auto px-6">
                <div className="text-center mb-20">
                    <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary italic mb-4">Especialistas</h2>
                    <h3 className="text-4xl font-bold">Conoce al Equipo</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {team.map((member, index) => (
                        <div key={index} className="group flex flex-col items-center">
                            <div className="relative w-64 h-64 mb-6 rounded-full overflow-hidden border-4 border-primary/10 group-hover:border-primary/30 transition-all shadow-xl">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                />
                            </div>
                            <h4 className="text-2xl font-bold mb-1">{member.name}</h4>
                            <p className="text-primary font-medium">{member.role}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto bg-primary text-primary-foreground rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>

                    <h2 className="text-3xl md:text-5xl font-bold mb-8 relative z-10">¿Lista para tu próxima Manita de Gato?</h2>
                    <button className="bg-white text-primary px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-lg relative z-10">
                        Reserva tu Cita Ahora
                    </button>
                </div>
            </section>
        </div>
    );
}
