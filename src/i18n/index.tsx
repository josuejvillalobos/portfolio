import {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
  type ReactNode,
} from 'react'
import en from './en.json'
import es from './es.json'
import de from './de.json'

export type Lang = 'en' | 'es' | 'de'

const dictionaries = { en, es, de } as const
export const ORDER: Lang[] = ['en', 'es', 'de']
const NEXT: Record<Lang, Lang> = { en: 'es', es: 'de', de: 'en' }

type LangContextValue = {
  lang: Lang
  setLang: (l: Lang) => void
  cycle: () => void
  next: Lang
  // Dot-path lookup: t('hero.sub'), t('projects.route.desc'). Falls back to the path if missing.
  t: (path: string) => string
}

const LangContext = createContext<LangContextValue | null>(null)

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
  } catch {
    /* ignore */
  }
  return 'en'
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(readStored)

  useEffect(() => {
    try {
      localStorage.setItem('lang', lang)
    } catch {
      /* ignore */
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

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used within <LangProvider>')
  return ctx
}