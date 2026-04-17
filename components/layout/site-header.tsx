'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { LanguageSwitcher } from '@/components/controls/language-switcher'
import { ThemeSwitcher } from '@/components/controls/theme-switcher'
import { Button } from '@/components/ui/button'
import { BrandLogo } from '@/components/ui/brand-logo'
import { ScrollLink } from '@/components/ui/scroll-link'
import { HOME_SECTION_IDS } from '@/content/site'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/providers/language-provider'

type HomeSectionId = (typeof HOME_SECTION_IDS)[number]

export function SiteHeader() {
  const { t } = useLanguage()
  const [hasScrolled, setHasScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [hoveredSectionId, setHoveredSectionId] = useState<HomeSectionId | null>(null)
  const [activeSectionId, setActiveSectionId] = useState<HomeSectionId>(HOME_SECTION_IDS[0] ?? 'services')
  const isFirstRenderRef = useRef(true)

  useEffect(() => {
    // Mark that we've hydrated
    isFirstRenderRef.current = false
    
    let animationFrameId = 0

    const handleScroll = () => {
      animationFrameId = 0
      setHasScrolled(window.scrollY > 20)

      const threshold = window.innerHeight * 0.32
      let nextSectionId: HomeSectionId = HOME_SECTION_IDS[0] ?? 'services'

      for (const sectionId of HOME_SECTION_IDS) {
        const sectionElement = document.getElementById(sectionId)

        if (sectionElement && sectionElement.getBoundingClientRect().top <= threshold) {
          nextSectionId = sectionId
        }
      }

      setActiveSectionId((currentSectionId) =>
        currentSectionId === nextSectionId ? currentSectionId : nextSectionId,
      )
    }

    const queueHeaderUpdate = () => {
      if (animationFrameId) {
        return
      }

      animationFrameId = window.requestAnimationFrame(handleScroll)
    }

    window.addEventListener('scroll', queueHeaderUpdate, { passive: true })
    window.addEventListener('resize', queueHeaderUpdate)
    queueHeaderUpdate()

    return () => {
      window.removeEventListener('scroll', queueHeaderUpdate)
      window.removeEventListener('resize', queueHeaderUpdate)

      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId)
      }
    }
  }, [])

  const desktopIndicatorId = hoveredSectionId ?? activeSectionId

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn('fixed inset-x-0 top-0 z-50 transition-all duration-300', hasScrolled ? 'py-3' : 'py-5')}
      suppressHydrationWarning
    >
      <nav aria-label="Navigation principale" className="container mx-auto flex items-center justify-between gap-3 px-4">
        <AnimatePresence>
          {!hasScrolled ? (
            <motion.div
              key="logo-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-3"
            >
              <ScrollLink href="#home" className="group flex items-center gap-3">
                <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.5 }}>
                  <BrandLogo size={40} className="rounded-lg" />
                </motion.div>
                <span className="hidden text-xl font-bold transition-colors group-hover:text-primary sm:inline">
                  Young Solver
                </span>
              </ScrollLink>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div className="hidden flex-1 justify-center md:flex">
          <AnimatePresence initial={false} mode="wait">
            {hasScrolled ? (
              <motion.div
                key="scrolled-nav"
                initial={{ opacity: 0, y: -10, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 0.98 }}
                exit={{ opacity: 0, y: -8, scale: 0.96 }}
                transition={{ duration: 0.28 }}
                className="relative flex items-center gap-2 rounded-[1.4rem] border border-border/70 bg-background/78 px-3 py-1.5 shadow-[0_8px_16px_rgba(0,0,0,0.08)] backdrop-blur-md"
                onMouseLeave={() => setHoveredSectionId(null)}
              >
                <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.5 }}>
                  <ScrollLink href="#home">
                    <BrandLogo size={32} className="rounded-lg cursor-pointer" />
                  </ScrollLink>
                </motion.div>
                {HOME_SECTION_IDS.map((sectionId) => {
                  const isHighlighted = desktopIndicatorId === sectionId
                  return (
                    <ScrollLink
                      key={sectionId}
                      href={`#${sectionId}`}
                      className="relative rounded-[1rem] px-3 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
                      onClick={() => setHoveredSectionId(null)}
                    >
                      <span
                        aria-hidden
                        className="absolute inset-0"
                        onMouseEnter={() => setHoveredSectionId(sectionId)}
                        onFocus={() => setHoveredSectionId(sectionId)}
                      />
                      {isHighlighted && (
                        <motion.span
                          layoutId="nav-indicator"
                          className="pointer-events-none absolute inset-0 rounded-[1rem] bg-foreground/[0.05]"
                          transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{t(`nav.${sectionId}`)}</span>
                    </ScrollLink>
                  )
                })}
                <div className="ml-2 flex items-center gap-2 border-l border-border/50 pl-2">
                  <LanguageSwitcher />
                  <ThemeSwitcher />
                  <Button asChild size="sm" className="h-7 px-2 text-xs">
                    <ScrollLink href="#contact">{t('nav.cta')}</ScrollLink>
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="top-nav"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22 }}
                className="flex items-center gap-8"
              >
                {HOME_SECTION_IDS.map((sectionId) => (
                  <ScrollLink
                    key={sectionId}
                    href={`#${sectionId}`}
                    className="group relative text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {t(`nav.${sectionId}`)}
                    <motion.span
                      className="absolute -bottom-1 left-0 h-0.5 bg-primary"
                      initial={{ width: 0 }}
                      whileHover={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </ScrollLink>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <AnimatePresence>
            {!hasScrolled && (
              <motion.div
                key="controls"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2 sm:gap-4"
              >
                <LanguageSwitcher />
                <ThemeSwitcher />
                <Button asChild className="hidden sm:inline-flex">
                  <ScrollLink href="#contact">{t('nav.cta')}</ScrollLink>
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X className="h-5 w-5" />
                </motion.div>
              ) : (
                <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu className="h-5 w-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden md:hidden"
          >
            <div id="mobile-navigation" className="glass-nav mx-4 mt-2 rounded-xl p-4">
              <div className="flex flex-col gap-2">
                {HOME_SECTION_IDS.map((sectionId, index) => (
                  <motion.div
                    key={sectionId}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08 }}
                  >
                    <ScrollLink
                      href={`#${sectionId}`}
                      className="block rounded-lg px-4 py-3 text-sm font-medium transition-all hover:bg-primary/10 hover:text-primary"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {t(`nav.${sectionId}`)}
                    </ScrollLink>
                  </motion.div>
                ))}
                <Button asChild className="mt-2 w-full">
                  <ScrollLink href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
                    {t('nav.cta')}
                  </ScrollLink>
                </Button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  )
}
