import type { ComponentType, CSSProperties, SVGProps } from 'react'
import { CheckIcon, CodeIcon, CubeIcon, MapIcon } from './Icons'

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
    title: 'BIM modeling & documentation',
    text: 'Revit models built from sketches, PDFs, CAD files or point clouds, and the drawing sets that come out of them.',
    items: ['Architectural Revit models', 'Scan to BIM', 'Construction document sets', 'IFC / openBIM exchange'],
  },
  {
    icon: MapIcon,
    tone: '#4ade80',
    title: 'GIS & site analysis',
    text: 'Buildings and plans placed at their real coordinates, with the parcels, zoning and networks around them.',
    items: ['Georeferencing CAD & BIM', 'Site selection & zoning overlays', 'ArcGIS Pro & QGIS maps', 'Google Earth KMZ'],
  },
  {
    icon: CodeIcon,
    tone: '#c084fc',
    title: 'BIM software & automation',
    text: 'Tools that take the repetitive work out of BIM and share model data with people who do not use Revit.',
    items: ['Revit add-ins (C# API)', 'Dynamo & Python scripts', 'Web viewers & dashboards', 'Excel data exports'],
  },
]

export default function Services() {
  return (
    <section id="services" className="section" data-testid="services">
      <div className="container">
        <header className="section-head" data-reveal>
          <span className="kicker">Services</span>
          <h2>One partner for the model, the map and the code</h2>
          <p>Most BIM work stops at the building's walls. Mine carries on to the site, the city and the software around it.</p>
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
