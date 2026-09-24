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
            <h2>Say hello</h2>
            <p>
              Questions about a project here, or want to talk about BIM, GIS or code? I'm always happy to hear
              from people.
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
