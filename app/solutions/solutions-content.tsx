'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, ExternalLink, Github } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { GlassCard } from '@/components/ui/glass-card'
import { SOLUTION_PRODUCTS } from '@/content/site'
import { SolutionsStructuredData } from '@/components/seo/solutions-structured-data'
import { useLanguage } from '@/providers/language-provider'

export default function SolutionsPageContent() {
  const { t } = useLanguage()

  return (
    <>
      <SolutionsStructuredData />
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
              {t('solutions.title.prefix')} <span className="text-primary">{t('solutions.title.highlight')}</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              {t('solutions.description')}
            </p>
          </div>

          {/* Solutions Grid */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {SOLUTION_PRODUCTS.map((solution) => (
              <GlassCard key={solution.key} className="group h-full overflow-hidden p-0 flex flex-col">
                {/* Image Container */}
                <div className="relative flex min-h-[280px] items-center justify-center overflow-hidden rounded-b-3xl bg-gradient-to-br from-primary/10 via-background to-accent/10 p-8">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent_45%)]" />
                  <Image
                    src={solution.image}
                    alt={t(`solutions.${solution.key}.title`)}
                    width={220}
                    height={220}
                    className="relative z-10 h-36 w-36 rounded-2xl object-cover shadow-2xl transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 144px, 220px"
                  />
                </div>

                {/* Content Container */}
                <div className="flex flex-1 flex-col p-6">
                  {/* Title and Icon */}
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <h3 className="text-xl font-semibold text-foreground">{t(`solutions.${solution.key}.title`)}</h3>
                    <ArrowUpRight className="h-5 w-5 text-primary transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </div>

                  {/* Description */}
                  <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                    {t(`solutions.${solution.key}.description`)}
                  </p>

                  {/* Tags */}
                  <div className="mb-6 flex flex-wrap gap-2">
                    {solution.tags.map((tag) => (
                      <span key={tag} className="rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Buttons - flex-1 pushes to bottom */}
                  <div className="mt-auto flex gap-3">
                    <Button variant="outline" size="sm" className="flex-1 glass">
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
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/">
              <Button size="lg" variant="outline" className="glass">
                {t('solutions.viewAll')}
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
