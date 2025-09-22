import { Post } from '@/lib/types';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface AuthorBioProps {
  post: Post;
}

export function AuthorBio({ post }: AuthorBioProps) {
  return (
    <div className="flex items-center gap-6 rounded-lg bg-secondary p-6">
      <Avatar className="h-20 w-20">
        <AvatarImage src={post.authorImage} alt={post.author} />
        <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
      </Avatar>
      <div>
        <h3 className="text-lg font-bold font-headline">About {post.author}</h3>
        <p className="text-muted-foreground mt-1">{post.authorBio}</p>
      </div>
    </div>
  );
}
