'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { BrandLogo } from '@/components/ui/brand-logo'

type SiteLoaderProps = {
  phase: 'spinning' | 'exploding'
}

const LOADER_PARTICLES = [
  { x: -66, y: -34, size: 4, delay: 0 },
  { x: -52, y: -58, size: 5, delay: 0.01 },
  { x: -18, y: -72, size: 4, delay: 0.03 },
  { x: 20, y: -74, size: 5, delay: 0.05 },
  { x: 58, y: -48, size: 4, delay: 0.07 },
  { x: 74, y: -10, size: 5, delay: 0.09 },
  { x: 68, y: 30, size: 4, delay: 0.11 },
  { x: 42, y: 62, size: 5, delay: 0.13 },
  { x: 6, y: 76, size: 4, delay: 0.15 },
  { x: -28, y: 70, size: 5, delay: 0.17 },
  { x: -62, y: 46, size: 4, delay: 0.19 },
  { x: -76, y: 8, size: 5, delay: 0.21 },
  { x: -48, y: -4, size: 3, delay: 0.04 },
  { x: 50, y: 4, size: 3, delay: 0.08 },
  { x: -10, y: 46, size: 3, delay: 0.12 },
  { x: 10, y: -44, size: 3, delay: 0.16 },
] as const

export function SiteLoader({ phase }: SiteLoaderProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: shouldReduceMotion ? 0.14 : 0.28, ease: 'easeOut' } }}
    >
      <div className="relative flex flex-col items-center gap-7">
        <div className="relative flex h-28 w-28 items-center justify-center sm:h-32 sm:w-32">
          {LOADER_PARTICLES.map((particle, index) => (
            <motion.span
              key={`${particle.x}-${particle.y}-${index}`}
              className="absolute left-1/2 top-1/2 rounded-full bg-foreground/45"
              style={{
                width: particle.size,
                height: particle.size,
                marginLeft: particle.size / -2,
                marginTop: particle.size / -2,
              }}
              initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
              animate={
                phase === 'exploding'
                  ? {
                      x: particle.x,
                      y: particle.y,
                      opacity: [0, 0.92, 0],
                      scale: [0.4, 1, 0],
                    }
                  : {
                      x: 0,
                      y: 0,
                      opacity: 0,
                      scale: 0,
                    }
              }
              transition={{
                duration: shouldReduceMotion ? 0.18 : 0.42,
                delay: phase === 'exploding' ? particle.delay : 0,
                ease: 'easeOut',
              }}
            />
          ))}

          <motion.div
            className="relative z-10"
            animate={
              phase === 'spinning'
                ? {
                    rotate: 360,
                    scale: 1,
                    opacity: 1,
                  }
                : {
                    rotate: 520,
                    scale: 0.66,
                    opacity: 0,
                    filter: 'blur(6px)',
                  }
            }
            transition={
              phase === 'spinning'
                ? {
                    rotate: {
                      duration: shouldReduceMotion ? 0.55 : 0.78,
                      ease: 'linear',
                      repeat: Infinity,
                    },
                    scale: { duration: 0.2 },
                    opacity: { duration: 0.2 },
                  }
                : {
                    duration: shouldReduceMotion ? 0.18 : 0.38,
                    ease: 'easeIn',
                  }
            }
          >
            <BrandLogo
              size={92}
              className="drop-shadow-[0_12px_40px_rgba(0,123,255,0.16)] sm:h-[104px] sm:w-[104px]"
            />
          </motion.div>
        </div>

        <div className="relative h-1.5 w-28 overflow-hidden rounded-full bg-foreground/10 sm:w-36">
          <motion.div
            className="absolute inset-y-0 left-0 w-full origin-left rounded-full bg-primary"
            animate={
              phase === 'spinning'
                ? {
                    scaleX: [0.16, 0.74, 0.5, 0.88],
                    opacity: [0.78, 1, 0.86, 1],
                  }
                : {
                    scaleX: 1,
                    opacity: 1,
                  }
            }
            transition={
              phase === 'spinning'
                ? {
                    duration: shouldReduceMotion ? 0.7 : 1,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }
                : {
                    duration: shouldReduceMotion ? 0.16 : 0.24,
                    ease: 'easeOut',
                  }
            }
          />
        </div>
      </div>
    </motion.div>
  )
}
