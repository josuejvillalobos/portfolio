import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  href?: string
  variant?: 'primary' | 'ghost'
  arrow?: boolean
  className?: string
}

export function Button({
  children,
  href = '#',
  variant = 'primary',
  arrow = false,
  className = '',
}: Props) {
  const base =
    'group inline-flex items-center gap-2 rounded-full px-6 py-3 text-[0.92rem] font-medium transition active:scale-[0.97]'
  const styles =
    variant === 'primary'
      ? 'bg-accent text-[#1a0c0f] hover:-translate-y-0.5'
      : 'border border-line2 text-text hover:bg-white/5'
  return (
    <a href={href} className={`${base} ${styles} ${className}`}>
      {children}
      {arrow && <span className="transition-transform group-hover:translate-x-1">→</span>}
    </a>
  )
}