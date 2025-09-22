'use client';

import { useState } from 'react';
import { Post } from '@/lib/types';
import { PostCard } from './post-card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface PostListProps {
  initialPosts: Post[];
}

export function PostList({ initialPosts }: PostListProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  
  return (
    <div className="space-y-8">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
