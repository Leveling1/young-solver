'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'

const HeroScene = dynamic(
  () => import('@/components/home/visuals/hero-scene').then((module) => module.HeroScene),
  { ssr: false },
)

function emitHeroLogoInteraction(active: boolean, x = 0, y = 0) {
  window.dispatchEvent(
    new CustomEvent('hero-logo-interaction', {
      detail: { active, x, y },
    }),
  )
}

export function HeroLogoStage() {
  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    const normalizedX = ((event.clientX - bounds.left) / bounds.width) * 2 - 1
    const normalizedY = ((event.clientY - bounds.top) / bounds.height) * 2 - 1

    emitHeroLogoInteraction(true, normalizedX, normalizedY)
  }

  return (
    <motion.div
      className="relative h-full w-full"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      onPointerEnter={handlePointerMove}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => emitHeroLogoInteraction(false)}
    >
      <HeroScene className="pointer-events-none absolute inset-0 h-full w-full" />
    </motion.div>
  )
}
