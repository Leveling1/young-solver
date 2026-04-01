'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { IntlProvider, useIntl } from 'react-intl'
import { type Language, type TranslationKey, translations } from '@/content/translations'

const LANGUAGE_STORAGE_KEY = 'young-solver-language'

type LanguageContextValue = {
  language: Language
  setLanguage: (nextLanguage: Language) => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function isLanguage(value: string | null): value is Language {
  return value === 'fr' || value === 'en'
}

function createMessages(language: Language) {
  return Object.fromEntries(
    Object.entries(translations).map(([key, value]) => [key, value[language]]),
  )
}

function buildLanguageUrl(language: Language) {
  const searchParams = new URLSearchParams(window.location.search)

  if (language === 'fr') {
    searchParams.delete('lang')
  } else {
    searchParams.set('lang', language)
  }

  const nextSearch = searchParams.toString()
  return `${window.location.pathname}${nextSearch ? `?${nextSearch}` : ''}${window.location.hash}`
}

function LanguageContextProvider({
  language,
  setLanguage,
  children,
}: {
  language: Language
  setLanguage: (nextLanguage: Language) => void
  children: React.ReactNode
}) {
  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
    }),
    [language, setLanguage],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('fr')
  const [hasResolvedLanguage, setHasResolvedLanguage] = useState(false)

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const queryLanguage = searchParams.get('lang')
    const storedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY)

    if (isLanguage(queryLanguage)) {
      setLanguageState(queryLanguage)
      localStorage.setItem(LANGUAGE_STORAGE_KEY, queryLanguage)
      setHasResolvedLanguage(true)
      return
    }

    if (isLanguage(storedLanguage)) {
      setLanguageState(storedLanguage)
    }

    setHasResolvedLanguage(true)
  }, [])

  useEffect(() => {
    if (!hasResolvedLanguage) {
      return
    }

    document.documentElement.lang = language
    window.history.replaceState(null, '', buildLanguageUrl(language))
  }, [hasResolvedLanguage, language])

  const setLanguage = useCallback((nextLanguage: Language) => {
    setLanguageState((currentLanguage) => {
      if (currentLanguage === nextLanguage) {
        return currentLanguage
      }

      localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage)
      return nextLanguage
    })
  }, [])

  const messages = useMemo(() => createMessages(language), [language])

  return (
    <IntlProvider locale={language} defaultLocale="fr" messages={messages}>
      <LanguageContextProvider language={language} setLanguage={setLanguage}>
        {children}
      </LanguageContextProvider>
    </IntlProvider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  const intl = useIntl()

  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }

  return {
    ...context,
    t: (key: TranslationKey) =>
      intl.formatMessage({ id: key, defaultMessage: translations[key][context.language] }),
  }
}
