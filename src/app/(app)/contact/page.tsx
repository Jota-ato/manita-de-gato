import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    Field,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function page() {
    return (
        <section className="w-full min-h-screen flex items-center justify-center">
            <Card className="border-muted font-cavalier tracking-widest w-[90%] max-w-3xl">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl md:text-3xl text-primary font-cavalier">
                        Contáctanos
                    </CardTitle>
                    <CardDescription className="text-base text-muted-foreground">
                        Estamos listos para ayudarte y responder cualquier duda.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form className="space-y-6">
                        <FieldGroup className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            <Field>
                                <FieldLabel htmlFor="name">Nombre</FieldLabel>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Juan"
                                    className="bg-background"
                                />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="lastName">Apellido</FieldLabel>
                                <Input
                                    id="lastName"
                                    type="text"
                                    placeholder="Pérez"
                                    className="bg-background"
                                />
                            </Field>
                        </FieldGroup>

                        <FieldGroup>

                            <Field>
                                <FieldLabel htmlFor="phone">
                                    Número de teléfono
                                </FieldLabel>

                                <Input
                                    id="phone"
                                    type="tel"
                                    placeholder="+52 55 1234 5678"
                                    className="bg-background"
                                />
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="email">
                                    Correo electrónico
                                </FieldLabel>

                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="correo@ejemplo.com"
                                    className="bg-background"
                                />
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="reason">
                                    Motivo
                                </FieldLabel>

                                <Textarea
                                    id="reason"
                                    rows={5}
                                    placeholder="Cuéntanos cómo podemos ayudarte..."
                                    className="bg-background"
                                />
                            </Field>

                        </FieldGroup>

                        <Button
                            type="submit"
                        >
                            Enviar mensaje
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </section>
    );
}