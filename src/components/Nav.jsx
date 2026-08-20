import { useEffect, useState } from 'react'
import { useScrollY } from '../hooks.js'

const LINKS = [
  { id: 'work', label: 'Work' },
  { id: 'capabilities', label: 'Capabilities' },
  { id: 'process', label: 'Process' },
  { id: 'about', label: 'Founder' },
  { id: 'contact', label: 'Contact' },
]

function Logo() {
  return (
    <a href="#top" className="logo" aria-label="Greater Automators — home">
      <img
        className="logo-banner"
        src="/greater-automators-banner.png"
        alt="Greater Automators"
      />
    </a>
  )
}

export default function Nav() {
  const y = useScrollY()
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setScrolled(y > 24)
  }, [y])

  useEffect(() => {
    const ids = ['work', 'capabilities', 'process', 'about', 'contact']
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id)
        }
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const progress = Math.min(100, (y / (document.body.scrollHeight - window.innerHeight)) * 100)

  return (
    <>
      <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner container">
          <Logo />
          <nav className="nav-links" aria-label="Primary">
            {LINKS.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                className={`nav-link ${active === l.id ? 'active' : ''}`}
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="nav-actions">
            <a href="#contact" className="btn btn-primary nav-cta">
              Start a Conversation
            </a>
            <button
              className={`menu-toggle ${open ? 'open' : ''}`}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
        <div className="nav-progress" style={{ width: `${progress}%` }} />
      </header>

      <div className={`mobile-menu ${open ? 'open' : ''}`} aria-hidden={!open}>
        <nav aria-label="Mobile">
          {LINKS.map((l, i) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              style={{ '--i': i }}
              onClick={() => setOpen(false)}
            >
              <span className="mm-idx mono">0{i + 1}</span>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="mobile-foot">
          <a
            href="mailto:terry@greaterautomators.com"
            className="btn btn-primary"
          >
            Start a Conversation
          </a>
          <a
            className="mono muted"
            href="mailto:terry@greaterautomators.com"
          >
            terry@greaterautomators.com
          </a>
        </div>
      </div>
    </>
  )
}
