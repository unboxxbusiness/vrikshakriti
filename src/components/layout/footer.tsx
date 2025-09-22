import { getAllPosts } from "@/lib/posts";
import Link from 'next/link';
import { Rss } from "lucide-react";
import { ChefHat } from "lucide-react";

export function Footer() {
  const recentPosts = getAllPosts().slice(0, 4);

  return (
    <footer className="bg-card border-t mt-12 bg-slate-50">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 text-2xl font-bold font-headline text-foreground hover:text-primary transition-colors">
              <span className="inline-block p-2 bg-primary text-primary-foreground rounded-md">
                <ChefHat size={18} />
              </span>
              KitchenR
            </Link>
            <p className="text-muted-foreground text-sm">
             Your ultimate guide to designing and building the perfect modular kitchen.
            </p>
          </div>
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold font-headline mb-4">Recent Posts</h3>
              <ul className="space-y-3">
                {recentPosts.map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={`/posts/${post.slug}`}
                      className="text-muted-foreground hover:text-primary hover:underline transition-colors text-sm"
                    >
                      {post.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t pt-6">
          <p className="text-center text-sm text-muted-foreground">
            © 2024 KitchenR. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
