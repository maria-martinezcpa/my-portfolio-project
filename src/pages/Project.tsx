import { motion, useScroll, useTransform } from 'framer-motion'
import { useCallback, useRef, useState } from 'react'
import Footer from '../components/Footer'
import Lightbox from '../components/Lightbox'
import Page from '../components/Page'
import { Reveal, RevealImage, RevealText } from '../components/Reveal'
import { OWNER, nextProject, year, type Project as P } from '../data'
import { EASE } from '../lib/motion'

function Cover({ project }: { project: P }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-60%'])

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[560px] overflow-hidden bg-[#0d0d0c] text-white">
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        <motion.img
          src={project.images[0]?.src}
          alt=""
          className="h-full w-full object-cover"
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.2, ease: EASE, delay: 0.2 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30" />
      </motion.div>
      <motion.div className="container-x relative flex h-full flex-col justify-end pb-12 md:pb-16" style={{ y: textY }}>
        <motion.span
          className="eyebrow mb-5 opacity-80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          {project.category} — {year(project)}
        </motion.span>
        <RevealText
          as="h1"
          instant
          delay={0.45}
          stagger={0.05}
          text={project.title}
          className="max-w-[16ch] font-display text-[12vw] leading-[0.92] tracking-[-0.02em] md:text-[7vw]"
        />
      </motion.div>
    </section>
  )
}

// Alternating placements: full-bleed, then an offset pair.
const gallery = [
  { cell: 'md:col-span-12' },
  { cell: 'md:col-span-7' },
  { cell: 'md:col-span-5 md:col-start-8 md:mt-[20vh]' },
]

export default function Project({ project }: { project: P }) {
  const [lightbox, setLightbox] = useState<number | null>(null)
  const close = useCallback(() => setLightbox(null), [])
  const next = nextProject(project)
  const meta = [
    ['Category', project.category],
    ['Role', project.role],
    ['Year', year(project)],
    ['Images', String(project.images.length)],
  ]

  return (
    <Page title={`${project.title} | ${OWNER}`}>
      <Cover project={project} />

      {/* Overview → key information → detailed description, each on its own labelled row */}
      <section className="container-x py-24 md:py-36">
        <div className="grid gap-6 md:grid-cols-12 md:gap-10">
          <Reveal className="md:col-span-3">
            <h2 className="eyebrow text-muted">Overview</h2>
          </Reveal>
          <div className="md:col-span-9">
            <RevealText as="p" text={project.summary} stagger={0.02} className="font-display text-3xl leading-[1.2] md:text-[2.7rem]" />
          </div>
        </div>

        <div className="mt-16 grid gap-6 border-t border-line pt-10 md:mt-24 md:grid-cols-12 md:gap-10">
          <Reveal className="md:col-span-3">
            <h2 className="eyebrow text-muted">Key information</h2>
          </Reveal>
          <div className="md:col-span-9">
            <dl className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
              {meta.map(([k, v], i) => (
                <Reveal key={k} delay={i * 0.06}>
                  <dt className="eyebrow text-muted">{k}</dt>
                  <dd className="mt-2">{v}</dd>
                </Reveal>
              ))}
            </dl>
            {project.skills.length > 0 && (
              <Reveal delay={0.2} className="mt-10">
                <h3 className="eyebrow text-muted">Technologies & skills</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.skills.map((sk) => (
                    <li key={sk} className="rounded-full border border-line bg-surface px-3 py-1 text-sm">
                      {sk}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </div>
        </div>

        <div className="mt-16 grid gap-6 border-t border-line pt-10 md:mt-24 md:grid-cols-12 md:gap-10">
          <Reveal className="md:col-span-3">
            <h2 className="eyebrow text-muted">Detailed description</h2>
            {project.reference && <p className="mt-3 text-sm text-muted">Notes from the original designer</p>}
          </Reveal>
          <div className="max-w-3xl space-y-6 text-lg leading-relaxed md:col-span-9">
            {project.description.map((para, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p>{para}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="container-x mb-8 flex items-baseline justify-between border-t border-line pt-10">
        <h2 className="eyebrow text-muted">Gallery</h2>
        <span className="hidden text-sm text-muted sm:inline">Select an image to view it full screen</span>
      </div>
      <section className="container-x grid gap-8 md:grid-cols-12 md:gap-y-16">
        {project.images.map((img, i) => {
          const g = gallery[i % gallery.length]
          return (
            <button
              key={img.src}
              type="button"
              className={`group block w-full text-left ${g.cell}`}
              onClick={() => setLightbox(i)}
             
              aria-label={`Open image ${i + 1} full screen`}
            >
              <RevealImage src={img.src} className="w-full" ratio={img.width / img.height} parallax={i % 3 === 0} />
              <span className="mt-3 block text-xs tabular-nums text-muted">
                {String(i + 1).padStart(2, '0')} — {String(project.images.length).padStart(2, '0')}
              </span>
            </button>
          )
        })}
      </section>

      {/* Next project */}
      <a href={`#/work/${next.id}`} className="group relative mt-32 block h-[80svh] overflow-hidden bg-[#0d0d0c] text-white md:mt-48">
        <img
          src={next.images[0]?.src}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-60 transition-all duration-[1600ms] ease-[var(--ease-expo)] group-hover:scale-105 group-hover:opacity-80"
        />
        <div className="container-x relative flex h-full flex-col justify-center">
          <span className="eyebrow opacity-80">Next project</span>
          <RevealText as="h2" text={next.title} className="mt-6 max-w-[18ch] font-display text-[11vw] leading-[0.95] md:text-[6.5vw]" />
        </div>
      </a>

      <Footer />

      <Lightbox images={project.images} index={lightbox} title={project.title} onClose={close} onIndex={setLightbox} />
    </Page>
  )
}
