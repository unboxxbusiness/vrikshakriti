'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { PostList } from './post-list';
import { Post } from '@/lib/types';

interface PostSearchProps {
    allPosts: Post[];
}

export function PostSearch({ allPosts }: PostSearchProps) {
    const searchParams = useSearchParams();
    const initialSearchTerm = searchParams.get('q') || '';
    const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

    useEffect(() => {
        setSearchTerm(initialSearchTerm);
    }, [initialSearchTerm]);

    const filteredPosts = allPosts.filter(post => {
        const term = searchTerm.toLowerCase();
        return (
            post.title.toLowerCase().includes(term) ||
            post.summary.toLowerCase().includes(term) ||
            post.category.toLowerCase().includes(term) ||
            post.author.toLowerCase().includes(term)
        );
    });

    return (
        <>
            <div className="relative mb-12 max-w-2xl mx-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search articles..."
                    className="w-full pl-10 pr-4 py-3 h-12 text-base"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {filteredPosts.length > 0 ? (
                <PostList allPosts={filteredPosts} />
            ) : (
                <div className="text-center py-16">
                    <p className="text-xl text-muted-foreground">No posts found for &quot;{searchTerm}&quot;.</p>
                </div>
            )}
        </>
    );
}
