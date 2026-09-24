import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import AxonDrawing from '../components/AxonDrawing'
import Footer from '../components/Footer'
import { ArrowIcon } from '../components/Icons'
import Marquee from '../components/Marquee'
import Page from '../components/Page'
import ProjectTile from '../components/ProjectTile'
import { Reveal, RevealText } from '../components/Reveal'
import { OWNER, ROLE, findProject, projects, type Project } from '../data'
import { useIntroDone } from '../lib/intro'
import { EASE } from '../lib/motion'

const SLIDE_MS = 6500
const heroIds = ['02', '07', '05', '09']
const heroSlides = heroIds.map(findProject).filter((p): p is Project => Boolean(p))

function Hero() {
  const ready = useIntroDone()
  const [index, setIndex] = useState(0)
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-40%'])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  useEffect(() => {
    const id = window.setInterval(() => setIndex((i) => (i + 1) % heroSlides.length), SLIDE_MS)
    return () => window.clearInterval(id)
  }, [])

  const slide = heroSlides[index]

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[620px] overflow-hidden bg-[#0d0d0c] text-white">
      <motion.div className="absolute inset-0" style={{ y: imgY }}>
        <AnimatePresence initial={false}>
          <motion.img
            key={slide.id}
            src={slide.images[0].src}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ opacity: 0, scale: 1.18 }}
            animate={{ opacity: 1, scale: 1.04, transition: { opacity: { duration: 1.6, ease: EASE }, scale: { duration: SLIDE_MS / 1000 + 2, ease: 'linear' } } }}
            exit={{ opacity: 0, transition: { duration: 1.6, ease: EASE } }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-black/65" />
      </motion.div>

      <motion.div className="container-x relative flex h-full flex-col justify-end pb-10 md:pb-14" style={{ y: textY, opacity: fade }}>
        {ready && (
          <>
            <motion.p
              className="eyebrow mb-6 opacity-80"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 0.8, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.2 }}
            >
              {ROLE} — Architecture
            </motion.p>
            <h1 className="font-display text-[15vw] leading-[0.88] tracking-[-0.02em] md:text-[10.5vw]">
              <RevealText text="Buildings, built" instant delay={0.3} className="block" />
              <RevealText text="first as information." instant delay={0.5} className="block italic" />
            </h1>
          </>
        )}

        <div className="mt-10 grid grid-cols-2 items-end gap-6 border-t border-white/25 pt-5 text-sm md:grid-cols-3">
          <AnimatePresence mode="wait">
            <motion.a
              key={slide.id}
              href={`#/work/${slide.id}`}
              className="flex flex-col"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <span className="font-display text-xl leading-tight md:text-2xl">{slide.title}</span>
              <span className="opacity-60">{slide.reference ? 'Reference project' : slide.role}</span>
            </motion.a>
          </AnimatePresence>
          <span className="eyebrow hidden justify-self-center opacity-70 md:flex md:items-center md:gap-3">
            <motion.span
              className="block h-8 w-px origin-top bg-white/60"
              animate={{ scaleY: [0, 1, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            />
            Scroll
          </span>
          <div className="flex items-center justify-self-end gap-4">
            <span className="tabular-nums">
              {String(index + 1).padStart(2, '0')} / {String(heroSlides.length).padStart(2, '0')}
            </span>
            <span className="relative h-px w-20 overflow-hidden bg-white/25 md:w-32">
              <motion.span
                key={slide.id}
                className="absolute inset-0 origin-left bg-white"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: SLIDE_MS / 1000, ease: 'linear' }}
              />
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

// Asymmetric editorial placement for the selected projects.
const layout = [
  { cell: 'md:col-span-7', aspect: 'aspect-[16/11]' },
  { cell: 'md:col-start-9 md:col-span-4 md:mt-[34vh]', aspect: 'aspect-[3/4]' },
  { cell: 'md:col-start-2 md:col-span-5 md:-mt-[4vh]', aspect: 'aspect-[4/5]' },
  { cell: 'md:col-start-8 md:col-span-5 md:mt-[22vh]', aspect: 'aspect-[4/3]' },
  { cell: 'md:col-span-12 md:mt-[10vh]', aspect: 'aspect-[16/10] md:aspect-[21/9]' },
]

export default function Home() {
  return (
    <Page title={`${OWNER} | ${ROLE}`}>
      <Hero />

      {/* Statement */}
      <section className="container-x grid gap-10 py-28 md:grid-cols-12 md:py-44">
        <Reveal className="md:col-span-3">
          <span className="eyebrow text-muted">(01) Practice</span>
        </Reveal>
        <div className="md:col-span-9">
          <RevealText
            as="p"
            className="font-display text-[2.1rem] leading-[1.12] tracking-[-0.01em] md:text-[4.2vw]"
            stagger={0.025}
            text="Every building is built twice: first as information, then on site. I work on the first one — careful Revit models, coordination and drawing sets for architecture."
          />
          <Reveal delay={0.4} className="mt-12">
            <a href="#/about" className="group inline-flex items-center gap-3 text-sm">
              <span className="link-line pb-0.5">About me</span>
              <ArrowIcon className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1.5" />
            </a>
          </Reveal>
        </div>
      </section>

      {/* Selected work */}
      <section className="container-x">
        <div className="mb-14 flex items-end justify-between border-b border-line pb-6 md:mb-24">
          <div className="flex items-baseline gap-4">
            <RevealText as="h2" text="Selected work" className="font-display text-5xl md:text-7xl" />
            <span className="text-sm text-muted">({String(projects.length).padStart(2, '0')})</span>
          </div>
          <a href="#/work" className="link-line pb-0.5 text-sm">
            All projects
          </a>
        </div>
        <div className="grid gap-y-20 md:grid-cols-12 md:gap-x-8 md:gap-y-0">
          {projects.slice(0, layout.length).map((p, i) => (
            <ProjectTile key={p.id} project={p} index={i} className={layout[i].cell} aspect={layout[i].aspect} />
          ))}
        </div>
      </section>

      <div className="mt-32 md:mt-52">
        <Marquee words={['Revit models', 'Construction documents', 'Scan to BIM', 'Coordination']} />
      </div>

      {/* BIM teaser */}
      <section className="container-x grid items-center gap-16 py-28 md:grid-cols-12 md:py-44">
        <div className="md:col-span-7">
          <AxonDrawing />
        </div>
        <div className="md:col-span-4 md:col-start-9">
          <Reveal>
            <span className="eyebrow text-muted">(02) What is BIM</span>
          </Reveal>
          <RevealText
            as="h2"
            className="mt-6 font-display text-5xl leading-[1.02] md:text-6xl"
            text="A building made of information, not lines."
          />
          <Reveal delay={0.3}>
            <p className="mt-8 leading-relaxed text-muted">
              In a BIM model every wall, slab and window is a real object with its own data. Plans, sections and
              schedules are views of that single model, so they can never disagree.
            </p>
            <motion.a
              href="#/bim"
              className="group mt-10 inline-flex items-center gap-3 text-sm"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <span className="link-line pb-0.5">Read the full guide</span>
              <ArrowIcon className="h-4 w-4" />
            </motion.a>
          </Reveal>
        </div>
      </section>

      <Footer />
    </Page>
  )
}
