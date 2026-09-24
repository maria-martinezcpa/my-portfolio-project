import type { CSSProperties } from 'react'
import { ClipboardIcon, LayersIcon, PinIcon, SendIcon } from './Icons'

const steps = [
  {
    icon: ClipboardIcon,
    title: 'Brief & source data',
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
    title: 'Deliver & automate',
    text: 'RVT, DWG, IFC, PDF or KMZ, plus scripts or tools when the same task will come up again.',
  },
]

export default function Process() {
  return (
    <section id="process" className="section section-alt" data-testid="process">
      <div className="container">
        <header className="section-head" data-reveal>
          <span className="kicker">Process</span>
          <h2>From source files to a model you can use</h2>
          <p>Four steps, whether the job is one drawing set or a model that links to a whole city map.</p>
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
