import { getPostBySlug, getAllPosts } from '@/lib/posts';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { MarkdownRenderer } from '@/components/blog/markdown-renderer';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { AuthorBio } from '@/components/blog/author-bio';
import { RecentPosts } from '@/components/blog/recent-posts';

type PostPageProps = {
  params: {
    slug: string;
  };
};

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
    title: `${post.title} | Innovate Blog`,
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
    <div className="max-w-6xl mx-auto">
      <article className="max-w-3xl mx-auto">
        <header className="mb-8">
          <Badge variant="default" className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">
            {post.category}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold font-headline mb-3 tracking-tight">{post.title}</h1>
          <div className="text-muted-foreground text-base">
            <span>by {post.author}</span>
            <span className="mx-2">•</span>
            <span>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
        </header>
        
        <div className="relative aspect-video mb-12 rounded-lg overflow-hidden">
          <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover"
              data-ai-hint={`${post.category} ${post.title.split(' ')[0]}`}
            />
        </div>

        <div className="prose prose-lg mx-auto">
          <MarkdownRenderer content={post.content} />
        </div>

        <Separator className="my-12" />
        
        <AuthorBio post={post} />

      </article>

      <Separator className="my-16" />

      <RecentPosts posts={recentPosts} />

    </div>
  );
}
