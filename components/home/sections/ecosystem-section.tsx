'use client'

import { useMemo } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import {
  ArrowLeftRight,
  Box,
  Circle,
  Clock3,
  Database,
  Eye,
  Globe,
  Layers3,
  MoreHorizontal,
  Server,
  Shield,
  Sparkles,
  Workflow,
  Zap,
} from 'lucide-react'
import { ORCHESTRATION_COLUMNS, PARTNER_NAMES } from '@/content/site'
import { ScrollAnimation } from '@/components/ui/scroll-animation'
import { useLanguage } from '@/providers/language-provider'
import { cn } from '@/lib/utils'

const TONE_STYLES = {
  blue: {
    shell: 'border-blue-500/24 bg-blue-500/[0.04]',
    card: 'border-blue-500/45 shadow-[0_18px_54px_rgba(37,99,235,0.12)]',
    label: 'bg-blue-500/10 text-blue-500',
    accent: 'text-blue-500',
    line: 'from-blue-500/70 to-sky-400/80',
  },
  cyan: {
    shell: 'border-cyan-500/24 bg-cyan-500/[0.04]',
    card: 'border-cyan-500/45 shadow-[0_18px_54px_rgba(6,182,212,0.12)]',
    label: 'bg-cyan-500/10 text-cyan-500',
    accent: 'text-cyan-500',
    line: 'from-cyan-500/70 to-sky-400/80',
  },
  slate: {
    shell: 'border-border/70 bg-background/40',
    card: 'border-border/80 shadow-[0_18px_54px_rgba(15,23,42,0.08)]',
    label: 'bg-secondary/70 text-foreground/75',
    accent: 'text-primary',
    line: 'from-slate-400/70 to-slate-200/60',
  },
  amber: {
    shell: 'border-amber-500/24 bg-amber-500/[0.04]',
    card: 'border-amber-500/45 shadow-[0_18px_54px_rgba(245,158,11,0.12)]',
    label: 'bg-amber-500/10 text-amber-500',
    accent: 'text-amber-500',
    line: 'from-amber-500/70 to-orange-400/80',
  },
  violet: {
    shell: 'border-violet-500/24 bg-violet-500/[0.04]',
    card: 'border-violet-500/45 shadow-[0_18px_54px_rgba(139,92,246,0.12)]',
    label: 'bg-violet-500/10 text-violet-500',
    accent: 'text-violet-500',
    line: 'from-violet-500/70 to-fuchsia-400/80',
  },
} as const

const ITEM_ICON_MAP = {
  shield: Shield,
  globe: Globe,
  zap: Zap,
  'arrow-left-right': ArrowLeftRight,
  box: Box,
  expand: Workflow,
  layers: Layers3,
  clock: Clock3,
  database: Database,
  server: Server,
  eye: Eye,
  circle: Circle,
} as const

const CONNECTORS = [
  { className: 'left-[22%] top-[26%] w-[15%]', tone: 'blue', rotate: '-6deg' },
  { className: 'left-[22%] top-[58%] w-[15%]', tone: 'blue', rotate: '7deg' },
  { className: 'left-[54%] top-[25%] w-[13%]', tone: 'amber', rotate: '-5deg' },
  { className: 'left-[54%] top-[50%] w-[13%]', tone: 'violet', rotate: '5deg' },
  { className: 'left-[66.5%] top-[39%] h-[24%] w-px', tone: 'violet', rotate: '0deg' },
] as const

function CubePattern() {
  return (
    <svg
      viewBox="0 0 640 420"
      className="absolute inset-0 h-full w-full opacity-[0.17]"
      aria-hidden="true"
    >
      <g fill="none" stroke="currentColor" strokeDasharray="3 6" strokeWidth="1.2" className="text-border">
        <path d="M92 108 142 78 192 108 142 138Z" />
        <path d="M142 138V192M92 108V164M192 108V164M92 164 142 194 192 164" />
        <path d="M462 118 512 88 562 118 512 148Z" />
        <path d="M512 148V202M462 118V174M562 118V174M462 174 512 204 562 174" />
        <path d="M252 296 302 266 352 296 302 326Z" />
        <path d="M302 326V380M252 296V352M352 296V352M252 352 302 382 352 352" />
      </g>
    </svg>
  )
}

