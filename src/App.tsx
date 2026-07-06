import { useLenis } from './hooks/useLenis'
import { AppShell, Cursor, Hero, Impact, Approach, Work, Demos, Stack, Contact } from './components'

export default function App() {
  useLenis()

  return (
    <AppShell>
      <Cursor />
      <Hero />
      <Impact />
      <Approach />
      <Work />
      <Demos />
      <Stack />
      <Contact />
    </AppShell>
  )
}