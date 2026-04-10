import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Cursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    document.body.classList.add('custom-cursor')

    const dot  = dotRef.current
    const ring = ringRef.current

    const move = ({ clientX: x, clientY: y }) => {
      gsap.to(dot,  { x, y, duration: 0.08, ease: 'none' })
      gsap.to(ring, { x, y, duration: 0.30, ease: 'power2.out' })
    }

    const over = ({ target }) => {
      if (target.closest('a, button, [data-hover]')) {
        gsap.to(ring, { boxShadow: '0 0 0 1px rgba(0,212,255,1)', duration: 0.2 })
        gsap.to(dot,  { opacity: 0, duration: 0.15 })
      }
    }
    const out = ({ target }) => {
      if (target.closest('a, button, [data-hover]')) {
        gsap.to(ring, { boxShadow: '0 0 0 1px rgba(0,212,255,0.6)', duration: 0.2 })
        gsap.to(dot,  { opacity: 1, duration: 0.15 })
      }
    }
    const down = () => gsap.to(dot, { scale: 1.8, duration: 0.1 })
    const up   = () => gsap.to(dot, { scale: 1,   duration: 0.15 })

    window.addEventListener('mousemove',  move)
    document.addEventListener('mouseover', over)
    document.addEventListener('mouseout',  out)
    window.addEventListener('mousedown',  down)
    window.addEventListener('mouseup',    up)

    return () => {
      document.body.classList.remove('custom-cursor')
      window.removeEventListener('mousemove',  move)
      document.removeEventListener('mouseover', over)
      document.removeEventListener('mouseout',  out)
      window.removeEventListener('mousedown',  down)
      window.removeEventListener('mouseup',    up)
    }
  }, [])

  return (
    <>
      <div ref={dotRef}  className="cursor__dot"  aria-hidden="true" />
      <div ref={ringRef} className="cursor__ring" aria-hidden="true" />
    </>
  )
}
