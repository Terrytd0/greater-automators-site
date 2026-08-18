import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '../hooks.js'

export default function CursorGlow() {
  const glowRef = useRef(null)
  const reduced = usePrefersReducedMotion()
  const [fine] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(pointer: fine)').matches
  )

  useEffect(() => {
    if (reduced || !fine) return
    const el = glowRef.current
    let raf = 0
    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let tx = x
    let ty = y

    const onMove = (e) => {
      tx = e.clientX
      ty = e.clientY
    }
    const tick = () => {
      x += (tx - x) * 0.12
      y += (ty - y) * 0.12
      el.style.transform = `translate3d(${x - 250}px, ${y - 250}px, 0)`
      raf = requestAnimationFrame(tick)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [reduced, fine])

  if (reduced || !fine) return null

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 500,
        height: 500,
        zIndex: 1,
        pointerEvents: 'none',
        background:
          'radial-gradient(circle at center, rgba(var(--accent-rgb), 0.07) 0%, rgba(var(--accent2-rgb), 0.04) 40%, transparent 65%)',
      }}
    />
  )
}
