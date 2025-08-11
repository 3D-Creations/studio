'use server';

/**
 * @fileOverview An SEO optimization suggestion AI agent.
 *
 * - seoOptimizationSuggestions - A function that suggests relevant keywords for SEO optimization.
 * - SEOOptimizationSuggestionsInput - The input type for the seoOptimizationSuggestions function.
 * - SEOOptimizationSuggestionsOutput - The return type for the seoOptimizationSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SEOOptimizationSuggestionsInputSchema = z.object({
  text: z
    .string()
    .describe(
      'The text content for which SEO keywords are to be suggested, such as product descriptions, portfolio item descriptions, or blog posts.'
    ),
});
export type SEOOptimizationSuggestionsInput = z.infer<typeof SEOOptimizationSuggestionsInputSchema>;

const SEOOptimizationSuggestionsOutputSchema = z.object({
  keywords: z
    .array(z.string())
    .describe(
      'An array of relevant keywords to enhance SEO optimization for the given text content.'
    ),
  description: z
    .string()
    .describe(
      'A short SEO-optimized description of the content incorporating some of the suggested keywords.'
    ),
});
export type SEOOptimizationSuggestionsOutput = z.infer<typeof SEOOptimizationSuggestionsOutputSchema>;

export async function seoOptimizationSuggestions(
  input: SEOOptimizationSuggestionsInput
): Promise<SEOOptimizationSuggestionsOutput> {
  return seoOptimizationSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'seoOptimizationSuggestionsPrompt',
  input: {schema: SEOOptimizationSuggestionsInputSchema},
  output: {schema: SEOOptimizationSuggestionsOutputSchema},
  prompt: `You are an SEO expert. Given the following text content, suggest relevant keywords to enhance SEO optimization and write a short SEO-optimized description.

Text Content: {{{text}}}

Keywords (comma separated):
Description:`, // Make sure the description field incorporates some of the generated keywords.
});

const seoOptimizationSuggestionsFlow = ai.defineFlow(
  {
    name: 'seoOptimizationSuggestionsFlow',
    inputSchema: SEOOptimizationSuggestionsInputSchema,
    outputSchema: SEOOptimizationSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
