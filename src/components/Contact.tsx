import type { ComponentType, SVGProps } from 'react'
import { EMAILS, PHONE, TELEGRAM } from '../data'
import { MailIcon, PhoneIcon, TelegramIcon } from './Icons'

type ContactItem = {
  kind: 'email' | 'telegram' | 'phone'
  label: string
  value: string
  href: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
  external?: boolean
}

const contactItems: ContactItem[] = [
  ...EMAILS.map<ContactItem>((email) => ({
    kind: 'email',
    label: 'Email',
    value: email,
    href: `mailto:${email}`,
    icon: MailIcon,
  })),
  {
    kind: 'telegram',
    label: 'Telegram',
    value: `@${TELEGRAM.split('/').pop()}`,
    href: TELEGRAM,
    icon: TelegramIcon,
    external: true,
  },
  {
    kind: 'phone',
    label: 'Phone',
    value: PHONE,
    href: `tel:${PHONE.replace(/[^\d+]/g, '')}`,
    icon: PhoneIcon,
  },
]

export default function Contact() {
  return (
    <section id="contact" className="section" data-testid="contact">
      <div className="container">
        <div className="contact-panel" data-reveal>
          <div className="contact-intro">
            <span className="kicker">Contact</span>
            <h2>Have a model, a map or a workflow in mind?</h2>
            <p>
              Send drawings, scans or a short brief. I'll reply with questions, an approach and a timeline for your
              project.
            </p>
          </div>

          <ul className="contact-list">
            {contactItems.map(({ kind, label, value, href, icon: Icon, external }) => (
              <li key={href}>
                <a
                  href={href}
                  className={`contact-card contact-${kind}`}
                  {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
                >
                  <span className="contact-icon">
                    <Icon />
                  </span>
                  <span className="contact-text">
                    <span className="contact-label">{label}</span>
                    <span className="contact-value">{value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
