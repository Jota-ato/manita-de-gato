import { PackageOpen } from "lucide-react"; 

interface EmptySpaceProps {
    title?: string;
    description?: string;
}

export default function EmptySpace({
    title = "No encontramos el contenido que buscabas",
    description = "Estamos trabajando en solucionarlo, ¡vuelve pronto!"
}: EmptySpaceProps) {
    return (
        <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-slate-200 rounded-lg bg-slate-50">

            <div className="bg-slate-200/50 p-4 rounded-full mb-4">
                <PackageOpen className="w-10 h-10 text-slate-400" aria-hidden="true" />
            </div>

            <h3 className="text-xl font-semibold text-slate-900 mb-2">
                {title}
            </h3>

            <p className="text-slate-500 max-w-sm mx-auto">
                {description}
            </p>
        </div>
    )
}