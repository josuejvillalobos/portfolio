import { useEffect, useRef, useState } from 'react'
import { useLang } from '../../i18n'

type Pt = { x: number; y: number }

export default function RouteOptimizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dist, setDist] = useState<number | null>(null)
  const [hint, setHint] = useState(true)
  const { t } = useLang()

  useEffect(() => {
    const cv = canvasRef.current
    if (!cv) return
    const ctx = cv.getContext('2d')
    if (!ctx) return
    const DPR = 2
    let W = 0
    let H = 0
    let pts: Pt[] = []
    let order: number[] = []
    let segs: { a: Pt; b: Pt; d: number }[] = []
    let total = 0
    let marker = 0
    let raf = 0

    const size = () => {
      const r = cv.getBoundingClientRect()
      cv.width = r.width * DPR
      cv.height = r.height * DPR
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
      W = r.width
      H = r.height
    }
    const nn = () => {
      if (pts.length < 2) return pts.map((_, i) => i)
      const v = [0]
      const seen = new Set([0])
      while (v.length < pts.length) {
        const last = pts[v[v.length - 1]]
        let b = -1
        let bd = Infinity
        pts.forEach((p, i) => {
          if (seen.has(i)) return
          const dd = (p.x - last.x) ** 2 + (p.y - last.y) ** 2
          if (dd < bd) {
            bd = dd
            b = i
          }
        })
        v.push(b)
        seen.add(b)
      }
      return v
    }
    const build = () => {
      order = nn()
      const loop = order.concat([order[0]])
      segs = []
      total = 0
      for (let k = 0; k < loop.length - 1; k++) {
        const a = pts[loop[k]]
        const b = pts[loop[k + 1]]
        const d = Math.hypot(b.x - a.x, b.y - a.y)
        segs.push({ a, b, d })
        total += d
      }
      marker = 0
      setDist(Math.round(total))
    }
    const add = (x: number, y: number) => {
      if (pts.length >= 15) pts = []
      pts.push({ x, y })
      build()
      setHint(false)
    }
    const pos = (m: number): Pt => {
      let acc = 0
      for (const s of segs) {
        if (m <= acc + s.d || s === segs[segs.length - 1]) {
          const tt = Math.max(0, Math.min(1, (m - acc) / (s.d || 1)))
          return { x: s.a.x + (s.b.x - s.a.x) * tt, y: s.a.y + (s.b.y - s.a.y) * tt }
        }
        acc += s.d
      }
      return pts[0] || { x: 0, y: 0 }
    }
    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      if (segs.length) {
        ctx.strokeStyle = 'rgba(217,100,122,.18)'
        ctx.lineWidth = 6
        ctx.lineJoin = 'round'
        ctx.beginPath()
        segs.forEach((s, k) => {
          if (k === 0) ctx.moveTo(s.a.x, s.a.y)
          ctx.lineTo(s.b.x, s.b.y)
        })
        ctx.stroke()
        ctx.strokeStyle = 'rgba(217,100,122,.85)'
        ctx.lineWidth = 1.4
        ctx.stroke()
      }
      const start = order[0] ?? 0
      pts.forEach((p, i) => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, i === start ? 5 : 3.4, 0, 7)
        ctx.fillStyle = i === start ? '#d9647a' : '#b8384c'
        ctx.fill()
      })
      if (total > 0) {
        const m = pos(marker)
        ctx.beginPath()
        ctx.arc(m.x, m.y, 4.5, 0, 7)
        ctx.fillStyle = '#f2c2cc'
        ctx.fill()
        ctx.beginPath()
        ctx.arc(m.x, m.y, 8, 0, 7)
        ctx.strokeStyle = 'rgba(242,194,204,.4)'
        ctx.lineWidth = 1
        ctx.stroke()
      }
    }
    const loop = () => {
      if (total > 0) {
        marker += Math.max(0.6, total / 260)
        if (marker > total) marker = 0
      }
      draw()
      raf = requestAnimationFrame(loop)
    }
    const seed = () => {
      size()
      pts = []
      for (let k = 0; k < 7; k++) pts.push({ x: 24 + Math.random() * (W - 48), y: 24 + Math.random() * (H - 48) })
      build()
    }
    const onDown = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect()
      add(e.clientX - r.left, e.clientY - r.top)
    }
    const onResize = () => {
      const old = pts.slice()
      size()
      pts = old
      build()
    }

    cv.addEventListener('pointerdown', onDown)
    window.addEventListener('resize', onResize)
    seed()
    loop()
    return () => {
      cancelAnimationFrame(raf)
      cv.removeEventListener('pointerdown', onDown)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      {dist != null && (
        <span className="pointer-events-none absolute right-2.5 top-2.5 rounded-md bg-black/30 px-2 py-1 font-mono text-[0.66rem] text-accent2">
          ≈ {dist} px
        </span>
      )}
      {hint && (
        <span className="pointer-events-none absolute bottom-2.5 left-2.5 flex items-center gap-1.5 rounded-md bg-black/30 px-2 py-1 font-mono text-[0.66rem] text-muted">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent2" />
          {t('demos.route.hint')}
        </span>
      )}
    </>
  )
}