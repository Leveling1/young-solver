'use client'

import { Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useLanguage } from '@/providers/language-provider'

const LANGUAGE_OPTIONS = [
  { value: 'fr', label: 'Francais' },
  { value: 'en', label: 'English' },
] as const

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative glass rounded-full">
          <Globe className="h-5 w-5" />
          <span className="sr-only">Changer de langue</span>
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold uppercase text-primary-foreground">
            {language}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="glass">
        {LANGUAGE_OPTIONS.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => setLanguage(option.value)}
            className={language === option.value ? 'bg-primary/10 text-primary' : ''}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
