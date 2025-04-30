"use client";
import { useEffect, useState } from "react";
import { AdBanner } from "../AdBanner";
import { ArticleCard } from "./ArticleCard";
import { NewsItem } from "@/types/news";
import { fetchLatestNews } from "@/api/news";


export const AdditionalPostsSection: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    const loadNews = async () => {
      const fetchedNews = await fetchLatestNews(10, 12);
      setNews(fetchedNews);
    };
    loadNews();
  }, []);

  return (
    <div className="mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((news, index) => {
          const showAd = (index + 1) % 6 === 0 && index !== 0;
          return (
            <>
              <ArticleCard key={news.id} news={news} />
              {showAd && (
                <div key={`ad-${news.id}`} className="col-span-1 sm:col-span-2 lg:col-span-3 my-6">
                  <AdBanner className="h-32" text="Miejsce na reklamę" />
                </div>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
};