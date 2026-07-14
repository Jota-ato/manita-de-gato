import { BusinessControlsForm } from "@/features/business-controls/components/business-controls-form"
import { businessControlsService } from "@/features/business-controls/services/business-controls-service"
import { Heading } from "@/shared/components/typography/heading"
import { Button } from "@/shared/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Container } from "@/shared/components/ui/container"
import { Separator } from "@/shared/components/ui/separator"

export default async function BusinessControlsPage() {

    const businessControls = await businessControlsService.getBusinessControls()

    if (!businessControls) return null

    return (
        <section className="min-h-screen py-8 md:py-12">
            <Container>
                <Heading>Business Controls</Heading>
                <Separator className="my-4" />
                <Card className="max-w-xl mx-auto">
                    <CardHeader>
                        <CardTitle>
                            Manage the business controls
                        </CardTitle>
                        <CardDescription>
                            Here you can manage the business controls for your organization. You can add, edit, or remove controls as needed to ensure that your business operations are running smoothly and efficiently.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <BusinessControlsForm controls={businessControls} />
                    </CardContent>
                </Card>
            </Container>
        </section>
    )
}