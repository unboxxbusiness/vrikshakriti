'use client';

import { useState } from 'react';
import { Post } from '@/lib/types';
import { PostCard } from './post-card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { loadMorePostsWithSummary } from '@/ai/flows/load-more-posts-with-summary';

interface PostListProps {
  initialPosts: Post[];
}

export function PostList({ initialPosts }: PostListProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadMore = async () => {
    setIsLoading(true);
    try {
      const existingPosts = posts.map(p => ({ title: p.title, content: p.content }));
      const result = await loadMorePostsWithSummary({ postCount: 3, existingPosts });
      
      const newPosts: Post[] = result.posts.map((newPost, index) => ({
        ...newPost,
        slug: newPost.title.toLowerCase().replace(/\s+/g, '-'),
        date: new Date().toISOString(),
        category: 'AI Generated',
        author: 'AI Assistant',
        imageUrl: `https://picsum.photos/seed/${posts.length + index + 10}/600/400`,
      }));

      setPosts(prevPosts => [...prevPosts, ...newPosts]);
    } catch (error) {
      console.error('Failed to load more posts:', error);
      // Optionally, show an error message to the user
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
      <div className="text-center pt-8">
        <Button onClick={handleLoadMore} disabled={isLoading} size="lg">
          {isLoading ? (
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
