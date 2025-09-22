export function Footer() {
  return (
    <footer className="bg-card border-t mt-12">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Ai Blog. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
