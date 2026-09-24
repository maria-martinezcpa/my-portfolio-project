import { EMAILS, PHONE, TELEGRAM } from '../data'

export default function Contact() {
  return (
    <section id="contact" className="section" data-testid="contact">
      <div className="container contact">
        <h2>Contact</h2>
        <div className="contact-links">
          {EMAILS.map((email) => (
            <a key={email} href={`mailto:${email}`} className="btn btn-outline">
              {email}
            </a>
          ))}
          <a
            href={TELEGRAM}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            Telegram: {TELEGRAM}
          </a>
          <a href={`tel:${PHONE.replace(/[^\d+]/g, '')}`} className="btn btn-outline">
            {PHONE}
          </a>
        </div>
      </div>
    </section>
  )
}
