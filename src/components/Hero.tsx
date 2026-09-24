import { OWNER, ROLE, skills } from '../data'
import HeroVisual from './HeroVisual'
import { ArrowIcon } from './Icons'

const stats = [
  { value: '3', label: 'Disciplines', note: 'BIM · GIS · Software' },
  { value: `${skills.length}`, label: 'Tools & skills', note: 'Revit to React' },
  { value: 'RVT · DWG · IFC · KMZ', label: 'Delivery formats', note: 'Ready for any team' },
]

const tools = [
  'Autodesk Revit',
  'AutoCAD',
  'Dynamo',
  'IFC / openBIM',
  'ArcGIS Pro',
  'QGIS',
  'Google Earth',
  'Revit API · C#',
  'Python',
  'React',
  'TypeScript',
  'Excel',
]

export default function Hero() {
  return (
    <section id="home" className="hero" data-testid="hero">
      <div className="container hero-grid">
        <div className="hero-text">
          <span className="eyebrow">
            <span className="eyebrow-dot" aria-hidden="true" />
            {ROLE}
          </span>
          <h1>
            BIM models, <span className="grad">real-world context</span> and the code that connects them.
          </h1>
          <p className="hero-sub">
            I'm {OWNER}. I build Revit models and construction drawings, place them on GIS maps at their real
            coordinates, and write software that automates the work in between.
          </p>
          <div className="hero-ctas">
            <a href="#projects" className="btn btn-primary btn-lg">
              View projects <ArrowIcon className="btn-icon" />
            </a>
            <a href="#contact" className="btn btn-ghost btn-lg">
              Start a project
            </a>
          </div>

          <dl className="hero-stats">
            {stats.map((s) => (
              <div key={s.label}>
                <dt>{s.label}</dt>
                <dd>
                  <strong>{s.value}</strong>
                  <span>{s.note}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <HeroVisual />
      </div>

      <div className="tool-strip" aria-label="Tools I work with">
        <div className="tool-track">
          {[...tools, ...tools].map((t, i) => (
            <span key={i} className="tool" aria-hidden={i >= tools.length}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
