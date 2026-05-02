import type { Metadata } from "next";
import cavalier from "next/font/local";
import stickman from "next/font/local";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const Cavalier = cavalier({
    src: [
        {
            path: "../../public/fonts/Cavalier.ttf",
            weight: '400',
            style: 'normal',
        }
    ],
    variable: "--font-cavalier"
})

const Stickman = stickman({
    src: [
        {
            path: "../../public/fonts/Stickman-Serif.woff2",
            weight: '400',
            style: 'normal',
        }
    ],
    variable: "--font-stickman"
})

export const metadata: Metadata = {
    title: "Manita de gato",
    description: "Y tú... ¿Ya te diste una Manita de Gato?",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${Stickman.variable} ${Cavalier.variable}`}
        >
            <body
                className="min-h-full flex flex-col font-sans antialiased text-xl"
            >
                <TooltipProvider>
                    {children}
                </TooltipProvider>
            </body>
        </html>
    );
}
