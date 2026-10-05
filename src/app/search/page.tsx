'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { fetchPostsByDescription } from '@/api/fetchPostsByDescription';
import ArticleCard from '@/components/ui/Card';
import { ArticleCardSkeleton } from '@/components/ui/Skeleton';
import { Search, FileText, AlignLeft, Tag, BookOpen, Brain } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import type { NewsItem } from '@/types/news';
import type { SearchField } from '@/api/fetchPostsByDescription';

const SEARCH_OPTIONS: { value: SearchField; label: string; icon: React.ReactNode }[] = [
  { value: 'header', label: 'Nagłówki', icon: <FileText size={14} /> },
  { value: 'content', label: 'Zawartość', icon: <AlignLeft size={14} /> },
  { value: 'tags', label: 'Tagi', icon: <Tag size={14} /> },
];

export default function SearchPosts() {
  const [query, setQuery] = useState('');
  const [posts, setPosts] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [searchBy, setSearchBy] = useState<SearchField>('content');

  const handleSearch = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setSearched(true);
    try {
      const results = await fetchPostsByDescription(query, searchBy);
      setPosts(results);
    } catch (error) {
      console.error('[SearchPosts] Search failed:', error);
    } finally {
      setLoading(false);
    }
  }, [query, searchBy]);

  return (
    <div className="min-h-[80vh] animate-fade-in">
      <PageHero
        icon={Search}
        eyebrow="Wyszukiwarka"
        title="Wyszukiwarka artykułów"
        description="Znajdź interesujące Cię treści w naszej bazie — szukaj po nagłówkach, treści lub tagach."
        decorations={[FileText, Tag, BookOpen, Brain]}
      >
        {/* Room for the search card that overlaps the banner */}
        <div className="h-10" />
      </PageHero>

      <div className="max-w-5xl mx-auto px-4 pb-8">
        {/* Search Form — pulled up over the banner */}
        <form onSubmit={handleSearch} className="relative -mt-14 mb-10">
          <div className="card-elevated p-5 shadow-xl">
            {/* Input + Button */}
            <div className="flex gap-3 mb-4">
              <div className="flex-1 relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={
                    searchBy === 'header'
                      ? 'Wpisz słowo kluczowe...'
                      : searchBy === 'tags'
                        ? 'Wpisz tag...'
                        : 'Czego szukasz?'
                  }
                  className="
                    w-full pl-11 pr-4 py-3
                    border-2 border-slate-200 rounded-xl
                    focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100
                    transition-all duration-200
                    text-sm placeholder:text-slate-400
                  "
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="
                  px-6 py-3
                  bg-gradient-to-r from-teal-600 to-teal-500
                  text-white text-sm font-semibold rounded-xl
                  hover:from-teal-700 hover:to-teal-600
                  disabled:from-slate-300 disabled:to-slate-300 disabled:cursor-not-allowed
                  transition-all duration-200 shadow-md hover:shadow-lg
                  flex items-center gap-2
                "
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Szukam...
                  </>
                ) : (
                  'Szukaj'
                )}
              </button>
            </div>

            {/* Search mode pills */}
            <div className="flex gap-2 flex-wrap">
              {SEARCH_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setSearchBy(option.value)}
                  className={`
                    flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium
                    transition-all duration-200 border
                    ${searchBy === option.value
                      ? 'bg-teal-50 text-teal-700 border-teal-200'
                      : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:text-slate-700'
                    }
                  `}
                >
                  {option.icon}
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </form>

        {/* Results count */}
        {searched && !loading && posts.length > 0 && (
          <p className="text-sm text-slate-500 mb-6">
            Znaleziono <span className="font-semibold text-slate-800">{posts.length}</span>{' '}
            {posts.length === 1 ? 'wynik' : posts.length < 5 ? 'wyniki' : 'wyników'}
          </p>
        )}

        {/* Results grid */}
        {loading ? (
          <div className="grid gap-6 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <ArticleCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 stagger-children">
            {posts.map((post) => (
              <ArticleCard key={post.id} news={post} showReadMore />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && searched && posts.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Search size={24} className="text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">
              Nie znaleźliśmy postów
            </h3>
            <p className="text-slate-500 text-sm">
              Spróbuj użyć innych słów kluczowych lub zmień tryb wyszukiwania
            </p>
          </div>
        )}
      </div>
    </div>
  );
}