import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import AxonDrawing from '../components/AxonDrawing'
import Footer from '../components/Footer'
import Page from '../components/Page'
import { Reveal, RevealText } from '../components/Reveal'
import { OWNER } from '../data'
import { EASE, inView } from '../lib/motion'

const sections = [
  { id: 'definition', title: 'Definition' },
  { id: 'objects', title: 'Objects, not lines' },
  { id: 'lod', title: 'Level of development' },
  { id: 'dimensions', title: 'Dimensions' },
  { id: 'lifecycle', title: 'Across the lifecycle' },
  { id: 'standards', title: 'Standards & collaboration' },
  { id: 'roles', title: 'Roles' },
  { id: 'value', title: 'Why it matters' },
]

function Section({
  id,
  n,
  title,
  onActive,
  children,
}: {
  id: string
  n: number
  title: string
  onActive: (id: string) => void
  children: ReactNode
}) {
  const ref = useRef<HTMLElement>(null)
  const active = useInView(ref, { margin: '-45% 0px -50% 0px' })
  useEffect(() => {
    if (active) onActive(id)
  }, [active, id, onActive])

  return (
    <section ref={ref} id={id} className="scroll-mt-28 border-t border-line py-20 md:py-28">
      <Reveal>
        <span className="eyebrow text-muted">{String(n).padStart(2, '0')}</span>
      </Reveal>
      <RevealText as="h2" text={title} className="mt-4 font-display text-5xl leading-[1.02] md:text-7xl" />
      <div className="mt-10 space-y-6 text-[1.05rem] leading-[1.75] text-fg/85">{children}</div>
    </section>
  )
}

const P = ({ children }: { children: ReactNode }) => (
  <Reveal y={20}>
    <p className="max-w-[62ch]">{children}</p>
  </Reveal>
)

const lod = [
  ['100', 'Concept', 'Massing and symbols. Area, height and volume are indicative only.'],
  ['200', 'Schematic', 'Generic elements with approximate size, shape, location and orientation.'],
  ['300', 'Detailed design', 'Specific elements with measurable quantity, size, shape, location and orientation.'],
  ['350', 'Coordination', 'LOD 300 plus the interfaces with neighbouring elements and other disciplines.'],
  ['400', 'Fabrication', 'Enough detail and information to fabricate, assemble and install.'],
  ['500', 'As-built', 'Field-verified representation of what was actually built, for operation.'],
]

function LodScale() {
  const [hover, setHover] = useState(2)
  return (
    <div className="pt-4">
      <div className="relative grid grid-cols-6 gap-1">
        {lod.map(([n], i) => (
          <motion.button
            key={n}
            type="button"
            onMouseEnter={() => setHover(i)}
            onFocus={() => setHover(i)}
            onClick={() => setHover(i)}
            className="group text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inView}
            transition={{ duration: 0.9, ease: EASE, delay: i * 0.08 }}
            aria-pressed={hover === i}
          >
            <motion.span
              className="block origin-bottom bg-fg"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={inView}
              transition={{ duration: 1.2, ease: EASE, delay: 0.2 + i * 0.08 }}
              style={{ height: 16 + i * 18, opacity: hover === i ? 1 : 0.18 + i * 0.1 }}
            />
            <span className={`mt-3 block font-display text-2xl md:text-4xl ${hover === i ? '' : 'text-muted'}`}>{n}</span>
          </motion.button>
        ))}
      </div>
      <motion.div key={hover} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }} className="mt-6 border-l border-accent pl-5">
        <div className="eyebrow text-accent">
          LOD {lod[hover][0]} · {lod[hover][1]}
        </div>
        <p className="mt-2 max-w-[52ch]">{lod[hover][2]}</p>
      </motion.div>
    </div>
  )
}

