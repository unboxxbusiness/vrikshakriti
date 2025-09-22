import Link from 'next/link';

export function Header() {
  return (
    <header className="bg-card border-b sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold font-headline text-foreground hover:text-primary transition-colors">
              Ai Blog
            </Link>
          </div>
          <nav>
            {/* Navigation links can be added here in the future */}
          </nav>
        </div>
      </div>
    </header>
  );
}
