import { fetchCategoryPosts, fetchCategoryBySlug } from '@/api/categories';
import CategoryPosts from '@/Components/Category/CategoryPosts';
import MigraineBanner from '@/Components/CategoryBanners/MigrenaBanner';
import { notFound, unstable_rethrow } from 'next/navigation';
import { Brain } from 'lucide-react';
import type { Metadata } from 'next';
import { SITE_URL, SITE_NAME, categoryDescription, categoryJsonLd, jsonLdHtml } from '@/utils/seo';

export const dynamic = 'force-dynamic';

interface CategoryPageProps {
  params: Promise<{ kategoria: string }>;
  searchParams?: Promise<{ page?: string }>;
}

export async function generateMetadata({ params, searchParams }: CategoryPageProps): Promise<Metadata> {
  const { kategoria } = await params;
  const page = Number((await searchParams)?.page) || 1;
  const category = await fetchCategoryBySlug(kategoria);
  if (!category) return {};

  const description = categoryDescription(category.slug, category.name);
  const url = `${SITE_URL}/${category.slug}`;
  return {
    title: page > 1 ? `${category.name} – strona ${page}` : category.name,
    description,
    alternates: { canonical: page > 1 ? `${url}?page=${page}` : url },
    openGraph: { title: category.name, description, url, type: 'website', locale: 'pl_PL', siteName: SITE_NAME },
  };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { kategoria } = await params;
  const resolvedSearchParams = await searchParams;
  const pageParam = resolvedSearchParams?.page;
  const page = Number.isNaN(Number(pageParam)) ? 1 : parseInt(pageParam || '1', 10);

  try {
    const category = await fetchCategoryBySlug(kategoria);
    if (!category) return notFound();

    const postsResponse = await fetchCategoryPosts(kategoria, page, 6);

    return (
      <div className="container mx-auto px-4 py-8 min-h-screen animate-fade-in">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdHtml(categoryJsonLd(category, postsResponse.data))}
        />
        {/* Category header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center">
            <Brain className="text-teal-600" size={20} />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">{category.name}</h1>
        </div>
        <p className="text-sm text-slate-500 mb-3 max-w-3xl">{categoryDescription(category.slug, category.name)}</p>
        <div className="h-px bg-gradient-to-r from-slate-200 to-transparent mb-6" />

        {kategoria === 'migrena' && <MigraineBanner />}

        <CategoryPosts
          initialPosts={postsResponse.data}
          initialPagination={postsResponse.meta.pagination}
          categorySlug={kategoria}
        />
      </div>
    );
  } catch (error) {
    unstable_rethrow(error);
    console.error('[CategoryPage] Error:', error);
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Błąd</h1>
        <p className="text-slate-500">Nie udało się załadować kategorii. Spróbuj ponownie później.</p>
      </div>
    );
  }
}