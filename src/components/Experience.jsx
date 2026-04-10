import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const JOBS = [
  {
    title: 'Programador Web',
    company: 'ZARGOTEL SL',
    location: 'Valencia',
    period: '2025 - 2026',
    current: true,
    tasks: [
      'Diseno y maquetacion de paginas web',
      'Desarrollo y creacion de sitios web completos',
      'Gestion y mantenimiento de datos',
    ],
  },
  {
    title: 'Departamento de Informatica',
    company: 'IES EL GRAO',
    location: 'Valencia',
    period: '2023 - 2024',
    current: false,
    tasks: [
      'Mantenimiento preventivo de ordenadores',
      'Reparacion y diagnostico de equipos',
      'Revision y mantenimiento del material informatico',
    ],
  },
]

export default function Experience() {
  const containerRef = useRef(null)

  useGSAP(() => {
    // Clip-path title reveal
    gsap.from(containerRef.current.querySelectorAll('.section__tag, .section__title'), {
      clipPath: 'inset(0 0 100% 0)',
      y: 18,
      stagger: 0.12,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: { trigger: containerRef.current, start: 'top 80%' },
    })

    // Timeline line fills as you scroll through the section (scrub)
    gsap.fromTo('.exp__line-fill',
      { scaleY: 0 },
      {
        scaleY: 1,
        transformOrigin: 'top center',
        ease: 'none',
        scrollTrigger: {
          trigger: '.exp__timeline',
          start: 'top 65%',
          end: 'bottom 70%',
          scrub: true,
        },
      }
    )

    // Cards slide in staggered
    gsap.from('.exp__item', {
      x: -50,
      opacity: 0,
      stagger: 0.22,
      duration: 0.75,
      ease: 'power3.out',
      scrollTrigger: { trigger: containerRef.current, start: 'top 72%' },
    })
  }, { scope: containerRef })

  return (
    <section id="experiencia" ref={containerRef} className="section experience">
      <div className="container">
        <div className="section__header">
          <span className="section__tag">02 &mdash; experiencia</span>
          <h2 className="section__title">Donde he trabajado</h2>
        </div>

        <div className="exp__timeline">
          <div className="exp__line">
            <div className="exp__line-fill" />
          </div>

          {JOBS.map((job, i) => (
            <div key={i} className="exp__item">
              <div className="exp__dot-wrap">
                <div className={`exp__dot${job.current ? ' exp__dot--active' : ''}`}>
                  {job.current && <div className="exp__pulse" />}
                </div>
              </div>
              <div className="exp__card">
                <div className="exp__card-top">
                  <div>
                    <h3 className="exp__role">{job.title}</h3>
                    <p className="exp__company">
                      {job.company}
                      <span className="exp__location"> &mdash; {job.location}</span>
                    </p>
                  </div>
                  <span className={`exp__period${job.current ? ' exp__period--now' : ''}`}>
                    {job.period}
                  </span>
                </div>
                <ul className="exp__tasks">
                  {job.tasks.map((t, j) => <li key={j}>{t}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
