import { Star } from "lucide-react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter
} from "@/components/ui/card";

const reseniasData = [
    {
        nombre: "Mariana R.",
        inicial: "M",
        servicio: "Uñas Acrílicas",
        texto: "Me encantó el servicio. Las instalaciones están súper limpias, la atención es de primera y mis uñas acrílicas quedaron idénticas a la foto que les llevé. Definitivamente se volvió mi lugar favorito."
    },
    {
        nombre: "Valeria G.",
        inicial: "V",
        servicio: "Manicure & Gelish",
        texto: "Excelente atención por parte de las chicas. El gelish me dura intacto más de tres semanas y no se me despostilla para nada. Además te ofrecen un cafecito delicioso durante tu cita."
    },
    {
        nombre: "Laura M.",
        inicial: "L",
        servicio: "Pedicure Spa",
        texto: "El Pedicure Spa es una maravilla. Trabajan con mucha paciencia y los productos que usan huelen delicioso. Un espacio 10/10 para consentirse."
    }
];


export default function Resenias() {

    return (
        <section id="resenas" className="py-20 px-6 border-y border-pink-100/50">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4">Lo que dicen nuestras clientas</h2>
                    <div className="flex justify-center items-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-6 w-6 fill-primary text-primary" />
                        ))}
                    </div>
                    <p className="text-accent-foreground font-medium">Calificadas con 5 estrellas por nuestro trato y calidad.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {reseniasData.map((resenia, index) => (
                        <Card key={index} className="rounded-3xl border-accent shadow-sm flex flex-col h-full bg-card">
                            <CardHeader className="pl-8">
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                                    ))}
                                </div>
                            </CardHeader>

                            <CardContent className="flex-1 text-sm md:text-base italic leading-relaxed">
                                &quot;{resenia.texto}&quot;
                            </CardContent>

                            <CardFooter className="flex items-center gap-3">
                                <div className="h-10 w-10 bg-accent-foreground text-primary rounded-full flex items-center justify-center font-bold shrink-0">
                                    {resenia.inicial}
                                </div>
                                <div>
                                    <CardTitle className="text-sm font-semibold text-foreground">
                                        {resenia.nombre}
                                    </CardTitle>
                                    <span className="text-xs text-muted-foreground block mt-0.5">
                                        {resenia.servicio}
                                    </span>
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}