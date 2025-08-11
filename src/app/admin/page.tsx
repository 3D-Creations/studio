import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Rocket } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Admin Dashboard',
}

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to the 3D Creations Hub admin panel.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="hover:border-primary transition-colors">
          <Link href="/admin/seo-optimizer" className="block">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                SEO Optimizer
              </CardTitle>
              <Rocket className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-headline">AI-Powered</div>
              <p className="text-xs text-muted-foreground">
                Generate SEO keywords and descriptions for your content.
              </p>
            </CardContent>
          </Link>
        </Card>
      </div>
    </div>
  )
}
