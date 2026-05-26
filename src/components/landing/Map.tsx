import { Button } from "../ui/button";

export default function Map() {
    return (
        <section className="py-20 bg-linear-to-r from-pink-500 via-rose-500 to-fuchsia-500 text-white px-6 relative overflow-hidden">
            <div className="mx-auto text-center flex flex-col items-center relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Lista para consentirte?</h2>
                <p className="text-pink-50 mb-10 text-lg md:text-xl max-w-2xl">
                    Nuestra agenda se llena rápido. Asegura tu lugar hoy mismo y déjanos transformar tus manos.
                </p>

                <div className="flex items-center gap-3 mb-10 w-[90%] h-120">
                    <iframe
                        className="w-full h-full rounded-2xl"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3002.4226935648253!2d-99.18058713431387!3d19.467979072235646!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d202713b8e654b%3A0xb21b7ad79c8b15db!2sManita%20de%20Gato!5e0!3m2!1ses-419!2smx!4v1779804724215!5m2!1ses-419!2smx"
                        loading="lazy" />
                </div>
                <Button className="bg-white text-pink-600 hover:bg-slate-50 hover:text-pink-700 rounded-full h-14 px-10 text-lg font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                    Agendar ahora
                </Button>
            </div>
        </section>
    )
}