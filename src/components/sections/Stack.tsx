import { useLang } from '../../i18n'
import { Section } from '../ui/Section'
import { Reveal, Stagger, StaggerItem } from '../ui/Reveal'
import { Chip } from '../ui/Chip'

type Item = { label?: string; tKey?: string }
const GROUPS: { titleKey: string; items: Item[] }[] = [
  {
    titleKey: 'stack.lang',
    items: [
      { label: 'Java' },
      { label: 'Javascript'},
      { label: 'TypeScript' },
      { label: 'Python' },
      { label: 'SQL' },
      { label: 'R' },
    ],
  },
  {
    titleKey: 'stack.backend',
    items: [
      { label: 'Spring Boot' },
      { label: 'JWT' },
      { label: 'JPA' },
      { label: 'Hibernate' },
      { label: 'Spring Cache' },
    ],
  },
  {
    titleKey: 'stack.frontend',
    items: [
      { label: 'React' },
      { label: 'Vite' },
      { label: 'Zustand' },
      { label: 'TanStack Query' },
      { label: 'Tailwind, CSS' },
    
    ],
  },
  {
    titleKey: 'stack.ai',
    items: [
      { label: 'Machine learning (scikit-learn)' },
      { label: 'Metaheuristic algorithms (Simulated Annealing)' },
      { label: 'Deep learning' },
      { label: 'Fuzzy logic' },
      { label: 'Training Model'},
      { label: 'Computer Vision' },
      { label: 'Neural networks' },
      { label: 'Constraint-based optimization' },
    ],
  },
  {
    titleKey: 'stack.pipeline',
    items: [
      { label: 'pandas' },
      { label: 'numpy' },
      { label: 'FastAPI microservices' },
      { label: 'joblib' },
    ],
  },
  {
    titleKey: 'stack.database',
    items: [
      { label: 'PostgreSQL' },
      { label: 'Redis' },
      { label: 'MongoDB'}
    ],
  },
  {
    titleKey: 'stack.devops',
    items: [
      { label: 'Docker' },
      { label: 'Docker Compose' },
      { label: 'Testcontainers' },
      { label: 'Git/GitHub' },
    ],
  },
  {
    titleKey: 'stack.testing',
    items: [
      { label: 'JUnit 5' },
      { label: 'Mockito' },
      { label: 'JaCoCo' },
      { label: 'Spring Boot Test' },
    ],
  },
  {
    titleKey: 'stack.arch',
    items: [
      { label: 'REST APIs' },
      { label: 'Microservices' },
      { label: 'MVC' },
      { label: 'SOLID principles' },
    ],
  },
  {
    titleKey: 'stack.tools',
    items: [
      { label: 'Power BI' },
      { label: 'Excel' },
      { label: 'Linux' },
      { label: 'Swagger/OpenAPI' },
      { label: 'Postman' },
    ],
  },
  { titleKey: 'stack.IoT',
    items: [
      { label: 'Arudino' },
      { label: 'ESP32' },
      { label: 'circuit design & wiring' },
      { label: 'Sensor calibration & integration' },
      { label: 'IoT protocols/architectures' },
    ]
  },
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