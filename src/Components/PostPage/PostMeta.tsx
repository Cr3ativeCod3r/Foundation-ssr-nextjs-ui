import Image from "next/image";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { CiFacebook, CiShare2 } from "react-icons/ci";

export default function PostMeta({
  author,
  date,
  title,
  shareUrl
}: {
  author: { name: string };
  date: string;
  title: string;
  shareUrl: string;
}) {
  const formattedDate = format(new Date(date), "d MMMM yyyy", { locale: pl });

  return (
    <div className="mx-2 ">
      <h1 className="lg:text-2xl sm: text-xl font-semibold text-left mb-4">{title}</h1>
      <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
        <div className="flex items-center">
          <div className="w-24 h-24 mt-4 rounded-full overflow-hidden mr-4 border-2 border-blue-500">
            <Image
              src="/img/avatar.jpg"
              alt="Avatar"
              width={68}
              height={68}
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <p className="font-medium text-black">{author.name}</p>
            <p className="text-sm text-gray-500">{formattedDate}</p>
          </div>
        </div>

        {/* Ikony w prawym rogu */}
        <div className="flex items-center">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-3xl"
          >
            <CiFacebook />
          </a>
          <a
            href={`https://www.linkedin.com/shareArticle?url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-800 text-xl"
          >
            <CiShare2 />
          </a>
        </div>
      </div>
    </div>
  );
}