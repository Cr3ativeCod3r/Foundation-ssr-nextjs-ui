/**
 * YouTube types — videos from the Foundation's channel
 */

export interface YoutubeVideo {
  id: string;
  title: string;
  /** ISO date of publication */
  publishedAt: string;
  url: string;
  thumbnailUrl: string;
}
