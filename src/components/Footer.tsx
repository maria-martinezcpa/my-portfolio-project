import { motion } from 'framer-motion'
import { EMAILS, OWNER, ROLE } from '../data'
import { EASE } from '../lib/motion'
import { ArrowUpRightIcon } from './Icons'
import { RevealText } from './Reveal'

export default function Footer({ cta = true }: { cta?: boolean }) {
  return (
    <footer className="container-x pb-8 pt-24 md:pt-40">
      {cta && (
        <a href="#/contact" className="group block border-t border-line pt-10" data-cursor="Write">
          <span className="eyebrow text-muted">Next</span>
          <div className="mt-6 flex items-end justify-between gap-6">
            <RevealText
              text="Let's talk."
              as="h2"
              className="font-display text-[18vw] leading-[0.85] tracking-tight md:text-[12vw]"
            />
            <motion.span
              className="mb-[2vw] hidden h-[7vw] w-[7vw] items-center justify-center rounded-full border border-fg transition-colors duration-500 group-hover:bg-fg group-hover:text-bg md:flex"
              initial={{ rotate: -45, opacity: 0 }}
              whileInView={{ rotate: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
            >
              <ArrowUpRightIcon className="h-1/3 w-1/3 transition-transform duration-500 group-hover:rotate-45" />
            </motion.span>
          </div>
        </a>
      )}

      <div className="mt-20 grid gap-6 border-t border-line pt-6 text-sm text-muted md:grid-cols-3">
        <span>
          © {new Date().getFullYear()} {OWNER}
        </span>
        <span className="md:text-center">{ROLE}</span>
        <a href={`mailto:${EMAILS[0]}`} className="link-line justify-self-start md:justify-self-end">
          {EMAILS[0]}
        </a>
      </div>
    </footer>
  )
}
