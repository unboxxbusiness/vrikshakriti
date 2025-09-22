'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FormattedDate } from './formatted-date';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/posts/${post.slug}`} className="group block">
      <Card className="transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 bg-card overflow-hidden h-full flex flex-col border-border/50">
        <div className="relative aspect-video">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover"
            data-ai-hint={`${post.category} ${post.title.split(' ')[0]}`}
          />
        </div>
        <CardContent className="p-6 flex flex-col flex-grow">
          <Badge variant="secondary" className="mb-2 self-start bg-accent text-accent-foreground">
            {post.category}
          </Badge>
          <h3 className="font-headline text-xl font-bold mb-2 group-hover:text-primary transition-colors text-primary/90">
            {post.title}
          </h3>
          <p className="text-muted-foreground text-sm mt-auto">
            by {post.author} • <FormattedDate dateString={post.date} />
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
