/**
 * @fileOverview A flow for generating a table of contents from a blog post.
 * - generateTableOfContents - A function that generates a ToC for a blog post.
 * - GenerateTableOfContentsInput - The input type for the generateTableOfContents function.
 * - GenerateTableOfContentsOutput - The return type for the generateTableOfContents function.
 */

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const GenerateTableOfContentsInputSchema = z.object({
  postContent: z.string().describe('The full content of the blog post in Markdown format.'),
});
export type GenerateTableOfContentsInput = z.infer<typeof GenerateTableOfContentsInputSchema>;

const GenerateTableOfContentsOutputSchema = z.object({
  toc: z.array(z.object({
    level: z.number().describe('The heading level (e.g., 1 for #, 2 for ##).'),
    text: z.string().describe('The text content of the heading.'),
  })).describe('An array of table of contents items.'),
});
export type GenerateTableOfContentsOutput = z.infer<typeof GenerateTableOfContentsOutputSchema>;

export async function generateTableOfContents(input: GenerateTableOfContentsInput): Promise<GenerateTableOfContentsOutput> {
  return generateTableOfContentsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTableOfContentsPrompt',
  input: {schema: GenerateTableOfContentsInputSchema},
  output: {schema: GenerateTableOfContentsOutputSchema},
  prompt: `
You are an expert at analyzing text and creating a structured table of contents.
Analyze the following blog post content, which is in Markdown format.
Extract all headings (lines starting with #, ##, ###, etc.).
Create a JSON array representing the table of contents.
Each item in the array should be an object with a "level" (integer) and a "text" (string).
Only include headings up to level 3 (###). Do not include the '#' characters in the output text.

Blog Post Content:
---
{{{postContent}}}
---
`,
});

const generateTableOfContentsFlow = ai.defineFlow(
  {
    name: 'generateTableOfContentsFlow',
    inputSchema: GenerateTableOfContentsInputSchema,
    outputSchema: GenerateTableOfContentsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
