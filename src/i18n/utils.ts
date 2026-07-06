import type { Lang } from './data'
import { dictionaries } from './data'

export const STORAGE_KEY = 'lang'
export const DEFAULT_LANG: Lang = 'en'

export type TranslationPath = string

export function isLang(value: unknown): value is Lang {
  return value === 'en' || value === 'es' || value === 'de'
}

export function getInitialLang(): Lang {
  if (typeof window === 'undefined') return DEFAULT_LANG
  try {
    const savedLang = window.localStorage.getItem(STORAGE_KEY)
    return isLang(savedLang) ? savedLang : DEFAULT_LANG
  } catch {
    return DEFAULT_LANG
  }
}

export function resolveTranslation(object: unknown, path: TranslationPath): string | undefined {
  return path
    .split('.')
    .reduce<unknown>((current, key) => {
      if (current && typeof current === 'object') {
        return (current as Record<string, unknown>)[key]
      }
      return undefined
    }, object) as string | undefined
}

export function translate(lang: Lang, path: TranslationPath): string {
  const value = resolveTranslation(dictionaries[lang], path)
  return typeof value === 'string' ? value : path
}
