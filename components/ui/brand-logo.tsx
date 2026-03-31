'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'

type BrandLogoProps = {
  size: number
  className?: string
}

export function BrandLogo({ size, className }: BrandLogoProps) {
  return (
    <span className={cn('relative inline-flex items-center justify-center', className)} style={{ width: size, height: size }}>
      <Image
        src="/images/logo-black.png"
        alt="Young Solver"
        width={size}
        height={size}
        className="block h-full w-full object-contain dark:hidden night:hidden black:hidden cyberpunk:hidden"
        sizes={`${size}px`}
        quality={85}
        priority
      />
      <Image
        src="/images/logo-white.png"
        alt="Young Solver"
        width={size}
        height={size}
        className="hidden h-full w-full object-contain dark:block night:block black:block cyberpunk:block"
        sizes={`${size}px`}
        quality={85}
        priority
      />
    </span>
  )
}
