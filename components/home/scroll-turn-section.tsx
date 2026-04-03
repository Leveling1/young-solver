'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/lib/utils'

type ScrollTurnSectionProps = {
  children: React.ReactNode
  className?: string
  direction?: 'left' | 'right'
}

export function ScrollTurnSection({
  children,
  className,
  direction = 'left',
}: ScrollTurnSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sectionElement = sectionRef.current
    const contentElement = contentRef.current

    if (!sectionElement || !contentElement) {
      return
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    gsap.registerPlugin(ScrollTrigger)

    const matchMedia = gsap.matchMedia()
    const sign = direction === 'left' ? -1 : 1

    matchMedia.add(
      {
        desktop: '(min-width: 1024px)',
        mobile: '(max-width: 1023px)',
      },
      (context) => {
        const isDesktop = Boolean(context.conditions?.desktop)
        const rotateYFrom = sign * 12
        const rotateYTo = sign * -6
        const xPercentFrom = sign * -6
        const xPercentTo = sign * 4
        const rotateXFrom = 5
        const rotateXTo = -2

        const scrollTween = gsap.fromTo(
          contentElement,
          {
            opacity: 0.96,
            rotateX: rotateXFrom,
            rotateY: rotateYFrom,
            transformOrigin: direction === 'left' ? 'left center' : 'right center',
            xPercent: xPercentFrom,
            z: isDesktop ? -90 : -42,
          },
          {
            ease: 'none',
            opacity: 1,
            rotateX: rotateXTo,
            rotateY: rotateYTo,
            xPercent: xPercentTo,
            z: isDesktop ? 14 : 6,
            scrollTrigger: {
              trigger: sectionElement,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.05,
            },
          },
        )

        return () => {
          scrollTween.scrollTrigger?.kill()
          scrollTween.kill()
        }
      },
    )

    return () => {
      matchMedia.revert()
    }
  }, [direction])

  return (
    <div ref={sectionRef} className={cn('relative [perspective:2200px]', className)}>
      <div ref={contentRef} className="transform-gpu [transform-style:preserve-3d] will-change-transform">
        {children}
      </div>
    </div>
  )
}
