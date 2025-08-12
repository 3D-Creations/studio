"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useEffect, useState } from 'react'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  company: string;
  productInterest: string;
  message: string;
  date: string;
  status: string;
}

interface InquiriesClientProps {
  initialInquiries: Inquiry[];
}

export function InquiriesClient({ initialInquiries }: InquiriesClientProps) {
  const [inquiries, setInquiries] = useState<Inquiry[]>(initialInquiries);

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
          date: data.createdAt?.toDate()?.toLocaleDateString('en-US') || new Date().toLocaleDateString('en-US'),
          status: data.status,
        }
      });
      setInquiries(newInquiries);
    });

    return () => unsubscribe();
  }, []);

  return (
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
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead className="hidden md:table-cell">Status</TableHead>
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
                  <div className="font-medium">{inquiry.productInterest}</div>
                   <div className="text-sm text-muted-foreground line-clamp-2">{inquiry.message}</div>
                </TableCell>
                <TableCell className="hidden md:table-cell">{inquiry.date}</TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge variant={inquiry.status === 'New' ? 'default' : 'secondary'}>
                    {inquiry.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
