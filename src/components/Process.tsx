import type { CSSProperties } from 'react'
import { ClipboardIcon, LayersIcon, PinIcon, SendIcon } from './Icons'

const steps = [
  {
    icon: ClipboardIcon,
    title: 'Start from the source',
    text: 'Sketches, PDFs, CAD files, point clouds or GIS layers: whatever the project starts from.',
  },
  {
    icon: LayersIcon,
    title: 'Model',
    text: 'A clean Revit model with sensible levels, families and parameters that others can build on.',
  },
  {
    icon: PinIcon,
    title: 'Place & coordinate',
    text: 'Georeferenced to real coordinates, checked against the site, and turned into drawings.',
  },
  {
    icon: SendIcon,
    title: 'Share & automate',
    text: 'Export to RVT, DWG, IFC, PDF or KMZ, and script the parts that come up again and again.',
  },
]

export default function Process() {
  return (
    <section id="approach" className="section section-alt" data-testid="approach">
      <div className="container">
        <header className="section-head" data-reveal>
          <span className="kicker">Approach</span>
          <h2>How I like to work</h2>
          <p>The same four steps run through most of my projects, from a single drawing set to a model linked to a city map.</p>
        </header>

        <ol className="process">
          {steps.map(({ icon: Icon, title, text }, i) => (
            <li key={title} style={{ '--delay': `${i * 90}ms` } as CSSProperties} data-reveal>
              <span className="process-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="process-icon">
                <Icon />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
