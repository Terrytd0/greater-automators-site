import SystemBackground from './components/SystemBackground.jsx'
import CursorGlow from './components/CursorGlow.jsx'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import CoreMessage from './components/CoreMessage.jsx'
import Outcome from './components/Outcome.jsx'
import AlreadyUsingAI from './components/AlreadyUsingAI.jsx'
import Capabilities from './components/Capabilities.jsx'
import Work from './components/Work.jsx'
import Philosophy from './components/Philosophy.jsx'
import Process from './components/Process.jsx'
import Why from './components/Why.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <>
      <SystemBackground />
      <CursorGlow />
      <a className="skip-link" href="#work">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <CoreMessage />
        <Outcome />
        <AlreadyUsingAI />
        <Capabilities />
        <Work />
        <Philosophy />
        <Process />
        <Why />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
