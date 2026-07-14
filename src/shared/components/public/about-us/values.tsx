import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Separator } from "@/shared/components/ui/separator";
import { Heart, Sparkles, ShieldCheck, GraduationCap } from "lucide-react";

const values = [
    {
        title: "Quality",
        description: "We use only the best products on the market to guarantee lasting results.",
        icon: ShieldCheck,
    },
    {
        title: "Professionalism",
        description: "Our team is in constant training to master the latest trends.",
        icon: GraduationCap,
    },
    {
        title: "Care",
        description: "We prioritize the health of your nails and your well-being in every session.",
        icon: Heart,
    },
    {
        title: "Creativity",
        description: "We transform your ideas into unique and personalized designs.",
        icon: Sparkles,
    },
];

export function Values() {
    return (
        <section className="flex items-center justify-center px-4 md:px-8 min-h-screen bg-background py-12">
            <div className="w-[90%] max-w-6xl mx-auto">

                <div className="text-center mb-16">
                    <h3 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">
                        My Values
                    </h3>
                    <Separator className="max-w-16 py-0.5 rounded-xl bg-primary mx-auto" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
                    <Card className="col-span-1 sm:col-span-2 lg:col-span-2 lg:row-span-2 bg-muted/40 border-primary/10 flex flex-col justify-between">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold text-primary">
                                About Me
                            </CardTitle>
                            <CardDescription className="font-semibold uppercase tracking-wider text-muted-foreground/80">
                                The mind behind the art
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="text-muted-foreground text-sm sm:text-base leading-relaxed flex flex-col gap-4 pt-2">
                            <p>
                                Hi! I love that you want to experience Manita de Gato.
                                I'm <span className="font-semibold text-secondary-foreground">Sarii Estrada</span>, certified Organic Nails technician with 12 years of experience, nail art specialist, trained in industrial design and passionate about art.
                            </p>
                            <p className="bg-background/60 p-3 rounded-lg border border-border text-xs sm:text-sm font-medium italic text-muted-foreground">
                                ✨ To give you the super quality service you deserve. My schedule is very exclusive, spots fly, I recommend booking your appointment as soon as possible!
                            </p>
                        </CardContent>
                    </Card>
                    {values.map((value, index) => (
                        <Card key={index} className="col-span-1 sm:col-span-1 lg:col-span-2 bg-card hover:bg-muted/30 transition-colors duration-200">
                            <CardHeader className="space-y-3">
                                <CardTitle className="text-lg font-bold tracking-tight flex gap-4 items-center">
                                    <div className="p-2 w-fit bg-primary/10 text-primary rounded-lg">
                                        <value.icon className="w-8 h-8" />
                                    </div>
                                    {value.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                                    {value.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}

                </div>
            </div>
        </section>
    );
}