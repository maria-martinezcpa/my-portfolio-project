import { motion } from 'framer-motion'
import { year, type Project } from '../data'
import { EASE, inView } from '../lib/motion'
import { RevealImage } from './Reveal'

export default function ProjectTile({
  project,
  index,
  className = '',
  aspect = 'aspect-[4/3]',
}: {
  project: Project
  index: number
  className?: string
  aspect?: string
}) {
  const cover = project.images[0]
  return (
    <a href={`#/work/${project.id}`} className={`group block ${className}`} data-cursor="View">
      {cover && <RevealImage src={cover.src} alt={project.title} className={aspect} />}
      <motion.div
        className="mt-5 grid grid-cols-[auto_1fr_auto] items-baseline gap-x-4 gap-y-1"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={inView}
        transition={{ duration: 1, ease: EASE, delay: 0.2 }}
      >
        <span className="text-xs tabular-nums text-muted">({String(index + 1).padStart(2, '0')})</span>
        <h3 className="font-display text-2xl leading-tight md:text-[1.9rem]">
          <span className="link-line [.group:hover_&]:bg-[length:100%_1px]">{project.title}</span>
        </h3>
        <span className="text-xs text-muted">{year(project)}</span>
        <span />
        <p className="col-span-2 text-sm text-muted">
          {project.category}
          {project.reference && <> · Reference project</>}
        </p>
      </motion.div>
    </a>
  )
}
