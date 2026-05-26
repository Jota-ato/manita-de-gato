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
                <SheetContent className="overflow-y-auto pb-4 bg-linear-to-b from-white to-pink-50">
                    <SheetHeader>
                        <SheetTitle className="text-xl">
                            {capitalizeFirstLetter(name)} - {formatPriceMXN(min_price)}
                        </SheetTitle>
                        <SheetDescription>
                            {capitalizeFirstLetter(description)}.
                        </SheetDescription>
                    </SheetHeader>
                    <section className="w-[85%] mx-auto text-lg">
                        <Image
                            src={image_url || "/public/logos/logo.svg"}
                            alt={`Imagen de ${name}`}
                            width={500}
                            height={500}
                            className="relative z-20 mb-4 brightness-60"
                        />
                        {what_is}
                        <div className="space-y-6 mt-4">

                            {/* Incluye */}
                            <div className="rounded-2xl border border-pink-200 bg-linear-to-br from-pink-50 to-pink-100 p-5 shadow-sm">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="flex items-center justify-center rounded-full bg-pink-500 p-2 text-white">
                                        <Check size={18} />
                                    </div>

                                    <h3 className="text-xl font-bold text-pink-700">
                                        Tu servicio incluye
                                    </h3>
                                </div>

                                <div className="space-y-3">
                                    {included_items.map(item => (
                                        <div
                                            key={item}
                                            className="flex items-start gap-3 rounded-xl bg-white/70 p-3 backdrop-blur-sm"
                                        >
                                            <div className="mt-1 h-2 w-2 rounded-full bg-pink-500" />

                                            <p className="text-sm text-zinc-700">
                                                {item}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Extras */}
                            <div className="rounded-2xl border border-fuchsia-200 bg-linear-to-br from-fuchsia-50 to-pink-100 p-5 shadow-sm">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="flex items-center justify-center rounded-full bg-fuchsia-500 p-2 text-white">
                                        <Sparkles size={18} />
                                    </div>

                                    <h3 className="text-xl font-bold text-fuchsia-700">
                                        Extras disponibles
                                    </h3>
                                </div>

                                <div className="space-y-3">
                                    {available_extras.map(item => (
                                        <div
                                            key={item}
                                            className="flex items-start gap-3 rounded-xl bg-white/70 p-3 backdrop-blur-sm"
                                        >
                                            <Sparkles
                                                size={14}
                                                className="mt-1 text-fuchsia-500"
                                            />

                                            <p className="text-sm text-zinc-700">
                                                {item}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </section>
                </SheetContent>
            </Sheet>
        </>
    )
}