import { useEffect, useRef, useState } from 'react'
import type { Project } from '../data'

interface Props {
  project: Project
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: Props) {
  const [active, setActive] = useState(0)
  const closeRef = useRef<HTMLButtonElement>(null)
  const image = project.images[active]
  const total = project.images.length

  useEffect(() => {
    closeRef.current?.focus()
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') setActive((i) => Math.min(i + 1, total - 1))
      if (e.key === 'ArrowLeft') setActive((i) => Math.max(i - 1, 0))
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, total])

  return (
    <div className="modal-backdrop" onClick={onClose} data-testid="project-modal">
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button ref={closeRef} type="button" className="modal-close" aria-label="Close" onClick={onClose}>
          ×
        </button>

        <div className="modal-media">
          {image && <img src={image.src} alt={`${project.title} (${active + 1} of ${total})`} />}
          {total > 1 && (
            <div className="modal-thumbs">
              {project.images.map((img, i) => (
                <button
                  key={img.src}
                  type="button"
                  className={i === active ? 'active' : ''}
                  aria-label={`Show image ${i + 1}`}
                  onClick={() => setActive(i)}
                >
                  <img src={img.src} alt="" loading="lazy" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="modal-info">
          <span className="kicker">{project.category}</span>
          <h2 id="project-modal-title">{project.title}</h2>
          {project.author && (
            <p className="modal-credit">
              Sample project by <strong>{project.author}</strong>, shown for reference.
            </p>
          )}
          {project.role && (
            <p>
              <span className="muted">Role: </span>
              {project.role}
            </p>
          )}
          {project.description.map((para) => (
            <p key={para}>{para}</p>
          ))}
          {project.skills.length > 0 && (
            <>
              <h3 className="modal-subhead">Skills and deliverables</h3>
              <ul className="tech-list modal-skills">
                {project.skills.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </>
          )}
          {project.published && <p className="muted small">Published {project.published}</p>}
        </div>
      </div>
    </div>
  )
}
