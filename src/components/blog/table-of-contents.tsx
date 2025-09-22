'use client';

import { useEffect, useState } from 'react';
import { generateTableOfContents } from '@/ai/flows/generate-table-of-contents';
import { MarkdownRenderer } from './markdown-renderer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { List } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TableOfContentsProps {
  content: string;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [toc, setToc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchToc = async () => {
      setIsLoading(true);
      try {
        const result = await generateTableOfContents({ markdownContent: content });
        setToc(result.tableOfContents);
      } catch (error) {
        console.error('Failed to generate Table of Contents:', error);
        toast({
          title: 'Error',
          description: 'Could not generate Table of Contents.',
          variant: 'destructive',
        });
        setToc(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchToc();
  }, [content, toast]);

  return (
    <Card className="bg-secondary/20 border-accent">
      <CardHeader>
        <CardTitle className="flex items-center text-lg font-headline">
          <List className="mr-2 h-5 w-5" />
          Table of Contents
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ) : toc ? (
          <MarkdownRenderer content={toc} className="prose-sm" />
        ) : (
          <p className="text-muted-foreground text-sm">Could not be generated.</p>
        )}
      </CardContent>
    </Card>
  );
}
