import { Fragment } from 'react'
import Reveal from './Reveal.jsx'

const STAGES = [
  {
    id: '01',
    state: 'EXISTING',
    label: 'Existing tools',
    sub: 'the AI & software you already use',
    tone: 'in',
  },
  {
    id: '02',
    state: 'GAP',
    label: 'Workflow gaps',
    sub: 'the repetitive work in between',
    tone: 'gap',
  },
  {
    id: '03',
    state: 'AUTOMATION',
    label: 'Custom automation',
    sub: 'built around your workflow',
    tone: 'proc',
  },
  {
    id: '04',
    state: 'HUMAN',
    label: 'Human judgment',
    sub: 'where it matters most',
    tone: 'out',
  },
]

export default function AlreadyUsingAI() {
  return (
    <section id="gaps" className="gaps">
      <div className="container">
        <div className="section-head">
          <Reveal>
            <span className="eyebrow">The workflow around your tools</span>
            <h2 className="section-title">Already using AI?</h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="section-sub">
              A business may already use ChatGPT, Claude, AI software, CRM AI
              features or other AI tools — and still have repetitive work
              happening around them.
            </p>
          </Reveal>
        </div>

        <Reveal delay={140}>
          <div className="gap-flow" aria-hidden="true">
            {STAGES.map((s, i) => (
              <Fragment key={s.id}>
                <div className={`gap-node gap-${s.tone}`}>
                  <div className="gap-node-top">
                    <span className="gap-id mono">{s.id}</span>
                    <span className="gap-state mono">{s.state}</span>
                  </div>
                  <div className="gap-label">{s.label}</div>
                  <div className="gap-sub mono">{s.sub}</div>
                </div>
                {i < STAGES.length - 1 && (
                  <div className="gap-connector">
                    <span
                      className="gap-flow-dot"
                      style={{ '--d': `${i * 0.6}s` }}
                    />
                    <svg
                      className="gap-arrow"
                      viewBox="0 0 16 16"
                      width="14"
                      height="14"
                      fill="none"
                    >
                      <path
                        d="M4 3l5 5-5 5"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        </Reveal>

        <Reveal delay={180}>
          <div className="gap-body">
            <p>
              AI may handle individual tasks while people still manually move
              information between emails, documents, spreadsheets, CRM systems,
              databases and internal teams. We look at the workflow surrounding
              those tools and identify where additional automation could create
              value — connecting what&rsquo;s already there rather than
              replacing it.
            </p>
            <p>
              We aren&rsquo;t here to replace the tools you already use. We
              find the gaps and build custom automation around them — keeping
              human judgment where it matters.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
