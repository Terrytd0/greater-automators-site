import { Fragment } from 'react'

const STAGES = [
  {
    id: 'S1',
    state: 'INPUT',
    label: 'Repetitive work',
    sub: 'the work that keeps repeating',
    items: ['inbox', 'forms', 'spreadsheets', 'tickets'],
    tone: 'in',
  },
  {
    id: 'S2',
    state: 'RUN',
    label: 'AI automation',
    sub: 'the custom system',
    items: ['research', 'enrich', 'route', 'report'],
    tone: 'proc',
  },
  {
    id: 'S3',
    state: 'OUTPUT',
    label: 'Useful output',
    sub: 'structured, delivered',
    items: ['reports', 'responses', 'records', 'alerts'],
    tone: 'out',
  },
]

function Pipeline() {
  return (
    <div className="pipeline" aria-hidden="true">
      <div className="pipe-head">
        <span className="pipe-title mono">workflow.transform()</span>
        <span className="pipe-status mono">RUNNING</span>
      </div>
      <div className="pipe-stages">
        {STAGES.map((s, i) => (
          <Fragment key={s.id}>
            <div className={`pipe-stage tone-${s.tone}`}>
              <div className="pipe-stage-top">
                <span className="pipe-id mono">{s.id}</span>
                <span className="pipe-state mono">{s.state}</span>
              </div>
              <div className="pipe-label">{s.label}</div>
              <div className="pipe-sub mono">{s.sub}</div>
              <div className="pipe-items">
                {s.items.map((it) => (
                  <span key={it} className="pipe-chip mono">
                    {it}
                  </span>
                ))}
              </div>
            </div>
            {i < STAGES.length - 1 && (
              <div className="pipe-connector" aria-hidden="true">
                <span className="pipe-flow" style={{ '--d': `${i * 0.55}s` }} />
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="hero-brand hero-enter" style={{ '--d': '0ms' }}>
            <span className="logo-mark" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
                <defs>
                  <linearGradient id="hero-mark-g" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#5ee0c8" />
                    <stop offset="1" stopColor="#6f86ff" />
                  </linearGradient>
                </defs>
                <path
                  d="M4 18L9.5 6.5 13 13l7-6"
                  stroke="url(#hero-mark-g)"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="20" cy="7" r="1.6" fill="#5ee0c8" />
                <circle cx="4" cy="18" r="1.6" fill="#6f86ff" />
              </svg>
            </span>
            <span>Greater Automators</span>
          </div>
          <h1 className="hero-title">
            <span className="hero-line hero-enter" style={{ '--d': '120ms' }}>
              Turn repetitive work
            </span>
            <span className="hero-line hero-enter" style={{ '--d': '220ms' }}>
              into <em className="hero-em">intelligent systems</em>.
            </span>
          </h1>
          <p className="hero-sub hero-enter" style={{ '--d': '340ms' }}>
            We find the repetitive workflows inside a business, then design and
            build custom AI automation around the way it already works.
          </p>
          <div className="hero-cta hero-enter" style={{ '--d': '460ms' }}>
            <a href="#work" className="btn btn-primary">
              Explore the work <span className="btn-arrow">→</span>
            </a>
            <a href="#contact" className="btn btn-ghost">
              Start a conversation
            </a>
          </div>
          <div className="hero-meta hero-enter" style={{ '--d': '560ms' }}>
            <span className="code">identify → design → build → deploy</span>
          </div>
        </div>

        <div className="hero-visual hero-enter" style={{ '--d': '320ms' }}>
          <Pipeline />
        </div>
      </div>

      <div className="hero-scroll" aria-hidden="true">
        <span className="mono">scroll</span>
        <i />
      </div>
    </section>
  )
}
