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
import { Check, Sparkles } from "lucide-react";

interface ServiceCardProps {
    service: Service
}

export default function ServiceCard({ service }: ServiceCardProps) {

    const { name, description, min_price, image_url, what_is, available_extras, included_items } = service;

    return (
        <>
            <Sheet>
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
                    <CardFooter >
                        <SheetTrigger
                            asChild
                        >
                            <Button>
                                Ver detalles
                            </Button>
                        </SheetTrigger>
                    </CardFooter>
                </Card>
                <SheetContent className="overflow-y-auto pb-4 ">
                    <SheetHeader>
                        <SheetTitle className="text-3xl tracking-wider font-cavalier">
                            {capitalizeFirstLetter(name)}
                        </SheetTitle>
                        <SheetDescription>
                            {capitalizeFirstLetter(description)}.
                        </SheetDescription>
                    </SheetHeader>
                    <section className="w-[85%] mx-auto">
                        <Image
                            src={image_url || "/public/logos/logo.svg"}
                            alt={`Imagen de ${name}`}
                            width={500}
                            height={500}
                            className="relative z-20 mb-4 brightness-60"
                        />
                        <div className="flex flex-col gap-2">
                            <span className="text-center tracking-wider font-cavalier text-2xl font-bold text-pink-400">{formatPriceMXN(min_price)}</span>
                            {what_is}
                        </div>
                        <div className="space-y-6 mt-4">
                            {/* Incluye */}
                            <Card className="rounded-2xl border border-foreground shadow-sm">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Check />
                                        Tu servicio incluye
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {included_items.map(item => (
                                        <div
                                            key={item}
                                            className="flex items-center gap-3 px-3 py-2"
                                        >
                                            <div className="h-2 w-2 rounded-full bg-primary" />
                                            <p className="text-md">
                                                {item}
                                            </p>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>

                            {/* Extras */}
                            <Card className="rounded-2xl border border-foreground shadow-sm">
                                <CardHeader className="flex items-center gap-2">
                                    <CardTitle className="flex items-center gap-2">
                                        <Sparkles />
                                        Extras Disponibles
                                    </CardTitle>
                                </CardHeader>

                                <CardContent>
                                    {available_extras.map(item => (
                                        <div
                                            key={item}
                                            className="flex items-center gap-3 px-3 py-2"
                                        >
                                            <div className="h-2 w-2 rounded-full bg-primary" />
                                            <p className="text-md">
                                                {item}
                                            </p>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>

                        </div>
                    </section>
                </SheetContent>
            </Sheet>
        </>
    )
}