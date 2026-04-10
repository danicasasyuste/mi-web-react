import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'

const STATS = [
  { end: 4,  suffix: '+', label: 'Años programando' },
  { end: 20, suffix: '+', label: 'Tecnologías' },
  { end: 6,  suffix: '',  label: 'Repos en GitHub' },
  { end: 5,  suffix: '+', label: 'Proyectos completados' },
]

export default function Stats() {
  const ref = useRef(null)

  useGSAP(() => {
    // Cards entrance
    gsap.from('.stat__card', {
      y: 50,
      opacity: 0,
      stagger: 0.12,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: { trigger: ref.current, start: 'top 80%' },
    })

    // Counters with bounce on complete
    STATS.forEach((s, i) => {
      const el = ref.current.querySelectorAll('.stat__num')[i]
      const obj = { val: 0 }
      gsap.to(obj, {
        val: s.end,
        duration: 1.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
        onUpdate() { el.textContent = Math.round(obj.val) + s.suffix },
        onComplete() {
          gsap.fromTo(el,
            { scale: 1 },
            { scale: 1.18, duration: 0.15, yoyo: true, repeat: 1, ease: 'power2.out',
              onComplete() { gsap.set(el, { scale: 1 }) }
            }
          )
        },
      })
    })

    // Subtle floating on each card (out of phase)
    ref.current.querySelectorAll('.stat__card').forEach((card, i) => {
      gsap.to(card, {
        y: -6,
        duration: 2 + i * 0.3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.4,
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      })
    })
  }, { scope: ref })

  return (
    <section ref={ref} className="stats">
      <div className="container">
        <div className="stats__grid">
          {STATS.map((s) => (
            <div key={s.label} className="stat__card" data-hover>
              <span className="stat__num">0{s.suffix}</span>
              <span className="stat__label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
