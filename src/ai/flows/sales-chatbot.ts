
'use server';
/**
 * @fileOverview An AI Sales Chatbot for the 3D Creations Private Limited sales team.
 *
 * - salesChatbot - A function that handles conversational chat, with memory and research tools.
 * - SalesChatbotInput - The input type for the salesChatbot function.
 * - SalesChatbotOutput - The return type for the salesChatbot function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

const companyResearchTool = ai.defineTool(
  {
    name: 'companyResearch',
    description: 'Performs a web search to find information about a specific company. Use this for questions about leads, potential customers, or any company-related query.',
    inputSchema: z.object({
      companyName: z.string().describe('The name of the company to research.'),
    }),
    outputSchema: z.string(),
  },
  async (input) => {
    const { output } = await googleAI.search(input.companyName);
    return JSON.stringify(output);
  }
);

export const SalesChatbotInputSchema = z.object({
  history: z.array(z.any()),
  prompt: z.string(),
});
export type SalesChatbotInput = z.infer<typeof SalesChatbotInputSchema>;

export const SalesChatbotOutputSchema = z.string();
export type SalesChatbotOutput = z.infer<typeof SalesChatbotOutputSchema>;

const prompt = ai.definePrompt({
    name: 'salesChatbotPrompt',
    input: {schema: SalesChatbotInputSchema},
    output: {schema: SalesChatbotOutputSchema},
    tools: [companyResearchTool],
    prompt: `You are an expert AI assistant for the sales team at "3D Creations Private Limited", a company specializing in 3D lenticular printing and custom corporate gifts.

Your role is to provide quick, accurate, and helpful information to the sales team. You can answer general questions, provide insights on leads, and perform deep research on companies using your available tools.

Be friendly, professional, and concise in your answers.
`,
});

export async function salesChatbot(
  input: SalesChatbotInput
): Promise<SalesChatbotOutput> {
    const llmResponse = await prompt(input);
    return llmResponse.output!;
}
