import type { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from "@/components/ui/toaster";
import './globals.css';
import { Lato, Playfair_Display } from 'next/font/google';

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
  display: 'swap',
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-lato',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Vrikshakriti | Luxury Modular Kitchens, Har Baar',
  description: 'Discover bespoke luxury modular kitchens from Vrikshakriti. We craft exquisite, functional, and timeless kitchen spaces tailored to your lifestyle.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${lato.variable} h-full`}>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css" />
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen bg-background text-foreground" suppressHydrationWarning>
        <Header />
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
