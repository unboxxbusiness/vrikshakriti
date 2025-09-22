'use client';

import Image from 'next/image';
import { MarkdownRenderer } from '@/components/blog/markdown-renderer';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { AuthorBio } from '@/components/blog/author-bio';
import { RecentPosts } from '@/components/blog/recent-posts';
import { Post } from '@/lib/types';
import { FormattedDate } from '@/components/blog/formatted-date';
import { TableOfContents } from '@/components/blog/table-of-contents';

interface PostPageClientProps {
  post: Post;
  recentPosts: Post[];
}

export function PostPageClient({ post, recentPosts }: PostPageClientProps) {
  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-12">
      <article className="lg:col-span-3">
        <header className="mb-8">
          <Badge variant="secondary" className="mb-4 bg-accent text-accent-foreground">
            {post.category}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold font-headline mb-3 tracking-tight text-primary">
            {post.title}
          </h1>
          <div className="text-muted-foreground text-base flex items-center">
            <span>by {post.author}</span>
            <span className="mx-2">•</span>
            <FormattedDate dateString={post.date} />
          </div>
        </header>

        <div className="relative aspect-video mb-12 rounded-lg overflow-hidden shadow-lg">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover"
            data-ai-hint={`${post.category} ${post.title.split(' ')[0]}`}
          />
        </div>

        <div className="prose prose-lg mx-auto">
          <MarkdownRenderer content={post.content} />
        </div>

        <Separator className="my-12" />

        <AuthorBio post={post} />
      </article>
      
      <aside className="lg:col-span-1 lg:sticky top-24 self-start">
        <TableOfContents content={post.content} />
      </aside>

    </div>
  );
}
