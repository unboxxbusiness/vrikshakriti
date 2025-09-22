import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface CategoryListProps {
  categories: string[];
  currentCategory?: string;
}

export function CategoryList({ categories, currentCategory }: CategoryListProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Link href="/">
        <Badge variant={!currentCategory ? 'default' : 'secondary'} className="capitalize transition-colors hover:bg-primary/90">
          All Posts
        </Badge>
      </Link>
      {categories.map((category) => (
        <Link key={category} href={`/category/${category.toLowerCase()}`}>
          <Badge
            variant={currentCategory === category.toLowerCase() ? 'default' : 'secondary'}
            className="capitalize transition-colors hover:bg-primary/90"
          >
            {category}
          </Badge>
        </Link>
      ))}
    </div>
  );
}
