import { getPostBySlug, getAllPosts } from '@/lib/posts';
import { notFound } from 'next/navigation';
import { PostPageClient } from './post-page-client';
import { Separator } from '@/components/ui/separator';
import { RecentPosts } from '@/components/blog/recent-posts';
import { AuthorBio } from '@/components/blog/author-bio';
import { TableOfContents } from '@/components/blog/table-of-contents';

type PostPageProps = {
  params: {
    slug: string;
  };
};

// Revalidate every hour
export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post not found',
    };
  }

  return {
    title: `${post.title} | Vrikshakriti`,
    description: post.summary,
  };
}

export default function PostPage({ params }: PostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const allPosts = getAllPosts();
  const recentPosts = allPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-12">
      <article className="lg:col-span-3">
        <PostPageClient post={post} />
        <Separator className="my-12" />
        <AuthorBio post={post} />
        <Separator className="my-16" />
        <RecentPosts posts={recentPosts} />
      </article>
      
      <aside className="lg:col-span-1">
        <div className="sticky top-24">
          <TableOfContents content={post.content} />
        </div>
      </aside>
    </div>
  );
}
