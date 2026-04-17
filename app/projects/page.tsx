import { Metadata } from 'next'
import { SITE_URL } from '@/content/site-config'
import ProjectsPageContent from './projects-content'

export const metadata: Metadata = {
  title: 'All Projects | Web, Mobile & AI Development | Young Solver',
  description: 'Discover our complete portfolio of 6+ web, mobile, and AI projects. From e-commerce platforms to intelligent assistants, explore how we build scalable digital solutions.',
  keywords: 'projects portfolio, web development, mobile apps, AI solutions, software development cases',
  alternates: {
    canonical: `${SITE_URL}/projects`,
  },
  openGraph: {
    title: 'All Projects | Young Solver',
    description: 'Explore our portfolio of web, mobile, and AI projects built for clients worldwide',
    url: `${SITE_URL}/projects`,
    type: 'website',
  },
}

export default function ProjectsPage() {
  return <ProjectsPageContent />
}
