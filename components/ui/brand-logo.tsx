'use client'

import Image from 'next/image'
import { useActiveThemeMode } from '@/hooks/use-active-theme-mode'
import { cn } from '@/lib/utils'

type BrandLogoProps = {
  size: number
  className?: string
}

export function BrandLogo({ size, className }: BrandLogoProps) {
  const { activeThemeMode, isMounted } = useActiveThemeMode()
  const shouldUseWhiteLogo = isMounted && activeThemeMode === 'black'

  return (
    <Image
      src={shouldUseWhiteLogo ? '/images/logo-white.png' : '/images/logo-black.png'}
      alt="Young Solver"
      width={size}
      height={size}
      className={cn('object-contain', className)}
      sizes={`${size}px`}
      quality={80}
    />
  )
}
