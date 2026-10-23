import { cache } from 'react';
import type { Metadata } from 'next';
import { notFound, permanentRedirect, unstable_rethrow } from 'next/navigation';
import { fetchPostBySlug } from '@/api/news';
import PostHeader from '@/Components/PostPage/PostHeader';
import PostContent from '@/Components/PostPage/PostContent';
import PostGallery from '@/Components/PostPage/PostGallery';
import PostError from '@/Components/PostPage/PostError';
import RelatedPosts from '@/Components/RelatedPosts';
import { SITE_URL, SITE_NAME, jsonLdHtml, mediaAbsoluteUrl, postDescription, postJsonLd } from '@/utils/seo';

interface PostPageProps {
  params: Promise<{ kategoria: string; slug: string }>;
}

// generateMetadata and the page share one request
const getPost = cache(fetchPostBySlug);

function isNotFound(error: unknown): boolean {
  return error instanceof Error && error.message.startsWith('Post not found');
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getPost(slug);
    const url = `${SITE_URL}/${post.category.slug}/${post.slug}`;
    const description = postDescription(post);
    const image = post.imageUrl ? mediaAbsoluteUrl(post.imageUrl) : '/img/og-default.jpg';

    return {
      title: post.header,
      description,
      keywords: post.tags.length > 0 ? post.tags : undefined,
      authors: [{ name: post.author.name }],
      alternates: { canonical: url },
      openGraph: {
        title: post.header,
        description,
        url,
        type: 'article',
        locale: 'pl_PL',
        siteName: SITE_NAME,
        publishedTime: post.createdAt,
        modifiedTime: post.updatedAt,
        section: post.category.name,
        tags: post.tags,
        images: [{ url: image, alt: post.header }],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.header,
        description,
        images: [image],
      },
    };
  } catch {
    return { title: 'Artykuł', robots: { index: false } };
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { kategoria, slug } = await params;

  try {
    const postData = await getPost(slug);

    // One URL per article: /{its category}/{slug}
    if (postData.category.slug !== kategoria) {
      permanentRedirect(`/${postData.category.slug}/${slug}`);
    }

    const shareUrl = `${process.env.NEXT_PUBLIC_CLEAR_URL}/${postData.category.slug}/${slug}`;

    return (
      <article className="animate-fade-in">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdHtml(postJsonLd(postData, `${SITE_URL}/${postData.category.slug}/${slug}`))}
        />
        <div className="mx-auto py-8 lg:w-[65vw] w-[95vw]">
          <PostHeader
            title={postData.header}
            imageUrl={postData.imageUrl}
            category={postData.category}
            author={postData.author}
            date={postData.createdAt}
            shareUrl={shareUrl}
            yt_link={postData.yt_link}
          />

          <PostContent content={postData.content} />

          {postData.gallery && postData.gallery.length > 0 && (
            <PostGallery
              gallery={postData.gallery.map((image) => ({
                url: image.url,
              }))}
            />
          )}

          <RelatedPosts currentPostId={postData.id} />
        </div>
      </article>
    );
  } catch (error) {
    unstable_rethrow(error);
    if (isNotFound(error)) notFound();
    console.error('[PostPage] Error:', error);
    return <PostError message="Nie udało się załadować posta" />;
  }
}
