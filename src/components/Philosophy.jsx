import Reveal from './Reveal.jsx'

const LAYERS = [
  { name: 'The people', role: 'judgment · relationships · expertise', h: '16%' },
  { name: 'The system', role: 'repetitive work · orchestration', h: '20%' },
  { name: 'The data', role: 'inputs · records · evidence', h: '20%' },
]

export default function Philosophy() {
  return (
    <section id="philosophy" className="phil">
      <div className="container phil-grid">
        <div className="phil-copy">
          <Reveal>
            <span className="eyebrow">Automation Philosophy</span>
            <h2 className="section-title">
              Automation should disappear
              <br />
              into the workflow.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="phil-p">
              Good automation should disappear into the workflow. The goal
              isn&rsquo;t to automate people out of the process. It&rsquo;s to
              remove the repetitive work that consumes their time and operating
              capacity.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <p className="phil-p">
              The system handles repetition and orchestration. People keep the
              judgment, relationships and expertise — the decisions that still
              need a person.
            </p>
          </Reveal>
        </div>

        <div className="phil-visual" aria-hidden="true">
          <div className="phil-legend mono">
            <span>human</span>
            <span>system</span>
            <span>data</span>
          </div>
          {LAYERS.map((l, i) => (
            <Reveal key={l.name} delay={i * 130} className="phil-layer-wrap">
              <div
                className={`phil-layer layer-${i}`}
                style={{ '--h': l.h }}
              >
                <span className="phil-layer-name">{l.name}</span>
                <span className="phil-layer-role mono">{l.role}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
