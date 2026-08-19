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
              time. We find those processes, determine where AI can genuinely
              help, and build a system around the way your team already
              works — not the other way around.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
