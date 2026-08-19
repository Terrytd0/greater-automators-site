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
              Good automation should not force a business to change how it
              works. We find the repetitive work and build systems that
              support the people already doing the valuable human work —
              not replace them.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <p className="phil-p">
              This matters when human judgment, relationships and expertise
              are the point. The system takes the repetition off your plate;
              you keep the decisions that need a person.
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
