import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

// Smooth, inertial scrolling. Disabled automatically for prefers-reduced-motion.
// If the CSS import above ever errors, you can delete that line — Lenis still works.
export function useLenis() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true })
    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [])
}