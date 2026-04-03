'use client'

import { useEffect, useMemo, useState } from 'react'
import { useTheme } from 'next-themes'

export type ActiveThemeMode = 'light' | 'black'

export function useActiveThemeMode() {
  const { resolvedTheme, theme } = useTheme()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const activeThemeMode = useMemo<ActiveThemeMode>(() => {
    if (theme === 'black') {
      return 'black'
    }

    if (theme === 'light') {
      return 'light'
    }

    return resolvedTheme === 'dark' ? 'black' : 'light'
  }, [isMounted, resolvedTheme, theme])

  return {
    activeThemeMode,
    isMounted,
    resolvedTheme,
    theme,
  }
}
