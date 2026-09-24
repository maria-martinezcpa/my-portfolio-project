import { EMAILS, OWNER, PHONE, ROLE, TELEGRAM, navLinks } from '../data'
import { LogoMark } from './Icons'

export default function Footer() {
  return (
    <footer className="footer" data-testid="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <a href="#home" className="logo">
            <LogoMark />
            <span>{OWNER}</span>
          </a>
          <p>{ROLE}. Architectural Revit models, coordination and construction documents.</p>
        </div>

        <nav className="footer-col" aria-label="Footer">
          <h3>Explore</h3>
          {navLinks.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="footer-col">
          <h3>Contact</h3>
          {EMAILS.map((e) => (
            <a key={e} href={`mailto:${e}`}>
              {e}
            </a>
          ))}
          <a href={TELEGRAM} target="_blank" rel="noopener noreferrer">
            Telegram
          </a>
          <a href={`tel:${PHONE.replace(/[^\d+]/g, '')}`}>{PHONE}</a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} {OWNER}
        </span>
        <a href="#home">Back to top ↑</a>
      </div>
    </footer>
  )
}
