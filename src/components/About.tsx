import type { CSSProperties } from 'react'
import { OWNER, ROLE, skillGroups } from '../data'
import { CubeIcon, DrawingIcon, LayersIcon } from './Icons'

const groupIcons = { cube: CubeIcon, drawing: DrawingIcon, layers: LayersIcon }

export default function About() {
  return (
    <section id="about" className="section" data-testid="about">
      <div className="container about-grid">
        <div className="about-text" data-reveal>
          <span className="kicker">About</span>
          <h2>BIM for architecture, done carefully</h2>
          <p className="lead">
            I'm {OWNER}, a {ROLE} working on architectural Revit models, drawings and BIM workflows.
          </p>
          <p className="muted">
            I turn sketches, PDFs, CAD files and point clouds into clean, well-organised Revit models, and carry them
            through coordination to construction documents. I care about models that other people can pick up and
            trust, and drawings that are clear on site.
          </p>
          <a href="#projects" className="btn btn-primary">
            See my projects
          </a>
        </div>

        <div className="skill-groups">
          {skillGroups.map((g, i) => {
            const Icon = groupIcons[g.icon]
            return (
              <div key={g.title} className="skill-group" style={{ '--delay': `${i * 90}ms` } as CSSProperties} data-reveal>
                <h3>
                  <span className="skill-icon">
                    <Icon />
                  </span>
                  {g.title}
                </h3>
                <ul className="tech-list">
                  {g.items.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
