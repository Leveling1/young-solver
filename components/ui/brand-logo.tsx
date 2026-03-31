'use client'

import Image from 'next/image'
import { useTheme } from 'next-themes'

type BrandLogoProps = {
  size: number
  className?: string
}

const LIGHT_THEME_NAMES = new Set(['light'])

export function BrandLogo({ size, className }: BrandLogoProps) {
  const { resolvedTheme, theme } = useTheme()
  const activeTheme = resolvedTheme ?? theme ?? 'night'
  const logoSource = LIGHT_THEME_NAMES.has(activeTheme) ? '/images/logo-black.png' : '/images/logo-white.png'

  return (
    <Image
      src={logoSource}
      alt="Young Solver"
      width={size}
      height={size}
      className={className}
      sizes={`${size}px`}
      quality={85}
      priority
    />
  )
}
