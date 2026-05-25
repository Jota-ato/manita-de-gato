import Logo from "@/components/ui/logo";

export default function FooterSlogan() {
    return (
        <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-4 text-xl font-bold text-white">
                Manita de Gato
                <Logo
                />
            </div>
            <p className="text-sm max-w-xs text-slate-500">Y tú... ¿Ya te diste una Manita de Gato?</p>
        </div>
    )
}