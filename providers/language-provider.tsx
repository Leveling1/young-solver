'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
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
    [language],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
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

  const messages = useMemo(() => createMessages(language), [language])

  return (
    <IntlProvider locale={language} messages={messages}>
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
    t: (key: TranslationKey) => intl.formatMessage({ id: key, defaultMessage: translations[key][context.language] }),
  }
}
