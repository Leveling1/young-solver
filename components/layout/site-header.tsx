'use client'

import { useEffect, useState } from 'react'
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

export function SiteHeader() {
  const { t } = useLanguage()
  const [hasScrolled, setHasScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        hasScrolled ? 'glass-nav py-3' : 'py-5',
      )}
    >
      <nav aria-label="Navigation principale" className="container mx-auto flex items-center justify-between px-4">
        <ScrollLink href="#home" className="group flex items-center gap-3">
          <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.5 }}>
            <BrandLogo size={40} className="rounded-lg" />
          </motion.div>
          <span className="hidden text-xl font-bold transition-colors group-hover:text-primary sm:inline">
            Young Solver
          </span>
        </ScrollLink>

        <div className="hidden items-center gap-8 md:flex">
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
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <LanguageSwitcher />
          <ThemeSwitcher />

          <Button asChild className="hidden sm:inline-flex">
            <ScrollLink href="#contact">{t('nav.cta')}</ScrollLink>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-controls="mobile-navigation"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((currentValue) => !currentValue)}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-5 w-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
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
