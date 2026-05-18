import {
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card";

export default function LogInHeader() {
    return (
        <CardHeader className="text-center">
            <CardTitle>
                Inicia sesión
            </CardTitle>
            <CardDescription>
                Debes tener autorización para continuar
            </CardDescription>
        </CardHeader>
    )
}