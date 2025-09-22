'use client';

import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import { cn } from '@/lib/utils';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      className={cn('prose', className)}
      rehypePlugins={[rehypeHighlight]}
      components={{
        h1: ({node, ...props}) => {
          const text = props.children?.toString() || '';
          const slug = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
          return <h1 id={slug} {...props} />;
        },
        h2: ({node, ...props}) => {
          const text = props.children?.toString() || '';
          const slug = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
          return <h2 id={slug} {...props} />;
        },
        h3: ({node, ...props}) => {
          const text = props.children?.toString() || '';
          const slug = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
          return <h3 id={slug} {...props} />;
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
