import { Post } from '@/lib/types';
import { PostCard } from './post-card';

interface RecentPostsProps {
    posts: Post[];
}

export function RecentPosts({ posts }: RecentPostsProps) {
  return (
    <section>
      <h2 className="text-3xl font-bold font-headline mb-8 text-center">Recent Posts</h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
