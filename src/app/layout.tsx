import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TransitionProvider from "@/Components/Layout/TransitionProvider";
import Navbar from "@/Components/Layout/Navbar";
import Footer from "@/Components/Layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Choroby Mózgu",
  description: "Blog medyczny o chorobach mózgu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className="bg-white">
      <head>
        <link rel="icon" href="/img/ico.png" type="image/png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <div className="pt-[120px]">
          <TransitionProvider>
            {children}
          </TransitionProvider>
        </div>
        <Footer />
      </body>
    </html>
  );
}