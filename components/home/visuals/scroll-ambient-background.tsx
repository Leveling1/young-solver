'use client'

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'

export function ScrollAmbientBackground() {
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()

  const gridY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -120]), {
    stiffness: 90,
    damping: 24,
    mass: 0.45,
  })
  const primaryY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -170]), {
    stiffness: 82,
    damping: 22,
    mass: 0.5,
  })
  const secondaryY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 130]), {
    stiffness: 82,
    damping: 22,
    mass: 0.5,
  })
  const primaryRotate = useTransform(scrollYProgress, [0, 1], [0, 12])
  const secondaryRotate = useTransform(scrollYProgress, [0, 1], [0, -10])
  const primaryScale = useTransform(scrollYProgress, [0, 1], [1, 1.14])
  const secondaryScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <motion.div
        className="ambient-scroll-grid absolute inset-0"
        style={shouldReduceMotion ? undefined : { y: gridY }}
      />
      <motion.div
        className="ambient-scroll-cluster absolute -right-24 top-[8vh] h-[20rem] w-[20rem] md:h-[30rem] md:w-[30rem]"
        style={shouldReduceMotion ? undefined : { y: primaryY, rotate: primaryRotate, scale: primaryScale }}
      />
      <motion.div
        className="ambient-scroll-cluster ambient-scroll-cluster-secondary absolute -left-16 top-[52vh] h-[16rem] w-[16rem] md:h-[22rem] md:w-[22rem]"
        style={shouldReduceMotion ? undefined : { y: secondaryY, rotate: secondaryRotate, scale: secondaryScale }}
      />
    </div>
  )
}
