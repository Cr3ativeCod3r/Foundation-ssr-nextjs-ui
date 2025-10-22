import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TransitionProvider from "@/Components/Layout/TransitionProvider";
import Navbar from "@/Components/Layout/Navbar";
import Footer from "@/Components/Layout/Footer";
import BottomMenu from "@/Components/Layout/BottomMenu/BottomMenu";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Choroby Mózgu - Rzetelna wiedza o neurologii",
    template: "%s | Choroby Mózgu",
  },
  description:
    "Blog medyczny o chorobach mózgu — rzetelne informacje o neurologii, zdrowiu psychicznym i nowoczesnych metodach leczenia.",
  keywords: [
    "choroby mózgu",
    "neurologia",
    "zdrowie psychiczne",
    "mózg",
    "leczenie",
    "artykuły medyczne",
  ],
  authors: [{ name: "Zespół ChorobyMózgu.pl" }],
  metadataBase: new URL("https://chorobymozgu.pl"),
  openGraph: {
    title: "Choroby Mózgu - Wiedza o neurologii i zdrowiu psychicznym",
    description:
      "Dowiedz się więcej o chorobach mózgu, ich przyczynach, leczeniu i profilaktyce. Artykuły pisane przez specjalistów.",
    url: "https://chorobymozgu.pl",
    siteName: "Choroby Mózgu",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/img/avatar.jpg",
        width: 1200,
        height: 630,
        alt: "Choroby Mózgu - Blog medyczny o neurologii",
      },
    ],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className="bg-white">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <main className="pt-[100px]">
          <TransitionProvider>{children}</TransitionProvider>
        </main>
        <Footer />
        <BottomMenu />
      </body>
    </html>
  );
}