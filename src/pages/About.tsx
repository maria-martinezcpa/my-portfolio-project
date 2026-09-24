import { motion } from 'framer-motion'
import Footer from '../components/Footer'
import Page from '../components/Page'
import { Reveal, RevealImage, RevealText } from '../components/Reveal'
import { OWNER, ROLE, findProject, skillGroups } from '../data'
import { EASE, inView } from '../lib/motion'

const approach = [
  ['Start from the source', 'Sketches, PDFs, CAD files or point clouds: whatever the project begins with.'],
  ['Model', 'A clean Revit model with sensible levels, families and parameters that others can build on.'],
  ['Coordinate & document', 'Checked with the rest of the team, then turned into plans, sections, details and schedules.'],
  ['Issue & share', 'Issued as RVT, DWG, IFC or PDF, ready for review, permit or construction.'],
]

const image = findProject('04')?.images[0]

export default function About() {
  return (
    <Page title={`About | ${OWNER}`}>
      <section className="container-x grid gap-12 pb-24 pt-40 md:grid-cols-12 md:pb-40 md:pt-52">
        <div className="md:col-span-8">
          <motion.span className="eyebrow text-muted" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 1 }}>
            About
          </motion.span>
          <h1 className="mt-6 font-display text-[13vw] leading-[0.9] tracking-[-0.02em] md:text-[7.5vw]">
            <RevealText text="Careful models" instant delay={0.3} className="block" />
            <RevealText text="for architecture." instant delay={0.45} className="block italic" />
          </h1>
        </div>
        <Reveal className="self-end md:col-span-4" delay={0.7}>
          <p className="text-lg leading-relaxed">
            I'm {OWNER}, a {ROLE} working on architectural Revit models, drawings and BIM workflows.
          </p>
        </Reveal>
      </section>

      {image && (
        <section className="container-x grid gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <RevealImage src={image.src} ratio={image.width / image.height} className="w-full" />
            <p className="mt-3 text-xs text-muted">Scan to Revit Model — reference project</p>
          </div>
          <div className="self-end md:col-span-4 md:col-start-9">
            <RevealText
              as="p"
              stagger={0.02}
              className="font-display text-3xl leading-[1.2] md:text-[2.6rem]"
              text="I turn sketches, PDFs, CAD files and point clouds into clean, well-organised Revit models."
            />
            <Reveal delay={0.3}>
              <p className="mt-8 leading-relaxed text-muted">
                I carry them through coordination to construction documents. I care about models that other people can pick
                up and trust, and drawings that are clear on site.
              </p>
            </Reveal>
          </div>
        </section>
      )}

      {/* Skills */}
      <section className="container-x py-28 md:py-44">
        <Reveal>
          <span className="eyebrow text-muted">Expertise</span>
        </Reveal>
        <div className="mt-10 grid border-t border-line md:grid-cols-3">
          {skillGroups.map((g, i) => (
            <motion.div
              key={g.title}
              className="border-b border-line py-10 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inView}
              transition={{ duration: 1, ease: EASE, delay: i * 0.12 }}
            >
              <span className="text-xs tabular-nums text-muted">0{i + 1}</span>
              <h2 className="mt-6 font-display text-4xl">{g.title}</h2>
              <ul className="mt-6 space-y-2 text-muted">
                {g.items.map((s) => (
                  <li key={s} className="transition-transform duration-500 hover:translate-x-1.5 hover:text-fg">
                    {s}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Approach */}
      <section className="container-x">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <RevealText as="h2" text="How I like to work" className="font-display text-5xl leading-[1.02] md:text-6xl" />
          </div>
          <ol className="md:col-span-7 md:col-start-6">
            {approach.map(([t, text], i) => (
              <motion.li
                key={t}
                className="group grid grid-cols-[3rem_1fr] gap-4 border-t border-line py-8 last:border-b"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={inView}
                transition={{ duration: 1, ease: EASE, delay: i * 0.1 }}
              >
                <span className="font-display text-2xl text-accent">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="font-display text-3xl transition-transform duration-700 ease-[var(--ease-expo)] group-hover:translate-x-2">{t}</h3>
                  <p className="mt-2 text-muted">{text}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      <Footer />
    </Page>
  )
}
