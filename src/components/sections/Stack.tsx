import { useLang } from '../../i18n'
import { Section } from '../ui/Section'
import { Reveal, Stagger, StaggerItem } from '../ui/Reveal'
import { Chip } from '../ui/Chip'

type Item = { label?: string; tKey?: string }
const GROUPS: { titleKey: string; items: Item[] }[] = [
  { titleKey: 'stack.lang', items: [{ label: 'Java' }, { label: 'Python' }, { label: 'TypeScript' }, { label: 'SQL' }] },
  { titleKey: 'stack.fw', items: [{ label: 'Spring Boot' }, { label: 'React' }, { label: 'OR-Tools' }, { label: 'MediaPipe' }] },
  { titleKey: 'stack.ai', items: [{ tKey: 'stack.ml' }, { tKey: 'stack.meta' }, { tKey: 'stack.fuzzy' }, { tKey: 'stack.constr' }] },
  { titleKey: 'stack.data', items: [{ label: 'PostgreSQL' }, { label: 'Docker' }, { label: 'Power BI' }, { label: 'Linux' }, { label: 'Git' }] },
]

export default function Stack() {
  const { t } = useLang()
  return (
    <Section id="stack" label={t('stack.label')} title={t('stack.title')}>
      <Reveal>
        <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-muted">{t('stack.note')}</p>
      </Reveal>
      <Stagger className="mt-10 grid gap-9 sm:grid-cols-2 lg:grid-cols-4">
        {GROUPS.map((g) => (
          <StaggerItem key={g.titleKey}>
            <h4 className="mb-4 font-mono text-[0.78rem] uppercase tracking-[0.1em] text-faint">
              {t(g.titleKey)}
            </h4>
            <div className="flex flex-wrap gap-2">
              {g.items.map((it, i) => (
                <Chip key={i}>{it.tKey ? t(it.tKey) : it.label}</Chip>
              ))}
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  )
}