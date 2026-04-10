import { useRef, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function About() {
  const containerRef = useRef(null)
  const cardRef      = useRef(null)

  useGSAP(() => {
    // Clip-path reveal on title
    gsap.from(containerRef.current.querySelectorAll('.section__tag, .section__title'), {
      clipPath: 'inset(0 0 100% 0)',
      y: 18,
      stagger: 0.12,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: { trigger: containerRef.current, start: 'top 80%' },
    })

    gsap.from('.about__text > *', {
      y: 36,
      opacity: 0,
      stagger: 0.14,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: { trigger: containerRef.current, start: 'top 75%' },
    })

    gsap.from('.about__card', {
      scale: 0.88,
      opacity: 0,
      duration: 0.8,
      ease: 'back.out(1.5)',
      scrollTrigger: { trigger: containerRef.current, start: 'top 72%' },
    })
  }, { scope: containerRef })

  // 3D tilt on card
  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const onMove = (e) => {
      const r = card.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width  - 0.5
      const y = (e.clientY - r.top)  / r.height - 0.5
      gsap.to(card, {
        rotateY:  x * 18,
        rotateX: -y * 18,
        transformPerspective: 700,
        duration: 0.4,
        ease: 'power2.out',
      })
    }
    const onLeave = () => {
      gsap.to(card, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.7,
        ease: 'elastic.out(1, 0.4)',
      })
    }

    card.addEventListener('mousemove', onMove)
    card.addEventListener('mouseleave', onLeave)
    return () => {
      card.removeEventListener('mousemove', onMove)
      card.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <section id="sobre-mi" ref={containerRef} className="section about">
      <div className="container">
        <div className="section__header">
          <span className="section__tag">01 &mdash; sobre mi</span>
          <h2 className="section__title">Quien soy</h2>
        </div>

        <div className="about__grid">
          <div className="about__text">
            <p>
              Soy <strong>Daniel Casas Yuste</strong>, programador de Valencia con un perfil tecnico
              amplio y ganas de seguir creciendo. Actualmente trabajo como{' '}
              <strong>Programador Web en ZARGOTEL SL</strong> mientras curso el{' '}
              <strong>Master de especializacion en IA y Big Data</strong>.
            </p>
            <p>
              Me forme en el <strong>Grado Superior de DAM</strong> y desde entonces he trabajado con
              tecnologias que van desde Java y Kotlin hasta Flutter, Angular, bases de datos relacionales
              y NoSQL, y herramientas de Big Data como Apache Kafka o Apache Nifi.
            </p>
            <p>
              Lo que mas me motiva es construir productos que resuelvan problemas reales con codigo limpio
              y buenas practicas. Siempre buscando aprender y aplicar lo aprendido al ambito profesional.
            </p>

            <div className="about__details">
              <div className="about__detail">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
                <span>Burjassot, Valencia</span>
              </div>
              <div className="about__detail">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
                <span>+34 637 88 61 54</span>
              </div>
              <div className="about__detail">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16" aria-hidden="true">
                  <rect x="2" y="4" width="20" height="16" rx="2" /><polyline points="22,6 12,13 2,6" />
                </svg>
                <a href="mailto:danicasasyuste@gmail.com">danicasasyuste@gmail.com</a>
              </div>
              <div className="about__detail">
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                <a href="https://github.com/danicasasyuste" target="_blank" rel="noopener noreferrer">
                  github.com/danicasasyuste
                </a>
              </div>
            </div>
          </div>

          <div ref={cardRef} className="about__card">
            <div className="about__avatar">DC</div>
            <div className="about__card-info">
              <p className="about__card-name">Daniel Casas Yuste</p>
              <p className="about__card-role">Programador Web</p>
              <div className="about__langs">
                <span>Espanol</span>
                <span>Ingles</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
