'use client';

import { useState, useTransition } from 'react';
import { Post } from '@/lib/types';
import { loadMorePostsWithSummary } from '@/ai/flows/load-more-posts-with-summary';
import { PostCard } from './post-card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PostListProps {
  initialPosts: Post[];
}

export function PostList({ initialPosts }: PostListProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleLoadMore = () => {
    startTransition(async () => {
      try {
        const existingPostsForAI = posts.map(p => ({ title: p.title, content: p.content }));
        const result = await loadMorePostsWithSummary({
          postCount: 3,
          existingPosts: existingPostsForAI,
        });

        if (result.posts && result.posts.length > 0) {
          const newPosts: Post[] = result.posts.map((p) => ({
            ...p,
            slug: p.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''),
            date: new Date().toISOString(),
          }));
          setPosts((prevPosts) => [...prevPosts, ...newPosts]);
        } else {
            toast({
                title: "No more posts",
                description: "You've reached the end of the content for now.",
            });
        }
      } catch (error) {
        console.error('Failed to load more posts:', error);
        toast({
          title: 'Error',
          description: 'Could not load more posts. Please try again later.',
          variant: 'destructive',
        });
      }
    });
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-1">
        {posts.map((post, index) => (
          <PostCard key={post.slug + index} post={post} />
        ))}
      </div>
      <div className="flex justify-center mt-12">
        <Button onClick={handleLoadMore} disabled={isPending} size="lg">
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </>
          ) : (
            'Load More'
          )}
        </Button>
      </div>
    </div>
  );
}
