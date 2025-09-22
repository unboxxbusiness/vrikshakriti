import { getPostBySlug, getAllPosts } from '@/lib/posts';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { MarkdownRenderer } from '@/components/blog/markdown-renderer';
import { Badge } from '@/components/ui/badge';

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

  return (
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
    </article>
  );
}
