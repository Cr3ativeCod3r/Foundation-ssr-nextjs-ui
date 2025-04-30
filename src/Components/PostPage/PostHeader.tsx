import Image from "next/image";
import { Category } from "@/types/news";
import PostMeta from "./PostMeta"; // Import komponentu PostMeta
import YoutubeEmbed from "./YoutubeEmbed";

export default function PostHeader({
  title,
  imageUrl,
  category,
  author,
  date,
  shareUrl,
  yt_link
}: {
  title: string;
  imageUrl: string;
  category: Category;
  author: { name: string };
  date: string;
  shareUrl: string;
  yt_link:string;
}) {
  const fullImageUrl = imageUrl
    ? `${process.env.NEXT_PUBLIC_DOMAIN_URL}${imageUrl}`
    : null;

  return (
    <div className="mb-8">
      <div className="flex items-center gap-1 text-md text-red-600 mb-6 px-1 font-bold">
        <span>ChorobyMózgu.pl</span>
        <span>-</span>
        <span className="uppercase">{category.name}</span>
      </div>

      <PostMeta author={author} date={date} title={title} shareUrl={shareUrl} />


    

      {yt_link ? (
        <div className="relative w-ful h-full mb-8 overflow-hidden rounded-lg">
        <YoutubeEmbed ytLink={yt_link} />
        </div>
      ) : (
        fullImageUrl && (
          <div className="relative w-ful lg:h-96 sm: h-62 mb-8 overflow-hidden rounded-lg">
          <Image
            src={fullImageUrl}
            alt={title}
            width={800}
            height={320}
            className="object-contain w-full h-full"
            priority
          />
            </div>
        )
      )} 

      <hr className="text-gray-200"></hr>
    </div>
  );
}