'use client';

import { useState, useEffect } from 'react';
import { Post } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Twitter, Facebook, Linkedin, Copy, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SocialShareProps {
  post: Post;
}

export function SocialShare({ post }: SocialShareProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [url, setUrl] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    // This effect runs only on the client, preventing SSR issues.
    setUrl(window.location.href);
    const userAgent = navigator.userAgent || navigator.vendor;
    if (/android|iphone|ipad|ipod/i.test(userAgent)) {
      setIsMobile(true);
    }
  }, []);

  const shareData = {
    title: post.title,
    text: post.summary,
    url: url,
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
        toast({
            title: 'Sharing not supported',
            description: "Your browser doesn't support native sharing.",
            variant: 'destructive'
        })
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    toast({
      title: 'Link Copied!',
      description: 'The post link has been copied to your clipboard.',
    });
  };

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(post.title)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(post.title)}&summary=${encodeURIComponent(post.summary)}`,
  };

  if (!url) {
    return null; // Don't render anything on the server or before URL is set
  }

  if (isMobile) {
    return (
      <Button variant="ghost" size="sm" onClick={handleNativeShare} className="flex items-center gap-2">
        <Share2 className="h-4 w-4" />
        <span>Share Post</span>
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">Share:</span>
      <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer">
        <Button variant="outline" size="icon" aria-label="Share on Twitter">
          <Twitter className="h-4 w-4" />
        </Button>
      </a>
      <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer">
        <Button variant="outline" size="icon" aria-label="Share on Facebook">
          <Facebook className="h-4 w-4" />
        </Button>
      </a>
      <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer">
        <Button variant="outline" size="icon" aria-label="Share on LinkedIn">
          <Linkedin className="h-4 w-4" />
        </Button>
      </a>
      <Button variant="outline" size="icon" onClick={handleCopyLink} aria-label="Copy link">
        <Copy className="h-4 w-4" />
      </Button>
    </div>
  );
}
