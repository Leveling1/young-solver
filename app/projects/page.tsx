'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { GlassCard } from '@/components/ui/glass-card'
import { FEATURED_PROJECTS } from '@/content/site'
import { ProjectsStructuredData } from '@/components/seo/projects-structured-data'
import { useLanguage } from '@/providers/language-provider'

export default function ProjectsPage() {
  const { t } = useLanguage()
  return (
    <>
      <ProjectsStructuredData />
      <main className="min-h-screen bg-background pt-32 pb-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-16 text-center">
          <Link href="/">
            <Button variant="outline" size="sm" className="mb-8 glass">
              ← Back to Home
            </Button>
          </Link>
          <h1 className="mb-4 text-4xl font-bold text-foreground sm:text-5xl md:text-6xl">
            {t('projects.title.prefix')} <span className="text-primary">{t('projects.title.highlight')}</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {t('projects.description')}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {FEATURED_PROJECTS.map((project) => (
            <GlassCard key={project.key} className="group h-full overflow-hidden p-0 flex flex-col">
              {/* Image Container */}
              <div className="relative flex min-h-[280px] items-center justify-center overflow-hidden rounded-b-3xl" style={{ background: project.gradient }}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent_45%)]" />
                <Image
                  src={project.image}
                  alt={t(`projects.${project.key}.title`)}
                  width={280}
                  height={280}
                  className="relative z-10 h-48 w-48 rounded-2xl object-cover shadow-2xl transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 768px) 200px, 280px"
                />
              </div>

              {/* Content Container */}
              <div className="flex flex-1 flex-col p-6">
                {/* Title and Icon */}
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h3 className="text-xl font-semibold text-foreground">{t(`projects.${project.key}.title`)}</h3>
                  <ArrowUpRight className="h-5 w-5 text-primary transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                </div>

                {/* Category Badge */}
                <div className="mb-4">
                  <span className="inline-block rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold text-primary">
                    {t(`projects.filter.${project.category}`)}
                  </span>
                </div>

                {/* Tags */}
                <div className="mb-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Button - flex-1 pushes it to bottom */}
                <div className="mt-auto">
                  <Button className="w-full glass" size="lg">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    {t('projects.demo')}
                  </Button>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </main>
    </>
  )
}
