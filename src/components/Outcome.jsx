import Reveal from './Reveal.jsx'

const PILLARS = [
  {
    k: 'TIME',
    tone: 'time',
    t: 'Less repetitive manual work',
    b: 'Automate the steps that keep repeating so your team spends fewer hours on manual, repeatable effort.',
  },
  {
    k: 'COST',
    tone: 'cost',
    t: 'Lower operating effort',
    b: 'Reduce the operating effort tied to repetitive administration, manual handoffs and rework.',
  },
  {
    k: 'CAPACITY',
    tone: 'capacity',
    t: 'More productive human time',
    b: 'Give your existing team more room for the work that needs judgment, relationships and expertise.',
  },
]

export default function Outcome() {
  return (
    <section id="outcome" className="outcome">
      <div className="container">
        <div className="outcome-head">
          <Reveal>
            <span className="eyebrow">The outcome</span>
            <h2 className="section-title">
              Less repetitive work.
              <br />
              Less manual cost.
              <br />
              More capacity for the work that matters.
            </h2>
          </Reveal>
        </div>
        <div className="outcome-grid">
          {PILLARS.map((p, i) => (
            <Reveal key={p.k} delay={i * 100}>
              <article className={`outcome-card outcome-${p.tone}`}>
                <span className="outcome-k mono">{p.k}</span>
                <h3 className="outcome-title">{p.t}</h3>
                <p className="outcome-body">{p.b}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
