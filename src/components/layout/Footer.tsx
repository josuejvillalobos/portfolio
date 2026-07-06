import { site } from '../../data/site'
import { LocalTime } from '../ui/LocalTime'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-line py-6">
      <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-2 px-[clamp(1.25rem,5vw,4rem)] font-mono text-[0.74rem] text-faint">
        <span>© {year} {site.name} Alferez</span>
        <span>
          Aguascalientes, MX · <LocalTime />
        </span>
      </div>
    </footer>
  )
}