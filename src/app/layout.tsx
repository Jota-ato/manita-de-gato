import type { Metadata } from "next";
import cavalier from "next/font/local";
import stickman from "next/font/local";
import { Inter } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "@/components/ui/sonner"
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

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
            className={`${Stickman.variable} ${Cavalier.variable} ${inter.variable}`}
        >
            <body
                className="min-h-full flex flex-col font-sans antialiased text-xl"
            >
                <TooltipProvider>
                    {children}
                    <Toaster position="top-right" richColors />
                </TooltipProvider>
            </body>
            <SpeedInsights />
            <Analytics />
        </html>
    );
}
