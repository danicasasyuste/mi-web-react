import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const EDUCATION = [
  {
    title: 'Master en IA y Big Data',
    institution: 'Aulacampus · Torrent',
    period: '2025 – 2026',
    current: true,
    abbr: 'IA',
    color: '#00d4ff',
  },
  {
    title: 'Grado Superior DAM',
    institution: 'Aulacampus',
    period: '2023 – 2025',
    abbr: 'DAM',
    color: '#818cf8',
  },
  {
    title: 'Java SE Fundamentals Oracle',
    institution: 'Aulacampus',
    period: '2024 – 2025',
    abbr: 'Java',
    color: '#fb923c',
  },
  {
    title: 'Metodologia SCRUM',
    institution: 'Aulacampus',
    period: '2024 – 2025',
    abbr: 'SCR',
    color: '#34d399',
  },
  {
    title: 'Database Foundations',
    institution: 'Aulacampus',
    period: '2023 – 2024',
    abbr: 'DB',
    color: '#f472b6',
  },
  {
    title: 'Linux Essentials / Unhatched',
    institution: 'Aulacampus',
    period: '2024 – 2025',
    abbr: 'LX',
    color: '#facc15',
  },
]

export default function Education() {
  const containerRef = useRef(null)

  useGSAP(() => {
    // Title reveal
    gsap.from(containerRef.current.querySelectorAll('.section__tag, .section__title'), {
      clipPath: 'inset(0 0 100% 0)',
      y: 20,
      stagger: 0.12,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: containerRef.current, start: 'top 80%' },
    })

    // Cards: clean stagger from bottom
    gsap.from('.edu__card', {
      y: 40,
      opacity: 0,
      stagger: 0.08,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: { trigger: containerRef.current, start: 'top 72%' },
    })
  }, { scope: containerRef })

  return (
    <section id="educacion" ref={containerRef} className="section education">
      <div className="container">
        <div className="section__header">
          <span className="section__tag">03 &mdash; educacion</span>
          <h2 className="section__title">Formacion academica</h2>
        </div>
        <div className="edu__grid">
          {EDUCATION.map((item, i) => (
            <div
              key={i}
              className={`edu__card${item.current ? ' edu__card--current' : ''}`}
              style={{ '--edu-color': item.color }}
            >
              <div className="edu__abbr" style={{ background: `${item.color}18`, color: item.color, borderColor: `${item.color}30` }}>
                {item.abbr}
              </div>
              <div className="edu__info">
                <h3 className="edu__title">{item.title}</h3>
                <p className="edu__institution">{item.institution}</p>
                <div className="edu__footer">
                  <span className="edu__period">{item.period}</span>
                  {item.current && <span className="edu__badge" style={{ color: item.color, borderColor: `${item.color}40`, background: `${item.color}12` }}>En curso</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
