import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";
import Image from "next/image";

export default function RightColumn() {
    return (
        <div className="relative">
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-secondary/20 rounded-full blur-3xl" />
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-border">
                <Image
                    src="https://dgcujlqcchpijdecowag.supabase.co/storage/v1/object/public/Images/landing/hero_about_us.jpeg"
                    alt="Interior del salón Manita de Gato"
                    width={400}
                    height={800}
                    className="w-full h-auto object-cover aspect-4/5 lg:aspect-square"
                />

                {/* Badge Flotante */}
                <Card className="absolute bottom-6 left-6 right-6 ">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-sm md:text-base">
                            <div className="p-2 w-fit bg-primary/10 text-primary rounded-lg">
                                <Star className="w-8 h-8" />
                            </div>
                            Top Rated Salon
                        </CardTitle>
                        <CardDescription>
                            <p className="text-xs sm:text-sm">4.8/5 basado en reseñas de Google</p>
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>
        </div>
    )
}