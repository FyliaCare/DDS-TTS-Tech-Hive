import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/contexts/CartContext";
import { ToastProvider } from "@/contexts/ToastContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "DDS & TTS Tech Hive - Your Trusted Tech Partner in Accra",
  description: "Quality phones, laptops, game consoles, and expert repair services in Accra, Ghana. Shop the latest tech products and book professional repair services.",
  keywords: "phones, laptops, game consoles, repairs, tech store, Accra, Ghana, computer parts, accessories",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased bg-white`}>
        <CartProvider>
          <ToastProvider>
            <Header />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
          </ToastProvider>
        </CartProvider>
      </body>
    </html>
  );
}
