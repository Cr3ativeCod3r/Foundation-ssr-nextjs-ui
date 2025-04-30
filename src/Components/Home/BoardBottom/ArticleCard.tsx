import { NewsItem } from "@/types/news";
import Image from "next/image";
import Link from "next/link";

export const ArticleCard: React.FC<{ news: NewsItem }> = ({ news }) => {
    const imageUrl = news.imageUrl
        ? `${process.env.NEXT_PUBLIC_DOMAIN_URL}${news.imageUrl}`
        : null;

    const linkHref = `/${news.category.slug}/${news.slug}`;

    return (
        <Link href={linkHref} passHref>
            <div className="mb-6 cursor-pointer hover:opacity-90 hover:bg-gray-50  duration-400 ease-in-out hover:translate-y-1 transition-transform p-1">
                <div className="relative aspect-[16/9] mb-2">
                    {imageUrl ? (
                        <Image
                            src={imageUrl}
                            alt={news.header || "Article image"}
                            width={600}
                            height={400}
                            className="object-cover rounded-lg"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-200 rounded-lg" />
                    )}
                </div>
                <h3 className="font-bold text-gray-600 text-md mb-1 hover-text-green ">{news.header}</h3>
            </div>
        </Link>
    );
};