/**
 * YouTube API — Latest videos from the Foundation's channel.
 *
 * Uses the public RSS feed (no API key needed). Called on the server only.
 */

import type { YoutubeVideo } from '@/types/youtube';

const CHANNEL_ID = 'UCtdaB5QF6Z1T4jzwZ8-PrSg'; // youtube.com/@fundacjachorobmozgu
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

/** Refresh the cached feed at most once an hour */
const REVALIDATE = 3600;

function decodeXml(value: string): string {
  return value
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&amp;/g, '&');
}

function readTag(entry: string, tag: string): string | null {
  const match = entry.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`));
  return match ? decodeXml(match[1].trim()) : null;
}

/**
 * Fetches the newest videos from the channel, newest first.
 * Returns an empty list when the feed is unavailable.
 *
 * @param limit - Number of videos to return
 */
export async function fetchLatestVideos(limit: number = 3): Promise<YoutubeVideo[]> {
  try {
    const response = await fetch(FEED_URL, { next: { revalidate: REVALIDATE } });
    if (!response.ok) throw new Error(`YouTube feed: ${response.status}`);

    const xml = await response.text();
    const videos = xml
      .split('<entry>')
      .slice(1)
      .map((entry): YoutubeVideo | null => {
        const id = readTag(entry, 'yt:videoId');
        const title = readTag(entry, 'title');
        const publishedAt = readTag(entry, 'published');
        if (!id || !title || !publishedAt) return null;

        return {
          id,
          title,
          publishedAt,
          url: `https://www.youtube.com/watch?v=${id}`,
          // 16:9 thumbnail (hqdefault is 4:3 with black bars)
          thumbnailUrl: `https://i.ytimg.com/vi/${id}/mqdefault.jpg`,
        };
      })
      .filter((video): video is YoutubeVideo => video !== null);

    return videos
      .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))
      .slice(0, limit);
  } catch (error) {
    console.error('[fetchLatestVideos] Failed to fetch YouTube feed:', error);
    return [];
  }
}
