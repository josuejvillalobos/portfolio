import { useEffect, useState } from 'react'

function formatTime() {
  return (
    new Intl.DateTimeFormat('en-GB', {
      timeZone: 'America/Mexico_City',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(new Date()) + ' CST'
  )
}

export function LocalTime() {
  const [time, setTime] = useState(formatTime)

  useEffect(() => {
    const interval = window.setInterval(() => setTime(formatTime()), 30_000)
    return () => window.clearInterval(interval)
  }, [])

  return <span>{time}</span>
}
