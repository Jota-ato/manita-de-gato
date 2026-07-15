import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/shared/components/ui/card"
import { ContactForm } from "./contact-form"

export function ContactCard() {
    return (
        <Card className="max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>
                    Por favor llena los campos a continuación 
                </CardTitle>
                <CardDescription>
                    Te contactaremos lo antes posible
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ContactForm />
            </CardContent>
        </Card>
    )
}