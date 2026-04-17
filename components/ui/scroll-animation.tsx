'use client'

import { ReactNode } from 'react'

interface ScrollAnimationProps {
  children: ReactNode
  className?: string
  variant?: 'fadeUp' | 'fadeDown' | 'fadeLeft' | 'fadeRight' | 'scale' | 'blur' | 'rotate'
  delay?: number
  duration?: number
  once?: boolean
  amount?: number
}

export function ScrollAnimation({
  children,
  className,
}: ScrollAnimationProps) {
  return (
    <div className={className}>
      {children}
    </div>
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
}: StaggerContainerProps) {
  return (
    <div className={className}>
      {children}
    </div>
  )
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={className}>
      {children}
    </div>
  )
}

// Text reveal animation
export function TextReveal({
  children,
  className,
}: {
  children: string
  className?: string
  delay?: number
}) {
  return (
    <span className={className}>
      {children}
    </span>
  )
}

// Parallax effect on scroll
export function ParallaxSection({
  children,
  className,
}: {
  children: ReactNode
  className?: string
  speed?: number
}) {
  return (
    <div className={className}>
      {children}
    </div>
  )
}
