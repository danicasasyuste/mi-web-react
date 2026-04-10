import { useRef, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'

// speed: radians per millisecond (frame-rate independent via deltaTime)
const RINGS = [
  {
    radius: 95,
    speed: 0.000048,   // ~full lap in 130s
    direction: 1,
    color: '#00d4ff',
    label: 'Lenguajes & Frameworks',
    items: ['React', 'Flutter', 'Angular', 'Java', 'Python'],
  },
  {
    radius: 205,
    speed: 0.000028,   // ~full lap in 225s
    direction: -1,
    color: '#818cf8',
    label: 'Web & Bases de datos',
    items: ['Kotlin', 'JavaScript', 'MySQL', 'MongoDB', 'Firebase', 'Git', 'Bootstrap', 'PHP'],
  },
  {
    radius: 355,
    speed: 0.000016,   // ~full lap in 390s
    direction: 1,
    color: '#34d399',
    label: 'Big Data, IA & DevOps',
    items: ['DB4o', 'XQuery', 'Scikit-learn', 'n8n', 'Modelos supervisados', 'Apache Kafka', 'Apache Nifi', 'Debezium', 'Apache Flume'],
  },
]

export default function Technologies() {
  const containerRef = useRef(null)
  const anglesRef    = useRef(RINGS.map(() => 0))
  const pillMapRef   = useRef(new Map())
  const speedMultRef = useRef({ val: 1 })

  useGSAP(() => {
    gsap.from(containerRef.current.querySelectorAll('.section__tag, .section__title'), {
      clipPath: 'inset(0 0 100% 0)',
      y: 18, stagger: 0.12, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: containerRef.current, start: 'top 82%' },
    })
    gsap.from('.orbit__center', {
      scale: 0, opacity: 0, duration: 0.9, ease: 'back.out(1.8)',
      scrollTrigger: { trigger: containerRef.current, start: 'top 78%' },
    })
    gsap.from('.orbit__track', {
      scale: 0, opacity: 0, stagger: 0.18, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: containerRef.current, start: 'top 78%' },
    })
    gsap.from('.orbit__pill', {
      opacity: 0,
      stagger: { each: 0.04, from: 'random' },
      duration: 0.5, ease: 'power2.out',
      scrollTrigger: { trigger: containerRef.current, start: 'top 72%' },
    })
  }, { scope: containerRef })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Cache refs + set centering offset
    RINGS.forEach((ring, ri) => {
      ring.items.forEach((_, ii) => {
        const el = container.querySelector(`[data-ring="${ri}"][data-item="${ii}"]`)
        if (el) {
          gsap.set(el, { xPercent: -50, yPercent: -50 })
          pillMapRef.current.set(`${ri}-${ii}`, el)
        }
      })
    })

    // tick(time, deltaTime) — deltaTime in ms, frame-rate independent
    const tick = (_time, deltaTime) => {
      const dt   = Math.min(deltaTime, 100) // cap at 100ms (e.g. after tab switch)
      const mult = speedMultRef.current.val
      RINGS.forEach((ring, ri) => {
        anglesRef.current[ri] += ring.speed * ring.direction * mult * dt
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

    // Smooth decelerate on hover — overwrite kills any in-progress tween
    const stage  = container.querySelector('.orbit__stage')
    const decel  = () => gsap.to(speedMultRef.current, { val: 0.08, duration: 0.8, ease: 'power2.out',  overwrite: true })
    const accel  = () => gsap.to(speedMultRef.current, { val: 1,    duration: 1.4, ease: 'power2.inOut', overwrite: true })
    stage?.addEventListener('mouseenter', decel)
    stage?.addEventListener('mouseleave', accel)

    return () => {
      gsap.ticker.remove(tick)
      stage?.removeEventListener('mouseenter', decel)
      stage?.removeEventListener('mouseleave', accel)
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

      {/* Desktop orbit */}
      <div className="orbit__stage">
        {RINGS.map((ring, ri) => (
          <div
            key={ri}
            className="orbit__track"
            style={{ width: ring.radius * 2, height: ring.radius * 2, borderColor: `${ring.color}20` }}
          />
        ))}

        <div className="orbit__center"><span>STACK</span></div>

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

      {/* Mobile grid */}
      <div className="orbit__mobile container">
        {RINGS.map((ring) => (
          <div key={ring.color} className="orbit__mobile-group">
            <div className="orbit__mobile-header">
              <span className="orbit__legend-dot" style={{ background: ring.color }} />
              <span className="orbit__mobile-label" style={{ color: ring.color }}>{ring.label}</span>
            </div>
            <div className="orbit__mobile-items">
              {ring.items.map((item) => (
                <span key={item} className="orbit__mobile-badge" style={{ '--orbit-color': ring.color }}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Legend desktop */}
      <div className="orbit__legend container">
        {RINGS.map((ring) => (
          <div key={ring.color} className="orbit__legend-item">
            <span className="orbit__legend-dot" style={{ background: ring.color }} />
            <span style={{ color: ring.color }}>{ring.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
