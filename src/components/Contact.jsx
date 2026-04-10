import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Strip HTML and limit length — prevents XSS when rendering back to DOM
function sanitize(str, maxLen) {
  return String(str)
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .slice(0, maxLen)
    .trim()
}

function validate({ name, email, subject, message }) {
  const errors = {}
  if (!name || name.trim().length < 2)
    errors.name = 'El nombre debe tener al menos 2 caracteres.'
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
    errors.email = 'Introduce un email válido.'
  if (!subject || subject.trim().length < 3)
    errors.subject = 'El asunto debe tener al menos 3 caracteres.'
  if (!message || message.trim().length < 10)
    errors.message = 'El mensaje debe tener al menos 10 caracteres.'
  return errors
}

const INITIAL = { name: '', email: '', subject: '', message: '' }

export default function Contact() {
  const containerRef = useRef(null)
  const [fields, setFields]   = useState(INITIAL)
  const [errors, setErrors]   = useState({})
  const [status, setStatus]   = useState(null) // null | 'success'

  useGSAP(() => {
    gsap.from('.contact__info, .contact__form', {
      y: 48,
      opacity: 0,
      stagger: 0.18,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: { trigger: containerRef.current, start: 'top 72%' },
    })
  }, { scope: containerRef })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFields((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus(null)

    const clean = {
      name:    sanitize(fields.name, 100),
      email:   sanitize(fields.email, 200),
      subject: sanitize(fields.subject, 200),
      message: sanitize(fields.message, 2000),
    }

    const errs = validate(clean)
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }

    // TODO: enviar a tu backend/API aquí
    // Por ahora simulamos el envío exitoso
    setStatus('success')
    setFields(INITIAL)
    setErrors({})
  }

  return (
    <section id="contacto" ref={containerRef} className="section contact">
      <div className="container">
        <div className="section__header">
          <span className="section__tag">06 &mdash; contacto</span>
          <h2 className="section__title">Hablemos</h2>
        </div>

        <div className="contact__grid">
          <div className="contact__info">
            <p className="contact__intro">
              Estoy abierto a nuevas oportunidades, colaboraciones y proyectos interesantes.
              Si tienes algo en mente, no dudes en escribirme.
            </p>
            <div className="contact__links">
              <a href="mailto:danicasasyuste@gmail.com" className="contact__link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18" aria-hidden="true">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                danicasasyuste@gmail.com
              </a>
              <a href="https://github.com/danicasasyuste" target="_blank" rel="noopener noreferrer" className="contact__link">
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                github.com/danicasasyuste
              </a>
              <span className="contact__link contact__link--plain">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
                +34 637 88 61 54
              </span>
            </div>
          </div>

          <form className="contact__form" onSubmit={handleSubmit} noValidate>
            {status === 'success' && (
              <div className="form__success" role="alert">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Mensaje enviado. Te respondere lo antes posible.
              </div>
            )}

            <div className="form__row">
              <div className={`form__group${errors.name ? ' form__group--error' : ''}`}>
                <label htmlFor="contact-name">Nombre</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  value={fields.name}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                  maxLength={100}
                  autoComplete="name"
                  aria-describedby={errors.name ? 'err-name' : undefined}
                />
                {errors.name && <span id="err-name" className="form__error" role="alert">{errors.name}</span>}
              </div>
              <div className={`form__group${errors.email ? ' form__group--error' : ''}`}>
                <label htmlFor="contact-email">Email</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  value={fields.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  maxLength={200}
                  autoComplete="email"
                  aria-describedby={errors.email ? 'err-email' : undefined}
                />
                {errors.email && <span id="err-email" className="form__error" role="alert">{errors.email}</span>}
              </div>
            </div>

            <div className={`form__group${errors.subject ? ' form__group--error' : ''}`}>
              <label htmlFor="contact-subject">Asunto</label>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                value={fields.subject}
                onChange={handleChange}
                placeholder="Asunto del mensaje"
                maxLength={200}
                aria-describedby={errors.subject ? 'err-subject' : undefined}
              />
              {errors.subject && <span id="err-subject" className="form__error" role="alert">{errors.subject}</span>}
            </div>

            <div className={`form__group${errors.message ? ' form__group--error' : ''}`}>
              <label htmlFor="contact-message">Mensaje</label>
              <textarea
                id="contact-message"
                name="message"
                value={fields.message}
                onChange={handleChange}
                placeholder="Cuéntame en qué puedo ayudarte..."
                rows={5}
                maxLength={2000}
                aria-describedby={errors.message ? 'err-message' : undefined}
              />
              {errors.message && <span id="err-message" className="form__error" role="alert">{errors.message}</span>}
            </div>

            <button type="submit" className="btn btn--primary form__submit">
              Enviar mensaje
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16" aria-hidden="true">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
