import { useLang } from '../../i18n'

export default function Header() {
  const { t } = useLang()

  return (
    <header className="border-b border-line">
      <nav className="mx-auto flex max-w-[1180px] items-center justify-between px-[clamp(1.25rem,5vw,4rem)] py-4">
        <a href="#top" className="font-display text-lg font-bold">
          {t('site.name') || 'Josue Villalobos'}
        </a>
        <div className="flex items-center gap-4 text-sm">
          <a href="#work" className="hover:underline">
            {t('nav.work') || 'Work'}
          </a>
          <a href="#contact" className="hover:underline">
            {t('nav.contact') || 'Contact'}
          </a>
        </div>
      </nav>
    </header>
  )
}