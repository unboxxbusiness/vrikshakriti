import { getAllPosts, getAllCategories } from '@/lib/posts';
import { PostSearch } from '@/components/blog/post-search';
import { CategoryList } from '@/components/blog/category-list';
import { Separator } from '@/components/ui/separator';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const metadata = {
  title: 'Vrikshakriti | Luxury Modular Kitchen Design Blog',
  description: 'Crafting Exquisite Modular Kitchens for Your Home. Explore the latest trends, materials, and designs in luxury kitchen interiors.',
};

function SearchSkeleton() {
  return (
    <div className="space-y-12">
      <div className="relative mb-12 max-w-2xl mx-auto">
         <Skeleton className="w-full h-12" />
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="aspect-video w-full" />
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Home() {
  const allPosts = getAllPosts();
  const allCategories = getAllCategories();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center pt-16 pb-12">
        <h1 className="text-5xl md:text-6xl font-extrabold font-headline mb-4 tracking-tight text-primary">
          Vrikshakriti - Luxury Kitchen, Har Baar
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Crafting Exquisite Modular Kitchens for Your Home.
        </p>
      </div>
      <CategoryList categories={allCategories} />
      <Separator className="my-12" />
      <Suspense fallback={<SearchSkeleton />}>
        <PostSearch allPosts={allPosts} />
      </Suspense>
    </div>
  );
}
