import type { CSSProperties } from 'react'
import { ClipboardIcon, DrawingIcon, LayersIcon, SendIcon } from './Icons'

const steps = [
  {
    icon: ClipboardIcon,
    title: 'Start from the source',
    text: 'Sketches, PDFs, CAD files or point clouds: whatever the project starts from.',
  },
  {
    icon: LayersIcon,
    title: 'Model',
    text: 'A clean Revit model with sensible levels, families and parameters that others can build on.',
  },
  {
    icon: DrawingIcon,
    title: 'Coordinate & document',
    text: 'Checked with the rest of the team, then turned into plans, sections, details and schedules.',
  },
  {
    icon: SendIcon,
    title: 'Issue & share',
    text: 'Issued as RVT, DWG, IFC or PDF, ready for review, permit or construction.',
  },
]

export default function Process() {
  return (
    <section id="approach" className="section section-alt" data-testid="approach">
      <div className="container">
        <header className="section-head" data-reveal>
          <span className="kicker">Approach</span>
          <h2>How I like to work</h2>
          <p>The same four steps run through most of my projects, from a single drawing set to a full building model.</p>
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
