import Map from "@/components/landing/Map";
import Services from "@/components/landing/Services/Services";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

export default function LandingPage() {
    return (
        <div className="flex flex-col min-h-dvh bg-white text-slate-900">
            <main className="flex-1">
                {/* SECCIÓN HERO (Principal) */}
                <section className="w-full py-20 md:py-32 flex flex-col items-center text-center px-4 bg-linear-to-b from-pink-50/50 to-white relative overflow-hidden">
                    <div className="absolute top-10 left-10 w-64 h-64 bg-rose-200/40 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute bottom-10 right-10 w-64 h-64 bg-fuchsia-200/40 rounded-full blur-3xl pointer-events-none" />

                    <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 max-w-3xl relative z-10">
                        Tus manos merecen una <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-pink-500 via-rose-500 to-fuchsia-500">
                            Manita de Gato
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl relative z-10">
                        Diseños exclusivos, cuidado profesional y un momento de relajación total para ti. Especialistas en uñas acrílicas, gelish y spa de manos.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 relative z-10">
                        <Button size="lg" className="bg-pink-500 hover:bg-pink-600 text-white rounded-full text-base h-12 px-8 shadow-md border border-pink-600 transition-all hover:shadow-lg hover:-translate-y-0.5">
                            Ver Disponibilidad
                        </Button>
                        <Button size="lg" variant="outline" className="rounded-full text-base h-12 px-8 border-pink-200 text-pink-700 hover:bg-pink-50 hover:text-pink-800 bg-white transition-all">
                            Nuestros Servicios
                        </Button>
                    </div>
                </section>

                <Services />

                {/* SECCIÓN DE RESEÑAS */}
                <section id="resenas" className="py-20 bg-pink-50/30 px-6 border-y border-pink-100/50">
                    <div className="mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-slate-900 mb-4">Lo que dicen nuestras clientas</h2>
                            <div className="flex justify-center items-center gap-1 mb-3">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="h-6 w-6 fill-pink-400 text-pink-400" />
                                ))}
                            </div>
                            <p className="text-slate-600 font-medium">Calificadas con 5 estrellas por nuestro trato y calidad.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Tarjeta de Reseña 1 */}
                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-pink-100 flex flex-col h-full">
                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-pink-400 text-pink-400" />)}
                                </div>
                                <p className="text-slate-700 mb-6 flex-1 italic">
                                    Me encantó el servicio. Súper detallistas con la limpieza de la cutícula y los diseños a mano alzada les quedan increíbles. El lugar es muy relajante..&quot;
                                </p>
                                <div className="flex items-center gap-3 mt-auto">
                                    <div className="h-10 w-10 bg-pink-100 text-pink-700 rounded-full flex items-center justify-center font-bold">
                                        M
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-slate-900 text-sm">Mariana G.</h4>
                                        <span className="text-xs text-pink-600">Servicio de Acrílicas</span>
                                    </div>
                                </div>
                            </div>

                            {/* Tarjeta de Reseña 2 */}
                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-pink-100 flex flex-col h-full">
                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-pink-400 text-pink-400" />)}
                                </div>
                                <p className="text-slate-700 mb-6 flex-1 italic">
                                    Primera vez que vengo y definitivamente regresaré. Mis uñas de gelish me duraron casi el mes intactas. Excelente trato y las herramientas súper limpias.&quot;
                                </p>
                                <div className="flex items-center gap-3 mt-auto">
                                    <div className="h-10 w-10 bg-fuchsia-100 text-fuchsia-700 rounded-full flex items-center justify-center font-bold">
                                        S
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-slate-900 text-sm">Sofía R.</h4>
                                        <span className="text-xs text-fuchsia-600">Manicure & Gelish</span>
                                    </div>
                                </div>
                            </div>

                            {/* Tarjeta de Reseña 3 */}
                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-pink-100 flex flex-col h-full">
                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-pink-400 text-pink-400" />)}
                                </div>
                                <p className="text-slate-700 mb-6 flex-1 italic">
                                    El Pedicure Spa es una maravilla. Trabajan con mucha paciencia y los productos que usan huelen delicioso. Un espacio 10/10 para consentirse.&quot;
                                </p>
                                <div className="flex items-center gap-3 mt-auto">
                                    <div className="h-10 w-10 bg-violet-100 text-violet-700 rounded-full flex items-center justify-center font-bold">
                                        L
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-slate-900 text-sm">Laura M.</h4>
                                        <span className="text-xs text-violet-600">Pedicure Spa</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Map />
            </main>
        </div>
    );
}