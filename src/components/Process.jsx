import { useRef } from 'react'
import Reveal from './Reveal.jsx'
import { useScrollY } from '../hooks.js'

const STEPS = [
  {
    n: '01',
    title: 'Identify',
    body: 'Find the repetitive workflows worth automating — the ones consuming real time and slowing the business down.',
  },
  {
    n: '02',
    title: 'Design',
    body: 'Map the workflow and determine where AI provides genuine leverage, without forcing the process to change.',
  },
  {
    n: '03',
    title: 'Build',
    body: 'Develop and test the custom system against the real workflow, with the edge cases and failure modes handled.',
  },
  {
    n: '04',
    title: 'Deploy',
    body: 'Integrate it into the workflow and refine it based on how it is actually used.',
  },
]

export default function Process() {
  const railRef = useRef(null)
  const y = useScrollY()

  let progress = 0
  const rail = railRef.current
  if (rail) {
    const rect = rail.getBoundingClientRect()
    const total = rect.height
    const start = window.innerHeight * 0.55
    const end = start + total
    const p = (start - rect.top) / end
    progress = Math.max(0, Math.min(1, p * 2.4))
  }

  return (
    <section id="process" className="process">
      <div className="container">
        <div className="section-head">
          <Reveal>
            <span className="eyebrow">Process</span>
            <h2 className="section-title">How an engagement runs</h2>
          </Reveal>
        </div>

        <div className="process-rail" ref={railRef}>
          <div className="rail-line">
            <div
              className="rail-fill"
              style={{ height: `${progress * 100}%` }}
            />
          </div>
          <ol className="process-steps">
            {STEPS.map((s, i) => (
              <li key={s.n} className="process-step">
                <Reveal delay={(i % 2) * 80}>
                  <div className="step-node">
                    <span className="step-n mono">{s.n}</span>
                  </div>
                  <div className="step-body">
                    <h3 className="step-title">{s.title}</h3>
                    <p className="step-desc">{s.body}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
