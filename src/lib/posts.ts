import { Post } from './types';

const posts: Post[] = [
  {
    slug: 'getting-started-with-nextjs',
    title: 'Getting Started with Next.js',
    date: '2024-07-20',
    summary:
      'A comprehensive guide to setting up your first Next.js application. We cover installation, project structure, and the first few steps to get you running.',
    content: `
# Getting Started with Next.js

Welcome to our guide on getting started with Next.js! This post will walk you through the initial setup and basic concepts.

## Installation

To create a Next.js app, open your terminal, \`cd\` into the directory you’d like to create the app in, and run the following command:

\`\`\`bash
npx create-next-app@latest
\`\`\`

You'll be asked a series of questions to configure your project. For this tutorial, we'll stick with the defaults.

## Project Structure

After installation, your project structure will look something like this:

- \`app/\`: The core of your application, using the App Router.
- \`public/\`: Static assets like images.
- \`package.json\`: Project dependencies and scripts.

## First Page

Open \`app/page.tsx\`. This is the entry point for your homepage. You can start editing this file to see changes on your development server.

\`\`\`tsx
export default function Home() {
  return <h1>Hello, Next.js!</h1>;
}
\`\`\`

That's it for a basic start! In the next posts, we'll explore routing, data fetching, and more advanced features.
    `,
  },
  {
    slug: 'styling-in-nextjs',
    title: 'Styling in Next.js with Tailwind CSS',
    date: '2024-07-18',
    summary:
      'Learn how to integrate and use Tailwind CSS for styling your Next.js applications. A practical approach to utility-first styling.',
    content: `
# Styling in Next.js with Tailwind CSS

Styling is a crucial part of any web application. Next.js offers several ways to style your app, but one of the most popular is using Tailwind CSS.

## Why Tailwind CSS?

Tailwind CSS is a utility-first CSS framework that provides low-level utility classes to build custom designs without writing custom CSS. This makes it fast and efficient.

## Setup

Integrating Tailwind CSS with Next.js is straightforward. The \`create-next-app\` CLI can even set it up for you automatically. If you're adding it to an existing project, follow the official guide.

You'll have a \`tailwind.config.ts\` file where you can customize your theme, and a \`globals.css\` file for base styles and Tailwind directives.

\`\`\`css
@tailwind base;
@tailwind components;
@tailwind utilities;
\`\`\`

## Using Utility Classes

Now you can use Tailwind's utility classes directly in your JSX.

\`\`\`tsx
export default function StyledCard() {
  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
      <div className="shrink-0">
        <img className="h-12 w-12" src="/logo.svg" alt="ChitChat Logo">
      </div>
      <div>
        <div className="text-xl font-medium text-black">ChitChat</div>
        <p className="text-slate-500">You have a new message!</p>
      </div>
    </div>
  );
}
\`\`\`

This approach keeps your styles co-located with your components, making them easier to maintain.
    `,
  },
  {
    slug: 'understanding-server-components',
    title: 'Understanding React Server Components',
    date: '2024-07-15',
    summary:
      'A deep dive into React Server Components and how they are changing the way we build web applications with Next.js. Explore the benefits and use cases.',
    content: `
# Understanding React Server Components

React Server Components (RSCs) are a new architecture introduced by the React team, and Next.js is one of the first frameworks to adopt them fully with the App Router.

## What are they?

Server Components are React components that run exclusively on the server. They are never shipped to the client, which means their code doesn't contribute to your JavaScript bundle size.

### Key Benefits

1.  **Zero Bundle Size**: They don't add to the client-side JavaScript.
2.  **Direct Backend Access**: They can directly access server-side resources like databases or file systems without needing an API layer.
3.  **Automatic Code Splitting**: They act as natural code-split points.

## Client Components

Of course, you still need interactivity. Components that use state, effects, or browser-only APIs must be marked as Client Components with the \`"use client"\` directive at the top of the file.

\`\`\`tsx
"use client";

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
\`\`\`

## Best of Both Worlds

The power of the new model lies in interleaving Server and Client Components. You can render a Server Component that fetches data, and inside it, render a Client Component that provides interactivity, passing the server-fetched data as props. This gives you the performance benefits of server-rendering with the rich interactivity of a client-side app.
    `,
  },
];

export function getAllPosts(): Post[] {
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}
