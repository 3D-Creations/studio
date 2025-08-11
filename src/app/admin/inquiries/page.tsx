import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header'
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

export const metadata = {
  title: 'Inquiries',
}

// Mock data - replace with actual data from your database
const mockInquiries = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    company: 'Example Inc.',
    productInterest: 'Lenticular Posters',
    message: 'Interested in a bulk order of custom lenticular posters. Please provide a quote for 1000 units.',
    date: '2024-08-15',
    status: 'New',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@email.com',
    company: 'PharmaCorp',
    productInterest: 'Pharma Gifts',
    message: 'We are looking for unique gifting options for an upcoming conference. Our budget is $50 per unit for 500 attendees.',
    date: '2024-08-14',
    status: 'Contacted',
  },
  {
    id: '3',
    name: 'Peter Jones',
    email: 'peter.jones@startup.io',
    company: '',
    productInterest: 'Custom Stationery',
    message: 'Need 200 branded notebooks and pens for our new employees. What are the customization options?',
    date: '2024-08-12',
    status: 'Resolved',
  },
   {
    id: '4',
    name: 'Samantha Lee',
    email: 'samantha.lee@creative.agency',
    company: 'Creative Solutions',
    productInterest: '3D Paperweights',
    message: 'Following up on our call. Please send the design mockups for the crystal paperweights we discussed.',
    date: '2024-08-11',
    status: 'New',
  },
]

export default function InquiriesPage() {
  return (
    <div>
      <PageHeader>
        <PageHeaderHeading>Contact Form Inquiries</PageHeaderHeading>
        <PageHeaderDescription>
          View and manage all inquiries submitted through your website's contact form.
        </PageHeaderDescription>
      </PageHeader>
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
              {mockInquiries.map((inquiry) => (
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
    </div>
  )
}
