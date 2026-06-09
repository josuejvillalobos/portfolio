import { createContext } from 'react'
import type { Lang } from './data'

export type LangContextValue = {
  lang: Lang
  setLang: (l: Lang) => void
  cycle: () => void
  next: Lang
  t: (path: string) => string
}

export const LangContext = createContext<LangContextValue | null>(null)
