import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../hooks.js'

const DPR = Math.min(window.devicePixelRatio || 1, 2)

export default function SystemBackground() {
  const canvasRef = useRef(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf = 0
    let W = 0
    let H = 0

    const COUNT = 170
    const stars = []

    function resize() {
      W = window.innerWidth
      H = window.innerHeight
      canvas.width = W * DPR
      canvas.height = H * DPR
      canvas.style.width = W + 'px'
      canvas.style.height = H + 'px'
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
    }
    resize()

    for (let i = 0; i < COUNT; i++) {
      stars.push({
        x: Math.random() * 1,
        y: Math.random() * 1,
        r: Math.random() * 1.4 + 0.3,
        p: Math.random() * Math.PI * 2,
        s: Math.random() * 0.4 + 0.15,
      })
    }

    let t = 0
    function frame() {
      t += 0.004
      ctx.clearRect(0, 0, W, H)
      const g = ctx.createLinearGradient(0, 0, W, H)
      g.addColorStop(0, 'rgba(26, 40, 64, 0.25)')
      g.addColorStop(1, 'rgba(10, 14, 20, 0)')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, W, H)

      for (const s of stars) {
        const tw = 0.25 + 0.75 * Math.abs(Math.sin(s.p + t * s.s))
        const x = s.x * W
        const y = s.y * H
        ctx.beginPath()
        ctx.arc(x, y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(160, 190, 220, ${0.12 * tw + 0.04})`
        ctx.fill()
      }
      raf = requestAnimationFrame(frame)
    }
    frame()

    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [reduced])

  if (reduced) return null

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="system-bg"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.7,
      }}
    />
  )
}
