import { useRef, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'

const RINGS = [
  {
    radius: 120,
    speed: 0.0055,
    direction: 1,
    color: '#00d4ff',
    items: ['React', 'Flutter', 'Angular', 'Java', 'Python'],
  },
  {
    radius: 210,
    speed: 0.0035,
    direction: -1,
    color: '#818cf8',
    items: ['Kotlin', 'JavaScript', 'MySQL', 'MongoDB', 'Firebase', 'Git', 'Bootstrap', 'PHP'],
  },
  {
    radius: 310,
    speed: 0.002,
    direction: 1,
    color: '#34d399',
    items: ['DB4o', 'XQuery', 'Scikit-learn', 'n8n', 'Modelos supervisados', 'Apache Kafka', 'Apache Nifi', 'Debezium', 'Apache Flume'],
  },
]

export default function Technologies() {
  const containerRef = useRef(null)
  const anglesRef    = useRef(RINGS.map(() => 0))
  const pillMapRef   = useRef(new Map())
  const pausedRef    = useRef(false)

  // GSAP entrance animations
  useGSAP(() => {
    gsap.from('.orbit__center', {
      scale: 0,
      opacity: 0,
      duration: 0.9,
      ease: 'back.out(1.8)',
      scrollTrigger: { trigger: containerRef.current, start: 'top 78%' },
    })
    gsap.from('.orbit__track', {
      scale: 0,
      opacity: 0,
      stagger: 0.18,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: containerRef.current, start: 'top 78%' },
    })
    gsap.from('.orbit__pill', {
      opacity: 0,
      stagger: { each: 0.04, from: 'random' },
      duration: 0.5,
      ease: 'power2.out',
      scrollTrigger: { trigger: containerRef.current, start: 'top 72%' },
    })
    // Title
    gsap.from(containerRef.current.querySelectorAll('.section__tag, .section__title'), {
      clipPath: 'inset(0 0 100% 0)',
      y: 18,
      stagger: 0.12,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: { trigger: containerRef.current, start: 'top 82%' },
    })
  }, { scope: containerRef })

  // Orbit ticker — runs independently of React lifecycle
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Cache element refs + init centering
    RINGS.forEach((ring, ri) => {
      ring.items.forEach((_, ii) => {
        const el = container.querySelector(`[data-ring="${ri}"][data-item="${ii}"]`)
        if (el) {
          gsap.set(el, { xPercent: -50, yPercent: -50 })
          pillMapRef.current.set(`${ri}-${ii}`, el)
        }
      })
    })

    const tick = () => {
      if (pausedRef.current) return
      RINGS.forEach((ring, ri) => {
        anglesRef.current[ri] += ring.speed * ring.direction
        const base = anglesRef.current[ri]
        ring.items.forEach((_, ii) => {
          const el = pillMapRef.current.get(`${ri}-${ii}`)
          if (!el) return
          const a = base + (2 * Math.PI * ii) / ring.items.length
          gsap.set(el, { x: Math.cos(a) * ring.radius, y: Math.sin(a) * ring.radius })
        })
      })
    }

    gsap.ticker.add(tick)

    // Pause orbit when hovering the stage
    const stage = container.querySelector('.orbit__stage')
    const pause  = () => { pausedRef.current = true  }
    const resume = () => { pausedRef.current = false }
    stage?.addEventListener('mouseenter', pause)
    stage?.addEventListener('mouseleave', resume)

    return () => {
      gsap.ticker.remove(tick)
      stage?.removeEventListener('mouseenter', pause)
      stage?.removeEventListener('mouseleave', resume)
    }
  }, [])

  return (
    <section id="tecnologias" ref={containerRef} className="section technologies">
      <div className="container">
        <div className="section__header">
          <span className="section__tag">04 &mdash; tecnologias</span>
          <h2 className="section__title">Stack tecnologico</h2>
        </div>
      </div>

      <div className="orbit__stage">
        {/* Dashed ring tracks */}
        {RINGS.map((ring, ri) => (
          <div
            key={ri}
            className="orbit__track"
            style={{
              width:  ring.radius * 2,
              height: ring.radius * 2,
              borderColor: `${ring.color}22`,
            }}
          />
        ))}

        {/* Center glow */}
        <div className="orbit__center">
          <span>STACK</span>
        </div>

        {/* Orbiting pills */}
        {RINGS.map((ring, ri) =>
          ring.items.map((item, ii) => (
            <span
              key={`${ri}-${ii}`}
              className="orbit__pill"
              data-ring={ri}
              data-item={ii}
              style={{ '--orbit-color': ring.color }}
            >
              {item}
            </span>
          ))
        )}
      </div>

      {/* Legend */}
      <div className="orbit__legend container">
        {RINGS.map((ring, ri) => (
          <div key={ri} className="orbit__legend-item">
            <span className="orbit__legend-dot" style={{ background: ring.color }} />
            <span style={{ color: ring.color }}>
              {['Lenguajes & Frameworks', 'Web & Bases de datos', 'Big Data, IA & DevOps'][ri]}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
