import { useEffect, useRef } from 'react'

export default function Particles() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    let animId
    let mouse = { x: -9999, y: -9999 }

    const dpr = window.devicePixelRatio || 1

    const resize = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      canvas.width  = w * dpr
      canvas.height = h * dpr
      ctx.scale(dpr, dpr)
    }
    resize()

    const W = () => canvas.offsetWidth
    const H = () => canvas.offsetHeight

    const pts = Array.from({ length: 72 }, () => ({
      x:  Math.random() * W(),
      y:  Math.random() * H(),
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r:  Math.random() * 1.6 + 0.5,
    }))

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect()
      mouse.x = e.clientX - r.left
      mouse.y = e.clientY - r.top
    }
    const onLeave = () => { mouse = { x: -9999, y: -9999 } }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)
    window.addEventListener('resize', resize)

    const LINK_DIST  = 115
    const REPEL_DIST = 95

    const tick = () => {
      ctx.clearRect(0, 0, W(), H())

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i]

        // Repel from mouse
        const mdx = p.x - mouse.x
        const mdy = p.y - mouse.y
        const md  = Math.sqrt(mdx * mdx + mdy * mdy)
        if (md < REPEL_DIST) {
          const f = (REPEL_DIST - md) / REPEL_DIST
          p.vx += (mdx / md) * f * 0.6
          p.vy += (mdy / md) * f * 0.6
        }

        p.vx *= 0.96
        p.vy *= 0.96
        p.x  += p.vx
        p.y  += p.vy

        // Wrap around
        if (p.x < 0)    p.x = W()
        if (p.x > W())  p.x = 0
        if (p.y < 0)    p.y = H()
        if (p.y > H())  p.y = 0

        // Draw dot
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(0,212,255,0.55)'
        ctx.fill()

        // Connect nearby dots
        for (let j = i + 1; j < pts.length; j++) {
          const q  = pts[j]
          const dx = p.x - q.x
          const dy = p.y - q.y
          const d  = Math.sqrt(dx * dx + dy * dy)
          if (d < LINK_DIST) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.strokeStyle = `rgba(0,212,255,${0.2 * (1 - d / LINK_DIST)})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }

      animId = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="hero__particles" aria-hidden="true" />
}
