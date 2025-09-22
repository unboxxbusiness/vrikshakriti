import { getAllPosts, getAllCategories } from '@/lib/posts';
import { PostSearch } from '@/components/blog/post-search';
import { notFound } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

type CategoryPageProps = {
    params: {
        category: string;
    };
};

function SearchSkeleton() {
    return (
      <div className="space-y-12">
        <div className="relative mb-12 max-w-2xl mx-auto">
           <Skeleton className="w-full h-12" />
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
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

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((category) => ({
    category: category.toLowerCase(),
  }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
    const categoryName = decodeURIComponent(params.category).charAt(0).toUpperCase() + decodeURIComponent(params.category).slice(1);
    return {
        title: `Posts in ${categoryName} | Vrikshakriti Blog`,
        description: `Browse all blog posts in the ${categoryName} category.`,
    };
}


export default function CategoryPage({ params }: CategoryPageProps) {
  const allPosts = getAllPosts();
  
  const categoryParam = decodeURIComponent(params.category);
  const categoryName = categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1);
  
  const filteredPosts = allPosts.filter(
    (post) => post.category.toLowerCase() === categoryParam
  );

  if (filteredPosts.length === 0) {
    notFound();
  }

  const allCategories = getAllCategories();

  return (
    <div className="max-w-6xl mx-auto">
        <div className="text-center pt-16 pb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold font-headline mb-4 tracking-tight text-primary">
                Category: {categoryName}
            </h1>
            <p className="text-lg text-muted-foreground">
                Showing all posts from the &quot;{categoryName}&quot; category.
            </p>
        </div>

        <CategoryList categories={allCategories} currentCategory={categoryParam} />

        <Separator className="my-12" />
        
        <Suspense fallback={<SearchSkeleton />}>
            <PostSearch allPosts={filteredPosts} />
        </Suspense>
    </div>
  );
}
