export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <img
            className="footer-banner"
            src="/greater-automators-banner.png"
            alt="Greater Automators"
          />
          <p className="footer-tagline">
            Custom AI automation for repetitive business workflows.
          </p>
        </div>
        <nav className="footer-links" aria-label="Footer">
          <a href="https://github.com/Terrytd0" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/terry-nyirenda-210455170" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="mailto:terry@greaterautomators.com">Email</a>
        </nav>
      </div>
      <div className="container footer-bar">
        <span className="mono faint">
          © {new Date().getFullYear()} Greater Automators. All rights reserved.
        </span>
        <span className="mono faint">greaterautomators.com</span>
      </div>
    </footer>
  )
}
