import { NewsItem } from "@/types/news";
import Image from "next/image";
import Link from "next/link";

export const LatestNewsItem: React.FC<{ news: NewsItem }> = ({ news }) => {
    const imageUrl = news.imageUrl
        ? `${process.env.NEXT_PUBLIC_DOMAIN_URL}${news.imageUrl}`
        : null;

    const linkHref = `/${news.category.slug}/${news.slug}`;

    return (
        <Link href={linkHref}>
            <div className="flex border-b border-gray-200 py-4 hover:bg-gray-50  duration-400 ease-in-out hover:translate-x-1 transition-transform p-1">
                <div className="w-2/5 flex-none">
                    {imageUrl ? (
                        <div className="relative w-full">
                            <Image
                                src={imageUrl}
                                alt={news.header || "News image"}
                                width={100}
                                height={100}
                                className="object-cover rounded-lg cursor-pointer w-full h-full"
                            />
                        </div>
                    ) : (
                        <div className="aspect-4/3 w-full bg-gray-100 rounded-lg"></div>
                    )}
                </div>
                <div className="w-3/5 pl-3 flex items-center">
                    <h3 className="text-sm leading-snug hover-text-green font-bold text-gray-700">{news.header}</h3>
                </div>
            </div>
        </Link>
    );
};