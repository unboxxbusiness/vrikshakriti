import { getAllPosts } from '@/lib/posts';
import { PostList } from '@/components/blog/post-list';

export default function Home() {
  const initialPosts = getAllPosts();

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold font-headline mb-8 text-center">
        Welcome to Ai Blog
      </h1>
      <PostList initialPosts={initialPosts} />
    </div>
  );
}
