
'use server';
/**
 * @fileOverview An AI agent for generating daily motivational quotes for a sales team.
 *
 * - getDailyMotivation - A function that returns a motivational quote.
 * - GetDailyMotivationOutput - The return type for the getDailyMotivation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetDailyMotivationInputSchema = z.object({
  seed: z.string().describe('A random seed to ensure a unique quote is generated.'),
});

const GetDailyMotivationOutputSchema = z.object({
  quote: z.string().describe('A short, powerful motivational quote for a sales team.'),
  author: z.string().describe('The person who said the quote. If unknown, use "Anonymous".'),
});
export type GetDailyMotivationOutput = z.infer<typeof GetDailyMotivationOutputSchema>;

const prompt = ai.definePrompt({
  name: 'getDailyMotivationPrompt',
  input: {schema: GetDailyMotivationInputSchema},
  output: {schema: GetDailyMotivationOutputSchema},
  prompt: `You are a motivational coach for the sales team at "3D Creations Private Limited". Your team sells high-end 3D lenticular prints and custom corporate gifts.

Generate a short, punchy, and inspiring motivational quote to kickstart their day. The quote should be relevant to sales, ambition, or creativity.

IMPORTANT: Do NOT use a common or cliché quote. It must be unique and surprising. Use the random seed to ensure you generate a different quote every single time.

Random Seed: {{{seed}}}
`,
});

export async function getDailyMotivation(): Promise<GetDailyMotivationOutput> {
  const {output} = await prompt({seed: new Date().toISOString()});
  return output!;
}
