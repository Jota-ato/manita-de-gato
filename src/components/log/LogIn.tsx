import {
    Card,
    CardContent,
} from "@/components/ui/card";
import {
    FieldSeparator
} from "@/components/ui/field";
import LogInHeader from "./Login/LogInHeader";
import LogInFooter from "./Login/LogInFooter";
import GoogleButton from "./Login/GoogleButton";
import Form from "./Login/Form";

export default function LogIn() {
    return (
        <Card className="w-[90%] max-w-120">
            <LogInHeader />
            <CardContent>
                <Form />
                <FieldSeparator className="my-4">
                    o
                </FieldSeparator>
                <GoogleButton />
            </CardContent>
            <LogInFooter />
        </Card >
    )
}