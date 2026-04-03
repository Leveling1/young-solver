'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { HomePage } from '@/components/home/home-page'
import { SiteLoader } from '@/components/home/site-loader'

type LoaderPhase = 'spinning' | 'exploding' | 'done'

export function HomeEntry() {
  const shouldReduceMotion = useReducedMotion()
  const [loaderPhase, setLoaderPhase] = useState<LoaderPhase>('spinning')

  useEffect(() => {
    const spinDuration = shouldReduceMotion ? 420 : 1080
    const explodeDuration = shouldReduceMotion ? 180 : 460

    document.body.style.overflow = 'hidden'

    const explodeTimer = window.setTimeout(() => {
      setLoaderPhase('exploding')
    }, spinDuration)

    const doneTimer = window.setTimeout(() => {
      setLoaderPhase('done')
      document.body.style.removeProperty('overflow')
    }, spinDuration + explodeDuration)

    return () => {
      window.clearTimeout(explodeTimer)
      window.clearTimeout(doneTimer)
      document.body.style.removeProperty('overflow')
    }
  }, [shouldReduceMotion])

  return (
    <>
      <motion.div
        initial={false}
        animate={loaderPhase === 'done' ? { opacity: 1, scale: 1 } : { opacity: 0 }}
        transition={{ duration: shouldReduceMotion ? 0.18 : 0.42, ease: 'easeOut' }}
      >
        <HomePage />
      </motion.div>

      <AnimatePresence>
        {loaderPhase !== 'done' ? <SiteLoader phase={loaderPhase} /> : null}
      </AnimatePresence>
    </>
  )
}
