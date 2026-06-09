import { useLenis } from './hooks/useLenis'
import { Cursor, Header, Footer, Hero, Impact, Approach, Work, Demos, Stack, Contact } from './components'

export default function App() {
  useLenis()

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
      <Contact />

      <Footer />
    </div>
  )
}