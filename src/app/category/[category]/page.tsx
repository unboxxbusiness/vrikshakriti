import { getAllPosts } from '@/lib/posts';
import { PostSearch } from '@/components/blog/post-search';
import { notFound } from 'next/navigation';
import { Separator } from '@/components/ui/separator';

type CategoryPageProps = {
    params: {
        category: string;
    };
};

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((category) => ({
    category: category.toLowerCase(),
  }));
}

function getAllCategories(): string[] {
  const posts = getAllPosts();
  const categories = posts.map(post => post.category);
  return [...new Set(categories)];
}

export async function generateMetadata({ params }: CategoryPageProps) {
    const categoryName = params.category.charAt(0).toUpperCase() + params.category.slice(1);
    return {
        title: `Posts in ${categoryName} | Vrikshakriti Blog`,
        description: `Browse all blog posts in the ${categoryName} category.`,
    };
}


export default function CategoryPage({ params }: CategoryPageProps) {
  const allPosts = getAllPosts();
  
  const filteredPosts = allPosts.filter(
    (post) => post.category.toLowerCase() === params.category
  );

  if (filteredPosts.length === 0) {
    notFound();
  }

  const categoryName = params.category.charAt(0).toUpperCase() + params.category.slice(1);

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

        <Separator className="my-12" />

        <PostSearch allPosts={filteredPosts} />
    </div>
  );
}
