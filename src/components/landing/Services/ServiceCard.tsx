import { Button } from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardDescription,
    CardTitle,
    CardContent,
    CardFooter
} from "@/components/ui/card";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { capitalizeFirstLetter } from "@/lib/utils/capitalize";
import { formatPriceMXN } from "@/lib/utils/currency";
import { Service } from "@/schemas/services";
import Image from "next/image";

interface ServiceCardProps {
    service: Service
}

export default function ServiceCard({ service }: ServiceCardProps) {

    const { name, description, min_price, image_url, what_is } = service;

    return (
        <>
            <Sheet>
                <Card>
                    <Image
                        src={image_url || "/public/logos/logo.svg"}
                        alt={`Imagen de ${name}`}
                        width={150}
                        height={150}
                        className="relative z-20 aspect-video h-50 w-full object-cover brightness-60"
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
                    <CardFooter >
                        <SheetTrigger
                            asChild
                        >
                            <Button className="bg-pink-400 hover:bg-pink-600 transition-colors duration-300">
                                Ver detalles
                            </Button>
                        </SheetTrigger>
                    </CardFooter>
                </Card>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle className="text-xl">
                            {capitalizeFirstLetter(name)} - {formatPriceMXN(min_price)}
                        </SheetTitle>
                        <SheetDescription>
                            {capitalizeFirstLetter(description)}.
                        </SheetDescription>
                    </SheetHeader>
                    <div className="w-[85%] mx-auto text-lg">
                        <Image
                            src={image_url || "/public/logos/logo.svg"}
                            alt={`Imagen de ${name}`}
                            width={500}
                            height={500}
                            className="relative z-20 mb-4 brightness-60"
                        />
                        {what_is}
                    </div>
                </SheetContent>
            </Sheet>
        </>
    )
}