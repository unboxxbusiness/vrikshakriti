import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Rss } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-slate-50/80 backdrop-blur-lg border-b sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2 text-2xl font-bold font-headline text-foreground hover:text-primary transition-colors">
              <span className="inline-block p-2 bg-blue-600 text-white rounded-md">
                <Rss size={18} />
              </span>
              vrikshakriti
            </Link>
          </div>
          <nav>
            <Button>Subscribe</Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
