import Image from "next/image";
import Link from "next/link";
import { NewsItem } from "@/types/news";

function PostCard({ post }: { post: NewsItem }) {
    const imageUrl = post.imageUrl
        ? `${process.env.NEXT_PUBLIC_DOMAIN_URL}${post.imageUrl}`
        : null;

    return (
        <Link href={`/post/${post.slug}`} className="block">
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:transform hover:scale-105 h-full flex flex-col">
                <div className="relative h-48 w-full">
                    {imageUrl ? (
                        <Image
                            src={imageUrl}
                            alt={post.header}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-400">Brak zdjęcia</span>
                        </div>
                    )}
                </div>
                
                <div className="p-4 flex-grow flex flex-col">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-2"></span>
                    <h3 className="text-lg font-semibold mb-2 line-clamp-2">{post.header}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.description}</p>
                    <div className="flex justify-between items-center mt-auto">
                    <div className="text-xs text-gray-500 mt-auto">
                        {new Date(post.createdAt).toLocaleDateString()}
                    </div>
                    <span className="page_text text-sm font-medium">
                        Czytaj więcej
                    </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default PostCard;