"use client";
import { JSX, useEffect, useState } from "react";
import AdBanner from "../AdBanner";
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

  const renderNewsItems = () => {
    const items: JSX.Element[] = [];
    
    news.forEach((newsItem, index) => {
      items.push(
        <ArticleCard key={newsItem.id} news={newsItem} />
      );
      
      // Add a banner after every 6th item (but not at position 0)
      if ((index + 1) % 6 === 0 && index !== 0) {
        items.push(
          <div key={`banner-${index}`} className="col-span-1 sm:col-span-2 lg:col-span-3 my-6">
            <hr className="w-full mb-6 border-dashed border-gray-300" />
            <AdBanner
              bannerId={1}
              interval={5000}
              width="100%" 
              height="30vh"
            />
            <hr className="w-full mt-6 border-dashed border-gray-300" />
          </div>
        );
      }
    });
    
    return items;
  };

  return (
    <div className="mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {renderNewsItems()}
      </div>
    </div>
  );
};