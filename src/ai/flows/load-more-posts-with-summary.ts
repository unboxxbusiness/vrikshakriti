'use server';
/**
 * @fileOverview Implements the LoadMorePostsWithSummary flow, which retrieves
 * additional blog posts and generates a brief AI summary for each.
 *
 * - loadMorePostsWithSummary - Retrieves additional blog posts and AI summaries.
 * - LoadMorePostsWithSummaryInput - The input type for the loadMorePostsWithSummary function.
 * - LoadMorePostsWithSummaryOutput - The return type for the loadMorePostsWithSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const LoadMorePostsWithSummaryInputSchema = z.object({
  postCount: z
    .number()
    .describe('The number of posts to load.'),
  existingPosts: z.array(
    z.object({
      title: z.string(),
      content: z.string(),
    })
  ).optional().describe('List of existing post titles and contents'),
});
export type LoadMorePostsWithSummaryInput = z.infer<
  typeof LoadMorePostsWithSummaryInputSchema
>;

const LoadMorePostsWithSummaryOutputSchema = z.object({
  posts: z.array(
    z.object({
      title: z.string(),
      content: z.string(),
      summary: z.string(),
    })
  ),
});
export type LoadMorePostsWithSummaryOutput = z.infer<
  typeof LoadMorePostsWithSummaryOutputSchema
>;

export async function loadMorePostsWithSummary(
  input: LoadMorePostsWithSummaryInput
): Promise<LoadMorePostsWithSummaryOutput> {
  return loadMorePostsWithSummaryFlow(input);
}

const summarizePost = ai.defineTool({
  name: 'summarizePost',
  description: 'Generates a concise summary of a blog post.',
  inputSchema: z.object({
    title: z.string().describe('The title of the blog post.'),
    content: z.string().describe('The full content of the blog post.'),
  }),
  outputSchema: z.string().describe('A brief summary of the blog post.'),
},
async (input) => {
  const { title, content } = input;
  const {text} = await ai.generate({
    prompt: `Summarize the following blog post:\nTitle: ${title}\nContent: ${content}`,
  });
  return text!;
});

const loadMorePostsPrompt = ai.definePrompt({
  name: 'loadMorePostsPrompt',
  tools: [summarizePost],
  input: {
    schema: LoadMorePostsWithSummaryInputSchema,
  },
  prompt: `You are a blog content generator. Generate {{{postCount}}} new blog posts.
      The title should be creative and engaging. The content should be well-written and informative.
      Include a summary for each post using the summarizePost tool.

      Posts should be unique from the following existing posts:
      {{#each existingPosts}}
        Title: {{{this.title}}}
        Content: {{{this.content}}}
      {{/each}}
      `,
});

const loadMorePostsWithSummaryFlow = ai.defineFlow(
  {
    name: 'loadMorePostsWithSummaryFlow',
    inputSchema: LoadMorePostsWithSummaryInputSchema,
    outputSchema: LoadMorePostsWithSummaryOutputSchema,
  },
  async input => {
    const {existingPosts} = input;
    const loadMorePostsResult = await loadMorePostsPrompt({
      ...input,
      existingPosts: existingPosts ? existingPosts : [],
    });
    // @ts-ignore
    const posts = loadMorePostsResult.actions?.map(action => ({
      title: action.toolInput.title,
      content: action.toolInput.content,
      summary: action.result,
    })) || [];

    return { posts };
  }
);
