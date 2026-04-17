'use client'

import { startTransition, useEffect, useState } from 'react'
import { Moon, Monitor, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const THEME_OPTIONS = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'black', label: 'Black', icon: Moon },
  { value: 'system', label: 'System', icon: Monitor },
] as const

export function ThemeSwitcher() {
  const [isMounted, setIsMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) {
      return
    }

    if (theme === 'night' || theme === 'cyberpunk' || theme === 'dark') {
      setTheme('black')
    }
  }, [isMounted, setTheme, theme])

  // Render a placeholder during hydration mismatch window
  if (!isMounted) {
    return (
      <Button variant="ghost" size="icon" className="glass rounded-full">
        <Monitor className="h-5 w-5" />
        <span className="sr-only">Changer de theme</span>
      </Button>
    )
  }

  const currentTheme = THEME_OPTIONS.find((option) => option.value === theme) ?? THEME_OPTIONS[2]
  const CurrentIcon = currentTheme.icon

  const handleThemeChange = (nextTheme: (typeof THEME_OPTIONS)[number]['value']) => {
    startTransition(() => {
      setTheme(nextTheme)
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="glass rounded-full hover:bg-primary/10" suppressHydrationWarning>
          <CurrentIcon className="h-5 w-5" />
          <span className="sr-only">Changer de theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="glass">
        {THEME_OPTIONS.map((option) => {
          const Icon = option.icon

          return (
            <DropdownMenuItem
              key={option.value}
              onClick={() => handleThemeChange(option.value)}
              className={theme === option.value ? 'text-primary' : ''}
            >
              <Icon className="h-4 w-4" />
              <span>{option.label}</span>
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
