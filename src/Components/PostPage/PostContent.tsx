import ContentRenderer from "@/utils/ContentRender";
import { type BlocksContent } from '@strapi/blocks-react-renderer';

export default function PostContent({ 
    content 
  }: { 
    content: BlocksContent 
  }) {
    return (
      <div className="prose max-w-none mb-8">
        <ContentRenderer content={content} />
      </div>
    );
  }
