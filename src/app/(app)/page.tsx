import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CalendarDays, MapPin, Sparkles, Star } from "lucide-react";
import { BsInstagram } from "react-icons/bs";

export default function LandingPage() {
    return (
        <div className="flex flex-col min-h-dvh bg-white text-slate-900">

            {/* NAVEGACIÓN SUPERIOR */}
            <header className="px-6 py-4 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-pink-100">
                <div className="flex items-center gap-2">
                    <Sparkles className="h-6 w-6 text-pink-500" />
                    <span className="text-xl font-bold text-slate-800">Manita de Gato</span>
                </div>
                <nav className="hidden md:flex gap-6">
                    <Link href="#servicios" className="text-sm font-medium text-slate-600 hover:text-pink-600 transition-colors">Servicios</Link>
                    <Link href="#resenas" className="text-sm font-medium text-slate-600 hover:text-pink-600 transition-colors">Reseñas</Link>
                </nav>
                <Button className="bg-pink-500 hover:bg-pink-600 text-white rounded-full shadow-sm border border-pink-600 transition-colors">
                    <CalendarDays className="mr-2 h-4 w-4" />
                    Agendar Cita
                </Button>
            </header>

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

                {/* SECCIÓN DE SERVICIOS */}
                <section id="servicios" className="py-20 px-6 max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Lo que hacemos mejor</h2>
                        <p className="text-slate-600">Trabajamos con materiales de la más alta calidad para cuidar tus uñas.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Tarjeta de Servicio 1 - Usando Rose */}
                        <div className="bg-white p-8 rounded-3xl border border-rose-100 shadow-sm flex flex-col items-center text-center hover:shadow-md transition-all hover:-translate-y-1 group">
                            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">💅</div>
                            <h3 className="text-xl font-semibold text-slate-800 mb-3">Manicure & Gelish</h3>
                            <p className="text-slate-600 mb-6 text-sm leading-relaxed">Limpieza profunda, cuidado de cutícula y esmaltado semipermanente de larga duración.</p>
                            <span className="mt-auto font-medium text-white bg-rose-500 border border-rose-600 px-4 py-1 rounded-full text-sm shadow-sm">Desde $250</span>
                        </div>

                        {/* Tarjeta de Servicio 2 - Usando Fuchsia */}
                        <div className="bg-white p-8 rounded-3xl border border-fuchsia-100 shadow-sm flex flex-col items-center text-center hover:shadow-md transition-all hover:-translate-y-1 group">
                            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">✨</div>
                            <h3 className="text-xl font-semibold text-slate-800 mb-3">Uñas Acrílicas</h3>
                            <p className="text-slate-600 mb-6 text-sm leading-relaxed">Extensiones esculturales o con tip. Diseños personalizados a mano alzada para cada estilo.</p>
                            <span className="mt-auto font-medium text-white bg-fuchsia-500 border border-fuchsia-600 px-4 py-1 rounded-full text-sm shadow-sm">Desde $400</span>
                        </div>

                        {/* Tarjeta de Servicio 3 - Usando Violet/Purple */}
                        <div className="bg-white p-8 rounded-3xl border border-violet-100 shadow-sm flex flex-col items-center text-center hover:shadow-md transition-all hover:-translate-y-1 group">
                            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🦶</div>
                            <h3 className="text-xl font-semibold text-slate-800 mb-3">Pedicure Spa</h3>
                            <p className="text-slate-600 mb-6 text-sm leading-relaxed">Exfoliación, hidratación profunda, masaje relajante y esmaltado perfecto para tus pies.</p>
                            <span className="mt-auto font-medium text-white bg-violet-500 border border-violet-600 px-4 py-1 rounded-full text-sm shadow-sm">Desde $350</span>
                        </div>
                    </div>
                </section>

                {/* SECCIÓN DE RESEÑAS */}
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

                {/* LLAMADO A LA ACCIÓN (CTA) Y UBICACIÓN */}
                <section className="py-20 bg-linear-to-r from-pink-500 via-rose-500 to-fuchsia-500 text-white px-6 relative overflow-hidden">
                    <div className="max-w-4xl mx-auto text-center flex flex-col items-center relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Lista para consentirte?</h2>
                        <p className="text-pink-50 mb-10 text-lg md:text-xl max-w-2xl">
                            Nuestra agenda se llena rápido. Asegura tu lugar hoy mismo y déjanos transformar tus manos.
                        </p>

                        <div className="flex items-center gap-3 mb-10 bg-white/10 px-6 py-4 rounded-2xl border border-white/20 backdrop-blur-sm shadow-inner">
                            <MapPin className="h-6 w-6 text-pink-100" />
                            <span className="text-lg font-medium">Nos encontramos en Lindavista, Ciudad de México</span>
                        </div>

                        <Button size="lg" className="bg-white text-pink-600 hover:bg-slate-50 hover:text-pink-700 rounded-full h-14 px-10 text-lg font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                            Agendar ahora
                        </Button>
                    </div>
                </section>
            </main>

            {/* FOOTER */}
            <footer className="bg-slate-900 text-slate-400 py-12 px-6 border-t border-slate-800">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                    <div className="flex flex-col items-center md:items-start">
                        <div className="flex items-center gap-2 mb-4">
                            <Sparkles className="h-5 w-5 text-pink-400" />
                            <span className="text-xl font-bold text-white">Manita de Gato</span>
                        </div>
                        <p className="text-sm max-w-xs text-slate-500">Tu espacio seguro para relajarte y lucir unas uñas espectaculares.</p>
                    </div>

                    <div className="flex flex-col items-center md:items-start gap-3">
                        <h4 className="font-semibold text-slate-200 mb-2">Contacto</h4>
                        <a href="#" className="hover:text-pink-400 transition-colors text-sm">WhatsApp: (55) 1234-5678</a>
                        <a href="#" className="hover:text-pink-400 transition-colors text-sm">hola@manitadegato.com</a>
                    </div>

                    <div className="flex flex-col items-center md:items-start gap-3">
                        <h4 className="font-semibold text-slate-200 mb-2">Síguenos</h4>
                        <a href="#" className="flex items-center gap-2 hover:text-pink-400 transition-colors text-sm group">
                            <div className="p-2 bg-slate-800 rounded-full border border-slate-700 group-hover:border-pink-500 group-hover:bg-slate-800 transition-colors">
                                <BsInstagram className="h-4 w-4 text-slate-300 group-hover:text-pink-400" />
                            </div>
                            @manitadegato_nails
                        </a>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto border-t border-slate-800 mt-12 pt-8 text-center text-sm text-slate-600">
                    © {new Date().getFullYear()} Manita de Gato. Todos los derechos reservados.
                </div>
            </footer>
        </div>
    );
}