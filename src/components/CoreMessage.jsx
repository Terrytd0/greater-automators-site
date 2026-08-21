import Reveal from './Reveal.jsx'

export default function CoreMessage() {
  return (
    <section className="core" id="core">
      <div className="container">
        <div className="core-statement">
          <Reveal>
            <span className="eyebrow">Approach</span>
            <h2 className="core-quote">
              We don&rsquo;t start with a generic automation package.
              <br />
              <span className="core-accent">
                We start with the workflow.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="core-body">
              Every business has repetitive processes that consume human
              time — time that could go to judgment, relationships and
              expertise. We find those processes, determine where automation
              can genuinely reduce manual effort, and build a system around
              the way your team already works — not the other way around.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <p className="core-outcome">
              Automation isn&rsquo;t the goal. The goal is to reduce the time
              and cost of repetitive work — and give your team more capacity
              for the work that actually requires people.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
