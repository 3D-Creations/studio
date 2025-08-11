import { SeoOptimizerClient } from '@/components/seo-optimizer-client'
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header'

export const metadata = {
  title: 'SEO Optimizer',
}

export default function SeoOptimizerPage() {
  return (
    <div>
      <PageHeader>
        <PageHeaderHeading>SEO Optimization Suggestions</PageHeaderHeading>
        <PageHeaderDescription>
          Use our AI-powered tool to generate relevant keywords and descriptions
          for your products, portfolio items, or blog posts to improve search
          engine rankings.
        </PageHeaderDescription>
      </PageHeader>
      <SeoOptimizerClient />
    </div>
  )
}
