import {
    Card,
    CardHeader,
    CardDescription,
    CardTitle,
    CardContent,
    CardFooter
 } from "@/components/ui/card";
import { formatPriceMXN } from "@/lib/utils/currency";
import { Service } from "@/schemas/services";
import Image from "next/image";
import Pou from "@/app/pou.png";

interface ServiceCardProps { 
    service: Service
}

export default function ServiceCard({ service }: ServiceCardProps) {

    const { name, description, min_price } = service;
    
    return (
        <Card>
            <CardHeader>
                <CardTitle
                    className="text-xl font-bold text-center"
                >{name}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
                <Image
                    src={Pou}
                    alt="Imagen de servicio"
                    width={150}
                    height={150}
                />
            </CardContent>
            <CardFooter>
                Precio: <span className="font-bold">{formatPriceMXN(min_price)}</span>
            </CardFooter>
        </Card>
    )
}