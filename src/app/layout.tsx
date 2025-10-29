import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BizifyERP - Complete Business Management Platform",
  description: "Comprehensive ERP system with 30 integrated modules including Document Management, Business Intelligence, and E-commerce. Transform your business operations with BizifyERP.",
  keywords: ["BizifyERP", "ERP", "Business Management", "SaaS", "Document Management", "Business Intelligence", "E-commerce", "Next.js", "TypeScript"],
  authors: [{ name: "BizifyERP Team" }],
  openGraph: {
    title: "BizifyERP - Complete Business Management Platform",
    description: "Transform your business with our comprehensive ERP system featuring 30 integrated modules.",
    url: "https://bizifyerp.com",
    siteName: "BizifyERP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BizifyERP - Complete Business Management Platform",
    description: "Transform your business with our comprehensive ERP system featuring 30 integrated modules.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <Header />
        <main className="min-h-screen pt-16">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
