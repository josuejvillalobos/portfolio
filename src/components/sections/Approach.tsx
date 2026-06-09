import { useLang } from '../../i18n'
import { Section } from '../ui/Section'
import { Reveal } from '../ui/Reveal'

export default function Approach() {
  const { t } = useLang()
  return (
    <Section id="approach" label={t('approach.label')} title={t('approach.title')}>
      <div className="mt-7 max-w-[62ch] space-y-5">
        <Reveal>
          <p className="text-[clamp(1.05rem,1.5vw,1.35rem)] leading-relaxed text-muted">
            {t('approach.body')}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-[clamp(1.05rem,1.5vw,1.35rem)] leading-relaxed text-muted">
            {t('approach.body2')}
          </p>
        </Reveal>
      </div>
    </Section>
  )
}