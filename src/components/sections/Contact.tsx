import { useLang } from '../../i18n'
import { site } from '../../data/site'
import { Reveal } from '../ui/Reveal'

const primary =
  'inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-[0.92rem] font-medium text-[#1a0c0f] transition hover:-translate-y-0.5 active:scale-[0.97]'
const ghost =
  'inline-flex items-center gap-2 rounded-full border border-line2 px-6 py-3 text-[0.92rem] font-medium text-text transition hover:bg-white/5 active:scale-[0.97]'

export default function Contact() {
  const { t } = useLang()
  return (
    <section id="contact" className="border-t border-line py-[clamp(4rem,9vh,7rem)]">
      <div className="mx-auto max-w-[1180px] px-[clamp(1.25rem,5vw,4rem)] text-center">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-faint">
            {t('contact.label')}
          </p>
        </Reveal>
        <Reveal>
          <h2 className="mx-auto mt-5 max-w-[24ch] font-display text-[clamp(1.9rem,4vw,3rem)] font-bold leading-[1.06] tracking-tight">
            {t('contact.title')}
          </h2>
        </Reveal>
        <Reveal>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a className={primary} href={`mailto:${site.email}`}>
              {t('contact.email')}
            </a>
            <a className={ghost} href={site.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a className={ghost} href={site.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a className={ghost} href={site.cv} download>
              {t('nav.cv')}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}