import "./globals.css";
import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnalyticsInitializer from "@/components/analytics/AnalyticsInitializer";

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
        <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,var(--accent-soft),transparent_55%)]" />
        <AnalyticsInitializer />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
