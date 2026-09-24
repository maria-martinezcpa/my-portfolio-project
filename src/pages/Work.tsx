import { motion } from 'framer-motion'
import { useState } from 'react'
import Footer from '../components/Footer'
import Page from '../components/Page'
import ProjectTile from '../components/ProjectTile'
import { Reveal, RevealText } from '../components/Reveal'
import { CATEGORIES, OWNER, projects, type Category } from '../data'
import { EASE } from '../lib/motion'

type Filter = Category | 'All'

// Four placements that repeat down the page for an uneven, editorial rhythm.
const rhythm = [
  { cell: 'md:col-span-7', aspect: 'aspect-[4/3]' },
  { cell: 'md:col-span-4 md:col-start-9 md:mt-[26vh]', aspect: 'aspect-[4/5]' },
  { cell: 'md:col-span-5 md:col-start-2', aspect: 'aspect-[3/4]' },
  { cell: 'md:col-span-6 md:col-start-7 md:mt-[18vh]', aspect: 'aspect-[16/11]' },
]

export default function Work() {
  const [filter, setFilter] = useState<Filter>('All')
  const shown = filter === 'All' ? projects : projects.filter((p) => p.category === filter)
  const count = (f: Filter) => (f === 'All' ? projects.length : projects.filter((p) => p.category === f).length)

  return (
    <Page title={`Work | ${OWNER}`}>
      <section className="container-x pb-16 pt-40 md:pb-24 md:pt-52">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-8">
            <RevealText as="h1" instant delay={0.3} text="Work" className="font-display text-[26vw] leading-[0.8] tracking-[-0.03em] md:text-[15vw]" />
          </div>
          <Reveal className="self-end md:col-span-4" delay={0.5}>
            <p className="max-w-sm leading-relaxed text-muted">
              Architectural models, drawing sets and visuals. Reference projects by other designers are marked as
              such.
            </p>
          </Reveal>
        </div>

        <motion.div
          className="mt-16 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          role="tablist"
          aria-label="Filter projects"
        >
          {(['All', ...CATEGORIES] as Filter[]).map((f) => (
            <button
              key={f}
              type="button"
              role="tab"
              aria-selected={filter === f}
              onClick={() => setFilter(f)}
              className={`relative pb-1 text-sm transition-colors duration-500 ${filter === f ? 'text-fg' : 'text-muted hover:text-fg'}`}
            >
              {f}
              <sup className="ml-1 text-[0.6rem]">{count(f)}</sup>
              {filter === f && (
                <motion.span layoutId="filter-line" className="absolute inset-x-0 -bottom-px h-px bg-fg" transition={{ duration: 0.6, ease: EASE }} />
              )}
            </button>
          ))}
        </motion.div>
      </section>

      <section key={filter} className="container-x grid gap-y-20 md:grid-cols-12 md:gap-x-8 md:gap-y-24">
        {shown.map((p, i) => {
          const r = rhythm[i % rhythm.length]
          return <ProjectTile key={p.id} project={p} index={i} className={r.cell} aspect={r.aspect} />
        })}
      </section>

      <Footer />
    </Page>
  )
}
