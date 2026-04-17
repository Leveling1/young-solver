'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollLink } from '@/components/ui/scroll-link'
import { useLanguage } from '@/providers/language-provider'

const HeroLogoStage = dynamic(
  () => import('@/components/home/visuals/hero-logo-stage').then((module) => module.HeroLogoStage),
  { ssr: false },
)

export function HeroSection() {
  const { t } = useLanguage()
  const [showHeroStage, setShowHeroStage] = useState(true)

  useEffect(() => {
    // Ensure hero stage is mounted for initial render
    setShowHeroStage(true)
  }, [])

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-8 lg:pt-14">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(0,123,255,0.14),transparent_22%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),transparent_20%,transparent_80%,rgba(0,0,0,0.02))]" />

      <div className="container relative z-10 mx-auto px-4 py-20 lg:py-6">
        <div className="grid min-h-[80vh] grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="order-2 text-center lg:order-1 lg:text-left"
          >
            <motion.h1
              className="mb-6 text-foreground text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="block">{t('hero.title.line1')}</span>
              <span className="block text-primary">{t('hero.title.line2')}</span>
              <span className="block">{t('hero.title.line3')}</span>
            </motion.h1>

            <motion.p
              className="mb-8 mx-auto max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {t('hero.description')}
            </motion.p>

            <motion.div
              className="flex flex-col gap-4 justify-center sm:flex-row lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Button asChild size="lg" className="px-6 text-base sm:px-8 sm:text-lg">
                <ScrollLink href="#projects">
                  {t('hero.primaryAction')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </ScrollLink>
              </Button>

              <Button asChild variant="outline" size="lg" className="glass px-6 text-base sm:px-8 sm:text-lg">
                <ScrollLink href="#services">{t('hero.secondaryAction')}</ScrollLink>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="order-1 h-[340px] sm:h-[410px] lg:order-2 lg:mt-8 lg:h-[520px] xl:h-[540px]"
          >
            {showHeroStage ? (
              <HeroLogoStage />
            ) : (
              <div className="h-full w-full" aria-hidden />
            )}
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
          <ScrollLink href="#services" ariaLabel={t('hero.scrollLabel')}>
            <ChevronDown className="h-8 w-8 text-muted-foreground transition-colors hover:text-primary" />
          </ScrollLink>
        </motion.div>
      </motion.div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-background" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-transparent lg:hidden" />
    </section>
  )
}
