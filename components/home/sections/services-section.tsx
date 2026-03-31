'use client'

import { GlassCard } from '@/components/ui/glass-card'
import { ScrollAnimation, StaggerContainer, StaggerItem } from '@/components/ui/scroll-animation'
import { SERVICE_ITEMS } from '@/content/site'
import { useLanguage } from '@/providers/language-provider'

export function ServicesSection() {
  const { t } = useLanguage()

  return (
    <section id="services" className="bg-background py-24">
      <div className="container mx-auto px-4">
        <ScrollAnimation variant="fadeUp" className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">
            {t('services.title.prefix')} <span className="text-primary">{t('services.title.highlight')}</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">{t('services.description')}</p>
        </ScrollAnimation>

        <StaggerContainer className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" staggerDelay={0.1}>
          {SERVICE_ITEMS.map((serviceItem) => {
            const Icon = serviceItem.icon

            return (
              <StaggerItem key={serviceItem.key} variant="scale">
                <GlassCard className="group h-full">
                  <div className="flex h-full flex-col">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold">{t(`services.${serviceItem.key}.title`)}</h3>
                    <p className="flex-grow text-sm leading-relaxed text-muted-foreground">
                      {t(`services.${serviceItem.key}.description`)}
                    </p>
                  </div>
                </GlassCard>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </div>
    </section>
  )
}
