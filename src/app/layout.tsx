import "./globals.css";
import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const heading = Space_Grotesk({ subsets: ["latin"], variable: "--font-heading" });
const body = Inter({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "Fratelli Bruno",
  description: "Hospitality, construction, and property management crafted for bold destinations.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body
        className={`${heading.variable} ${body.variable} relative flex min-h-screen flex-col bg-background text-foreground antialiased`}
      >
        <div className="pointer-events-none fixed inset-0 -z-40">
          <div className="absolute inset-0 bg-[radial-gradient(85%_70%_at_15%_10%,rgba(247,227,125,0.14),transparent_65%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_82%_18%,rgba(116,104,255,0.12),transparent_70%)] opacity-70" />
          <div className="absolute inset-0 bg-[radial-gradient(140%_120%_at_50%_115%,rgba(247,227,125,0.08),transparent_80%)] opacity-60" />
        </div>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}





