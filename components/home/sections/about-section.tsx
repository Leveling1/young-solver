'use client'

import { motion } from 'framer-motion'
import { GlassCard } from '@/components/ui/glass-card'
import { ScrollAnimation, StaggerContainer, StaggerItem } from '@/components/ui/scroll-animation'
import { ABOUT_STATS, ABOUT_VALUE_KEYS } from '@/content/site'
import { useLanguage } from '@/providers/language-provider'

export function AboutSection() {
  const { t } = useLanguage()

  return (
    <section id="about" className="overflow-hidden bg-background py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <ScrollAnimation variant="fadeLeft">
            <h2 className="mb-6 text-3xl font-bold sm:text-4xl md:text-5xl">
              {t('about.title.prefix')} <span className="text-primary">{t('about.title.highlight')}</span>
            </h2>
            <p className="mb-6 text-lg leading-relaxed text-muted-foreground">{t('about.description.lead')}</p>
            <p className="mb-8 leading-relaxed text-muted-foreground">{t('about.description.body')}</p>

            <div className="space-y-4">
              {ABOUT_VALUE_KEYS.map((valueKey, index) => (
                <motion.div
                  key={valueKey}
                  className="flex gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                >
                  <div className="w-1 rounded-full bg-primary" />
                  <div>
                    <h4 className="mb-1 font-semibold">{t(`about.value.${valueKey}.title`)}</h4>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {t(`about.value.${valueKey}.description`)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollAnimation>

          <StaggerContainer className="grid grid-cols-2 gap-4" staggerDelay={0.15}>
            {ABOUT_STATS.map((stat) => {
              const Icon = stat.icon

              return (
                <StaggerItem key={stat.key} variant="scale">
                  <GlassCard className="group text-center">
                    <motion.div
                      className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/20"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Icon className="h-6 w-6 text-primary" />
                    </motion.div>
                    <motion.div
                      className="mb-1 text-3xl font-bold text-primary sm:text-4xl"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-sm text-muted-foreground">{t(`about.stats.${stat.key}`)}</div>
                  </GlassCard>
                </StaggerItem>
              )
            })}
          </StaggerContainer>
        </div>
      </div>
    </section>
  )
}
