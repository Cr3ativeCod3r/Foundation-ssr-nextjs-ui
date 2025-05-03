import { type BlocksContent } from '@strapi/blocks-react-renderer';
import ContentRenderer from "@/utils/ContentRender";

function PostContent({ 
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
export default PostContent;