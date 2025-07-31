import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { StickyBanner } from "@/components/ui/sticky-banner";
import { Clock } from "lucide-react";
import Footer from "@/components/Footer";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Easy Tax | Pay By Entry Tax Online",
  description: "Pay Border Tax Online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sora.className} ${sora.className}`}>
        <Navbar />
        <main className="">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
