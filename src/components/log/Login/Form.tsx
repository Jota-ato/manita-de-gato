import {
    FieldGroup,
    FieldSet,
    FieldLegend
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import FieldWLabel from "@/components/agenda/AgendaBody/Form/FieldWLabel";


export default function Form() {
    return (
        <form>
            <FieldSet>
                <FieldLegend className="sr-only">
                    Credenciales de acceso
                </FieldLegend>
                <FieldGroup>
                    <FieldWLabel
                        label="Correo electrónico"
                        id="email"
                        type="email"
                        name="email"
                        autoComplete="email"
                        required
                        placeholder="tu@correo.com"
                    />
                    <FieldWLabel
                        label="Contraseña"
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                    />
                </FieldGroup>

                <Button type="submit" className="w-full">
                    Entrar
                </Button>
            </FieldSet>
        </form>
    )
}