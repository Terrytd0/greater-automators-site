import Reveal from './Reveal.jsx'

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <Reveal>
          <div className="contact-card">
            <span className="eyebrow center">Get in touch</span>
            <h2 className="contact-title">
              Have a repetitive workflow
              <br />
              worth automating?
            </h2>
            <p className="contact-sub">
              Let&rsquo;s look at the process and see where AI can actually
              help.
            </p>
            <a
              href="mailto:terry@greaterautomators.com"
              className="btn btn-primary contact-btn"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
                <path
                  d="M4 6h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinejoin="round"
                />
                <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
              </svg>
              terry@greaterautomators.com
            </a>
            <div className="contact-meta">
              <span className="mono muted">Greater Automators</span>
              <span className="sep" aria-hidden="true" />
              <span className="mono muted">Terry · AI Engineer · Automation Specialist</span>
              <span className="sep" aria-hidden="true" />
              <span className="mono muted">greaterautomators.com</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
