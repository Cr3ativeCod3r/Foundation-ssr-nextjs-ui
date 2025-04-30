"use client"; 
import { useEffect, useState } from "react";
import { NewsItem } from "@/types/news";
import { fetchLatestNews } from "@/api/news";
import Image from "next/image";
import Link from "next/link";

export const MainNewsSectionTop: React.FC = () => {
    const [news, setNews] = useState<NewsItem[]>([]);

    useEffect(() => {
        const loadNews = async () => {
            const latestNews = await fetchLatestNews(5, 2);
            setNews(latestNews);
        };
        loadNews();
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {news.map((news) => (
                <Link key={news.id} href={`/${news.category.slug}/${news.slug}`}>
                    <div className="cursor-pointer hover:opacity-90  hover:bg-gray-50  duration-400 ease-in-out hover:translate-y-1 transition-transform p-1">
                        {news.imageUrl ? (
                            <Image
                                src={`${process.env.NEXT_PUBLIC_DOMAIN_URL}${news.imageUrl}`}
                                alt={news.header}
                                width={600}
                                height={400}
                                className="w-full h-auto mb-2 rounded-lg object-cover"
                            />
                        ) : (
                            <div className="w-full h-48 bg-gray-200 mb-2 rounded-lg" />
                        )}
                        <h4 className="font-bold text-gray-600 text-md mb-1 hover-text-green ">{news.header}</h4>
                    </div>
                </Link>
            ))}
        </div>
    );
};