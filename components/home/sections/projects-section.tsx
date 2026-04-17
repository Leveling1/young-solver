'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { GlassCard } from '@/components/ui/glass-card'
import { ScrollAnimation } from '@/components/ui/scroll-animation'
import { FEATURED_PROJECTS, PROJECT_CATEGORIES } from '@/content/site'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/providers/language-provider'

type ProjectCategory = (typeof PROJECT_CATEGORIES)[number]

export function ProjectsSection() {
  const { t } = useLanguage()
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all')

  const filteredProjects =
    activeCategory === 'all'
      ? FEATURED_PROJECTS
      : FEATURED_PROJECTS.filter((project) => project.category === activeCategory)

  return (
    <section id="projects" className="relative bg-secondary/18 py-24 backdrop-blur-[2px]">
      <div className="container mx-auto px-4">
        <ScrollAnimation variant="fadeUp" className="mb-12 text-center">
          <h2 className="mb-4 text-foreground text-3xl font-bold sm:text-4xl md:text-5xl">
            {t('projects.title.prefix')} <span className="text-primary">{t('projects.title.highlight')}</span>
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">{t('projects.description')}</p>

          <div className="flex flex-wrap justify-center gap-2">
            {PROJECT_CATEGORIES.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveCategory(category)}
                className={cn(
                  'relative overflow-hidden transition-all duration-300',
                  activeCategory !== category && 'glass hover:border-primary/25 hover:text-foreground',
                )}
              >
                {activeCategory === category ? (
                  <motion.span
                    layoutId="project-filter-indicator"
                    className="absolute inset-0 rounded-[inherit] bg-primary"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                ) : null}
                <span className="relative z-10">{t(`projects.filter.${category}`)}</span>
              </Button>
            ))}
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {filteredProjects.map((project) => (
            <div key={`${activeCategory}-${project.key}`}>
                <GlassCard className="group h-full overflow-hidden p-0">
                  <div className="relative h-48 w-full overflow-hidden rounded-b-3xl" style={{ background: project.gradient }}>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.22),_transparent_42%)]" />
                    <div className="relative z-10 flex h-full items-center justify-center p-6">
                      <Image
                        src={project.image}
                        alt={t(`projects.${project.key}.title`)}
                        width={168}
                        height={168}
                        className="h-28 w-28 rounded-2xl object-cover shadow-2xl transition-transform duration-300 group-hover:scale-105"
                        sizes="112px"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
                  </div>

                  <div className="p-6">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="rounded bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                        {t(`projects.filter.${project.category}`)}
                      </span>
                    </div>

                    <h3 className="mb-2 text-foreground text-xl font-semibold">{t(`projects.${project.key}.title`)}</h3>
                    <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                      {t(`projects.${project.key}.description`)}
                    </p>

                    <div className="mb-4 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="rounded bg-secondary/50 px-2 py-1 text-xs text-muted-foreground">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Button size="sm" className="w-full">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      {t('projects.demo')}
                    </Button>
                  </div>
                </GlassCard>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/projects">
            <Button size="lg" variant="outline" className="glass">
              {t('projects.viewAll')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
