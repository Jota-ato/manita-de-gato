import { CardFooter } from "@/components/ui/card";

export default function LogInFooter() {
    return (
        <CardFooter className="justify-center">
            <a
                href="/recuperar"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
                ¿Olvidaste tu contraseña?
            </a>
        </CardFooter>
    )
}