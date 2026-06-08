import { useLang } from '../../i18n'
import { projects } from '../../data/site'
import { Section } from '../ui/Section'
import { Stagger, StaggerItem } from '../ui/Reveal'

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[16px] w-[16px]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  )
}
function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[16px] w-[16px]" fill="currentColor">
      <path d="M5 3l14 9-14 9V3z" />
    </svg>
  )
}

const plink =
  'inline-flex items-center gap-1.5 rounded-full border border-line px-3.5 py-2 text-[0.82rem] text-muted transition hover:border-line2 hover:text-text'

export default function Work() {
  const { t } = useLang()
  return (
    <Section id="work" label={t('work.label')} title={t('work.title')}>
      <Stagger className="mt-8 grid gap-4 md:grid-cols-2">
        {projects.map((p) => (
          <StaggerItem key={p.id} className="h-full">
            <article className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-7 transition hover:-translate-y-1 hover:border-line2">
              <span className="font-mono text-xs tracking-wide text-accent2">
                {p.tagKey ? t(p.tagKey) : p.meta}
              </span>
              <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight">{p.title}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">
                {t(`projects.${p.id}.desc`)}
              </p>

              <div className="mt-5 flex flex-wrap gap-7">
                {p.metrics.map((m) => (
                  <div key={m.labelKey}>
                    <div className="font-display text-xl font-bold">{m.value}</div>
                    <div className="text-[0.72rem] uppercase tracking-wide text-faint">
                      {t(m.labelKey)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-auto flex gap-2.5 pt-6">
                {p.demo && (
                  <a href={p.demo} className={plink}>
                    <PlayIcon />
                    {t('projects.demoLink')}
                  </a>
                )}
                <a href={p.code} target="_blank" rel="noreferrer" className={plink}>
                  <GitHubIcon />
                  {t('projects.codeLink')}
                </a>
              </div>
            </article>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  )
}