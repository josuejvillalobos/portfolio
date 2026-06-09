import { useEffect, useRef } from 'react'
import './Cursor.css'

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer:fine)').matches) return
    const d = dot.current
    const r = ring.current
    if (!d || !r) return

    document.documentElement.classList.add('js-cur')
    let mx = innerWidth / 2
    let my = innerHeight / 2
    let rx = mx
    let ry = my
    let raf = 0

    const move = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return
      mx = e.clientX
      my = e.clientY
      d.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`
    }
    const loop = () => {
      rx += (mx - rx) * 0.18
      ry += (my - ry) * 0.18
      r.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`
      raf = requestAnimationFrame(loop)
    }
    const sel = 'a, button, [data-cursor], .chip, input, textarea, select'
    const over = (e: PointerEvent) => {
      if ((e.target as Element)?.closest?.(sel)) r.classList.add('hov')
    }
    const out = (e: PointerEvent) => {
      if ((e.target as Element)?.closest?.(sel)) r.classList.remove('hov')
    }

    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerover', over)
    document.addEventListener('pointerout', out)
    loop()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerover', over)
      document.removeEventListener('pointerout', out)
      document.documentElement.classList.remove('js-cur')
    }
  }, [])

  return (
    <>
      <div ref={ring} className="cur-ring" aria-hidden="true" />
      <div ref={dot} className="cur-dot" aria-hidden="true" />
    </>
  )
}