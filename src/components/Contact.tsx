import type { ReactNode } from 'react'
import { EMAILS, PHONE, TELEGRAM } from '../data'

const MailIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm0 2v.51l8 5 8-5V6H4Zm16 2.87-7.47 4.67a1 1 0 0 1-1.06 0L4 8.87V18h16V8.87Z"
    />
  </svg>
)

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M21.4 3.2 2.3 10.6c-.9.35-.88 1.63.03 1.95l4.7 1.66 1.8 5.6c.24.74 1.17.97 1.72.42l2.6-2.56 4.66 3.42c.62.45 1.5.12 1.67-.63l3.2-15.4c.17-.8-.6-1.46-1.28-1.16ZM9.9 14.3l-.5 3.6-1.2-4 9.3-6.9-7.6 7.3Z"
    />
  </svg>
)

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2Z"
    />
  </svg>
)

type ContactItem = {
  kind: 'email' | 'telegram' | 'phone'
  label: string
  value: string
  href: string
  icon: ReactNode
  external?: boolean
}

const items: ContactItem[] = [
  ...EMAILS.map<ContactItem>((email) => ({
    kind: 'email',
    label: 'Email',
    value: email,
    href: `mailto:${email}`,
    icon: <MailIcon />,
  })),
  {
    kind: 'telegram',
    label: 'Telegram',
    value: `@${TELEGRAM.split('/').pop()}`,
    href: TELEGRAM,
    icon: <TelegramIcon />,
    external: true,
  },
  {
    kind: 'phone',
    label: 'Phone',
    value: PHONE,
    href: `tel:${PHONE.replace(/[^\d+]/g, '')}`,
    icon: <PhoneIcon />,
  },
]

export default function Contact() {
  return (
    <section id="contact" className="section" data-testid="contact">
      <div className="container contact">
        <h2>Contact</h2>
        <ul className="contact-list">
          {items.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={`contact-card contact-${item.kind}`}
                {...(item.external && { target: '_blank', rel: 'noopener noreferrer' })}
              >
                <span className="contact-icon">{item.icon}</span>
                <span className="contact-text">
                  <span className="contact-label">{item.label}</span>
                  <span className="contact-value">{item.value}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
