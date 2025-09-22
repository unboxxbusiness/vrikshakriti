import { getAllPosts } from '@/lib/posts';
import { PostSearch } from '@/components/blog/post-search';

export const metadata = {
  title: 'Vrikshakriti | Luxury Modular Kitchen Design Blog',
  description: 'Crafting Exquisite Modular Kitchens for Your Home. Explore the latest trends, materials, and designs in luxury kitchen interiors.',
};


export default function Home() {
  const allPosts = getAllPosts();

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
      <PostSearch allPosts={allPosts} />
    </div>
  );
}
