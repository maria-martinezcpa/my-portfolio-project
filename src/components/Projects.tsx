import { useMemo, useState, type ComponentType, type SVGProps } from 'react'
import { CATEGORIES, projects, type Category, type Project } from '../data'
import { ArrowIcon, CubeIcon, DrawingIcon, EyeIcon } from './Icons'
import ProjectModal from './ProjectModal'

type Filter = Category | 'All'

const categoryIcons: Record<Category, ComponentType<SVGProps<SVGSVGElement>>> = {
  'BIM Modeling': CubeIcon,
  Drawings: DrawingIcon,
  Visualization: EyeIcon,
}

// Card sizes for the 4-column grid: the first card is large, and enough of the last
// cards are wide that the final row is always full.
function cardSize(i: number, n: number) {
  if (n === 2) return 'featured'
  if (i === 0) return 'featured'
  const wide = (4 - ((n + 3) % 4)) % 4
  return i >= n - wide ? 'wide' : ''
}

export default function Projects() {
  const [filter, setFilter] = useState<Filter>('All')
  const [open, setOpen] = useState<Project | null>(null)

  const shown = useMemo(() => (filter === 'All' ? projects : projects.filter((p) => p.category === filter)), [filter])
  const count = (f: Filter) => (f === 'All' ? projects.length : projects.filter((p) => p.category === f).length)

  return (
    <section id="projects" className="section" data-testid="projects">
      <div className="container">
        <header className="section-head section-head-split" data-reveal>
          <div>
            <span className="kicker">Projects</span>
            <h2>Models, drawings and visuals</h2>
            <p>
              Sample architecture projects across BIM modeling, drawings and visualization. Work by other freelancers is credited on each
              project.
            </p>
          </div>
          <div className="filters" role="tablist" aria-label="Filter projects">
            {(['All', ...CATEGORIES] as Filter[]).map((f) => (
              <button
                key={f}
                type="button"
                role="tab"
                aria-selected={filter === f}
                className={`filter ${filter === f ? 'active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f}
                <span className="filter-count">{count(f)}</span>
              </button>
            ))}
          </div>
        </header>

        <div className="work-grid" data-testid="project-grid">
          {shown.map((p, i) => {
            const Icon = categoryIcons[p.category]
            return (
              <button
                key={`${filter}-${p.id}`}
                type="button"
                className={`work-card ${cardSize(i, shown.length)}`}
                style={{ animationDelay: `${Math.min(i, 8) * 50}ms` }}
                onClick={() => setOpen(p)}
              >
                {p.images[0] && <img src={p.images[0].src} alt="" loading="lazy" />}
                <span className="work-cat">
                  <Icon />
                  {p.category}
                </span>
                <span className="work-count">
                  {p.images.length} {p.images.length === 1 ? 'image' : 'images'}
                </span>
                <span className="work-info">
                  <span className="work-title">{p.title}</span>
                  <span className="work-meta">
                    {[p.author ? `Sample by ${p.author}` : p.role !== p.title && p.role, p.published].filter(Boolean).join(' · ')}
                  </span>
                  <span className="work-more">
                    View details <ArrowIcon />
                  </span>
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {open && <ProjectModal project={open} onClose={() => setOpen(null)} />}
    </section>
  )
}
