
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header'
import { InquiriesClient } from './inquiries-client'
import { db } from '@/lib/firebase'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import type { Inquiry } from './inquiries-client'
import { generateLeadReply } from '@/ai/flows/generate-lead-reply'

export const metadata = {
  title: 'Inquiries',
}

async function getInquiries() {
    const inquiriesCollection = collection(db, 'inquiries');
    const q = query(inquiriesCollection, orderBy('createdAt', 'desc'));
    const inquirySnapshot = await getDocs(q);
    const inquiries: Inquiry[] = inquirySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        email: data.email,
        company: data.company || '',
        productInterest: data.productInterest,
        message: data.message,
        // Convert Firestore Timestamp to a serializable format (ISO string)
        date: data.createdAt?.toDate()?.toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }) || new Date().toLocaleString('en-US'),
        status: data.status,
        assignedTo: data.assignedTo || '',
      }
    });
    return inquiries;
}

export default async function InquiriesPage() {
  const inquiries = await getInquiries();
  
  return (
    <div>
      <PageHeader>
        <PageHeaderHeading>Contact Form Inquiries</PageHeaderHeading>
        <PageHeaderDescription>
          View and manage all inquiries submitted through your website's contact form.
        </PageHeaderDescription>
      </PageHeader>
      <InquiriesClient initialInquiries={inquiries} generateLeadReply={generateLeadReply} />
    </div>
  )
}
