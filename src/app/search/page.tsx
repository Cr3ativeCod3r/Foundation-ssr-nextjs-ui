'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { fetchPostsByDescription } from '@/api/fetchPostsByDescription';
import type { NewsItem } from '@/types/news';
import TagsList from '@/Components/tagsTable';

export default function SearchPosts() {
  const [query, setQuery] = useState('');
  const [posts, setPosts] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [searchBy, setSearchBy] = useState<'header' | 'content' | 'tags'>('content');
  const router = useRouter();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setSearched(true);
    try {
      const results = await fetchPostsByDescription(query, searchBy);
      setPosts(results);
    } catch (error) {
      console.error('Błąd wyszukiwania:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePostClick = (categorySlug: string, postSlug: string) => {
    router.push(`/${categorySlug}/${postSlug}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-[80vh]">
      <div className=" text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Wyszukiwarka postów</h1>
        <p className="text-gray-600">Znajdź interesujące Cię treści w naszej bazie artykułów</p>
      </div>

      <form onSubmit={handleSearch} className="mb-10">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex gap-3 mb-5">
            <div className="flex-1 relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={
                  searchBy === 'header'
                    ? 'Wpisz słowo kluczowe z nagłówka...'
                    : searchBy === 'tags'
                      ? 'Wpisz tag...'
                      : 'Wpisz czego szukasz...'
                }
                className="w-full px-5 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Szukam...
                </span>
              ) : (
                'Szukaj'
              )}
            </button>
          </div>

          <div className="flex gap-4 flex-wrap">
            <label className="flex items-center gap-2 cursor-pointer group">
              <div className="relative">
                <input
                  type="radio"
                  value="header"
                  checked={searchBy === 'header'}
                  onChange={(e) => setSearchBy(e.target.value as 'header' | 'content' | 'tags')}
                  className="peer sr-only"
                />
                <div className="w-5 h-5 border-2 border-gray-300 rounded-md peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-all">
                  <svg className="w-full h-full text-white opacity-0 peer-checked:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <span className="text-gray-700 text-sm font-medium group-hover:text-blue-600 transition-colors">
                Szukaj w nagłówkach
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer group">
              <div className="relative">
                <input
                  type="radio"
                  value="content"
                  checked={searchBy === 'content'}
                  onChange={(e) => setSearchBy(e.target.value as 'header' | 'content' | 'tags')}
                  className="peer sr-only"
                />
                <div className="w-5 h-5 border-2 border-gray-300 rounded-md peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-all">
                  <svg className="w-full h-full text-white opacity-0 peer-checked:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <span className="text-gray-700 text-sm font-medium group-hover:text-blue-600 transition-colors">
                Szukaj w zawartości
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer group">
              <div className="relative">
                <input
                  type="radio"
                  value="tags"
                  checked={searchBy === 'tags'}
                  onChange={(e) => setSearchBy(e.target.value as 'header' | 'content' | 'tags')}
                  className="peer sr-only"
                />
                <div className="w-5 h-5 border-2 border-gray-300 rounded-md peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-all">
                  <svg className="w-full h-full text-white opacity-0 peer-checked:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <span className="text-gray-700 text-sm font-medium group-hover:text-blue-600 transition-colors">
                Szukaj po tagach
              </span>
            </label>
          </div>
        </div>
      </form>

      {searched && posts.length > 0 && (
        <div className="mb-6">
          <p className="text-gray-600 text-sm">
            Znaleziono <span className="font-semibold text-gray-900">{posts.length}</span> {posts.length === 1 ? 'wynik' : posts.length < 5 ? 'wyniki' : 'wyników'}
          </p>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <div
            key={post.id}
            onClick={() => handlePostClick(post.category.slug, post.slug)}
            className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
          >
            {post.imageUrl && (
              <div className="relative w-full h-56 overflow-hidden">
                <Image
                  src={process.env.NEXT_PUBLIC_DOMAIN_URL + post.imageUrl}
                  alt={post.header}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  unoptimized
                  priority
                />
              </div>
            )}
            <div className="p-5">
           

              <div className="flex items-center gap-2 mb-3">
                <span className="inline-block px-3 py-1 bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 text-xs font-semibold rounded-full">
                  {post.category.name}
                </span>
                <span className="text-gray-400 text-xs">•</span>
                <time className="text-gray-500 text-xs">
                  {new Date(post.createdAt).toLocaleDateString('pl-PL', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
                 <TagsList tags={post.tags} />
              <h3 className="text-xl font-bold mb-2 text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors">
                {post.header}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                {post.description}
              </p>
            </div>
          </div>
        ))}

        {!loading && searched && posts.length === 0 && (
          <div className="col-span-2 text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Nie znaleźliśmy postów</h3>
            <p className="text-gray-600 mb-1">Spróbuj użyć innych słów kluczowych</p>
            <p className="text-sm text-gray-500">lub zmień tryb wyszukiwania</p>
          </div>
        )}
      </div>
    </div>
  );
}