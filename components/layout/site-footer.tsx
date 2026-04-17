'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { SOCIAL_LINKS } from '@/content/site'
import { useLanguage } from '@/providers/language-provider'
import { BrandLogo } from '@/components/ui/brand-logo'
import { ScrollLink } from '@/components/ui/scroll-link'

export function SiteFooter() {
  const { t } = useLanguage()

  const footerSections = [
    {
      title: t('footer.services'),
      links: [
        { href: '#services' as const, label: t('services.web.title') },
        { href: '#services' as const, label: t('services.mobile.title') },
        { href: '#services' as const, label: t('services.ai.title') },
        { href: '#services' as const, label: t('services.cloud.title') },
      ],
    },
    {
      title: t('footer.company'),
      links: [
        { href: '#about' as const, label: t('footer.about') },
        { href: '#projects' as const, label: t('nav.projects') },
        { href: '#contact' as const, label: t('nav.contact') },
      ],
    },
  ]

  return (
    <footer className="border-t border-border bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <ScrollLink href="#home" className="group mb-4 flex items-center gap-3">
              <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.5 }}>
                <BrandLogo size={32} className="rounded-md" />
              </motion.div>
              <span className="text-lg font-bold transition-colors group-hover:text-primary">
                Young Solver
              </span>
            </ScrollLink>

            <p className="mb-6 max-w-md text-sm leading-relaxed text-muted-foreground">
              {t('footer.description')}
            </p>

            <div className="flex gap-4">
              {SOCIAL_LINKS.map((socialLink) => {
                const Icon = socialLink.icon

                return (
                  <motion.div
                    key={socialLink.label}
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href={socialLink.href}
                      className="text-muted-foreground transition-colors hover:text-primary"
                      aria-label={socialLink.label}
                    >
                      <Icon className="h-5 w-5" />
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="mb-4 font-semibold text-foreground">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <ScrollLink
                      href={link.href}
                      className="inline-block text-sm text-muted-foreground transition-all hover:translate-x-1 hover:text-foreground"
                    >
                      {link.label}
                    </ScrollLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            {new Date().getFullYear()} Young Solver. {t('footer.rights')}
          </p>

          <div className="flex gap-6">
            <ScrollLink href="#home" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              {t('footer.privacy')}
            </ScrollLink>
            <ScrollLink href="#home" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              {t('footer.terms')}
            </ScrollLink>
          </div>
        </div>
      </div>
    </footer>
  )
}
