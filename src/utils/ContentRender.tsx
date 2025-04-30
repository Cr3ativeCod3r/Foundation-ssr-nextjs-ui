import { BlocksRenderer, type BlocksContent } from '@strapi/blocks-react-renderer';
import "@/app/content.css"

const ContentRenderer = ({ content }: { content: BlocksContent }) => {
  if (!content || content.length === 0) {
    return null;
  }
  return <div className='px-2 content_render'><BlocksRenderer content={content} /></div>;
};
export default ContentRenderer;