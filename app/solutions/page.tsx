import { Metadata } from 'next'
import { SITE_URL } from '@/content/site-config'
import SolutionsPageContent from './solutions-content'

export const metadata: Metadata = {
  title: 'Our SaaS Solutions | Workflow, Operations & AI | Young Solver',
  description: 'Explore our powerful SaaS products: SolverFlow for workflow automation, NovaOps for monitoring, and Atelier AI for content creation. Built to scale.',
  keywords: 'SaaS products, workflow automation, cloud operations, AI content, productivity tools',
  alternates: {
    canonical: `${SITE_URL}/solutions`,
  },
  openGraph: {
    title: 'Our SaaS Solutions | Young Solver',
    description: 'Discover our suite of SaaS products for workflow automation, cloud operations, and AI-powered content creation',
    url: `${SITE_URL}/solutions`,
    type: 'website',
  },
}

export default function SolutionsPage() {
  return <SolutionsPageContent />
}
