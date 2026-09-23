import { EMAIL } from '../data'

export default function Contact() {
  return (
    <section id="contact" className="section" data-testid="contact">
      <div className="container contact">
        <h2>Contact</h2>
        <a href={`mailto:${EMAIL}`} className="btn btn-outline">
          {EMAIL}
        </a>
      </div>
    </section>
  )
}