const dims = [
  ['3D', 'Geometry', 'The coordinated model of every element: walls, slabs, structure, openings and services.'],
  ['4D', 'Time', 'Elements linked to the construction programme to plan and animate the build sequence.'],
  ['5D', 'Cost', 'Quantities taken straight from the model for estimates, budgets and cost control.'],
  ['6D', 'Sustainability', 'Energy, carbon and material data used to compare options and meet performance targets.'],
  ['7D', 'Operation', 'Asset information handed over for maintenance and facility management.'],
]

const stages = [
  ['Design', 'Architects and engineers model their disciplines, test options and federate models to find clashes before drawings are issued.'],
  ['Construction', 'Contractors take quantities, plan sequences, prefabricate components and resolve site questions against the model.'],
  ['Operation', 'Owners receive structured asset data — equipment, finishes, warranties — to run and maintain the building.'],
]

const roles = [
  ['BIM Modeler', 'Builds and maintains model elements, families and views, and produces the drawing sheets.'],
  ['BIM Specialist', 'Sets up templates, families and parameters, keeps models clean and automates repetitive tasks in Revit.'],
  ['BIM Coordinator', 'Federates discipline models, runs clash detection and tracks issues until they are resolved.'],
  ['BIM Manager', 'Defines standards and the BIM Execution Plan, manages the common data environment and the process.'],
]

