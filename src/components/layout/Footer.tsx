import { useEffect, useState } from 'react'
import { site } from '../../data/site'

function Clock() {
  const fmt = () =>
    new Intl.DateTimeFormat('en-GB', {
      timeZone: 'America/Mexico_City',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(new Date()) + ' CST'
  const [time, setTime] = useState(fmt)
  useEffect(() => {
    const id = setInterval(() => setTime(fmt), 30000)
    return () => clearInterval(id)
  }, [])
  return <span>{time}</span>
}

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-line py-6">
      <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-2 px-[clamp(1.25rem,5vw,4rem)] font-mono text-[0.74rem] text-faint">
        <span>© {year} {site.name} Alferez</span>
        <span>
          Aguascalientes, MX · <Clock />
        </span>
      </div>
    </footer>
  )
}