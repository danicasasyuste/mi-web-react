import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const GROUPS = [
  {
    category: 'Lenguajes',
    color: '#00d4ff',
    items: ['Java', 'Python', 'Kotlin', 'PHP', 'C#', 'JavaScript'],
  },
  {
    category: 'Web & Maquetacion',
    color: '#818cf8',
    items: ['HTML5', 'CSS3', 'Bootstrap', 'SQL'],
  },
  {
    category: 'Frameworks',
    color: '#fb923c',
    items: ['Angular', 'Flutter', 'React'],
  },
  {
    category: 'Bases de datos',
    color: '#34d399',
    items: ['MySQL', 'MongoDB', 'Firebase', 'Oracle DB', 'DB4o', 'XQuery'],
  },
  {
    category: 'Inteligencia Artificial',
    color: '#f472b6',
    items: ['Scikit-learn', 'n8n', 'Modelos supervisados'],
  },
  {
    category: 'Big Data',
    color: '#facc15',
    items: ['Apache Kafka', 'Apache Nifi', 'Debezium', 'Apache Flume'],
  },
  {
    category: 'DevOps & Otros',
    color: '#a78bfa',
    items: ['Git', 'Linux', 'Sockets', 'FTP', 'Encriptacion', 'SCRUM'],
  },
]

export default function Technologies() {
  const containerRef = useRef(null)

  useGSAP(() => {
    // Title reveal
    gsap.from(containerRef.current.querySelectorAll('.section__tag, .section__title'), {
      clipPath: 'inset(0 0 100% 0)',
      y: 18,
      stagger: 0.12,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: { trigger: containerRef.current, start: 'top 80%' },
    })

    // Groups: stagger up from below
    gsap.from('.tech__group', {
      y: 50,
      opacity: 0,
      stagger: 0.09,
      duration: 0.65,
      ease: 'power3.out',
      scrollTrigger: { trigger: containerRef.current, start: 'top 72%' },
    })

    // Badges: stagger after groups settle
    gsap.from('.tech__badge', {
      scale: 0.75,
      opacity: 0,
      stagger: 0.018,
      duration: 0.35,
      ease: 'back.out(1.4)',
      scrollTrigger: { trigger: containerRef.current, start: 'top 65%' },
    })
  }, { scope: containerRef })

  return (
    <section id="tecnologias" ref={containerRef} className="section technologies">
      <div className="container">
        <div className="section__header">
          <span className="section__tag">04 &mdash; tecnologias</span>
          <h2 className="section__title">Stack tecnologico</h2>
        </div>

        <div className="tech__grid">
          {GROUPS.map((group) => (
            <div
              key={group.category}
              className="tech__group"
              style={{ '--tech-color': group.color }}
            >
              <div className="tech__group-header">
                <span className="tech__dot" style={{ background: group.color }} />
                <h3 className="tech__category" style={{ color: group.color }}>
                  {group.category}
                </h3>
              </div>
              <div className="tech__items">
                {group.items.map((item) => (
                  <span key={item} className="tech__badge">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
