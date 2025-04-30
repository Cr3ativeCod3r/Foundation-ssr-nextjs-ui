import { PartnersSection } from "@/Components/Home/PartnersSection";
import { LatestNewsSection } from "@/Components/Home/LastesNews/LatestNewsSection";
import { MainNewsSectionTop } from "@/Components/Home/BoardTop/MainNewsSectionTop";
import { MainArticlesSection } from "@/Components/Home/BoardBottom/MainArticlesSection";
import { AdBanner } from "@/Components/Home/AdBanner";
import { AdditionalPostsSection } from "@/Components/Home/News12/AdditionalPostsSection";
import React from "react";
import { LuBrain } from "react-icons/lu";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="lg:w-[85vw] sm: w-[95vw] mx-auto mt-8">
        <p className="flex text-gray-500 items-center"><LuBrain className="mr-1 text-pink-400" /> Rzetelna wiedza na temat chorób mózgu</p>
        <hr className="h-0.2 rounded-lg text-gray-600 mb-4"></hr>
      </div>
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4">
              <div>
                <LatestNewsSection />
              </div>
            </div>
            <div className="lg:col-span-8">
              <MainNewsSectionTop />
              <AdBanner className="h-32" />
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