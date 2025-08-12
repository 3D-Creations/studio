import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { MessageSquare, Inbox, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { getDailyMotivation } from '@/ai/flows/get-daily-motivation'

export const metadata = {
  title: 'Admin Dashboard',
}

export default async function AdminDashboardPage() {
  const motivation = await getDailyMotivation();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to the 3D Creations Private Limited admin panel.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="hover:border-primary transition-colors">
          <Link href="/admin/inquiries" className="block h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                View Inquiries
              </CardTitle>
              <Inbox className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                See all submitted contact form inquiries here.
              </p>
            </CardContent>
          </Link>
        </Card>
        <Card className="hover:border-primary transition-colors">
          <Link href="/admin/sales-chatbot" className="block h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                AI Sales Chatbot
              </CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                Ask questions, get lead insights, and perform research.
              </p>
            </CardContent>
          </Link>
        </Card>
         <Card className="col-span-1 md:col-span-2 lg:col-span-1 bg-gradient-to-br from-primary/80 to-accent/80 text-primary-foreground border-none flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-primary-foreground/90">
              Daily Motivation
            </CardTitle>
            <Sparkles className="h-4 w-4 text-primary-foreground/90" />
          </CardHeader>
          <CardContent className="flex-grow flex flex-col justify-center">
            <blockquote className="text-lg font-semibold text-balance">
              "{motivation.quote}"
            </blockquote>
            <cite className="text-sm text-right block mt-2 text-primary-foreground/80">- {motivation.author}</cite>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
