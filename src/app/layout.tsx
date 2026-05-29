import type { Metadata } from "next";
import cavalier from "next/font/local";
import stickman from "next/font/local";
import { Inter } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "@/components/ui/sonner"
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";

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
            suppressHydrationWarning
        >

            <body
                className="min-h-full flex flex-col font-sans antialiased text-xl"
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <TooltipProvider>
                        {children}
                        <Toaster
                            position='top-right'
                            closeButton
                            toastOptions={{
                                classNames: {
                                    toast: 'font-sans',
                                    success: '!border-success/30 !bg-success !text-success-foreground',
                                    warning: '!border-warning/30 !bg-warning !text-warning-foreground',
                                    error: '!border-destructive/30 !bg-destructive !text-destructive-foreground',
                                    info: '!border-info/30 !bg-info !text-info-foreground',
                                    actionButton: '!bg-primary !text-primary-foreground hover:!bg-primary/90',
                                    cancelButton: '!bg-secondary !text-secondary-foreground hover:!bg-secondary/80',
                                    closeButton: '!border-border !bg-background !text-muted-foreground hover:!bg-accent hover:!text-accent-foreground',
                                },
                            }}
                        />
                    </TooltipProvider>
                </ThemeProvider>
            </body>
            <SpeedInsights />
            <Analytics />
        </html>
    );
}
