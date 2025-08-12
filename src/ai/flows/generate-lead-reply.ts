
'use server';
/**
 * @fileOverview An AI agent for generating personalized lead replies.
 *
 * - generateLeadReply - A function that researches a company and crafts a personalized email.
 * - GenerateLeadReplyInput - The input type for the generateLeadReply function.
 * - GenerateLeadReplyOutput - The return type for the generateLeadReply function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const GenerateLeadReplyInputSchema = z.object({
  leadName: z.string().describe('The name of the potential customer.'),
  companyName: z
    .string()
    .optional()
    .describe('The name of the company the lead works for.'),
  productInterest: z
    .string()
    .describe('The product or service the lead is interested in.'),
  message: z.string().describe("The lead's original message or inquiry."),
});
export type GenerateLeadReplyInput = z.infer<
  typeof GenerateLeadReplyInputSchema
>;

export const GenerateLeadReplyOutputSchema = z.object({
  companyResearch: z
    .string()
    .describe(
      'A brief summary of the company, its business, and potential needs related to our products. If no company name is provided, this should state that research could not be performed.'
    ),
  suggestedReply: z
    .string()
    .describe(
      'A professionally crafted, personalized email reply to the lead. It should acknowledge their message, reference the company research, highlight relevant offerings, and suggest a next step (e.g., a call).'
    ),
});
export type GenerateLeadReplyOutput = z.infer<
  typeof GenerateLeadReplyOutputSchema
>;

const prompt = ai.definePrompt({
  name: 'generateLeadReplyPrompt',
  input: {schema: GenerateLeadReplyInputSchema},
  output: {schema: GenerateLeadReplyOutputSchema},
  prompt: `You are an expert Sales Development Representative for "3D Creations Hub", a company specializing in 3D lenticular printing, custom corporate gifts, and pharma-focused promotional items.

Your task is to generate a personalized cold reply to a new lead.

1.  **Research the Lead's Company**: If a company name is provided, perform a quick search to understand what they do. Summarize your findings in the 'companyResearch' field. If no company name is given, state that research could not be performed.
2.  **Craft a Reply**: Write a personalized email in the 'suggestedReply' field.

**Lead Information:**
- Name: {{{leadName}}}
{{#if companyName}}- Company: {{{companyName}}}{{/if}}
- Interested In: {{{productInterest}}}
- Message: {{{message}}}

**Instructions for the Reply:**
- Address the lead by their name (Hi {{{leadName}}},).
- Acknowledge their specific interest ({{{productInterest}}}) and message.
- Briefly connect our services to their company's potential needs based on your research.
- Keep the tone professional, friendly, and helpful.
- End with a clear call to action, like scheduling a brief call.
- Sign off as "The Team at 3D Creations Hub".
`,
});

export async function generateLeadReply(
  input: GenerateLeadReplyInput
): Promise<GenerateLeadReplyOutput> {
  const {output} = await prompt(input);
  return output!;
}

const generateLeadReplyFlow = ai.defineFlow(
  {
    name: 'generateLeadReplyFlow',
    inputSchema: GenerateLeadReplyInputSchema,
    outputSchema: GenerateLeadReplyOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
