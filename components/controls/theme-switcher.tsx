'use client'

import { useEffect, useState } from 'react'
import { Moon, Monitor, Sparkles, Sun } from 'lucide-react'
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
  { value: 'night', label: 'Night', icon: Moon },
  { value: 'black', label: 'Black', icon: Monitor },
  { value: 'cyberpunk', label: 'Cyberpunk', icon: Sparkles },
] as const

export function ThemeSwitcher() {
  const [isMounted, setIsMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <Button variant="ghost" size="icon" className="glass rounded-full">
        <Moon className="h-5 w-5" />
        <span className="sr-only">Changer de theme</span>
      </Button>
    )
  }

  const currentTheme = THEME_OPTIONS.find((option) => option.value === theme) ?? THEME_OPTIONS[1]
  const CurrentIcon = currentTheme.icon

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="glass rounded-full hover:bg-primary/10">
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
              onClick={() => setTheme(option.value)}
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
