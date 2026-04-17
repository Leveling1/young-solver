'use client'

import { useEffect, useState } from 'react'
import { useActiveThemeMode } from '@/hooks/use-active-theme-mode'
import { cn } from '@/lib/utils'

type BrandLogoProps = {
  size: number
  className?: string
}

export function BrandLogo({ size, className }: BrandLogoProps) {
  const { activeThemeMode } = useActiveThemeMode()
  const [src, setSrc] = useState('/images/logo-black.png')

  useEffect(() => {
    setSrc(activeThemeMode === 'black' ? '/images/logo-white.png' : '/images/logo-black.png')
  }, [activeThemeMode])

  return (
    <img
      src={src}
      alt="Young Solver"
      width={size}
      height={size}
      className={cn('object-contain', className)}
      suppressHydrationWarning
    />
  )
}
