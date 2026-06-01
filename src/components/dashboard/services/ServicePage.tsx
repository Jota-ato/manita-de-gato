import { getServices } from "@/lib/form/service";
import ServiceCardDashboard from "./ServiceCardDashboard";
import EmptySpace from "@/components/ui/emptySpace";

export default async function ServicePage() {

    const services = await getServices();

    return (
        <div className="w-[90%] max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {!services.length ?
                <div style={{gridColumn: '2/3'}}>
                    <EmptySpace title="Ups! Ocurrió un error cargando los servicios" description="Espera un momento" />
                </div> :
                services.map((service => (
                    <ServiceCardDashboard
                        key={service.id}
                        service={service}
                    />
                )))
            }
        </div>
    )
}