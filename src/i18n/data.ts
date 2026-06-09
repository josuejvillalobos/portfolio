import en from './en.json'
import es from './es.json'
import de from './de.json'

export type Lang = 'en' | 'es' | 'de'

export const ORDER: Lang[] = ['en', 'es', 'de']
export const NEXT: Record<Lang, Lang> = { en: 'es', es: 'de', de: 'en' }
export const dictionaries = { en, es, de } as const
