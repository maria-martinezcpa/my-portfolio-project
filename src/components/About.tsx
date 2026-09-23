import { OWNER, ROLE, skills } from '../data'

export default function About() {
  return (
    <section id="about" className="section section-alt" data-testid="about">
      <div className="container about">
        <h2>About</h2>
        <p className="muted">
          I'm {OWNER}, a {ROLE} working on Revit models, drawings and BIM workflows. I link building models with GIS
          site and city data, and write software (Revit add-ins, Python scripts and web apps) that automates and shares
          them.
        </p>
        <ul className="tech-list">
          {skills.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
