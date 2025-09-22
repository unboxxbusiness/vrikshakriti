'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FormattedDate } from './formatted-date';
import { cn } from '@/lib/utils';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card className="group transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 bg-card overflow-hidden h-full flex flex-col border-border/50">
      <div className="relative aspect-video">
        <Link href={`/posts/${post.slug}`} className="block h-full w-full">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover"
            data-ai-hint={`${post.category} ${post.title.split(' ')[0]}`}
          />
        </Link>
      </div>
      <CardContent className="p-6 flex flex-col flex-grow">
        <div className="mb-2 self-start">
           <Link href={`/category/${post.category.toLowerCase()}`} className="relative z-10">
              <Badge variant="secondary" className="capitalize transition-colors hover:bg-primary hover:text-primary-foreground">
                {post.category}
              </Badge>
          </Link>
        </div>
        <h3 className="font-headline text-xl font-bold mb-2 text-primary/90">
            <Link href={`/posts/${post.slug}`} className="hover:text-primary transition-colors">
                {post.title}
            </Link>
        </h3>
        <p className="text-muted-foreground text-sm mt-auto">
          by {post.author} • <FormattedDate dateString={post.date} />
        </p>
      </CardContent>
    </Card>
  );
}
