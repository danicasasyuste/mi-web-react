import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProjectModal from './ProjectModal'

const PROJECT = {
  id: 'climacolab',
  name: 'ClimaColab',
  award: 'Premio al mejor proyecto',
  type: 'App Movil',
  description:
    'Aplicacion movil que combina datos oficiales del clima con reportes ciudadanos en tiempo real para mejorar la precision meteorologica local en la Comunidad Valenciana.',
  longDescription:
    'Desarrollada como proyecto final del Grado Superior DAM, ClimaColab obtuvo el premio al mejor proyecto de la promocion. Los ciudadanos pueden reportar condiciones climaticas en su zona y la app las combina con datos oficiales de AEMET para ofrecer predicciones mas precisas y localizadas. Usa geolocaliz­acion en tiempo real y Firebase para sincronizacion instantanea entre dispositivos.',
  tags: ['Flutter', 'Dart', 'Firebase', 'REST API', 'Geolocalizacion', 'AEMET API'],
  github: 'danicasasyuste/Exodo',
  color: '#00d4ff',
}

export default function Projects() {
  const containerRef = useRef(null)
  const [open, setOpen] = useState(false)

  useGSAP(() => {
    gsap.from('.project-card', {
      y: 50,
      opacity: 0,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: { trigger: containerRef.current, start: 'top 72%' },
    })
  }, { scope: containerRef })

  const handleEnter = (e) => {
    gsap.to(e.currentTarget, { y: -5, scale: 1.02, duration: 0.28, ease: 'power2.out' })
  }
  const handleLeave = (e) => {
    gsap.to(e.currentTarget, { y: 0, scale: 1, duration: 0.3, ease: 'power2.out' })
  }

  return (
    <section id="proyectos" ref={containerRef} className="section projects">
      <div className="container">
        <div className="section__header">
          <span className="section__tag">05 &mdash; proyectos</span>
          <h2 className="section__title">Proyecto destacado</h2>
        </div>

        <div className="projects__center">
          <button
            className="project-card"
            onClick={() => setOpen(true)}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            aria-label="Ver detalles de ClimaColab"
            data-hover
          >
            <div className="project-card__top">
              <div className="project-card__badges">
                <span className="project__type">{PROJECT.type}</span>
                <span className="project__award">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12" aria-hidden="true">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  {PROJECT.award}
                </span>
              </div>
              <span className="project-card__gh-badge">
                <svg viewBox="0 0 24 24" fill="currentColor" width="11" height="11" aria-hidden="true">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </span>
            </div>

            <h3 className="project-card__name">{PROJECT.name}</h3>
            <p className="project-card__desc">{PROJECT.description}</p>

            <div className="project-card__tags">
              {PROJECT.tags.map((t) => (
                <span key={t} className="project__tag">{t}</span>
              ))}
            </div>

            <div className="project-card__cta">
              <span>Ver detalles del proyecto</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15" aria-hidden="true">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </div>
          </button>
        </div>
      </div>

      {open && (
        <ProjectModal project={PROJECT} onClose={() => setOpen(false)} />
      )}
    </section>
  )
}
