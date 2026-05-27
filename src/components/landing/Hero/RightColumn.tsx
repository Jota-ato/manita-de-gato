import Image from "next/image";

export default function RightColumn() {
    return (
        <div className="relative">
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-secondary/20 rounded-full blur-3xl" />
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-border">
                <Image
                    src="https://dgcujlqcchpijdecowag.supabase.co/storage/v1/object/public/Images/landing/hero_image_provisional.png"
                    alt="Interior del salón Manita de Gato"
                    width={400}
                    height={800}
                    className="w-full h-auto object-cover aspect-4/5 lg:aspect-square"
                />

                {/* Badge Flotante */}
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/80 dark:bg-black/80 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-white shrink-0">
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                        </svg>
                    </div>
                    <div>
                        <h4 className="font-bold text-sm">Top Rated Salon</h4>
                        <p className="text-xs text-muted-foreground">4.9/5 basado en reseñas de Google</p>
                    </div>
                </div>
            </div>
        </div>
    )
}