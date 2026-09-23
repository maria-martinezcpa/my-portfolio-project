import { useCallback, useEffect, useState, type KeyboardEvent } from 'react'
import { projects, type Project } from '../data'
import ProjectModal from './ProjectModal'

const AUTOPLAY_MS = 5000

export default function ProjectCarousel() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [open, setOpen] = useState<Project | null>(null)
  const count = projects.length

  const goTo = useCallback((i: number) => setIndex(((i % count) + count) % count), [count])
  const next = useCallback(() => goTo(index + 1), [goTo, index])
  const prev = useCallback(() => goTo(index - 1), [goTo, index])

  useEffect(() => {
    if (paused || open) return
    const id = window.setTimeout(next, AUTOPLAY_MS)
    return () => window.clearTimeout(id)
  }, [paused, open, next])

  const handleKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') next()
    if (e.key === 'ArrowLeft') prev()
  }

  return (
    <section id="projects" className="section" data-testid="projects">
      <div className="container">
        <div className="section-head">
          <h2>Projects</h2>
        </div>

        <div
          className="carousel"
          role="region"
          aria-roledescription="carousel"
          aria-label="Featured projects"
          tabIndex={0}
          onKeyDown={handleKey}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          data-testid="carousel"
        >
          <div className="carousel-track" style={{ transform: `translateX(-${index * 100}%)` }}>
            {projects.map((p, i) => (
              <figure
                key={p.id}
                className="carousel-slide"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${count}`}
                aria-hidden={i !== index}
                data-testid={`slide-${i}`}
              >
                {p.images[0] && <img src={p.images[0].src} alt={p.title} draggable={false} />}
                <figcaption className="carousel-caption">
                  <div className="tags">
                    {p.skills.slice(0, 3).map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>
                  <h3>{p.title}</h3>
                  {p.description[0] && <p className="clamp-2">{p.description[0]}</p>}
                  <button
                    type="button"
                    className="carousel-link"
                    onClick={() => setOpen(p)}
                    tabIndex={i === index ? 0 : -1}
                  >
                    View details →
                  </button>
                </figcaption>
              </figure>
            ))}
          </div>

          <button className="carousel-btn prev" aria-label="Previous slide" onClick={prev} data-testid="carousel-prev">
            ‹
          </button>
          <button className="carousel-btn next" aria-label="Next slide" onClick={next} data-testid="carousel-next">
            ›
          </button>

          <div className="carousel-dots">
            {projects.map((p, i) => (
              <button
                key={p.id}
                className={i === index ? 'active' : ''}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index}
                onClick={() => goTo(i)}
                data-testid={`carousel-dot-${i}`}
              />
            ))}
          </div>
        </div>

        <div className="project-grid" data-testid="project-grid">
          {projects.map((p) => (
            <button key={p.id} type="button" className="project-card" onClick={() => setOpen(p)}>
              <div className="project-thumb">
                {p.images[0] && <img src={p.images[0].src} alt="" loading="lazy" />}
                <span className="project-count">
                  {p.images.length} {p.images.length === 1 ? 'image' : 'images'}
                </span>
              </div>
              <div className="project-card-body">
                <h3>{p.title}</h3>
                <p className="muted">{[p.role, p.published].filter(Boolean).join(' · ')}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {open && <ProjectModal project={open} onClose={() => setOpen(null)} />}
    </section>
  )
}
