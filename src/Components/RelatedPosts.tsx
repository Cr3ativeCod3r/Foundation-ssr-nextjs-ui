'use client'
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { fetchRandomNews } from "@/api/news";

// Definiowanie typu dla pojedynczego posta
type NewsItem = {
  id: number;
  header: string;
  category: {
    slug: string;
  };
  imageUrl: string;
  slug: string;
  description: string;
  createdAt: string;
};

// Komponent karty pojedynczego posta
const PostCard = ({ post }: { post: NewsItem }) => {
  const formattedDate = new Date(post.createdAt).toLocaleDateString('pl-PL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <Link href={`/${post.category.slug}/${post.slug}`}>
      <div className="flex flex-col h-full rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
        <div className="relative h-48 overflow-hidden">
            <Image 
              src={post.imageUrl} 
              alt={post.header} 
              layout="fill"
              objectFit="cover"
            />
            />
          )}
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="text-lg font-bold mb-2 line-clamp-2">{post.header}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.description}</p>
          <div className="mt-auto text-xs text-gray-500">{formattedDate}</div>
        </div>
      </div>
    </Link>
  );
};

// Komponent dla postów powiązanych
const RelatedPosts = ({ currentPostId }: { currentPostId: number }) => {
  const [relatedPosts, setRelatedPosts] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRelatedPosts = async () => {
      try {
        setIsLoading(true);
        const posts = await fetchRandomNews(currentPostId, 0, 6);
        setRelatedPosts(posts);
      } catch (err) {
        console.error("Błąd podczas pobierania powiązanych postów:", err);
        setError("Nie udało się załadować powiązanych postów");
      } finally {
        setIsLoading(false);
      }
    };

    loadRelatedPosts();
  }, [currentPostId]);

  if (isLoading) {
    return <div className="py-8">Ładowanie powiązanych postów...</div>;
  }

  if (error) {
    return <div className="py-8 text-red-500">{error}</div>;
  }

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <div className="py-8 px-4">
      <h2 className="text-2xl font-bold mb-6">Sprawdź także</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedPosts.map(post => (
          <div key={post.id} className="w-full">
            <PostCard post={post} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedPosts;