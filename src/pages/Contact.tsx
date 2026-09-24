import { motion } from 'framer-motion'
import ContactCurve from '../components/ContactCurve'
import Footer from '../components/Footer'
import Page from '../components/Page'
import { Reveal, RevealText } from '../components/Reveal'
import { OWNER } from '../data'

export default function Contact() {
  return (
    <Page title={`Contact | ${OWNER}`}>
      <section className="container-x pt-40 md:pt-52">
        <motion.span className="eyebrow text-muted" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 1 }}>
          Contact
        </motion.span>
        <h1 className="mt-6 font-display text-[22vw] leading-[0.82] tracking-[-0.03em] md:text-[13vw]">
          <RevealText text="Say" instant delay={0.3} className="block" />
          <RevealText text="hello." instant delay={0.42} className="block pl-[12vw] italic" />
        </h1>
        <Reveal delay={0.7} className="mt-10 max-w-md md:ml-auto md:-mt-24">
          <p className="text-lg leading-relaxed text-muted">
            Questions about a project here, or want to talk about BIM and architecture? I'm always happy to hear from
            people.
          </p>
        </Reveal>
      </section>

      <section className="container-x py-20 md:py-28">
        <ContactCurve />
      </section>

      <Footer cta={false} />
    </Page>
  )
}
