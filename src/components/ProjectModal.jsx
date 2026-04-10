import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const LANG_COLORS = {
  JavaScript: '#f1e05a', TypeScript: '#3178c6', Python: '#3572A5',
  Java: '#b07219', Kotlin: '#A97BFF', Dart: '#00B4AB',
  'C#': '#239120', PHP: '#4F5D95', HTML: '#e34c26', CSS: '#563d7c',
}

export default function ProjectModal({ project, onClose }) {
  const overlayRef = useRef(null)
  const panelRef   = useRef(null)
  const closeRef   = useRef(null)
  const [ghData, setGhData] = useState(null)

  useEffect(() => {
    closeRef.current = () => {
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.25 })
      gsap.to(panelRef.current, { y: 40, opacity: 0, scale: 0.96, duration: 0.25, onComplete: onClose })
    }
  })

  const close = () => closeRef.current?.()

  useEffect(() => {
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 })
    gsap.fromTo(panelRef.current,
      { y: 60, opacity: 0, scale: 0.96 },
      { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: 'power3.out' }
    )
    document.body.style.overflow = 'hidden'

    if (project.github) {
      fetch(`https://api.github.com/repos/${project.github}`)
        .then(r => r.ok ? r.json() : null)
        .then(data => { if (data) setGhData(data) })
        .catch(() => {})
    }

    const onKey = (e) => { if (e.key === 'Escape') closeRef.current() }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [project.github])

  return (
    <div
      ref={overlayRef}
      className="modal__overlay"
      onClick={(e) => { if (e.target === overlayRef.current) close() }}
      role="dialog"
      aria-modal="true"
      aria-label={project.name}
    >
      <div ref={panelRef} className="modal__panel">

        <button className="modal__close" onClick={close} aria-label="Cerrar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Tipo + Premio */}
        <div className="modal__badges">
          <span className="project__type">{project.type}</span>
          {project.award && (
            <span className="project__award">
              <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12" aria-hidden="true">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              {project.award}
            </span>
          )}
        </div>

        {/* Titulo */}
        <h2 className="modal__title">{project.name}</h2>

        {/* Descripcion corta */}
        <p className="modal__description">{project.description}</p>

        {/* Descripcion larga */}
        {project.longDescription && (
          <p className="modal__long-desc">{project.longDescription}</p>
        )}

        {/* Stats de GitHub si se cargan */}
        {ghData && (
          <div className="modal__gh-stats">
            {ghData.language && (
              <span className="gh__stat">
                <span className="gh__dot" style={{ background: LANG_COLORS[ghData.language] || '#64748b' }} />
                {ghData.language}
              </span>
            )}
            <span className="gh__stat">
              <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12" aria-hidden="true">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              {ghData.stargazers_count}
            </span>
            <span className="gh__stat">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12" aria-hidden="true">
                <circle cx="18" cy="18" r="3" /><circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" />
                <path d="M6 9v6M18 9a6 6 0 01-6 6H9" />
              </svg>
              {ghData.forks_count}
            </span>
            <span className="gh__stat gh__stat--muted">
              Actualizado {new Date(ghData.updated_at).toLocaleDateString('es-ES')}
            </span>
          </div>
        )}

        {/* Tags */}
        <div className="modal__tags">
          {project.tags.map((t) => (
            <span key={t} className="project__tag">{t}</span>
          ))}
        </div>

        {/* Boton GitHub */}
        <div className="modal__actions">
          <a
            href={`https://github.com/${project.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--primary"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15" aria-hidden="true">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            Ver en GitHub
          </a>
        </div>

      </div>
    </div>
  )
}
