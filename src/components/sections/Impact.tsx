import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import { useLang } from '../../i18n'
import { Section } from '../ui/Section'
import { Reveal } from '../ui/Reveal'

const METRICS = [
  { to: 35, prefix: '−', suffix: '%', key: 'metrics.travel' },
  { to: 70, prefix: '−', suffix: '%', key: 'metrics.compute' },
  { to: 60, prefix: '−', suffix: '%', key: 'metrics.org' },
  { to: 4, prefix: '', suffix: '×', key: 'metrics.hack' },
]

function CountUp({ to, prefix = '', suffix = '' }: { to: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })
  const reduce = useReducedMotion()
  const [v, setV] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setV(to)
      return
    }
    let raf = 0
    let start: number | null = null
    const step = (t: number) => {
      if (start === null) start = t
      const p = Math.min((t - start) / 1100, 1)
      setV(Math.round(p * to))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, reduce, to])

  return (
    <span ref={ref}>
      {prefix}
      {v}
      <span className="text-accent2">{suffix}</span>
    </span>
  )
}

export default function Impact() {
  const { t } = useLang()
  return (
    <Section id="impact" label={t('impact.label')} title={t('impact.title')}>
      <Reveal>
        <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
          {METRICS.map((m) => (
            <div key={m.key} className="bg-surface p-6">
              <div className="font-display text-[clamp(2.2rem,4vw,3rem)] font-bold tracking-tight">
                <CountUp to={m.to} prefix={m.prefix} suffix={m.suffix} />
              </div>
              <p className="mt-2 text-sm leading-snug text-muted">{t(m.key)}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  )
}