import { OWNER, ROLE } from '../data'
import BimIllustration from './BimIllustration'

const benefits = [
  { icon: '🔍', title: 'Clashes caught early', text: 'Problems are found and fixed on screen, not on site.' },
  { icon: '🤝', title: 'One source of truth', text: 'Architects, engineers and builders work from the same model.' },
  { icon: '📊', title: 'Data for the whole lifecycle', text: 'Quantities, costs, schedules and maintenance from one model.' },
  { icon: '🌍', title: 'An industry standard', text: 'Required on public projects in the UK and many other countries.' },
]

export default function Hero() {
  return (
    <section id="home" className="hero" data-testid="hero">
      <div className="container hero-grid">
        <div className="hero-text">
          <span className="badge">{ROLE}</span>
          <h1>{OWNER}</h1>
          <p className="hero-sub">Revit modeling, BIM-GIS integration and software for BIM workflows.</p>

          <h2 className="hero-q">What is BIM?</h2>
          <p className="hero-def">
            <strong>Building Information Modeling</strong> is a shared 3D model of a building where every element
            (wall, beam, pipe, door) carries real data. Everyone who designs, builds and runs the building works from it.
          </p>
          <ul className="benefits">
            {benefits.map((b) => (
              <li key={b.title}>
                <span className="benefit-icon" aria-hidden="true">
                  {b.icon}
                </span>
                <span>
                  <strong>{b.title}</strong>
                  <br />
                  <span className="muted">{b.text}</span>
                </span>
              </li>
            ))}
          </ul>

          <a href="#projects" className="btn btn-primary">
            View projects
          </a>
        </div>

        <div className="hero-visual">
          <BimIllustration />
        </div>
      </div>
    </section>
  )
}
