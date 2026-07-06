import { useMemo, useEffect, useCallback, type ReactNode } from 'react'
import { NEXT } from './data'
import type { Lang } from './data'
import { LangContext, type LangContextValue } from './context'
import { DEFAULT_LANG, STORAGE_KEY, translate, isLang, type TranslationPath } from './utils'
import { useLocalStorage } from '../hooks/useLocalStorage'

interface LangProviderProps {
  children: ReactNode
}

export function LangProvider({ children }: LangProviderProps) {
  const [lang, setLang] = useLocalStorage<Lang>(STORAGE_KEY, DEFAULT_LANG, {
    validator: isLang,
  })

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const cycle = useCallback(() => {
    setLang((current) => NEXT[current])
  }, [setLang])

  const value = useMemo<LangContextValue>(() => ({
    lang,
    setLang,
    cycle,
    next: NEXT[lang],
    t: (path: TranslationPath) => translate(lang, path),
  }), [lang, cycle, setLang])

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}
