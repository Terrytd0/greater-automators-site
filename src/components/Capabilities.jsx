import Reveal from './Reveal.jsx'

const ITEMS = [
  {
    n: '01',
    title: 'Lead Intelligence',
    body: 'Research companies, prospects and markets and turn scattered information into structured intelligence.',
    tags: ['Research', 'Enrichment', 'Outreach'],
  },
  {
    n: '02',
    title: 'Data Enrichment & Deduplication',
    body: 'Research, enrich, normalize and reconcile records so information becomes more useful.',
    tags: ['Normalization', 'Reconciliation', 'Quality'],
  },
  {
    n: '03',
    title: 'Workflow Automation',
    body: 'Connect repetitive steps into reliable automated workflows that run without babysitting.',
    tags: ['Orchestration', 'Integrations', 'Reliability'],
  },
  {
    n: '04',
    title: 'Financial Analysis & Reporting',
    body: 'Automate data processing, analysis and reporting workflows for numbers people can trust.',
    tags: ['Validation', 'KPI', 'Reporting'],
  },
  {
    n: '05',
    title: 'Customer Support Automation',
    body: 'Build systems that organize information and automate repetitive support processes.',
    tags: ['Agents', 'Routing', 'Knowledge'],
  },
  {
    n: '06',
    title: 'Custom AI Systems',
    body: 'If the workflow doesn\u2019t fit a predefined category, we design a system around the actual problem.',
    tags: ['RAG', 'Agents', 'Design'],
  },
]

export default function Capabilities() {
  return (
    <section id="capabilities">
      <div className="container">
        <div className="section-head">
          <Reveal>
            <span className="eyebrow">Capabilities</span>
            <h2 className="section-title">What we build</h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="section-sub">
              Each system is designed around the workflow it replaces. These
              are the recurring shapes the work tends to take — not
              standardized products.
            </p>
          </Reveal>
        </div>

        <div className="caps-list">
          {ITEMS.map((it, i) => (
            <Reveal key={it.n} delay={(i % 2) * 90}>
              <article className="cap-row">
                <span className="cap-n mono">{it.n}</span>
                <h3 className="cap-title">{it.title}</h3>
                <p className="cap-body">{it.body}</p>
                <div className="cap-tags">
                  {it.tags.map((t) => (
                    <span key={t} className="cap-tag mono">
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
