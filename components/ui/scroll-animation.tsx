'use client'

import { useRef, ReactNode } from 'react'
import { motion, useInView, Variants } from 'framer-motion'

interface ScrollAnimationProps {
  children: ReactNode
  className?: string
  variant?: 'fadeUp' | 'fadeDown' | 'fadeLeft' | 'fadeRight' | 'scale' | 'blur' | 'rotate'
  delay?: number
  duration?: number
  once?: boolean
  amount?: number
}

const variants: Record<string, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 }
  },
  fadeDown: {
    hidden: { opacity: 0, y: -60 },
    visible: { opacity: 1, y: 0 }
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 }
  },
  fadeRight: {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 }
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  },
  blur: {
    hidden: { opacity: 0, filter: 'blur(10px)' },
    visible: { opacity: 1, filter: 'blur(0px)' }
  },
  rotate: {
    hidden: { opacity: 0, rotate: -10, y: 30 },
    visible: { opacity: 1, rotate: 0, y: 0 }
  }
}

export function ScrollAnimation({
  children,
  className,
  variant = 'fadeUp',
  delay = 0,
  duration = 0.6,
  once = true,
  amount = 0.3
}: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount })

  return (
    <motion.div
      ref={ref}
      variants={variants[variant]}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface StaggerContainerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
  once?: boolean
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
  once = true
}: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount: 0.2 })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className,
  variant = 'fadeUp'
}: {
  children: ReactNode
  className?: string
  variant?: keyof typeof variants
}) {
  return (
    <motion.div
      variants={variants[variant]}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Text reveal animation
export function TextReveal({
  children,
  className,
  delay = 0
}: {
  children: string
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  return (
    <span ref={ref} className={className}>
      {children.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: 0.3,
            delay: delay + index * 0.03,
            ease: 'easeOut'
          }}
          style={{ display: 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  )
}

// Parallax effect on scroll
export function ParallaxSection({
  children,
  className,
  speed = 0.5
}: {
  children: ReactNode
  className?: string
  speed?: number
}) {
  return (
    <motion.div
      className={className}
      initial={{ y: 0 }}
      whileInView={{ y: 0 }}
      viewport={{ once: false }}
      style={{ willChange: 'transform' }}
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 30
      }}
    >
      {children}
    </motion.div>
  )
}
