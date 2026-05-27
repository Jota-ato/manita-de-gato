import LeftColumn from "./LeftColumn";
import RightColumn from "./RightColumn";

export default function Hero() {
    return (
        <section className="relative w-full py-16 overflow-hidden bg-background">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <LeftColumn />
                    <RightColumn />
                </div>
            </div>
        </section>
    );
}