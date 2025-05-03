import { fetchPostBySlug } from "@/api/news";
import PostHeader from "@/Components/PostPage/PostHeader";
import PostContent from "@/Components/PostPage/PostContent";
import PostGallery from "@/Components/PostPage/PostGallery";
import PostError from "@/Components/PostPage/PostError";
import RelatedPosts from "@/Components/RelatedPosts";

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function PostPage({ params }: PostPageProps) {

  const { slug } = await params;

  try {
    const postData = await fetchPostBySlug(slug);
    const shareUrl = `${process.env.NEXT_PUBLIC_CLEAR_URL}/${postData.category.slug}/${slug}`;

    return (
      <>
        <div className="mx-auto py-8 lg:w-[65vw] sm:w-[98vw]">
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
                url: image.url
              }))}
            />
          )}

          <RelatedPosts currentPostId={postData.id} />
        </div>
      </>
    );
  } catch (error) {
    console.error("Błąd podczas pobierania posta:", error);
    return <PostError message="Nie udało się załadować posta" />;
  }
}
