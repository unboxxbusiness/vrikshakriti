'use client';

import Image from 'next/image';
import { MarkdownRenderer } from '@/components/blog/markdown-renderer';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { AuthorBio } from '@/components/blog/author-bio';
import { RecentPosts } from '@/components/blog/recent-posts';
import { Post } from '@/lib/types';
import { FormattedDate } from '@/components/blog/formatted-date';

interface PostPageClientProps {
  post: Post;
  recentPosts: Post[];
}

export function PostPageClient({ post, recentPosts }: PostPageClientProps) {
  return (
    <div className="max-w-6xl mx-auto">
      <article className="max-w-3xl mx-auto">
        <header className="mb-8">
          <Badge variant="secondary" className="mb-4">
            {post.category}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold font-headline mb-3 tracking-tight">
            {post.title}
          </h1>
          <div className="text-muted-foreground text-base">
            <span>by {post.author}</span>
            <span className="mx-2">•</span>
            <span>
              <FormattedDate dateString={post.date} />
            </span>
          </div>
        </header>

        <div className="relative aspect-video mb-12 rounded-lg overflow-hidden">
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

      <Separator className="my-16" />

      <RecentPosts posts={recentPosts} />
    </div>
  );
}
