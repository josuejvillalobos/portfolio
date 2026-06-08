import { useLenis } from './hooks/useLenis'
import Cursor from './components/Cursor'
import Header from './components/layout/Header'
import Hero from './components/sections/Hero'
import Impact from './components/sections/Impact'
import Approach from './components/sections/Approach'
import Work from './components/sections/Work'
import Demos from './components/sections/Demos'
import Stack from './components/sections/Stack'
import { Section } from './components/ui/Section'
import { Reveal } from './components/ui/Reveal'
import { useLang } from './i18n'

// Step 9: + real Stack. Contact still placeholder.
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
      <Work />
      <Demos />
      <Stack />

      <Section id="contact" label={t('contact.label')} title={t('contact.title')}>
        <Reveal>
          <p className="mt-5 text-muted">Placeholder — el contenido real llega en el Paso 10.</p>
        </Reveal>
      </Section>
    </div>
  )
}