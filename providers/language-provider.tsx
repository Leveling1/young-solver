'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { type Language, type TranslationKey, getTranslation } from '@/content/translations'

const LANGUAGE_STORAGE_KEY = 'young-solver-language'

type LanguageContextValue = {
  language: Language
  setLanguage: (nextLanguage: Language) => void
  t: (key: TranslationKey) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function isLanguage(value: string | null): value is Language {
  return value === 'fr' || value === 'en'
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('fr')

  useEffect(() => {
    const storedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY)

    if (isLanguage(storedLanguage)) {
      setLanguageState(storedLanguage)
    }
  }, [])

  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage)
    localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage)
  }

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      t: (key) => getTranslation(language, key),
    }),
    [language],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)

  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }

  return context
}
