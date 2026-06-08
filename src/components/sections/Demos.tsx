import { useLang } from '../../i18n'
import { Section } from '../ui/Section'
import { Stagger, StaggerItem } from '../ui/Reveal'
import RouteOptimizer from '../demos/RouteOptimizer'
import HandTracking from '../demos/HandTracking'
import CropOptimization from '../demos/CropOptimization'

const DEMOS = [
  { key: 'route', stage: <RouteOptimizer /> },
  { key: 'hand', stage: <HandTracking /> },
  { key: 'crop', stage: <CropOptimization /> },
]

export default function Demos() {
  const { t } = useLang()
  return (
    <Section id="demos" label={t('demos.label')} title={t('demos.title')}>
      <Stagger className="mt-8 grid gap-4 md:grid-cols-3">
        {DEMOS.map((d) => (
          <StaggerItem key={d.key} className="h-full">
            <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface">
              <div className="relative h-[210px] touch-none border-b border-line bg-[#0e0c0d]">
                {d.stage}
              </div>
              <div className="p-6">
                <h4 className="font-display text-lg font-semibold">{t(`demos.${d.key}.t`)}</h4>
                <p className="mt-1.5 text-[0.86rem] leading-relaxed text-muted">
                  {t(`demos.${d.key}.d`)}
                </p>
                <p className="mt-3 font-mono text-[0.72rem] text-accent2">{t(`demos.${d.key}.p`)}</p>
              </div>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  )
}