import Link from "next/link";
import { Button } from "../../ui/button";
import { Heading } from "../../typography/heading";

export function Location() {
    return (
        <section id="location" className="py-20 px-6 relative overflow-hidden">
            <div className="max-w-6xl mx-auto text-center flex flex-col items-center relative z-10">
                <Heading level={2} className="mb-6">
                    ¿Lista para consentirte?</Heading>
                <p className="text-pink-50 mb-10 text-lg md:text-xl max-w-2xl">
                    Nuestra agenda se llena rápidamente. Asegura tu lugar hoy y déjanos transformar tus manos.
                </p>

                <div className="flex items-center gap-3 mb-10 w-[90%] h-120">
                    <iframe
                        className="w-full h-full rounded-2xl"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3002.4226935648253!2d-99.18058713431387!3d19.467979072235646!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d202713b8e654b%3A0xb21b7ad79c8b15db!2sManita%20de%20Gato!5e0!3m2!1ses-419!2smx!4v1779804724215!5m2!1ses-419!2smx"
                        loading="lazy" />
                </div>
                <Button
                    size="lg"
                    className="text-xl px-8 py-6 font-bold"
                    asChild
                >
                    <Link
                        href={"/booking"}
                    >
                        Agendar
                    </Link>
                </Button>
            </div>
        </section>
    )
}