import { getAllPosts } from "@/lib/posts";
import Link from 'next/link';

const Logo = () => (
  <svg
    width="34"
    height="34"
    viewBox="0 0 34 34"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17 31.5V23.5M11.5 23.5H22.5M11.5 23.5L4.5 16.5M22.5 23.5L29.5 16.5M4.5 16.5H9.5L13 20L17 16L21 20L24.5 16.5H29.5M17 16V2M17 9.5C17 9.5 19.5 9.5 20.5 8C21.5 6.5 20.5 4.5 20.5 4.5M17 9.5C17 9.5 14.5 9.5 13.5 8C12.5 6.5 13.5 4.5 13.5 4.5M24.5 16.5C24.5 16.5 25.5 15.5 26.5 14.5C27.5 13.5 28.5 12.5 28.5 11.5C28.5 10.5 27.5 9.5 27.5 9.5M9.5 16.5C9.5 16.5 8.5 15.5 7.5 14.5C6.5 13.5 5.5 12.5 5.5 11.5C5.5 10.5 6.5 9.5 6.5 9.5"
      stroke="#6f1d1b"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.5 4.5C13.5 4.5 13 3.5 12.5 3C12 2.5 11 2.5 11 2.5"
      stroke="#ffe6a7"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20.5 4.5C20.5 4.5 21 3.5 21.5 3C22 2.5 23 2.5 23 2.5"
      stroke="#ffe6a7"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M27.5 9.5C27.5 9.5 28.5 9 29 8.5C29.5 8 30 7.5 30 7.5"
      stroke="#ffe6a7"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.5 9.5C6.5 9.5 5.5 9 5 8.5C4.5 8 4 7.5 4 7.5"
      stroke="#ffe6a7"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);


export function Footer() {
  const recentPosts = getAllPosts().slice(0, 4);

  return (
    <footer className="bg-card border-t mt-12">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 text-2xl font-bold font-headline text-foreground hover:text-primary transition-colors">
              <span className="inline-block p-1 bg-white rounded-md">
                <Logo />
              </span>
              vrikshakriti
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
            © 2024 vrikshakriti. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
