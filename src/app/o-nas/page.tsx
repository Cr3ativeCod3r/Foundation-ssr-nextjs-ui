"use client";

import axios from "axios";
import ContentRenderer from "@/utils/ContentRender";
import { useEffect, useState } from "react";
import { type BlocksContent } from '@strapi/blocks-react-renderer';
import Image from "next/image";
const Page = () => {
  const [content, setContent] = useState<BlocksContent | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get("https://admin.neurocamp.pl/api/o-fundacji");
        setContent(response.data.data.content);
      } catch (error) {
        console.error("Error fetching content:", error);
      }
    };

    fetchContent();
  }, []);

  return (
    <div className="bg-green-50 min-h-screen md:p-10 w-full mx-auto  pt-4">
      <h1 className="text-2xl md:text-3xl font-bold mb-8 text-green-800 border-b border-green-200 pb-4 mx-auto text-center">
        O Fundacji
      </h1>
      
      <div className="bg-white rounded-lg shadow-md p-2 md:p-8 lg:w-2/3 sm: w-full mx-auto ">
        {content ? (
          <ContentRenderer content={content} />
        ) : (
          <div className="flex justify-center items-center h-screen">
            <Image 
              src="/img/logo.png"
              alt="Loading..."
              width={400}
              height={50}
              className="animate-pulse opacity-40"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;