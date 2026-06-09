import { useEffect, useRef, useState } from 'react'
import { useLang } from '../../i18n'

export default function CropOptimization() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const statRef = useRef<HTMLSpanElement>(null)
  const [hint, setHint] = useState(true)
  const { t } = useLang()

  useEffect(() => {
    const cv = canvasRef.current
    if (!cv) return
    const ctx = cv.getContext('2d')
    if (!ctx) return
    const DPR = 2
    const cols = 11
    const rows = 6
    let W = 0
    let H = 0
    let val: number[] = []
    let tgt: number[] = []
    let raf = 0

    const size = () => {
      const r = cv.getBoundingClientRect()
      cv.width = r.width * DPR
      cv.height = r.height * DPR
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
      W = r.width
      H = r.height
    }
    const reset = () => {
      size()
      val = []
      tgt = []
      for (let i = 0; i < cols * rows; i++) {
        val.push(0.15 + Math.random() * 0.2)
        tgt.push(val[i])
      }
    }
    const touch = (x: number, y: number) => {
      const cw = W / cols
      const ch = H / rows
      const cx = Math.floor(x / cw)
      const cy = Math.floor(y / ch)
      for (let dy = -1; dy <= 1; dy++)
        for (let dx = -1; dx <= 1; dx++) {
          const nx = cx + dx
          const ny = cy + dy
          if (nx < 0 || ny < 0 || nx >= cols || ny >= rows) continue
          const i = ny * cols + nx
          const d = Math.abs(dx) + Math.abs(dy)
          tgt[i] = Math.min(1, tgt[i] + (d === 0 ? 0.5 : 0.22))
        }
      setHint(false)
    }
    const loop = (t0: number) => {
      const cw = W / cols
      const ch = H / rows
      let sum = 0
      for (let i = 0; i < val.length; i++) {
        val[i] += (tgt[i] - val[i]) * 0.12
        tgt[i] += (0.18 - tgt[i]) * 0.004
        sum += val[i]
      }
      ctx.clearRect(0, 0, W, H)
      for (let y = 0; y < rows; y++)
        for (let x = 0; x < cols; x++) {
          const i = y * cols + x
          const v = Math.max(0, Math.min(1, val[i] + Math.sin(t0 / 900 + i) * 0.03))
          ctx.fillStyle = `rgba(184,56,76,${(0.1 + v * 0.7).toFixed(2)})`
          const px = x * cw + 1.5
          const py = y * ch + 1.5
          const w = cw - 3
          const h = ch - 3
          const r = 3
          ctx.beginPath()
          ctx.moveTo(px + r, py)
          ctx.arcTo(px + w, py, px + w, py + h, r)
          ctx.arcTo(px + w, py + h, px, py + h, r)
          ctx.arcTo(px, py + h, px, py, r)
          ctx.arcTo(px, py, px + w, py, r)
          ctx.fill()
        }
      if (statRef.current) statRef.current.textContent = `yield ${Math.round((sum / val.length) * 100)}%`
      raf = requestAnimationFrame(loop)
    }
    const onMove = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect()
      touch(e.clientX - r.left, e.clientY - r.top)
    }

    cv.addEventListener('pointermove', onMove, { passive: true })
    cv.addEventListener('pointerdown', onMove)
    window.addEventListener('resize', reset)
    reset()
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      cv.removeEventListener('pointermove', onMove)
      cv.removeEventListener('pointerdown', onMove)
      window.removeEventListener('resize', reset)
    }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <span
        ref={statRef}
        className="pointer-events-none absolute right-2.5 top-2.5 rounded-md bg-black/30 px-2 py-1 font-mono text-[0.66rem] text-accent2"
      />
      {hint && (
        <span className="pointer-events-none absolute bottom-2.5 left-2.5 flex items-center gap-1.5 rounded-md bg-black/30 px-2 py-1 font-mono text-[0.66rem] text-muted">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent2" />
          {t('demos.crop.hint')}
        </span>
      )}
    </>
  )
}