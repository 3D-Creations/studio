import { SalesChatbotClient } from '@/components/sales-chatbot-client'
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header'
import { salesChatbot } from '@/ai/flows/sales-chatbot'

export const metadata = {
  title: 'AI Sales Chatbot',
}

export default function SalesChatbotPage() {
  return (
    <div>
      <PageHeader>
        <PageHeaderHeading>AI Sales Chatbot</PageHeaderHeading>
        <PageHeaderDescription>
          Your AI assistant for lead insights, research, and general sales questions.
        </PageHeaderDescription>
      </PageHeader>
      <SalesChatbotClient salesChatbot={salesChatbot} />
    </div>
  )
}
