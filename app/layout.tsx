import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs"; // ✅ IMPORTANT
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CartSync from "@/components/layout/CartSync";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ecommerce App",
  description: "Modern furniture ecommerce store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider> {/* 🔥 REQUIRED */}
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      >
        <body className="min-h-full flex flex-col">
          <Header />
          <CartSync />
          {children}
          <Toaster position="top-right" />
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}