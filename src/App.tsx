import { useLang } from './i18n'

// Temporary shell to verify Step 1 (palette, fonts, trilingual toggle).
// We replace this with the real Header + sections in the next steps.
export default function App() {
  const { t, cycle, next } = useLang()

  return (
    <>
      <div className="grain" />

      <button
        onClick={cycle}
        className="fixed top-6 right-6 z-10 rounded-full border border-line px-4 py-2 font-mono text-xs text-muted transition hover:border-line2 hover:text-text"
      >
        {next.toUpperCase()}
      </button>

      <main className="mx-auto flex min-h-dvh max-w-5xl flex-col justify-center px-6 md:px-16">
        <p className="mb-6 font-mono text-sm uppercase tracking-[0.16em] text-accent2">
          {t('hero.eyebrow')}
        </p>
        <h1 className="max-w-[18ch] font-display text-4xl font-bold leading-[1.02] tracking-tight md:text-6xl lg:text-7xl">
          {t('hero.headlinePre')}
          <span className="font-semibold italic text-accent2">{t('hero.headlineHl')}</span>
          {t('hero.headlinePost')}
        </h1>
        <p className="mt-8 max-w-[50ch] text-lg text-muted md:text-xl">{t('hero.sub')}</p>
      </main>
    </>
  )
}