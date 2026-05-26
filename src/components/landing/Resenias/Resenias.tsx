import { Star } from "lucide-react";

export default function Resenias() {
    return (
        <section id="resenas" className="py-20 bg-pink-50/30 px-6 border-y border-pink-100/50">
            <div className="max-w-6xl mx-auto">
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
    )
}