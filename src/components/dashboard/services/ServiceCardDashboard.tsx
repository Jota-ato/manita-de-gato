import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { capitalizeFirstLetter } from "@/lib/utils/capitalize";
import { formatPriceMXN } from "@/lib/utils/currency";
import { Service } from "@/schemas/services";
import Image from "next/image";
import ActionModal from "../home/QuickActions/ActionModal";
import ServiceForm from "./ServiceForm";

interface ServiceCardDashboardProps {
    service: Service
}


export default function ServiceCardDashboard({ service }: ServiceCardDashboardProps) {

    const { name, description, min_price, image_url } = service;

    return (
        <Card>
            <Image
                src={image_url || "/public/logos/logo.svg"}
                alt={`Imagen de ${name}`}
                width={150}
                height={150}
                className="relative z-20 aspect-video h-50 w-full object-cover brightness-90"
            />
            <CardHeader>
                <CardTitle
                    className="text-xl font-bold text-center"
                >{capitalizeFirstLetter(name)}</CardTitle>
                <CardDescription>{capitalizeFirstLetter(description)}.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center gap-2">
                Precio <span className="font-bold">{formatPriceMXN(min_price)}</span>
            </CardContent>
            <CardFooter>
                <ActionModal
                    trigger={
                        <Button>
                            Editar
                        </Button>
                    }
                    title="Editar servicio"
                    description={`Edición de ${name}`}
                >
                    <ServiceForm
                        service={service}
                    />
                </ActionModal>
            </CardFooter>
        </Card>
    )
}