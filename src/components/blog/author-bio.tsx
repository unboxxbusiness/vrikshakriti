import { Post } from '@/lib/types';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SocialShare } from './social-share';

interface AuthorBioProps {
  post: Post;
}

export function AuthorBio({ post }: AuthorBioProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start gap-6 rounded-lg bg-secondary/30 p-6 border-l-4 border-primary">
      <Avatar className="h-20 w-20">
        <AvatarImage src={post.authorImage} alt={post.author} />
        <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-grow">
        <h3 className="text-lg font-bold font-headline text-primary">About {post.author}</h3>
        <p className="text-muted-foreground mt-1 mb-4">{post.authorBio}</p>
      </div>
      <div className="w-full sm:w-auto">
        <SocialShare post={post} />
      </div>
    </div>
  );
}
