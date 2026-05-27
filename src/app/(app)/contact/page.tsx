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
        <section className="w-full px-4 py-16">
            <Card className="mx-auto max-w-2xl rounded-4xl border-border/70 shadow-sm font-cavalier tracking-widest">

                <CardHeader className="text-center">
                    <CardTitle className="text-5xl text-primary font-cavalier">
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
                                <FieldLabel>Nombre</FieldLabel>
                                <Input
                                    type="text"
                                    placeholder="Juan"
                                    className="bg-background"
                                />
                            </Field>
                            <Field>
                                <FieldLabel>Apellido</FieldLabel>
                                <Input
                                    type="text"
                                    placeholder="Pérez"
                                    className="bg-background"
                                />
                            </Field>
                        </FieldGroup>

                        <FieldGroup>

                            <Field>
                                <FieldLabel>
                                    Número de teléfono
                                </FieldLabel>

                                <Input
                                    type="tel"
                                    placeholder="+52 55 1234 5678"
                                    className="bg-background"
                                />
                            </Field>

                            <Field>
                                <FieldLabel>
                                    Correo electrónico
                                </FieldLabel>

                                <Input
                                    type="email"
                                    placeholder="correo@ejemplo.com"
                                    className="bg-background"
                                />
                            </Field>

                            <Field>
                                <FieldLabel>
                                    Motivo
                                </FieldLabel>

                                <Textarea
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