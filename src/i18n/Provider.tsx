import { useState, useMemo, useEffect, type ReactNode } from 'react'
import { dictionaries, NEXT } from './data'
import type { Lang } from './data'
import { LangContext, type LangContextValue } from './context'

function resolve(obj: unknown, path: string): unknown {
  return path
    .split('.')
    .reduce<unknown>(
      (acc, key) =>
        acc && typeof acc === 'object' ? (acc as Record<string, unknown>)[key] : undefined,
      obj,
    )
}

function readStored(): Lang {
  try {
    const s = localStorage.getItem('lang')
    if (s === 'en' || s === 'es' || s === 'de') return s
  } catch (error) {
    void error
  }
  return 'en'
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(readStored)

  useEffect(() => {
    try {
      localStorage.setItem('lang', lang)
    } catch (error) {
      void error
    }
    document.documentElement.lang = lang
  }, [lang])

  const value = useMemo<LangContextValue>(
    () => ({
      lang,
      setLang,
      cycle: () => setLang((prev) => NEXT[prev]),
      next: NEXT[lang],
      t: (path: string) => {
        const found = resolve(dictionaries[lang], path)
        return typeof found === 'string' ? found : path
      },
    }),
    [lang],
  )

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}
