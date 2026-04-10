import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'

const NAV_LINKS = [
  { href: '#sobre-mi',    label: 'Sobre mí' },
  { href: '#experiencia', label: 'Experiencia' },
  { href: '#educacion',   label: 'Educación' },
  { href: '#tecnologias', label: 'Tecnologías' },
  { href: '#proyectos',   label: 'Proyectos' },
  { href: '#contacto',    label: 'Contacto' },
]

export default function Navbar() {
  const navRef  = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    // Entrance animation
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 1.3 }
    )

    // Scroll detection
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })

    // Magnetic links
    const links = navRef.current.querySelectorAll('.navbar__links a')
    const cleanup = []
    links.forEach((link) => {
      const onMove = (e) => {
        const r = link.getBoundingClientRect()
        const x = (e.clientX - r.left - r.width  / 2) * 0.28
        const y = (e.clientY - r.top  - r.height / 2) * 0.28
        gsap.to(link, { x, y, duration: 0.3, ease: 'power2.out' })
      }
      const onLeave = () => gsap.to(link, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' })
      link.addEventListener('mousemove', onMove)
      link.addEventListener('mouseleave', onLeave)
      cleanup.push(() => {
        link.removeEventListener('mousemove', onMove)
        link.removeEventListener('mouseleave', onLeave)
      })
    })

    return () => {
      window.removeEventListener('scroll', onScroll)
      cleanup.forEach((fn) => fn())
    }
  }, [])

  const scrollTo = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav ref={navRef} className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        <a
          href="#hero"
          className="navbar__logo"
          onClick={(e) => scrollTo(e, '#hero')}
          aria-label="Inicio"
        >
          DC<span className="navbar__dot">.</span>
        </a>

        <button
          className={`navbar__burger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Abrir menú"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>

        <ul className={`navbar__links${menuOpen ? ' navbar__links--open' : ''}`} role="list">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <a href={href} onClick={(e) => scrollTo(e, href)}>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
