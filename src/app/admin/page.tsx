import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { MessageSquare, Inbox, Sparkles, Target, Activity, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { getDailyMotivation } from '@/ai/flows/get-daily-motivation'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export const metadata = {
  title: 'Admin Dashboard',
}

async function getInquiryStats() {
    try {
        const inquiriesCollection = collection(db, 'inquiries');
        
        const totalSnapshot = await getDocs(inquiriesCollection);
        const totalInquiries = totalSnapshot.size;

        const newQuery = query(inquiriesCollection, where('status', '==', 'New'));
        const newSnapshot = await getDocs(newQuery);
        const newInquiries = newSnapshot.size;

        const inProgressQuery = query(inquiriesCollection, where('status', '==', 'In Progress'));
        const inProgressSnapshot = await getDocs(inProgressQuery);
        const inProgressInquiries = inProgressSnapshot.size;

        return { totalInquiries, newInquiries, inProgressInquiries };
    } catch (error) {
        console.error("Error fetching inquiry stats:", error);
        return { totalInquiries: 0, newInquiries: 0, inProgressInquiries: 0 };
    }
}


export default async function AdminDashboardPage() {
  const motivation = await getDailyMotivation();
  const { totalInquiries, newInquiries, inProgressInquiries } = await getInquiryStats();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome! Here's a snapshot of your sales activity.
        </p>
      </div>

       <Card className="col-span-1 md:col-span-2 lg:col-span-3 bg-gradient-to-br from-primary/80 to-accent/80 text-primary-foreground border-none flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-primary-foreground/90">
            Daily Motivation
          </CardTitle>
          <Sparkles className="h-4 w-4 text-primary-foreground/90" />
        </CardHeader>
        <CardContent className="flex-grow flex flex-col justify-center">
          <blockquote className="text-lg font-semibold text-balance text-center">
            "{motivation.quote}"
          </blockquote>
          <cite className="text-sm text-right block mt-2 text-primary-foreground/80">- {motivation.author}</cite>
        </CardContent>
      </Card>
      
      <div>
        <h2 className="text-2xl font-bold font-headline mb-4">Inquiry Stats</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Inquiries</CardTitle>
                    <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{totalInquiries}</div>
                    <p className="text-xs text-muted-foreground">All-time received inquiries</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">New Inquiries</CardTitle>
                    <Inbox className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{newInquiries}</div>
                    <p className="text-xs text-muted-foreground">Leads awaiting first contact</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">In Progress</CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{inProgressInquiries}</div>
                    <p className="text-xs text-muted-foreground">Leads currently being nurtured</p>
                </CardContent>
            </Card>
        </div>
      </div>

       <div>
        <h2 className="text-2xl font-bold font-headline mb-4">Tools</h2>
         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="hover:border-primary transition-colors">
            <Link href="/admin/inquiries" className="block h-full">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    Manage Inquiries
                </CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                <p className="text-xs text-muted-foreground">
                    View, assign, and respond to all leads.
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
        </div>
      </div>

    </div>
  )
}
