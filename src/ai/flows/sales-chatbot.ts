
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
import { collection, query, where, getDocs, limit, orderBy } from 'firebase/firestore';
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
     const { text } = await ai.generate({
        system: `You are a web research agent. Your goal is to find information about the given company and provide a concise summary.`,
        prompt: `Research the company: ${input.companyName}`,
      });
      return text;
  }
);

const getLeadInfoTool = ai.defineTool(
  {
    name: 'getLeadInfo',
    description: "Retrieves information about leads from the company's database. If a name or company is provided, it searches for that specific lead. If no name is provided, it lists the 5 most recent leads. Use this for specific questions like 'Tell me about Acme Corp' or general questions like 'List down the recent leads'.",
    inputSchema: z.object({
      name: z.string().optional().describe("The name of the lead or their company to look up. If omitted, the 5 most recent leads will be returned."),
    }),
    outputSchema: z.string(),
  },
  async (input) => {
    const inquiriesRef = collection(db, 'inquiries');
    
    if (!input.name) {
        // If no name is provided, get the 5 most recent inquiries
        const recentLeadsQuery = query(inquiriesRef, orderBy('createdAt', 'desc'), limit(5));
        const snapshot = await getDocs(recentLeadsQuery);
         if (snapshot.empty) {
            return "There are no leads in the database.";
        }
        const leadData = snapshot.docs.map(doc => doc.data());
        return JSON.stringify(leadData);
    }

    // If a name is provided, search for it
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

const getLeadCountTool = ai.defineTool(
  {
    name: 'getLeadCountTool',
    description: "Counts the total number of leads in the company's database. Use this when asked about the total number of leads, inquiries, or contacts.",
    inputSchema: z.object({}),
    outputSchema: z.number(),
  },
  async () => {
    const inquiriesRef = collection(db, 'inquiries');
    const snapshot = await getDocs(inquiriesRef);
    return snapshot.size;
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
    const availableTools = [companyResearchTool, getLeadInfoTool, getLeadCountTool];
    const llmResponse = await ai.generate({
        prompt: input.prompt,
        history: input.history,
        tools: availableTools,
        system: `You are an expert AI assistant for the sales team at "3D Creations Private Limited". Your role is to provide quick, accurate, and helpful information to the sales team based on internal data.

## Company Information:
- **Company Name:** 3D Creations Private Limited
- **Specialization:** High-quality 3D lenticular printing, custom corporate gifts, and pharma-focused promotional items.
- **Core Values:** Uncompromising Quality, Client-Centric Approach, Continuous Innovation, Integrity and Transparency.
- **Contact:** 123 Innovation Drive, Mumbai, IN 400001 | contact@3dcreations.dev | +91 123 456 7890

## Product Categories:
1.  **3D Lenticular Prints:** Captivating prints with depth and motion. Includes posters, business cards, product labels, large format displays, bookmarks, greeting cards, stickers, and more.
2.  **Pharma & Corporate Gifts:** High-impact, memorable gifts. Includes 3D paperweights, anatomical models, custom pen stands, executive gift sets, and branded items like mugs and tech gadgets.
3.  **Customized Stationery:** Premium, fully customizable items. Includes diaries, notebooks, memo pads, letterheads, folders, planners, calendars, and pens.

## Pharma Specialization:
- We create compliant, high-quality promotional materials for the pharmaceutical industry.
- Our products serve as brand reinforcement (keeping brands top-of-mind), educational tools (visual aids, anatomical models), and are always compliance-focused.

## Your Tools:
You have three primary tools to answer questions:
1.  **getLeadInfo**: Use this FIRST for any questions about leads. If a specific person or company name is provided, it will find them. If not, it will list the 5 most recent leads. Examples: "Tell me about Acme Corp's inquiry", "What is Priya Singh interested in?", "List the latest leads".
2.  **getLeadCountTool**: Use this when asked for the total number of leads or inquiries. Example: "How many leads do we have?".
3.  **companyResearch**: Use this for general web searches about companies that are likely NOT in our lead database. Example: "Research a company called 'Solaris Inc.' that was mentioned in the news".

## Your Role:
- Answer questions from the sales team based on the company information provided above.
- Use your tools to find specific information about leads or external companies.
- Be friendly, professional, and concise in your answers.
- If you don't know the answer and can't find it with your tools, say so. Do not make up information.
`
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