export default function Bim() {
  const [active, setActive] = useState(sections[0].id)

  return (
    <Page title={`What is BIM | ${OWNER}`}>
      <header className="container-x grid gap-12 pb-10 pt-40 md:grid-cols-12 md:pt-52">
        <div className="md:col-span-7">
          <motion.span className="eyebrow text-muted" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 1 }}>
            A short guide
          </motion.span>
          <h1 className="mt-6 font-display text-[16vw] leading-[0.86] tracking-[-0.03em] md:text-[9vw]">
            <RevealText text="What is" instant delay={0.3} className="block" />
            <RevealText text="BIM?" instant delay={0.45} className="block italic" />
          </h1>
          <Reveal delay={0.7} className="mt-10 max-w-xl">
            <p className="text-lg leading-relaxed text-muted">
              Building Information Modelling is how buildings are now designed, documented and handed over: as one shared,
              structured model instead of a stack of separate drawings.
            </p>
          </Reveal>
        </div>
        <div className="md:col-span-5">
          <AxonDrawing />
        </div>
      </header>

      <div className="container-x grid md:grid-cols-12 md:gap-8">
        {/* Sticky index */}
        <aside className="hidden md:col-span-3 md:block">
          <nav className="sticky top-32 flex flex-col gap-2 pt-20 text-sm" aria-label="Guide sections">
            {sections.map((s, i) => (
              <a
                key={s.id}
                href={`#/bim`}
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' })
                }}
                className={`flex items-center gap-3 transition-colors duration-500 ${active === s.id ? 'text-fg' : 'text-muted hover:text-fg'}`}
              >
                <motion.span className="h-px bg-current" animate={{ width: active === s.id ? 32 : 12 }} transition={{ duration: 0.5, ease: EASE }} />
                <span className="tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                {s.title}
              </a>
            ))}
          </nav>
        </aside>

        <article className="md:col-span-8 md:col-start-5">
          <Section id="definition" n={1} title="Definition" onActive={setActive}>
            <Reveal y={20}>
              <blockquote className="border-l border-accent pl-6 font-display text-3xl leading-snug md:text-4xl">
                “Use of a shared digital representation of a built asset to facilitate design, construction and operation
                processes to form a reliable basis for decisions.”
                <footer className="eyebrow mt-4 font-sans text-muted">ISO 19650-1</footer>
              </blockquote>
            </Reveal>
            <P>
              BIM is both a model and a way of working. The model is a digital building made of intelligent objects; the
              process is how everyone on the project creates, shares and trusts the information inside it, from the first
              sketch to the day the building is maintained.
            </P>
          </Section>

          <Section id="objects" n={2} title="Objects, not lines" onActive={setActive}>
            <P>
              In CAD, a wall is two parallel lines, and every plan, section and elevation is drawn separately. In BIM, a wall is
              an object: it knows its type, its layers, its thickness, its fire rating and which levels it runs between.
            </P>
            <P>
              Drawings become views of the same model. Move a wall once, and every plan, section, elevation and schedule
              updates with it. Door schedules count real doors; areas come from real rooms. The drawing set stays
              consistent because there is only one source.
            </P>
          </Section>

          <Section id="lod" n={3} title="Level of development" onActive={setActive}>
            <P>
              LOD describes how far an element has been developed, and how much the team can rely on its geometry and
              data at each stage. The scale below follows the widely used AIA / BIMForum definitions.
            </P>
            <LodScale />
          </Section>

          <Section id="dimensions" n={4} title="Dimensions" onActive={setActive}>
            <P>Each “dimension” adds another kind of information to the same model.</P>
            <ul className="divide-y divide-line border-y border-line">
              {dims.map(([d, t, text], i) => (
                <motion.li
                  key={d}
                  className="group grid grid-cols-[4.5rem_1fr] gap-4 py-6 md:grid-cols-[6rem_12rem_1fr]"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={inView}
                  transition={{ duration: 0.9, ease: EASE, delay: i * 0.08 }}
                >
                  <span className="font-display text-4xl text-accent transition-transform duration-500 group-hover:translate-x-2">{d}</span>
                  <span className="self-center font-medium">{t}</span>
                  <span className="col-span-2 self-center text-muted md:col-span-1">{text}</span>
                </motion.li>
              ))}
            </ul>
            <P>Definitions beyond 5D vary between countries and organisations; the terms above are the most common.</P>
          </Section>

          <Section id="lifecycle" n={5} title="Across the lifecycle" onActive={setActive}>
            <div className="grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
              {stages.map(([t, text], i) => (
                <motion.div
                  key={t}
                  className="bg-bg p-6 md:p-8"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={inView}
                  transition={{ duration: 1, ease: EASE, delay: i * 0.12 }}
                >
                  <span className="text-xs tabular-nums text-muted">0{i + 1}</span>
                  <h3 className="mt-6 font-display text-3xl">{t}</h3>
                  <p className="mt-3 text-[0.95rem] text-muted">{text}</p>
                </motion.div>
              ))}
            </div>
          </Section>

          <Section id="standards" n={6} title="Standards & collaboration" onActive={setActive}>
            <P>
              <strong className="font-medium">ISO 19650</strong> sets out how information is specified, produced and
              exchanged on a project: the client’s information requirements, a BIM Execution Plan that answers them, and a
              common data environment (CDE) where every file moves through the states Work in progress, Shared, Published
              and Archived.
            </P>
            <P>
              <strong className="font-medium">IFC</strong> (ISO 16739) is the open, vendor-neutral format that lets models
              move between different software, and <strong className="font-medium">BCF</strong> carries issues and comments
              between teams without sending whole models back and forth. Together they are known as openBIM.
            </P>
          </Section>

          <Section id="roles" n={7} title="Roles" onActive={setActive}>
            <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
              {roles.map(([t, text], i) => (
                <Reveal key={t} delay={i * 0.08}>
                  <h3 className="font-display text-3xl">{t}</h3>
                  <p className="mt-2 text-muted">{text}</p>
                </Reveal>
              ))}
            </div>
          </Section>

          <Section id="value" n={8} title="Why it matters" onActive={setActive}>
            <P>
              Problems found on screen are cheap; problems found on site are not. Coordinated models reduce clashes, requests
              for information and rework, and quantities taken from the model make costs more predictable.
            </P>
            <P>
              BIM is also increasingly required. The UK mandated it for centrally procured public projects in 2016, and
              public clients in many other countries now ask for BIM deliverables and ISO 19650 processes.
            </P>
            <Reveal y={20}>
              <p className="pt-6 font-display text-3xl leading-snug md:text-4xl">
                My part is the model itself: accurate, well organised and ready for the rest of the team to build on.
              </p>
            </Reveal>
          </Section>
        </article>
      </div>

      <Footer />
    </Page>
  )
}
