'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'

type BrandLogoProps = {
  size: number
  className?: string
}

export function BrandLogo({ size, className }: BrandLogoProps) {
  const { resolvedTheme, theme } = useTheme()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const shouldUseWhiteLogo =
    isMounted && (theme === 'black' || resolvedTheme === 'dark')

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
