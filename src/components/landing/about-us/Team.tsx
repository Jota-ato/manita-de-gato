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

export default function Team() {
    return (
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
    )
}