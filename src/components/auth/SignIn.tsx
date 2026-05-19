import {
    Card,
    CardContent,
} from "@/components/ui/card";
import {
    FieldSeparator
} from "@/components/ui/field";
import SignInHeader from "./Login/SignInHeader";
import SignInFooter from "./Login/SignInFooter";
import GoogleButton from "./Login/GoogleButton";
import Form from "./Login/Form";

export default function SignIn() {
    return (
        <Card className="w-[90%] max-w-120">
            <SignInHeader />
            <CardContent>
                <Form />
                <FieldSeparator className="my-4">
                    o
                </FieldSeparator>
                <GoogleButton />
            </CardContent>
            <SignInFooter />
        </Card >
    )
}