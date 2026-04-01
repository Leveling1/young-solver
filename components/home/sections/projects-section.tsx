'use client'

import Image from 'next/image'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
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
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">
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
                className={cn('transition-all', activeCategory !== category && 'glass')}
              >
                {t(`projects.filter.${category}`)}
              </Button>
            ))}
          </div>
        </ScrollAnimation>

        <motion.div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" layout>
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.key}
                layout
                initial={{ opacity: 0, scale: 0.88, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.88, y: 20 }}
                transition={{ duration: 0.35, delay: index * 0.08, layout: { duration: 0.3 } }}
              >
                <GlassCard className="group h-full overflow-hidden p-0">
                  <div className="relative h-48 w-full overflow-hidden" style={{ background: project.gradient }}>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.22),_transparent_42%)]" />
                    <div className="relative z-10 flex h-full items-center justify-center p-6">
                      <Image
                        src={project.image}
                        alt={t(`projects.${project.key}.title`)}
                        width={168}
                        height={168}
                        className="h-28 w-28 rounded-[1.75rem] object-cover shadow-2xl transition-transform duration-300 group-hover:scale-105"
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

                    <h3 className="mb-2 text-xl font-semibold">{t(`projects.${project.key}.title`)}</h3>
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

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="glass flex-1">
                        <Github className="mr-2 h-4 w-4" />
                        {t('projects.code')}
                      </Button>
                      <Button size="sm" className="flex-1">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        {t('projects.demo')}
                      </Button>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
