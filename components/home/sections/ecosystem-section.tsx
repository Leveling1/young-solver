'use client'

import { motion } from 'framer-motion'
import { DELIVERY_FLOW_CARDS, PARTNER_NAMES } from '@/content/site'
import { ScrollAnimation } from '@/components/ui/scroll-animation'
import { useLanguage } from '@/providers/language-provider'
import { cn } from '@/lib/utils'

const TONE_STYLES = {
  blue: {
    border: 'border-blue-500/45',
    glow: 'shadow-[0_18px_46px_rgba(37,99,235,0.16)]',
    label: 'bg-blue-500/10 text-blue-500',
    dot: 'bg-blue-500',
    line: 'from-blue-500/80 to-cyan-400/80',
  },
  cyan: {
    border: 'border-cyan-500/45',
    glow: 'shadow-[0_18px_46px_rgba(6,182,212,0.16)]',
    label: 'bg-cyan-500/10 text-cyan-500',
    dot: 'bg-cyan-500',
    line: 'from-cyan-500/80 to-sky-400/80',
  },
  amber: {
    border: 'border-amber-500/45',
    glow: 'shadow-[0_18px_46px_rgba(245,158,11,0.16)]',
    label: 'bg-amber-500/10 text-amber-500',
    dot: 'bg-amber-500',
    line: 'from-amber-500/80 to-orange-400/80',
  },
  violet: {
    border: 'border-violet-500/45',
    glow: 'shadow-[0_18px_46px_rgba(139,92,246,0.16)]',
    label: 'bg-violet-500/10 text-violet-500',
    dot: 'bg-violet-500',
    line: 'from-violet-500/80 to-fuchsia-400/80',
  },
  pink: {
    border: 'border-pink-500/45',
    glow: 'shadow-[0_18px_46px_rgba(236,72,153,0.16)]',
    label: 'bg-pink-500/10 text-pink-500',
    dot: 'bg-pink-500',
    line: 'from-pink-500/80 to-rose-400/80',
  },
  emerald: {
    border: 'border-emerald-500/45',
    glow: 'shadow-[0_18px_46px_rgba(16,185,129,0.16)]',
    label: 'bg-emerald-500/10 text-emerald-500',
    dot: 'bg-emerald-500',
    line: 'from-emerald-500/80 to-lime-400/80',
  },
} as const

const CONNECTORS = [
  { className: 'left-[20%] top-[26%] w-[18%]', tone: 'blue', rotate: '-6deg' },
  { className: 'left-[44%] top-[26%] w-[15%]', tone: 'cyan', rotate: '8deg' },
  { className: 'left-[21%] top-[50%] w-[18%]', tone: 'amber', rotate: '5deg' },
  { className: 'left-[44%] top-[50%] w-[15%]', tone: 'violet', rotate: '-8deg' },
  { className: 'left-[57%] top-[38%] h-[19%] w-px', tone: 'pink', rotate: '0deg' },
] as const

export function EcosystemSection() {
  const { t } = useLanguage()
  const marqueeItems = [...PARTNER_NAMES, ...PARTNER_NAMES]

  return (
    <section className="relative overflow-hidden bg-background py-24">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(127,127,127,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(127,127,127,0.08)_1px,transparent_1px)] bg-[size:72px_72px] opacity-30" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-primary/8 via-transparent to-transparent" />

      <div className="container relative z-10 mx-auto px-4">
        <ScrollAnimation variant="fadeUp" className="mb-14 text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">
            {t('ecosystem.title.prefix')} <span className="text-primary">{t('ecosystem.title.highlight')}</span>
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground">{t('ecosystem.description')}</p>
        </ScrollAnimation>

        <div className="relative mx-auto max-w-6xl">
          <div className="pointer-events-none absolute inset-0 hidden xl:block">
            {CONNECTORS.map((connector, index) => (
              <div
                key={index}
                className={cn(
                  'absolute h-px bg-gradient-to-r opacity-70',
                  TONE_STYLES[connector.tone].line,
                  connector.className,
                )}
                style={{ transform: `rotate(${connector.rotate})` }}
              />
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {DELIVERY_FLOW_CARDS.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className={cn(
                  'relative rounded-[28px] border bg-background/78 p-6 backdrop-blur-2xl',
                  TONE_STYLES[card.tone].border,
                  TONE_STYLES[card.tone].glow,
                )}
              >
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold">{card.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground">Young Solver delivery graph</p>
                  </div>
                  <span className={cn('rounded-full px-2.5 py-1 text-[11px] font-semibold', TONE_STYLES[card.tone].label)}>
                    {card.badge}
                  </span>
                </div>

                <div className="space-y-3 rounded-2xl border border-border/70 bg-background/88 p-4">
                  {card.items.map((item, itemIndex) => (
                    <div key={item} className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span
                          className={cn(
                            'h-2.5 w-2.5 rounded-full',
                            itemIndex % 2 === 0 ? TONE_STYLES[card.tone].dot : 'bg-primary/60',
                          )}
                        />
                        <span className="text-sm text-foreground/90">{item}</span>
                      </div>
                      <span className="text-xs text-emerald-500">Active</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-14 overflow-hidden rounded-full border border-border/70 bg-background/80 backdrop-blur-xl">
          <div className="flex items-center gap-6 border-b border-border/60 px-5 py-3 text-sm">
            <span className="font-semibold">{t('ecosystem.partners')}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            <span className="text-muted-foreground">trusted delivery ecosystem</span>
          </div>
          <div className="relative overflow-hidden py-4">
            <div className="flex w-max animate-[marquee_28s_linear_infinite] gap-4 px-4">
              {marqueeItems.map((partner, index) => (
                <span
                  key={`${partner}-${index}`}
                  className="rounded-full border border-border/70 bg-background/88 px-4 py-2 text-sm text-foreground/85 shadow-sm"
                >
                  {partner}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
