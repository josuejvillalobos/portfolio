import { useLenis } from './hooks/useLenis'
import Cursor from './components/Cursor'
import Header from './components/layout/Header'
import Hero from './components/sections/Hero'
import Impact from './components/sections/impact'
import Approach from './components/sections/Approach'
import { Section } from './components/ui/Section'
import { Reveal, Stagger, StaggerItem } from './components/ui/Reveal'
import { Chip } from './components/ui/Chip'
import { useLang } from './i18n'

// Step 6: Header + Hero + Impact + Approach. Stack/Contact still placeholders.
export default function App() {
  useLenis()
  const { t } = useLang()

  return (
    <div id="top">
      <div className="grain" />
      <Cursor />
      <Header />

      <Hero />
      <Impact />
      <Approach />

      <Section id="stack" label={t('stack.label')} title={t('stack.title')}>
        <Reveal>
          <p className="mt-5 max-w-[60ch] text-lg text-muted">{t('stack.note')}</p>
        </Reveal>
        <Stagger className="mt-8 flex flex-wrap gap-2">
          {['Java', 'Python', 'TypeScript', 'Spring Boot', 'React', 'OR-Tools', 'MediaPipe', 'PostgreSQL', 'Docker'].map(
            (s) => (
              <StaggerItem key={s}>
                <Chip>{s}</Chip>
              </StaggerItem>
            ),
          )}
        </Stagger>
      </Section>

      <Section id="contact" label={t('contact.label')} title={t('contact.title')}>
        <Reveal>
          <p className="mt-5 text-muted">Placeholder — el contenido real llega en su paso.</p>
        </Reveal>
      </Section>
    </div>
  )
}