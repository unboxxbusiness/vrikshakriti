import { getAllPosts } from '@/lib/posts';
import { PostList } from '@/components/blog/post-list';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function Home() {
  const allPosts = getAllPosts();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center py-16">
        <h1 className="text-5xl md:text-6xl font-extrabold font-headline mb-4 tracking-tight">
          vrikshakriti
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Your ultimate guide to designing and building the perfect modular kitchen.
        </p>
        <div className="mt-8 max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for kitchen ideas..."
              className="pl-10 h-12 text-base"
            />
          </div>
        </div>
      </div>
      <PostList allPosts={allPosts} />
    </div>
  );
}
