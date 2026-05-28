import Form from "@/components/contact/Form";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function page() {
    return (
        <section className="w-full min-h-screen flex items-center justify-center">
            <Card className="border-muted tracking-widest w-[90%] max-w-3xl">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl md:text-3xl text-primary">
                        Contáctanos
                    </CardTitle>
                    <CardDescription className="text-base text-muted-foreground">
                        Estamos listos para ayudarte y responder cualquier duda.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form />
                </CardContent>
            </Card>
        </section>
    );
}