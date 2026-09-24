import type { CSSProperties } from 'react'
import BimIllustration from './BimIllustration'
import { ChartIcon, GlobeIcon, SearchIcon, UsersIcon } from './Icons'

const benefits = [
  { icon: SearchIcon, title: 'Clashes caught early', text: 'Problems are found and fixed on screen, not on site.' },
  { icon: UsersIcon, title: 'One source of truth', text: 'Architects, engineers and builders work from the same model.' },
  { icon: ChartIcon, title: 'Data for the whole lifecycle', text: 'Quantities, costs, schedules and maintenance from one model.' },
  { icon: GlobeIcon, title: 'An industry standard', text: 'Required on public projects in the UK and many other countries.' },
]

const dimensions = [
  ['3D', 'Model', '#60a5fa'],
  ['4D', 'Time', '#f59e0b'],
  ['5D', 'Cost', '#34d399'],
  ['6D', 'Energy', '#a3e635'],
  ['7D', 'Operate', '#f472b6'],
]

export default function BimSection() {
  return (
    <section id="bim" className="section section-alt" data-testid="bim">
      <div className="container bim-grid">
        <div className="bim-text" data-reveal>
          <span className="kicker">What is BIM?</span>
          <h2>A building that knows what it is made of</h2>
          <p className="lead">
            <strong>Building Information Modeling</strong> is a shared 3D model of a building where every element (wall,
            beam, pipe, door) carries real data. Everyone who designs, builds and runs the building works from it.
          </p>

          <ul className="benefits">
            {benefits.map(({ icon: Icon, title, text }) => (
              <li key={title}>
                <span className="benefit-icon">
                  <Icon />
                </span>
                <span>
                  <strong>{title}</strong>
                  <span className="muted">{text}</span>
                </span>
              </li>
            ))}
          </ul>

          <div className="dims" aria-label="BIM dimensions">
            {dimensions.map(([d, label, color]) => (
              <span key={d} className="dim" style={{ '--tone': color } as CSSProperties}>
                <b>{d}</b>
                {label}
              </span>
            ))}
          </div>
        </div>

        <div className="bim-visual" data-reveal>
          <BimIllustration />
        </div>
      </div>
    </section>
  )
}
