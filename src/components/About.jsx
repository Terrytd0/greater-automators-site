import Reveal from './Reveal.jsx'

export default function About() {
  return (
    <section id="about">
      <div className="container about-grid">
        <div className="about-mark">
          <img
            className="about-avatar"
            src="/profile.jpg"
            alt="Portrait of Terry, founder of Greater Automators"
          />
          <span className="mono faint">terry@greaterautomators.com</span>
        </div>
        <div className="about-copy">
          <Reveal>
            <span className="eyebrow">About</span>
            <h2 className="section-title">Hi, I&rsquo;m Terry.</h2>
            <p className="about-role mono">AI Engineer · Automation Specialist</p>
          </Reveal>
          <Reveal delay={100}>
            <p className="about-p">
              I build practical AI systems that turn repetitive business
              workflows into structured, automated processes.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <p className="about-p">
              My work sits at the intersection of AI engineering and
              workflow design — from retrieval systems that answer questions
              with evidence, to multi-agent platforms, to pipelines that
              turn raw data into decisions.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <p className="about-p">
              The point isn&rsquo;t the AI. It&rsquo;s the workflow it sits
              inside — built to fit how people already work, not to make them
              work differently.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className="about-links">
              <a
                href="https://github.com/Terrytd0"
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/terry-nyirenda-210455170"
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost"
              >
                LinkedIn
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
