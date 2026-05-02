import type { Metadata } from "next";
import "./globals.css";

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
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
