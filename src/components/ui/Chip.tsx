import type { ReactNode } from 'react'

export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="chip rounded-full border border-line bg-surface2 px-3.5 py-1.5 text-sm text-text transition hover:border-accent hover:text-accent2">
      {children}
    </span>
  )
}