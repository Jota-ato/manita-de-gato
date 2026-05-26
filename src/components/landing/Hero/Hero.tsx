import { Button } from "@/components/ui/button";

export default function Hero() {
    return (
        <section className="w-full py-20 md:py-32 flex flex-col items-center text-center px-4 bg-linear-to-b from-pink-50  to-white relative overflow-hidden">
            <div className="absolute top-10 left-10 w-64 h-64 bg-rose-200/40 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-64 h-64 bg-fuchsia-200/40 rounded-full blur-3xl pointer-events-none" />
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 max-w-3xl relative z-10">
                Tus manos merecen una <br className="hidden md:block" />
                <span className="text-pink-500">
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
    )
}