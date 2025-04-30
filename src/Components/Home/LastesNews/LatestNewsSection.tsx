"use client"; 
import { useEffect, useState } from "react";
import { LatestNewsItem } from "./LatestNewsItem";
import { NewsItem } from "@/types/news";
import { fetchLatestNews } from "@/api/news";

export const LatestNewsSection: React.FC = () => {
    const [latestNews, setLatestNews] = useState<NewsItem[]>([]);

    useEffect(() => {
        const loadNews = async () => {
            const news = await fetchLatestNews(0, 5);
            setLatestNews(news);
        };
        loadNews();
    }, []);

    return (
        <div className="mb-6">
            <h2 className="text-xl font-semibold tracking-tight text-gray-700 mb-4">
                NAJNOWSZE
            </h2>
            <div>
                {latestNews.map((news) => (
                    <LatestNewsItem key={news.id} news={news} />
                ))}
            </div>
        </div>
    );
};