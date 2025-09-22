'use client';

import Image from 'next/image';
import { MarkdownRenderer } from '@/components/blog/markdown-renderer';
import { Badge } from '@/components/ui/badge';
import { Post } from '@/lib/types';
import { FormattedDate } from '@/components/blog/formatted-date';
import { SocialShare } from '@/components/blog/social-share';
import Link from 'next/link';

interface PostPageClientProps {
  post: Post;
}

export function PostPageClient({ post }: PostPageClientProps) {
  return (
    <>
      <header className="mb-8">
        <Link href={`/category/${post.category.toLowerCase()}`}>
            <Badge variant="secondary" className="mb-4 bg-accent text-accent-foreground hover:bg-accent/80 transition-colors">
              {post.category}
            </Badge>
        </Link>
        <h1 className="text-4xl md:text-5xl font-extrabold font-headline mb-3 tracking-tight text-primary">
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-4 text-muted-foreground text-base">
          <div className="flex items-center gap-2">
            <Image 
              src={post.authorImage}
              alt={post.author}
              width={40}
              height={40}
              className="rounded-full"
            />
            <span>by {post.author}</span>
          </div>
          <span className="hidden sm:inline">•</span>
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
    </>
  );
}
