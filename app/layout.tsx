import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./custom.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HealthBridge - Modern Healthcare Platform for Africa",
  description: "Connecting patients with hospitals across Africa through smart scheduling, digital payments, and AI-powered health guidance. Streamline hospital operations, reduce wait times, and improve patient care.",
  keywords: ["healthcare", "hospital management", "Nigeria hospitals", "appointment booking", "electronic health records", "Africa healthcare"],
  authors: [{ name: "HealthBridge" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${inter.className} antialiased bg-gradient-to-b from-slate-50 to-white`}>
        {children}
      </body>
    </html>
  );
}