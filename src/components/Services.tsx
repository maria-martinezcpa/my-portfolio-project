import type { ComponentType, CSSProperties, SVGProps } from 'react'
import { CheckIcon, CubeIcon, DrawingIcon, LayersIcon } from './Icons'

interface Service {
  icon: ComponentType<SVGProps<SVGSVGElement>>
  tone: string
  title: string
  text: string
  items: string[]
}

const services: Service[] = [
  {
    icon: CubeIcon,
    tone: '#60a5fa',
    title: 'BIM modeling',
    text: 'Architectural Revit models built from sketches, PDFs, CAD files or point clouds, organised so the whole team can build on them.',
    items: ['Architectural Revit models', 'Scan to BIM', 'Existing-conditions models', '3D views & visualization'],
  },
  {
    icon: DrawingIcon,
    tone: '#f59e0b',
    title: 'Construction documents',
    text: 'Drawing sets that come straight out of the model, so plans, sections and schedules always agree.',
    items: ['Plans, elevations & sections', 'Details & schedules', 'Permit drawing sets', 'PDF to CAD conversion'],
  },
  {
    icon: LayersIcon,
    tone: '#c084fc',
    title: 'BIM coordination',
    text: 'Models that stay consistent as they are shared between architects, engineers and builders.',
    items: ['IFC / openBIM exchange', 'Model checks & clean-up', 'Consistent views & sheets', 'Dynamo for Revit routines'],
  },
]

export default function Services() {
  return (
    <section id="focus" className="section" data-testid="focus">
      <div className="container">
        <header className="section-head" data-reveal>
          <span className="kicker">What I do</span>
          <h2>From model to construction set</h2>
          <p>BIM work for architecture projects, from the first model to the drawings that get it built.</p>
        </header>

        <div className="service-grid">
          {services.map(({ icon: Icon, tone, title, text, items }, i) => (
            <article
              key={title}
              className="service-card"
              style={{ '--tone': tone, '--delay': `${i * 90}ms` } as CSSProperties}
              data-reveal
            >
              <span className="service-icon">
                <Icon />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
              <ul>
                {items.map((item) => (
                  <li key={item}>
                    <CheckIcon />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
