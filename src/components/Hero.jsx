import { useRef, useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import Particles from './Particles'

const NAME  = 'DANIEL CASAS'
const ROLES = [
  'Programador Full Stack',
  'Desarrollador Web',
  'Entusiasta de IA & Big Data',
  'Desarrollador de Apps Móviles',
]

function useTypewriter(phrases) {
  const [state, setState] = useState({ text: '', idx: 0, phase: 'typing' })
  const { text, idx, phase } = state

  useEffect(() => {
    const current = phrases[idx]
    let t

    if (phase === 'typing') {
      if (text.length < current.length) {
        t = setTimeout(
          () => setState((s) => ({ ...s, text: current.slice(0, s.text.length + 1) })),
          65
        )
      } else {
        t = setTimeout(() => setState((s) => ({ ...s, phase: 'deleting' })), 2800)
      }
    } else {
      if (text.length > 0) {
        t = setTimeout(
          () => setState((s) => ({ ...s, text: s.text.slice(0, -1) })),
          38
        )
      } else {
        t = setTimeout(
          () => setState((s) => ({ text: '', idx: (s.idx + 1) % phrases.length, phase: 'typing' })),
          0
        )
      }
    }

    return () => clearTimeout(t)
  }, [text, phase, idx, phrases])

  return text
}

export default function Hero() {
  const containerRef = useRef(null)
  const glowRef      = useRef(null)
  const role         = useTypewriter(ROLES)

  // Mouse parallax on glow
  useEffect(() => {
    const onMove = ({ clientX, clientY }) => {
      const x = (clientX / window.innerWidth  - 0.5) * 50
      const y = (clientY / window.innerHeight - 0.5) * 50
      gsap.to(glowRef.current, { x, y, duration: 1.6, ease: 'power2.out' })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  // Entrance animations
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.from('.hero__letter', {
      y: 100,
      opacity: 0,
      rotateX: -80,
      stagger: 0.045,
      duration: 0.8,
      ease: 'back.out(1.5)',
    })
      .from('.hero__role-wrap', { y: 28, opacity: 0, duration: 0.6 }, '-=0.25')
      .from('.hero__desc',      { y: 28, opacity: 0, duration: 0.6 }, '-=0.38')
      .from('.hero__cta-group > *', { y: 22, opacity: 0, stagger: 0.12, duration: 0.5 }, '-=0.3')
      .from('.hero__social > *',    { opacity: 0, y: 12, stagger: 0.08, duration: 0.4 }, '-=0.2')
      .from('.hero__scroll',        { opacity: 0, duration: 0.5 }, '-=0.15')

    // Scroll indicator bounce
    gsap.to('.hero__scroll-dot', {
      y: 11,
      repeat: -1,
      yoyo: true,
      duration: 1.15,
      ease: 'sine.inOut',
    })

    // Name letters shimmer on hover
    containerRef.current.querySelector('.hero__name').addEventListener('mouseenter', () => {
      gsap.to('.hero__letter', {
        color: '#00d4ff',
        '-webkit-text-fill-color': '#00d4ff',
        stagger: { each: 0.04, from: 'random' },
        duration: 0.25,
        yoyo: true,
        repeat: 1,
        ease: 'power1.inOut',
      })
    })

    // Magnetic buttons
    containerRef.current.querySelectorAll('.btn').forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const r = btn.getBoundingClientRect()
        const x = (e.clientX - r.left - r.width  / 2) * 0.32
        const y = (e.clientY - r.top  - r.height / 2) * 0.32
        gsap.to(btn, { x, y, duration: 0.3, ease: 'power2.out' })
      })
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' })
      })
    })
  }, { scope: containerRef })

  const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="hero" ref={containerRef} className="hero">
      <Particles />
      <div className="hero__grid-bg" aria-hidden="true" />
      <div ref={glowRef} className="hero__glow" aria-hidden="true" />
      <div className="hero__glow hero__glow--2" aria-hidden="true" />

      <div className="hero__content">
        {/* Name */}
        <div className="hero__name" aria-label={NAME}>
          {NAME.split('').map((ch, i) =>
            ch === ' ' ? (
              <span key={i} className="hero__letter hero__space" aria-hidden="true">&nbsp;</span>
            ) : (
              <span key={i} className="hero__letter" aria-hidden="true">{ch}</span>
            )
          )}
        </div>

        {/* Typewriter role */}
        <div className="hero__role-wrap">
          <span className="hero__role">
            {role}
            <span className="hero__cursor" aria-hidden="true">|</span>
          </span>
        </div>

        <p className="hero__desc">
          Basado en Valencia, España. Apasionado por el desarrollo web moderno,
          la inteligencia artificial y los datos en tiempo real.
        </p>

        <div className="hero__cta-group">
          <button className="btn btn--primary" onClick={() => scrollTo('#proyectos')}>
            Ver proyectos
          </button>
          <button className="btn btn--ghost" onClick={() => scrollTo('#contacto')}>
            Contactar
          </button>
        </div>

        <div className="hero__social">
          <a
            href="https://github.com/danicasasyuste"
            target="_blank"
            rel="noopener noreferrer"
            className="hero__social-link"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>
          <a href="mailto:danicasasyuste@gmail.com" className="hero__social-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18" aria-hidden="true">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            Email
          </a>
          <a
            href="https://github.com/danicasasyuste?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="hero__social-link"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18" aria-hidden="true">
              <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
            </svg>
            Repos
          </a>
        </div>
      </div>

      <div className="hero__scroll" aria-hidden="true">
        <div className="hero__scroll-track">
          <div className="hero__scroll-dot" />
        </div>
        <span>scroll</span>
      </div>
    </section>
  )
}