export function EcosystemSection() {
  const { t } = useLanguage()
  const marqueeItems = useMemo(() => [...PARTNER_NAMES, ...PARTNER_NAMES], [])

  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)
  const gridX = useMotionValue(0)
  const gridY = useMotionValue(0)

  const smoothTiltX = useSpring(tiltX, { stiffness: 160, damping: 22, mass: 0.45 })
  const smoothTiltY = useSpring(tiltY, { stiffness: 160, damping: 22, mass: 0.45 })
  const smoothGridX = useSpring(gridX, { stiffness: 120, damping: 22, mass: 0.55 })
  const smoothGridY = useSpring(gridY, { stiffness: 120, damping: 22, mass: 0.55 })

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    const normalizedX = (event.clientX - bounds.left) / bounds.width - 0.5
    const normalizedY = (event.clientY - bounds.top) / bounds.height - 0.5

    tiltX.set(-normalizedY * 8)
    tiltY.set(normalizedX * 10)
    gridX.set(normalizedX * 18)
    gridY.set(normalizedY * 14)
  }

  const resetPointer = () => {
    tiltX.set(0)
    tiltY.set(0)
    gridX.set(0)
    gridY.set(0)
  }

  return (
    <section
      className="relative overflow-hidden bg-background/80 py-20 backdrop-blur-[2px] sm:py-24"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ x: smoothGridX, y: smoothGridY }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(127,127,127,0.16)_1px,transparent_1.2px)] bg-[size:22px_22px] opacity-35" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.02)_50%,transparent_100%)]" />
        <CubePattern />
      </motion.div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <ScrollAnimation variant="fadeUp" className="mb-12 text-center sm:mb-14">
          <h2 className="mb-4 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            {t('ecosystem.title.prefix')} <span className="text-primary">{t('ecosystem.title.highlight')}</span>
          </h2>
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t('ecosystem.description')}
          </p>
        </ScrollAnimation>

        <ScrollAnimation variant="scale" className="relative mx-auto max-w-[1240px]">
          <div className="pointer-events-none absolute inset-0 hidden xl:block">
            {CONNECTORS.map((connector, index) => (
              <div
                key={index}
                className={cn(
                  'absolute h-px bg-gradient-to-r opacity-80',
                  TONE_STYLES[connector.tone].line,
                  connector.className,
                )}
                style={{ transform: `rotate(${connector.rotate})` }}
              />
            ))}
          </div>

          <motion.div
            className="relative rounded-[34px] border border-border/65 bg-background/46 p-3 shadow-[0_26px_90px_rgba(0,0,0,0.10)] backdrop-blur-2xl sm:p-5"
            style={{
              rotateX: smoothTiltX,
              rotateY: smoothTiltY,
              transformPerspective: 1800,
              transformStyle: 'preserve-3d',
            }}
          >
            <div className="grid gap-4 xl:grid-cols-[1.02fr_0.96fr_0.92fr]">
              {ORCHESTRATION_COLUMNS.map((column) => (
                <div
                  key={column.key}
                  className={cn(
                    'relative rounded-[28px] border p-3 sm:p-4',
                    column.key === 'edge' && TONE_STYLES.blue.shell,
                    column.key === 'runtime' && TONE_STYLES.slate.shell,
                    column.key === 'data' && TONE_STYLES.amber.shell,
                  )}
                >
                  <div className="mb-4 flex items-center justify-between gap-3 px-1">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-xs font-medium tracking-tight text-muted-foreground">
                        {column.region}
                      </span>
                    </div>
                    <MoreHorizontal className="h-4 w-4 text-muted-foreground/75" />
                  </div>

                  <div className="space-y-4">
                    {column.panels.map((panel, index) => {
                      const tone =
                        panel.tone === 'blue'
                          ? TONE_STYLES.blue
                          : panel.tone === 'cyan'
                            ? TONE_STYLES.cyan
                            : panel.tone === 'amber'
                              ? TONE_STYLES.amber
                              : panel.tone === 'violet'
                                ? TONE_STYLES.violet
                                : TONE_STYLES.slate

                      return (
                        <motion.article
                          key={panel.key}
                          initial={{ opacity: 0, y: 24 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.18 }}
                          transition={{ duration: 0.55, delay: index * 0.08 }}
                          whileHover={{ y: -8, scale: 1.01, rotateX: 3, rotateY: -2 }}
                          className={cn(
                            'relative overflow-hidden rounded-[24px] border bg-background/92 p-4 shadow-[0_20px_45px_rgba(0,0,0,0.08)] backdrop-blur-xl transition-shadow sm:p-5',
                            tone.card,
                          )}
                        >
                          <div className="absolute inset-x-0 bottom-0 h-8 bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.03))]" />
                          <div className="mb-4 flex items-start justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="text-[15px] font-semibold tracking-tight text-foreground/92">
                                  {panel.title}
                                </p>
                                <span className={cn('rounded-md px-2 py-0.5 text-[11px] font-semibold', tone.label)}>
                                  {panel.badge}
                                </span>
                              </div>
                            </div>
                            <MoreHorizontal className="h-4 w-4 text-muted-foreground/70" />
                          </div>

                          {panel.previewRows ? (
                            <div className="mb-4 rounded-[18px] border border-border/70 bg-background/84 p-3">
                              <div className="mb-2 grid grid-cols-[32px_1fr] gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                                <span>id</span>
                                <span>Type</span>
                              </div>
                              <div className="space-y-2">
                                {panel.previewRows.map((rowLabel, previewIndex) => (
                                  <div key={rowLabel} className="grid grid-cols-[32px_1fr] items-center gap-2 text-sm">
                                    <span className={cn('font-semibold', tone.accent)}>{previewIndex + 1}</span>
                                    <span className="text-foreground/82">{rowLabel}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : null}

                          <div className="space-y-3">
                            {panel.items.map((item) => {
                              const Icon = ITEM_ICON_MAP[item.icon]

                              return (
                                <div
                                  key={`${panel.key}-${item.label}`}
                                  className="flex items-start justify-between gap-3 rounded-2xl border border-border/55 bg-background/76 px-3 py-2.5"
                                >
                                  <div className="flex items-start gap-3">
                                    <span className="mt-0.5 rounded-md bg-secondary/70 p-1.5 text-muted-foreground">
                                      <Icon className="h-3.5 w-3.5" />
                                    </span>
                                    <div>
                                      <p className="text-sm text-foreground/88">{item.label}</p>
                                      {item.meta ? (
                                        <p className="mt-0.5 text-xs text-muted-foreground">{item.meta}</p>
                                      ) : null}
                                    </div>
                                  </div>
                                  <span
                                    className={cn(
                                      'shrink-0 text-sm font-medium',
                                      item.state === 'success' ? 'text-emerald-500' : 'text-foreground/82',
                                    )}
                                  >
                                    {item.value}
                                  </span>
                                </div>
                              )
                            })}
                          </div>

                          {panel.footer ? (
                            <button
                              type="button"
                              className={cn(
                                'mt-4 inline-flex text-sm font-medium transition-colors hover:opacity-80',
                                tone.accent,
                              )}
                            >
                              {panel.footer}
                            </button>
                          ) : null}
                        </motion.article>
                      )
                    })}
                  </div>

                  {column.menu ? (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.4 }}
                      className="absolute right-4 top-4 hidden rounded-[22px] bg-black px-4 py-3 text-white shadow-[0_18px_40px_rgba(0,0,0,0.28)] xl:block"
                    >
                      <div className="space-y-2">
                        {column.menu.map((menuItem) => (
                          <div key={menuItem} className="flex items-center gap-3 text-sm font-medium">
                            <span className="h-2 w-2 rounded-full bg-white/80" />
                            <span>{menuItem}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ) : null}
                </div>
              ))}
            </div>
          </motion.div>
        </ScrollAnimation>

        <div className="mt-12 overflow-hidden rounded-[28px] border border-border/70 bg-background/88 backdrop-blur-xl sm:mt-14 sm:rounded-full">
          <div className="flex flex-col gap-2 border-b border-border/60 px-5 py-4 text-sm sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6">
            <div className="flex items-center gap-3">
              <span className="font-semibold tracking-tight">{t('ecosystem.partners')}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            </div>
            <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground sm:text-sm sm:tracking-[0.22em]">
              trusted delivery ecosystem
            </span>
          </div>
          <div className="relative overflow-hidden py-4 sm:py-5">
            <div className="flex w-max animate-[marquee_28s_linear_infinite] gap-3 px-4 sm:gap-4 sm:px-5">
              {marqueeItems.map((partner, index) => (
                <span
                  key={`${partner}-${index}`}
                  className="whitespace-nowrap rounded-full border border-border/70 bg-background/90 px-3 py-2 text-xs text-foreground/85 shadow-sm sm:px-4 sm:text-sm"
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
