
"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useEffect, useState } from 'react'
import { collection, onSnapshot, query, orderBy, doc, updateDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Clipboard, ExternalLink, Bot, Loader2, Eye } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from '@/hooks/use-toast'
import type { GenerateLeadReplyInput, GenerateLeadReplyOutput } from '@/ai/flows/generate-lead-reply'

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  company: string;
  productInterest: string;
  message: string;
  date: string;
  status: 'New' | 'In Progress' | 'Contacted' | 'Closed';
  assignedTo?: string;
}

const teamMembers = ['Aarav Sharma', 'Priya Singh', 'Rohan Mehta', 'Anika Gupta'];
const statuses: Inquiry['status'][] = ['New', 'In Progress', 'Contacted', 'Closed'];

interface InquiriesClientProps {
  initialInquiries: Inquiry[];
  generateLeadReply: (input: GenerateLeadReplyInput) => Promise<GenerateLeadReplyOutput>;
}

export function InquiriesClient({ initialInquiries, generateLeadReply }: InquiriesClientProps) {
  const [inquiries, setInquiries] = useState<Inquiry[]>(initialInquiries);
  const [aiReply, setAiReply] = useState<GenerateLeadReplyOutput | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const inquiriesCollection = collection(db, 'inquiries');
    const q = query(inquiriesCollection, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newInquiries: Inquiry[] = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          email: data.email,
          company: data.company || '',
          productInterest: data.productInterest,
          message: data.message,
          date: data.createdAt?.toDate()?.toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }) || new Date().toLocaleString('en-US'),
          status: data.status || 'New',
          assignedTo: data.assignedTo || '',
        }
      });
      setInquiries(newInquiries);
    });

    return () => unsubscribe();
  }, []);
  
  const handleUpdate = async (id: string, field: 'status' | 'assignedTo', value: string) => {
    const inquiryRef = doc(db, 'inquiries', id);
    try {
      await updateDoc(inquiryRef, { [field]: value });
      toast({ title: 'Success', description: `Inquiry ${field} updated.` });
    } catch (error) {
      console.error("Error updating document: ", error);
      toast({ title: 'Error', description: 'Failed to update inquiry.', variant: 'destructive' });
    }
  };

  const handleGenerateReply = async (inquiry: Inquiry) => {
    setIsGenerating(true);
    setAiReply(null);
    try {
      const result = await generateLeadReply({
        leadName: inquiry.name,
        companyName: inquiry.company,
        productInterest: inquiry.productInterest,
        message: inquiry.message,
      });
      setAiReply(result);
    } catch (error) {
      console.error("Error generating reply:", error);
      toast({ title: 'AI Error', description: 'Failed to generate AI reply.', variant: 'destructive' });
    } finally {
      setIsGenerating(false);
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: 'Copied!', description: 'AI reply copied to clipboard.' });
  }

  return (
    <>
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>All Inquiries</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Contact</TableHead>
              <TableHead>Interest</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inquiries.map((inquiry) => (
              <TableRow key={inquiry.id}>
                <TableCell>
                  <div className="font-medium">{inquiry.name}</div>
                  <div className="text-sm text-muted-foreground">{inquiry.email}</div>
                   {inquiry.company && <div className="text-sm text-muted-foreground">{inquiry.company}</div>}
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="cursor-pointer">
                        <div className="font-medium hover:underline">{inquiry.productInterest}</div>
                        <div className="text-sm text-muted-foreground line-clamp-2">{inquiry.message}</div>
                      </div>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{inquiry.productInterest}</DialogTitle>
                        <DialogDescription>
                          Full inquiry from {inquiry.name}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 pt-4">
                        <div>
                          <h4 className="font-semibold text-foreground mb-1">Message</h4>
                          <p className="text-sm text-muted-foreground bg-secondary/50 p-3 rounded-md whitespace-pre-wrap">{inquiry.message}</p>
                        </div>
                         <div>
                          <h4 className="font-semibold text-foreground mb-1">Contact Details</h4>
                          <ul className="text-sm text-muted-foreground list-disc list-inside bg-secondary/50 p-3 rounded-md">
                            <li><strong>Name:</strong> {inquiry.name}</li>
                            <li><strong>Email:</strong> {inquiry.email}</li>
                            {inquiry.company && <li><strong>Company:</strong> {inquiry.company}</li>}
                          </ul>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
                <TableCell>{inquiry.date}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="w-32 justify-between">
                        {inquiry.status} <ExternalLink className="h-3 w-3 ml-2" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {statuses.map(status => (
                         <DropdownMenuItem key={status} onSelect={() => handleUpdate(inquiry.id, 'status', status)}>
                          {status}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="w-40 justify-between">
                        {inquiry.assignedTo || 'Unassigned'} <ExternalLink className="h-3 w-3 ml-2" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                       <DropdownMenuItem onSelect={() => handleUpdate(inquiry.id, 'assignedTo', '')}>
                          Unassigned
                        </DropdownMenuItem>
                      {teamMembers.map(member => (
                         <DropdownMenuItem key={member} onSelect={() => handleUpdate(inquiry.id, 'assignedTo', member)}>
                          {member}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
                <TableCell className="text-right">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="sm" onClick={() => handleGenerateReply(inquiry)}>
                        <Bot className="mr-2 h-4 w-4" />
                        Generate Reply
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="max-w-2xl">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2">
                          <Bot className="h-6 w-6 text-primary" />
                          AI-Generated Lead Response
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          For {inquiry.name} from {inquiry.company || 'their company'}. Review, edit, and send.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      {isGenerating ? (
                        <div className="py-16 flex justify-center items-center gap-2 text-muted-foreground">
                          <Loader2 className="h-6 w-6 animate-spin" />
                          <span>Generating response...</span>
                        </div>
                      ) : aiReply ? (
                        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-4">
                           <div>
                            <h4 className="font-semibold text-foreground">Company Research</h4>
                            <p className="text-sm text-muted-foreground bg-secondary/50 p-3 rounded-md">{aiReply.companyResearch}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground">Suggested Email Reply</h4>
                            <div className="text-sm text-muted-foreground bg-secondary/50 p-3 rounded-md relative group">
                                <Button size="icon" variant="ghost" className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => copyToClipboard(aiReply.suggestedReply)}>
                                  <Clipboard className="h-4 w-4" />
                                </Button>
                                <p className="whitespace-pre-wrap">{aiReply.suggestedReply}</p>
                            </div>
                          </div>
                        </div>
                      ) : (
                         <div className="py-16 flex justify-center items-center gap-2 text-muted-foreground">
                          Click generate to see the AI reply.
                        </div>
                      )}
                      <AlertDialogFooter>
                        <AlertDialogCancel>Close</AlertDialogCancel>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
    </>
  )
}
