import { useEffect, useState } from 'react'

type Serializer<T> = (value: T) => string
type Deserializer<T> = (value: string) => T

type UseLocalStorageOptions<T> = {
  serializer?: Serializer<T>
  deserializer?: Deserializer<T>
  validator?: (value: unknown) => value is T
}

const defaultSerializer = <T,>(value: T): string => JSON.stringify(value)
const defaultDeserializer = <T,>(value: string): T => JSON.parse(value)

export function useLocalStorage<T>(
  key: string,
  defaultValue: T,
  options: UseLocalStorageOptions<T> = {},
) {
  const {
    serializer = defaultSerializer,
    deserializer = defaultDeserializer,
    validator,
  } = options

  const [state, setState] = useState<T>(() => {
    if (typeof window === 'undefined') return defaultValue
    try {
      const stored = window.localStorage.getItem(key)
      if (stored === null) return defaultValue
      const parsed = deserializer(stored)
      return validator?.(parsed) ?? true ? parsed : defaultValue
    } catch {
      return defaultValue
    }
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      window.localStorage.setItem(key, serializer(state))
    } catch {
      // ignore storage write failures for private mode or quota issues
    }
  }, [key, state, serializer])

  return [state, setState] as const
}
