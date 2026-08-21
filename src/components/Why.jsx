import Reveal from './Reveal.jsx'

const PILLARS = [
  {
    k: 'CUSTOM',
    t: 'Built around the actual workflow',
    b: 'Not a generic package. Every system starts with understanding the workflow, existing tools and repetitive work involved.',
  },
  {
    k: 'PRACTICAL',
    t: 'Focused on measurable operational value',
    b: 'Not AI for its own sake. We focus on repetitive work where automation can save time, reduce manual effort and create meaningful operational capacity.',
  },
  {
    k: 'ENGINEERED',
    t: 'Built, tested, refined',
    b: 'Systems are engineered and validated — with failure modes and edge cases handled — not just configured.',
  },
  {
    k: 'HUMAN-CENTERED',
    t: 'People keep the judgment',
    b: 'Automation handles the repetition while people retain expertise, relationships and decisions.',
  },
]

export default function Why() {
  return (
    <section id="why">
      <div className="container">
        <div className="section-head">
          <Reveal>
            <span className="eyebrow">Why Greater Automators</span>
            <h2 className="section-title">Built to fit the way you work</h2>
          </Reveal>
        </div>
        <div className="why-grid">
          {PILLARS.map((p, i) => (
            <Reveal key={p.k} delay={(i % 2) * 100}>
              <article className="why-card">
                <span className="why-k mono">{p.k}</span>
                <h3 className="why-title">{p.t}</h3>
                <p className="why-body">{p.b}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
