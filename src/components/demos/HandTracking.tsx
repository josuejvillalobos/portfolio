import { useEffect, useRef, useState } from 'react'
import { useLang } from '../../i18n'

const BASE: [number, number][] = [
  [100, 168], [78, 156], [63, 136], [53, 118], [46, 104],
  [86, 128], [80, 100], [76, 80], [73, 63],
  [100, 122], [100, 92], [100, 70], [100, 50],
  [114, 124], [118, 96], [121, 76], [123, 58],
  [127, 130], [133, 108], [137, 93], [141, 80],
]
const BONES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [5, 6], [6, 7], [7, 8],
  [0, 9], [9, 10], [10, 11], [11, 12], [0, 13], [13, 14], [14, 15], [15, 16],
  [0, 17], [17, 18], [18, 19], [19, 20], [5, 9], [9, 13], [13, 17],
]

export default function HandTracking() {
  const svgRef = useRef<SVGSVGElement>(null)
  const [hint, setHint] = useState(true)
  const { t } = useLang()

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return
    const NS = 'http://www.w3.org/2000/svg'
    const lines = BONES.map(() => {
      const l = document.createElementNS(NS, 'line')
      l.setAttribute('stroke', 'rgba(217,100,122,.5)')
      l.setAttribute('stroke-width', '1.5')
      l.setAttribute('stroke-linecap', 'round')
      svg.appendChild(l)
      return l
    })
    const dots = BASE.map((_, i) => {
      const c = document.createElementNS(NS, 'circle')
      c.setAttribute('r', i === 0 ? '4.5' : '2.7')
      c.setAttribute('fill', i === 0 ? '#f2c2cc' : '#b8384c')
      svg.appendChild(c)
      return c
    })

    let tx = 100
    let ty = 70
    let cur = 0
    let raf = 0
    const [bx, by] = BASE[0]

    const onMove = (e: PointerEvent) => {
      const r = svg.getBoundingClientRect()
      tx = ((e.clientX - r.left) / r.width) * 200
      ty = ((e.clientY - r.top) / r.height) * 210
      setHint(false)
    }
    svg.addEventListener('pointermove', onMove, { passive: true })

    const frame = (tm: number) => {
      const time = tm / 1000
      const ang = Math.atan2(ty - by, tx - bx)
      const baseAng = -Math.PI / 2
      let dth = ang - baseAng
      dth = Math.atan2(Math.sin(dth), Math.cos(dth))
      dth = Math.max(-0.5, Math.min(0.5, dth))
      cur += (dth - cur) * 0.08
      const ca = Math.cos(cur)
      const sa = Math.sin(cur)
      const pos = BASE.map(([px, py], i) => {
        const dx = px - bx
        const dy = py - by
        const x = bx + dx * ca - dy * sa
        const y = by + dx * sa + dy * ca
        return [x + Math.sin(time * 1.6 + i * 0.5) * 1.6, y + Math.cos(time * 1.3 + i * 0.4) * 1.2]
      })
      BONES.forEach(([a, b], k) => {
        lines[k].setAttribute('x1', String(pos[a][0]))
        lines[k].setAttribute('y1', String(pos[a][1]))
        lines[k].setAttribute('x2', String(pos[b][0]))
        lines[k].setAttribute('y2', String(pos[b][1]))
      })
      dots.forEach((c, i) => {
        c.setAttribute('cx', String(pos[i][0]))
        c.setAttribute('cy', String(pos[i][1]))
      })
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      svg.removeEventListener('pointermove', onMove)
      lines.forEach((l) => l.remove())
      dots.forEach((d) => d.remove())
    }
  }, [])

  return (
    <>
      <svg ref={svgRef} viewBox="0 0 200 210" className="absolute inset-0 h-full w-full" />
      {hint && (
        <span className="pointer-events-none absolute bottom-2.5 left-2.5 flex items-center gap-1.5 rounded-md bg-black/30 px-2 py-1 font-mono text-[0.66rem] text-muted">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent2" />
          {t('demos.hand.hint')}
        </span>
      )}
    </>
  )
}