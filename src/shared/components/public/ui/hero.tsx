import { HeroLeftColumn } from "./hero-left-column";
import { HeroRightColumn } from "./hero-right-column";

export function Hero() {
    return (
        <section className="relative py-8 w-full overflow-hidden bg-background flex items-center justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">
                <HeroLeftColumn />
                <HeroRightColumn />
            </div>
        </section>
    );
}