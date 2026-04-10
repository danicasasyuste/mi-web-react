import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'

const STATS = [
  { end: 4,  suffix: '+', label: 'Años programando',      arc: 0.62, color: '#00d4ff' },
  { end: 20, suffix: '+', label: 'Tecnologías dominadas', arc: 0.88, color: '#818cf8' },
  { end: 6,  suffix: '',  label: 'Repos en GitHub',       arc: 0.55, color: '#34d399' },
  { end: 5,  suffix: '+', label: 'Proyectos completados', arc: 0.70, color: '#f472b6' },
]

const R  = 52
const CX = 64
const C  = 2 * Math.PI * R   // ≈ 326.7
const SCRAMBLE = '0123456789'

export default function Stats() {
  const ref = useRef(null)

  useGSAP(() => {
    gsap.from('.stat__item', {
      y: 60,
      opacity: 0,
      stagger: 0.14,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: ref.current, start: 'top 82%' },
    })

    STATS.forEach((s, i) => {
      const numEl  = ref.current.querySelectorAll('.stat__num')[i]
      const arcEl  = ref.current.querySelectorAll('.stat__arc')[i]
      const pingEl = ref.current.querySelectorAll('.stat__ping')[i]

      // Animate the SVG arc via strokeDashoffset only — no transform conflict
      gsap.fromTo(arcEl,
        { strokeDashoffset: C },
        {
          strokeDashoffset: C * (1 - s.arc),
          duration: 2,
          ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 80%' },
        }
      )

      // Number scramble → settle
      const obj = { val: 0 }
      let frame = 0
      gsap.to(obj, {
        val: s.end,
        duration: 1.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
        onUpdate() {
          frame++
          const progress = obj.val / s.end
          if (progress < 0.75 && frame % 3 === 0) {
            numEl.textContent = SCRAMBLE[Math.floor(Math.random() * SCRAMBLE.length)]
          } else {
            numEl.textContent = Math.round(obj.val)
          }
        },
        onComplete() {
          numEl.textContent = s.end
          gsap.fromTo(pingEl,
            { opacity: 0.7, scale: 0.85 },
            { opacity: 0, scale: 1.35, duration: 0.7, ease: 'power2.out' }
          )
        },
      })
    })

    ref.current.querySelectorAll('.stat__item').forEach((item) => {
      const ping = item.querySelector('.stat__ping')
      item.addEventListener('mouseenter', () => {
        gsap.fromTo(ping,
          { opacity: 0.5, scale: 0.85 },
          { opacity: 0, scale: 1.35, duration: 0.6, ease: 'power2.out' }
        )
      })
    })
  }, { scope: ref })

  return (
    <section ref={ref} className="stats">
      <div className="container">
        <div className="stats__grid">
          {STATS.map((s) => (
            <div key={s.label} className="stat__item">
              <div className="stat__ring-wrap">

                <div className="stat__ping" style={{ borderColor: s.color }} />

                <svg
                  viewBox={`0 0 ${CX * 2} ${CX * 2}`}
                  className="stat__svg"
                  aria-hidden="true"
                >
                  {/* Track ring */}
                  <circle
                    cx={CX} cy={CX} r={R}
                    fill="none"
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth="5"
                  />
                  {/* Animated arc — use SVG transform attr, NOT CSS transform */}
                  <circle
                    cx={CX} cy={CX} r={R}
                    fill="none"
                    stroke={s.color}
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeDasharray={C}
                    strokeDashoffset={C}
                    className="stat__arc"
                    transform={`rotate(-90 ${CX} ${CX})`}
                    style={{ filter: `drop-shadow(0 0 6px ${s.color})` }}
                  />
                </svg>

                <div className="stat__center">
                  <span className="stat__num" style={{ color: s.color }}>0</span>
                  <span className="stat__suffix" style={{ color: s.color }}>{s.suffix}</span>
                </div>
              </div>

              <p className="stat__label">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
