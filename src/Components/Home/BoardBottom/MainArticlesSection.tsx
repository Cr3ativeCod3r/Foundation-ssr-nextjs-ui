"use client"; 
import { useEffect, useState } from "react";
import { ArticleCard } from "./ArticleCard";
import { NewsItem } from "@/types/news";
import { fetchLatestNews } from "@/api/news";

export const MainArticlesSection: React.FC = () => {
    const [mainArticles, setMainArticles] = useState<NewsItem[]>([]);

    useEffect(() => {
        const loadArticles = async () => {
            try {
                const news = await fetchLatestNews(7, 3);
                setMainArticles(news);
            } catch (error) {
                console.error("Failed to load articles:", error);
            }
        };

        loadArticles();

    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {mainArticles.map((news) => (
                <ArticleCard key={news.id} news={news} />
            ))}
        </div>
    );
};