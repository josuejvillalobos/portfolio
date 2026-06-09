import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { useLang } from '../../i18n'
import { site } from '../../data/site'
import { Button } from '../ui/Button'

const EASE = [0.2, 0.7, 0.2, 1] as const

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
}
const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  )
}
function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

const iconBtn =
  'inline-flex h-9 w-9 items-center justify-center rounded-[10px] border border-line text-muted transition hover:border-line2 hover:text-text'

export default function Hero() {
  const { t } = useLang()
  const reduce = useReducedMotion()
  const MV = reduce ? {} : { variants: container, initial: 'hidden' as const, animate: 'show' as const }
  const IV = reduce ? {} : { variants: item }

  return (
    <section className="relative isolate overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(55% 45% at 82% 6%, rgba(184,56,76,.18), transparent 70%), radial-gradient(45% 40% at 6% 95%, rgba(120,120,140,.07), transparent 70%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-50"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.07) 1px, transparent 1px)',
          backgroundSize: '88px 88px',
          WebkitMaskImage: 'radial-gradient(120% 80% at 50% 0%, #000 30%, transparent 78%)',
          maskImage: 'radial-gradient(120% 80% at 50% 0%, #000 30%, transparent 78%)',
        }}
      />

      <motion.div
        {...MV}
        className="mx-auto flex min-h-[88vh] max-w-[1180px] flex-col justify-center px-[clamp(1.25rem,5vw,4rem)] py-28"
      >
        <motion.div {...IV} className="mb-6 flex items-center gap-3">
          <span className="h-px w-9 bg-accent2/70" />
          <span className="font-mono text-[0.78rem] uppercase tracking-[0.16em] text-accent2">
            {t('hero.eyebrow')}
          </span>
        </motion.div>

        <motion.h1
          {...IV}
          className="max-w-[18ch] font-display text-[clamp(2.3rem,6.2vw,5.2rem)] font-bold leading-[1.02] tracking-tight"
        >
          {t('hero.headlinePre')}
          <span className="font-semibold italic text-accent2">{t('hero.headlineHl')}</span>
          {t('hero.headlinePost')}
        </motion.h1>

        <motion.p {...IV} className="mt-8 max-w-[50ch] text-[clamp(1rem,1.35vw,1.2rem)] leading-relaxed text-muted">
          {t('hero.sub')}
        </motion.p>

        <motion.div {...IV} className="mt-10 flex flex-wrap items-center gap-3">
          <Button variant="primary" arrow href="#work">
            {t('hero.ctaWork')}
          </Button>
          <a
            href={site.cv}
            download
            className="inline-flex items-center gap-2 rounded-full border border-line2 px-6 py-3 text-[0.92rem] font-medium text-text transition hover:bg-white/5 active:scale-[0.97]"
          >
            {t('hero.ctaCv')}
          </a>
          <span className="ml-1 flex gap-2">
            <a className={iconBtn} href={site.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <GitHubIcon />
            </a>
            <a className={iconBtn} href={site.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <LinkedInIcon />
            </a>
          </span>
        </motion.div>
      </motion.div>
    </section>
  )
}