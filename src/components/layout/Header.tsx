import { useLang } from '../../i18n'
import { site } from '../../data/site'

const switcher =
  'rounded-full border border-line2 bg-surface px-3 py-2 text-[0.82rem] font-medium text-text transition hover:border-line hover:text-accent2 active:scale-[0.97]'

export default function Header() {
  const { t, cycle, next } = useLang()

  return (
    <header className="border-b border-line">
      <nav className="mx-auto flex max-w-[1180px] items-center justify-between px-[clamp(1.25rem,5vw,4rem)] py-4">
        <a href="#top" className="font-display text-lg font-bold">
          {site.name}
        </a>
        <div className="flex items-center gap-4 text-sm">
          <a href="#work" className="hover:underline">
            {t('nav.work') || 'Work'}
          </a>
          <a href="#contact" className="hover:underline">
            {t('nav.contact') || 'Contact'}
          </a>
          <button type="button" className={switcher} onClick={cycle}>
            {t(`lang.${next}`)}
          </button>
        </div>
      </nav>
    </header>
  )
}