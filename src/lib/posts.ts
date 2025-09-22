import { Post } from './types';

const posts: Post[] = [
  {
    slug: 'the-future-of-work-remote-collaboration-tools',
    title: 'The Future of Work: Remote Collaboration Tools',
    date: '2024-07-15',
    category: 'Technology',
    author: 'Jane Doe',
    imageUrl: 'https://picsum.photos/seed/1/600/400',
    summary:
      "An in-depth look at the tools shaping remote collaboration and the future of work.",
    content: `
# The Future of Work: Remote Collaboration Tools

The world of work is changing, and remote collaboration is at the forefront. This post explores the tools that are making it possible.

## Communication Hubs

Tools like Slack and Microsoft Teams have become the new office hallways.

## Project Management

Jira, Asana, and Trello help teams stay organized and on track, no matter where they are.

## Video Conferencing

Zoom and Google Meet are essential for face-to-face interaction.
    `,
  },
  {
    slug: 'mastering-digital-marketing-in-2024',
    title: 'Mastering Digital Marketing in 2024',
    date: '2024-07-10',
    category: 'Marketing',
    author: 'John Smith',
    imageUrl: 'https://picsum.photos/seed/2/600/400',
    summary:
      'Stay ahead of the curve with these essential digital marketing strategies for 2024.',
    content: `
# Mastering Digital Marketing in 2024

Digital marketing is always evolving. Here's what you need to know to succeed in 2024.

## AI in Marketing

Artificial intelligence is personalizing marketing campaigns like never before.

## Video Content is King

Short-form video on platforms like TikTok and Instagram Reels is essential for engagement.

## Privacy-First Marketing

With changing privacy laws, building trust with your audience is key.
    `,
  },
  {
    slug: 'the-rise-of-ai-in-business-automation',
    title: 'The Rise of AI in Business Automation',
    date: '2024-07-05',
    category: 'Business',
    author: 'Emily Davis',
    imageUrl: 'https://picsum.photos/seed/3/600/400',
    summary: 'Discover how AI is revolutionizing business automation and what it means for your company.',
    content: `
# The Rise of AI in Business Automation

AI is no longer science fiction; it's a business reality.

## What is AI Automation?

It's the use of AI to automate repetitive tasks, freeing up humans for more creative work.

## Examples in Action

- Customer service chatbots
- Automated financial reporting
- AI-powered supply chain optimization

## Getting Started

Start small. Identify a bottleneck in your business and see if an AI tool can help.
    `,
  },
  {
    slug: 'building-a-successful-startup-key-strategies',
    title: 'Building a Successful Startup: Key Strategies',
    date: '2024-06-30',
    category: 'Business',
    author: 'David Lee',
    imageUrl: 'https://picsum.photos/seed/4/600/400',
    summary: 'From idea to execution, these are the key strategies for building a startup that lasts.',
    content: `
# Building a Successful Startup: Key Strategies

Got a great idea? Here's how to turn it into a successful business.

## 1. Validate Your Idea

Before you build anything, make sure there's a market for it.

## 2. Build a Strong Team

Your first hires are the most important.

## 3. Focus on a Niche

Don't try to be everything to everyone. Solve a specific problem for a specific audience.

## 4. Iterate, Iterate, Iterate

Launch, get feedback, and improve. Repeat.
    `,
  },
  {
    slug: 'data-analytics-for-business-growth',
    title: 'Data Analytics for Business Growth',
    date: '2024-06-25',
    category: 'Technology',
    author: 'Jessica Brown',
    imageUrl: 'https://picsum.photos/seed/5/600/400',
    summary: "Unlock the power of your data to drive business growth and make smarter decisions.",
    content: `
# Data Analytics for Business Growth

Data is one of your most valuable assets. Here's how to use it.

## What to Track?

- Customer behavior
- Sales trends
- Website traffic

## Tools of the Trade

- Google Analytics
- Tableau
- Mixpanel

## Making Data-Driven Decisions

Use your data to inform everything from product development to marketing campaigns.
    `,
  },
  {
    slug: 'cybersecurity-best-practices-for-small-businesses',
    title: 'Cybersecurity Best Practices for Small Businesses',
    date: '2024-06-20',
    category: 'Technology',
    author: 'Robert Green',
    imageUrl: 'https://picsum.photos/seed/6/600/400',
    summary: 'Protect your business from cyber threats with these essential security practices.',
    content: `
# Cybersecurity Best Practices for Small Businesses

Don't let your small business be an easy target.

## 1. Train Your Employees

Your team is your first line of defense.

## 2. Use Strong Passwords & 2FA

A simple but effective measure.

## 3. Keep Software Updated

Patch vulnerabilities before they can be exploited.

## 4. Back Up Your Data

Be prepared for the worst.
    `,
  },
];

export function getAllPosts(): Post[] {
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}
