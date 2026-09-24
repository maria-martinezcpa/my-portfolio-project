import type { CSSProperties } from 'react'
import { OWNER, ROLE, skillGroups } from '../data'
import { CodeIcon, CubeIcon, MapIcon } from './Icons'

const groupIcons = { cube: CubeIcon, map: MapIcon, code: CodeIcon }

export default function About() {
  return (
    <section id="about" className="section" data-testid="about">
      <div className="container about-grid">
        <div className="about-text" data-reveal>
          <span className="kicker">About</span>
          <h2>A BIM modeler who also writes the code</h2>
          <p className="lead">
            I'm {OWNER}, a {ROLE} working on Revit models, drawings and BIM workflows.
          </p>
          <p className="muted">
            I link building models with GIS site and city data, and write software (Revit add-ins, Python scripts and web
            apps) that automates and shares them. That means one person can take a project from a PDF or a point cloud
            to a georeferenced model, and then build the tool that keeps it up to date.
          </p>
          <a href="#contact" className="btn btn-primary">
            Work with me
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
