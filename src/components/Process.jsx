import { useRef } from 'react'
import Reveal from './Reveal.jsx'
import { useScrollY } from '../hooks.js'

const STEPS = [
  {
    n: '01',
    title: 'Identify the opportunity',
    body: 'Examine repetitive workflows and identify where AI or automation could remove unnecessary repetitive work.',
  },
  {
    n: '02',
    title: 'Understand the workflow',
    body: 'Understand the business\u2019s existing tools, information, people and processes.',
  },
  {
    n: '03',
    title: 'Design and build',
    body: 'Create custom automation around the specific workflow and its existing systems.',
  },
  {
    n: '04',
    title: 'Keep humans where they matter',
    body: 'Automation handles repetitive information work while people retain judgment, exceptions and relationships.',
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
            <h2 className="section-title">How we work</h2>
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
