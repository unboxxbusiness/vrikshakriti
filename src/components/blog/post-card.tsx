import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const postDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link href={`/posts/${post.slug}`} className="group block">
      <Card className="transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 bg-card overflow-hidden h-full flex flex-col">
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
            <Badge variant="default" className="mb-2 self-start bg-blue-100 text-blue-800 hover:bg-blue-200">
              {post.category}
            </Badge>
            <h3 className="font-headline text-xl font-bold mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
            <p className="text-muted-foreground text-sm mt-auto">
              by {post.author} • {postDate}
            </p>
        </CardContent>
      </Card>
    </Link>
  );
}
