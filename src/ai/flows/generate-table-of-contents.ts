'use server';

/**
 * @fileOverview Generates a table of contents for a given blog post.
 *
 * - generateTableOfContents - A function that generates the table of contents.
 * - GenerateTableOfContentsInput - The input type for the generateTableOfContents function.
 * - GenerateTableOfContentsOutput - The return type for the generateTableOfContents function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTableOfContentsInputSchema = z.object({
  markdownContent: z
    .string()
    .describe('The markdown content of the blog post.'),
});
export type GenerateTableOfContentsInput = z.infer<
  typeof GenerateTableOfContentsInputSchema
>;

const GenerateTableOfContentsOutputSchema = z.object({
  tableOfContents: z
    .string()
    .describe('The generated table of contents in markdown format.'),
});
export type GenerateTableOfContentsOutput = z.infer<
  typeof GenerateTableOfContentsOutputSchema
>;

export async function generateTableOfContents(
  input: GenerateTableOfContentsInput
): Promise<GenerateTableOfContentsOutput> {
  return generateTableOfContentsFlow(input);
}

const generateTableOfContentsPrompt = ai.definePrompt({
  name: 'generateTableOfContentsPrompt',
  input: {schema: GenerateTableOfContentsInputSchema},
  output: {schema: GenerateTableOfContentsOutputSchema},
  prompt: `You are an expert at creating tables of contents for blog posts.

  Given the following markdown content, generate a table of contents that accurately reflects the structure and content of the post.

  Markdown Content:
  {{{markdownContent}}}

  Ensure the table of contents is well-formatted and easy to navigate. Use markdown format for the table of contents.
  `,
});

const generateTableOfContentsFlow = ai.defineFlow(
  {
    name: 'generateTableOfContentsFlow',
    inputSchema: GenerateTableOfContentsInputSchema,
    outputSchema: GenerateTableOfContentsOutputSchema,
  },
  async input => {
    const {output} = await generateTableOfContentsPrompt(input);
    return output!;
  }
);
