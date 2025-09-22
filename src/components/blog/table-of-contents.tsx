'use client';

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface TocItem {
  level: number;
  text: string;
  slug: string;
}

export function TableOfContents({ content }: { content: string }) {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
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
  }, [content]);

  useEffect(() => {
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
  }, [toc]);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
    e.preventDefault();
    document.getElementById(slug)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
    if (window.history.pushState) {
      window.history.pushState(null, '', `#${slug}`);
    }
  };

  if (toc.length === 0) {
    return null;
  }
  
  return (
    <Card className="bg-accent/50 border-accent sticky top-24">
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
