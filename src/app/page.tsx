import { getAllPosts } from '@/lib/posts';
import { PostList } from '@/components/blog/post-list';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'vrikshakriti | Modular Kitchen Design Blog',
  description: 'Your ultimate guide to designing and building the perfect modular kitchen. Explore the latest trends, materials, and designs.',
};

export default function Home() {
  const allPosts = getAllPosts();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center py-16">
        <h1 className="text-5xl md:text-6xl font-extrabold font-headline mb-4 tracking-tight text-primary">
          vrikshakriti
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Your ultimate guide to designing and building the perfect modular kitchen.
        </p>
      </div>
      <PostList allPosts={allPosts} />
    </div>
  );
}
