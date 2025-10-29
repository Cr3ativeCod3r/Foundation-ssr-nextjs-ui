import { ApiResponseItem, NewsItem } from "@/types/news";
const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function fetchPostsByDescription(
  searchQuery: string,
  searchBy: 'header' | 'content' | 'tags' = 'content'
): Promise<NewsItem[]> {
  let url;

  if (searchBy === 'tags') {
    // Krok 1: Znajdź tagi pasujące do searchQuery
    const tagsUrl = `${API_URL}/tags?filters[Tag][name][$containsi]=${encodeURIComponent(searchQuery)}`;
    const tagsResponse = await fetch(tagsUrl);
    const tagsData = await tagsResponse.json();

    // Pobierz documentId wszystkich pasujących tagów
    const tagDocumentIds = tagsData.data?.map((tag: any) => tag.documentId) || [];

    if (tagDocumentIds.length === 0) {
      // Brak tagów - zwróć pustą tablicę
      return [];
    }

    // Krok 2: Znajdź posty z tymi tagami (używamy $or dla każdego documentId)
    const filters = tagDocumentIds.map((id: string, index: number) => 
      `filters[$or][${index}][tags][documentId][$eq]=${id}`
    ).join('&');
    
    url = `${API_URL}/posts?${filters}&populate[category][populate]=cover_image&populate=image&populate[gallery][populate]=*&populate[tags][populate]=*&sort[0]=createdAt:desc&pagination[start]=0&pagination[limit]=100`;
  } else {
    const filterField = searchBy === 'header' ? 'header' : 'content';
    url = `${API_URL}/posts?filters[${filterField}][$containsi]=${encodeURIComponent(searchQuery)}&populate[category][populate]=cover_image&populate=image&populate[gallery][populate]=*&populate[tags][populate]=*&sort[0]=createdAt:desc&pagination[start]=0&pagination[limit]=100`;
  }

  const res = await fetch(url);
  const data = await res.json();

  return data.data.map((item: ApiResponseItem) => ({
    id: item.id,
    header: item.header,
    description: item.description,
    category: {
      slug: item.category.slug,
      name: item.category.name,
    },
    imageUrl:
      (Array.isArray(item.image) && item.image.length > 0 && item.image[0]?.url) ||
      item.category?.cover_image?.url ||
      "",
    slug: item.slug,
    createdAt: item.createdAt,
    yt_link: item.yt_link,
    gallery: item.gallery,
    tags: Array.isArray(item.tags)
      ? item.tags.flatMap((tagGroup: { Tag: { name: string }[] }) =>
        Array.isArray(tagGroup.Tag) ? tagGroup.Tag.map(tag => tag.name) : []
      )
      : [],
  }));
}