import { getServices } from "@/lib/form/service";
import ServiceCard from "./ServiceCard";
import EmptySpace from "@/components/ui/emptySpace";

export default async function Services() {
    const services = await getServices();

    return (
        <section id="servicios" className="py-20 px-6 max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Servicios que ofrecemos</h2>
                <p className="text-slate-600">Trabajamos con materiales de la más alta calidad para cuidar tus uñas.</p>
            </div>

            {!services.length ?
                <EmptySpace title="Ups! No tenemos servicios por ahora" description="Estamos preparando nuevas opciones para cuidar de ti. Vuelve pronto." /> : <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service => (
                        <ServiceCard
                            key={service.id}
                            service={service}
                        />
                    )))}
                </div>
            }
        </section>
    )
}