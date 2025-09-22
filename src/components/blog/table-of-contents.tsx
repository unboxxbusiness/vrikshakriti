'use client';

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { cn } from '@/lib/utils';
import { generateTableOfContents } from '@/ai/flows/generate-table-of-contents';
import { useToast } from '@/hooks/use-toast';

interface TocItem {
  level: number;
  text: string;
  slug: string;
}

export function TableOfContents({ content }: { content: string }) {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const generateToc = async () => {
      try {
        // No need to set loading to true here, it's already true
        const generatedToc = await generateTableOfContents({ postContent: content });
        const tocItems = generatedToc.toc.map(item => ({
          ...item,
          slug: item.text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''),
        }));
        setToc(tocItems);
      } catch (error) {
        console.error('Failed to generate TOC:', error);
        toast({
          title: 'Error',
          description: 'Could not generate table of contents.',
          variant: 'destructive',
        });
        
        // Fallback to manual parsing
        const lines = content.split('\n');
        const manualToc: TocItem[] = [];
        lines.forEach(line => {
          const match = line.match(/^(#+)\s+(.*)/);
          if (match) {
            const level = match[1].length;
            const text = match[2];
            const slug = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
            if (level <= 3) {
              manualToc.push({ level, text, slug });
            }
          }
        });
        setToc(manualToc);
      } finally {
        setIsLoading(false);
      }
    };

    generateToc();
  }, [content, toast]);

  useEffect(() => {
    if (isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0% 0% -80% 0%' }
    );

    const elements = toc.map(item => document.getElementById(item.slug)).filter(Boolean);
    elements.forEach(el => observer.observe(el!));

    return () => {
      elements.forEach(el => observer.unobserve(el!));
    };
  }, [toc, isLoading]);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
    e.preventDefault();
    document.getElementById(slug)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
    // This is not strictly necessary but can make the UI feel more responsive
    if (window.history.pushState) {
      window.history.pushState(null, '', `#${slug}`);
    }
  };

  if (isLoading) {
    return (
      <Card className="bg-accent/50 border-accent">
        <CardHeader>
          <CardTitle className="text-primary">Table of Contents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded w-3/4 animate-pulse"></div>
            <div className="h-4 bg-muted rounded w-1/2 animate-pulse ml-4"></div>
            <div className="h-4 bg-muted rounded w-5/6 animate-pulse"></div>
            <div className="h-4 bg-muted rounded w-2/3 animate-pulse"></div>
            <div className="h-4 bg-muted rounded w-1/2 animate-pulse ml-4"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (toc.length === 0) {
    return null;
  }
  
  return (
    <Card className="bg-accent/50 border-accent">
      <CardHeader>
        <CardTitle className="text-primary">Table of Contents</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {toc.map((item) => (
            <li key={item.slug} style={{ marginLeft: `${(item.level - 1) * 1}rem` }}>
              <a
                href={`#${item.slug}`}
                onClick={(e) => handleScroll(e, item.slug)}
                className={cn(
                  'text-muted-foreground hover:text-primary transition-colors',
                  {
                    'text-primary font-bold': activeId === item.slug,
                  }
                )}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
