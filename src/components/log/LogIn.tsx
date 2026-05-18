import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel, FieldSeparator, FieldSet } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { FcGoogle } from 'react-icons/fc';

export default function LogIn() {
    return (
        <Card className="w-[80%] max-w-120">
            <CardHeader className="text-center">
                <CardTitle>
                    Inicia Sesión
                </CardTitle>
                <CardDescription>
                    Debes de tener autorización para continuar
                </CardDescription>
            </CardHeader>
            <CardContent>
                <FieldSet>
                    <FieldGroup>
                        <Field>
                            <FieldLabel>Correo</FieldLabel>
                            <Input type="email" />
                        </Field>
                        <Field>
                            <FieldLabel>Contraseña</FieldLabel>
                            <Input type="password" />
                        </Field>
                    </FieldGroup>
                    <FieldSeparator />
                    <FieldGroup>
                        <Field>
                            <FieldLabel className="text-center">Inicia sesión con Google</FieldLabel>
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full h-11 rounded-full border-[#dadce0] bg-white hover:bg-[#f8f9fa] text-[#3c4043] font-medium gap-3 text-sm"
                            >
                                <FcGoogle className="size-5 shrink-0" />
                                Continuar con Google
                            </Button>
                        </Field>
                    </FieldGroup>
                </FieldSet>
            </CardContent>
            <CardFooter>
                Pie de card
            </CardFooter>
        </Card>
    )
}