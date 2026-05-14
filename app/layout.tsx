// app/layout.tsx

import type { Metadata } from "next";

import {
  Geist,
  Geist_Mono,
  Noto_Sans,
  Bebas_Neue,
} from "next/font/google";

import "./globals.css";

import { cn } from "@/lib/utils";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";

const headingFont = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: "400",
});

const bodyFont = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Saiko Sushi Coquimbo",
  description:
    "Premium Rolls, promociones y sushi delivery en Coquimbo. Vive la experiencia intensa de Saiko Sushi.",

  keywords: [
    "Saiko Sushi",
    "Sushi Coquimbo",
    "Sushi Delivery",
    "Premium Rolls",
    "Sushi Chile",
    "Delivery Coquimbo",
  ],

  authors: [
    {
      name: "Joel Herrera",
      url: "https://joelherr.site/",
    },
  ],

  creator: "Joel Herrera",

  openGraph: {
    title: "Saiko Sushi Coquimbo",
    description:
      "Premium Rolls, promociones y sushi delivery en Coquimbo.",
    url: "https://saikosushi.cl",
    siteName: "Saiko Sushi",
    locale: "es_CL",
    type: "website",

    images: [
      {
        url: "/logo/saiko-logo.webp",
        width: 1200,
        height: 630,
        alt: "Saiko Sushi Coquimbo",
      },
    ],
  },

  icons: {
    icon: "/logo/peces-sin-fondo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={cn(
        "h-full scroll-smooth antialiased",
        geistSans.variable,
        geistMono.variable,
        bodyFont.variable,
        headingFont.variable,
        "font-sans"
      )}
    >
      <body className="min-h-screen bg-black text-white">
        <div className="relative flex min-h-screen flex-col overflow-hidden">
          <Navbar />

          <main className="flex-1">
            {children}
          </main>

          <Footer />
          <WhatsAppFloat />
        </div>
      </body>
    </html>
  );
}