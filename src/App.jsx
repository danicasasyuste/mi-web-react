import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Cursor        from './components/Cursor'
import ScrollProgress from './components/ScrollProgress'
import Navbar        from './components/Navbar'
import Hero          from './components/Hero'
import About         from './components/About'
import Stats         from './components/Stats'
import Experience    from './components/Experience'
import Education     from './components/Education'
import Technologies  from './components/Technologies'
import Projects      from './components/Projects'
import Contact       from './components/Contact'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  return (
    <div className="portfolio">
      <Cursor />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <About />
        <Experience />
        <Education />
        <Technologies />
        <Projects />
        <Contact />
      </main>
      <footer className="footer">
        <div className="container">
          <p>Hecho con React + GSAP &mdash; Daniel Casas Yuste &copy; {new Date().getFullYear()}</p>
          <div className="footer__links">
            <a href="https://github.com/danicasasyuste" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="mailto:danicasasyuste@gmail.com">Email</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
