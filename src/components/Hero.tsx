import { OWNER, ROLE, skills } from '../data'
import HeroVisual from './HeroVisual'
import { ArrowIcon } from './Icons'

const stats = [
  { value: 'Revit', label: 'Core tool', note: 'From model to sheets' },
  { value: `${skills.length}`, label: 'Tools & skills', note: 'Revit to AutoCAD' },
  { value: 'RVT · DWG · IFC · PDF', label: 'File formats', note: 'What I work in daily' },
]

const tools = [
  'Autodesk Revit',
  'AutoCAD',
  'Dynamo for Revit',
  'IFC / openBIM',
  'Scan to BIM',
  'Construction Documents',
  '3D Visualization',
  'PDF to CAD',
]

export default function Hero() {
  return (
    <section id="home" className="hero" data-testid="hero">
      <div className="container hero-grid">
        <div className="hero-text">
          <span className="eyebrow">
            <span className="eyebrow-dot" aria-hidden="true" />
            {ROLE} · Architecture
          </span>
          <h1>
            Architectural BIM, <span className="grad">from first model</span> to construction set.
          </h1>
          <p className="hero-sub">
            I'm {OWNER}, and this is my portfolio. I build Revit models for architecture projects, coordinate them and
            turn them into clear construction documents.
          </p>
          <div className="hero-ctas">
            <a href="#projects" className="btn btn-primary btn-lg">
              View projects <ArrowIcon className="btn-icon" />
            </a>
            <a href="#about" className="btn btn-ghost btn-lg">
              About me
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
