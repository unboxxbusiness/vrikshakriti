'use client';

import { useState } from 'react';
import { Post } from '@/lib/types';
import { PostCard } from './post-card';
import { Pagination } from './pagination';

interface PostListProps {
  allPosts: Post[];
  postsPerPage?: number;
}

export function PostList({ allPosts, postsPerPage = 6 }: PostListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(allPosts.length / postsPerPage);
  const currentPosts = allPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-12">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {currentPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
