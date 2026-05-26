import Hero from "@/components/landing/Hero/Hero";
import Map from "@/components/landing/Map";
import Resenias from "@/components/landing/Resenias/Resenias";
import Services from "@/components/landing/Services/Services";

export default function LandingPage() {
    return (
        <div className="flex flex-col min-h-dvh bg-white text-slate-900">
            <main>
                <Hero />
                <Services />
                <Resenias />
                <Map />
            </main>
        </div>
    );
}