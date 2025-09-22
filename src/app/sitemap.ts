import { getAllPosts } from '@/lib/posts';
import { MetadataRoute } from 'next';

const baseUrl = 'https://your-domain.com'; // IMPORTANT: Change this to your actual domain

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/posts/${post.slug}`,
    lastModified: new Date(post.date).toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...postUrls,
  ];
}
