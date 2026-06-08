import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

export function Section({
  id,
  label,
  title,
  children,
  className = '',
}: {
  id?: string
  label?: string
  title?: ReactNode
  children?: ReactNode
  className?: string
}) {
  return (
    <section id={id} className={`border-t border-line py-[clamp(3.5rem,8vh,6.5rem)] ${className}`}>
      <div className="mx-auto max-w-[1180px] px-[clamp(1.25rem,5vw,4rem)]">
        {label && (
          <Reveal>
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.18em] text-faint">{label}</p>
          </Reveal>
        )}
        {title && (
          <Reveal>
            <h2 className="max-w-[20ch] font-display text-[clamp(1.7rem,3.4vw,2.7rem)] font-bold leading-[1.08] tracking-tight">
              {title}
            </h2>
          </Reveal>
        )}
        {children}
      </div>
    </section>
  )
}