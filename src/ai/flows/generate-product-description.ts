
'use server';
/**
 * @fileOverview An AI agent for generating product descriptions.
 *
 * - generateProductDescription - A function that generates a product description.
 * - GenerateProductDescriptionInput - The input type for the generateProductDescription function.
 * - GenerateProductDescriptionOutput - The return type for the generateProductDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProductDescriptionInputSchema = z.object({
  productName: z.string().describe('The name of the product.'),
  categoryName: z
    .string()
    .describe('The name of the category the product belongs to.'),
});
export type GenerateProductDescriptionInput = z.infer<
  typeof GenerateProductDescriptionInputSchema
>;

const GenerateProductDescriptionOutputSchema = z.object({
  description: z
    .string()
    .describe(
      'A compelling, professional, and SEO-friendly product description.'
    ),
});
export type GenerateProductDescriptionOutput = z.infer<
  typeof GenerateProductDescriptionOutputSchema
>;

const prompt = ai.definePrompt({
  name: 'generateProductDescriptionPrompt',
  input: {schema: GenerateProductDescriptionInputSchema},
  output: {schema: GenerateProductDescriptionOutputSchema},
  prompt: `You are a marketing expert for "3D Creations Private Limited", a company specializing in 3D lenticular printing, custom corporate gifts, and pharma-focused promotional items.

Your task is to write a compelling product description.

**Product Information:**
- Product Name: {{{productName}}}
- Category: {{{categoryName}}}

**Instructions for the Description:**
- Write a product description that is engaging, professional, and around 2-3 sentences long.
- Highlight the key features and benefits of the product.
- Keep the tone aligned with a premium, innovative brand.
- Ensure the description is suitable for a product page on a website.
- Do not use markdown or special formatting. Just provide the plain text for the description.
`,
});

export async function generateProductDescription(
  input: GenerateProductDescriptionInput
): Promise<GenerateProductDescriptionOutput> {
  const {output} = await prompt(input);
  return output!;
}
