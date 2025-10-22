import { PartnersSection } from "@/Components/Home/PartnersSection";
import { LatestNewsSection } from "@/Components/Home/LastesNews/LatestNewsSection";
import { MainNewsSectionTop } from "@/Components/Home/BoardTop/MainNewsSectionTop";
import { MainArticlesSection } from "@/Components/Home/BoardBottom/MainArticlesSection";
import AdBanner from "@/Components/Home/AdBanner";
import { AdditionalPostsSection } from "@/Components/Home/News12/AdditionalPostsSection";
import React from "react";
import { LuBrain } from "react-icons/lu";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Choroby Mózgu - Rzetelna wiedza o neurologii i zdrowiu psychicznym",
  description:
    "Portal Choroby Mózgu to miejsce, gdzie znajdziesz rzetelne informacje o neurologii, chorobach mózgu i zdrowiu psychicznym.",
  keywords: [
    "choroby mózgu",
    "neurologia",
    "zdrowie psychiczne",
    "migrena",
    "padaczka",
    "alzheimer",
    "parkinson",
  ],
  openGraph: {
    title: "Choroby Mózgu - Wiedza i aktualności o neurologii",
    description:
      "Dowiedz się więcej o chorobach mózgu, ich leczeniu i profilaktyce. Artykuły, aktualności i porady od ekspertów.",
    url: "https://chorobymozgu.pl",
    type: "website",
    siteName: "Choroby Mózgu",
    images: [
      {
        url: "/img/avatar.jpg",
        width: 1200,
        height: 630,
        alt: "Choroby Mózgu - Portal medyczny o neurologii",
      },
    ],
  },
  alternates: {
    canonical: "https://chorobymozgu.pl",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="lg:w-[85vw] sm:w-[95vw] mx-auto mt-8">
        <p className="flex text-gray-500 items-center">
          <LuBrain className="mr-1 text-pink-400" />
          Rzetelna wiedza na temat chorób mózgu
        </p>
        <hr className="border-gray-300 mb-4" />
      </div>

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4">
              <LatestNewsSection />
            </div>
            <div className="lg:col-span-8">
              <MainNewsSectionTop />
              <div className="mb-6">
                <AdBanner
                  bannerId={1}
                  interval={8000}
                  width="w-full"
                  height="20vh"
                />
              </div>
              <MainArticlesSection />
            </div>
          </div>
          <AdditionalPostsSection />
        </div>
      </main>

      <PartnersSection />
    </div>
  );
}