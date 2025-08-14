
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
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';


const companyResearchTool = ai.defineTool(
  {
    name: 'companyResearch',
    description: 'Performs a web search to find information about a specific company. Use this for questions about leads, potential customers, or any company-related query that is not in the local database.',
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

const getLeadInfoTool = ai.defineTool(
  {
    name: 'getLeadInfo',
    description: "Retrieves information about a specific lead from the company's database of inquiries. Use this when asked a question about a lead's name, their company, or their product interest.",
    inputSchema: z.object({
      name: z.string().describe("The name of the lead or their company to look up in the database."),
    }),
    outputSchema: z.string(),
  },
  async (input) => {
    const inquiriesRef = collection(db, 'inquiries');
    const nameQuery = query(inquiriesRef, where('name', '==', input.name), limit(5));
    const companyQuery = query(inquiriesRef, where('company', '==', input.name), limit(5));

    const [nameSnapshot, companySnapshot] = await Promise.all([
      getDocs(nameQuery),
      getDocs(companyQuery)
    ]);

    const results = new Map();
    nameSnapshot.forEach(doc => results.set(doc.id, doc.data()));
    companySnapshot.forEach(doc => results.set(doc.id, doc.data()));

    if (results.size === 0) {
      return `No lead found with the name or company '${input.name}'. You can try using the companyResearchTool to search the web.`;
    }

    const leadData = Array.from(results.values()).map(lead => ({
      name: lead.name,
      company: lead.company,
      productInterest: lead.productInterest,
      message: lead.message,
      status: lead.status,
      assignedTo: lead.assignedTo
    }));
    
    return JSON.stringify(leadData);
  }
);


const SalesChatbotInputSchema = z.object({
  history: z.array(ai.historySchema).optional(),
  prompt: z.string(),
});
export type SalesChatbotInput = z.infer<typeof SalesChatbotInputSchema>;

const SalesChatbotOutputSchema = z.string();
export type SalesChatbotOutput = z.infer<typeof SalesChatbotOutputSchema>;

const salesChatbotFlow = ai.defineFlow({
    name: 'salesChatbotFlow',
    inputSchema: SalesChatbotInputSchema,
    outputSchema: SalesChatbotOutputSchema,
  },
  async (input) => {
    const availableTools = [companyResearchTool, getLeadInfoTool];
    const llmResponse = await ai.generate({
        prompt: input.prompt,
        history: input.history,
        tools: availableTools,
        system: `You are an expert AI assistant for the sales team at "3D Creations Private Limited", a company specializing in 3D lenticular printing and custom corporate gifts.

Your role is to provide quick, accurate, and helpful information to the sales team.

You have two primary tools:
1. getLeadInfo: Use this tool to retrieve information about specific leads from the internal database. This should be your first choice for questions about existing leads (e.g., "What is Priya Singh interested in?", "Tell me about Acme Corp").
2. companyResearch: Use this tool to perform a web search for general information about companies that might not be in the lead database.

Be friendly, professional, and concise in your answers.`
    });
    
    if (llmResponse.toolRequests.length > 0) {
        const toolResponse = await llmResponse.callTools();
        const finalResponse = await ai.generate({
            prompt: input.prompt,
            history: [...(input.history || []), ...llmResponse.history, ...toolResponse],
            tools: availableTools
        });
        return finalResponse.text;
    }

    return llmResponse.text;
});

export async function salesChatbot(
  input: SalesChatbotInput
): Promise<SalesChatbotOutput> {
    return await salesChatbotFlow(input);
}
