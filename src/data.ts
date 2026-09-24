import sampleProjects from './sample-projects.json'


export interface NavLink {
  label: string
  href: string
}

export interface ProjectImage {
  src: string
  width: number
  height: number
}

export interface Project {
  id: string
  title: string
  role: string
  published: string
  description: string[]
  skills: string[]
  images: ProjectImage[]
  /** Another designer's project, shown for reference (their names are not published). */
  reference: boolean
  category: Category
}

export const CATEGORIES = ['BIM Modeling', 'Drawings', 'Visualization'] as const
export type Category = (typeof CATEGORIES)[number]

export const OWNER = 'David Nguyen'
export const ROLE = 'BIM Modeler & BIM Specialist'
export const EMAILS = ['davidng924@gmail.com', 'stick0427@gmail.com']
export const TELEGRAM = 'https://t.me/housekeeper5252'
export const PHONE = '+1 (323) 505 2719'

export const navLinks: NavLink[] = [
  { label: 'Focus', href: '#focus' },
  { label: 'BIM', href: '#bim' },
  { label: 'Projects', href: '#projects' },
  { label: 'Approach', href: '#approach' },
  { label: 'About', href: '#about' },
]

// Projects by other designers, shown for reference and labelled as such.
const referenceIds = new Set(['01', '02', '03', '04', '05', '06', '07', '08', '09'])

const categories: Record<string, Category> = {
  '01': 'BIM Modeling',
  '02': 'Visualization',
  '03': 'Drawings',
  '04': 'BIM Modeling',
  '05': 'BIM Modeling',
  '06': 'Drawings',
  '07': 'Drawings',
  '08': 'Drawings',
  '09': 'Visualization',
}

// Newest first
export const projects: Project[] = sampleProjects
  .map((p) => ({ ...p, reference: referenceIds.has(p.id), category: categories[p.id] ?? 'BIM Modeling' }))
  .sort((a, b) => Date.parse(b.published) - Date.parse(a.published))

export const year = (p: Project) => p.published.slice(-4)
export const findProject = (id: string) => projects.find((p) => p.id === id)
export const nextProject = (p: Project) => projects[(projects.indexOf(p) + 1) % projects.length]

export interface SkillGroup {
  title: string
  icon: 'cube' | 'drawing' | 'layers'
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'BIM modeling',
    icon: 'cube',
    items: ['Autodesk Revit', 'BIM Modeling', 'Scan to BIM', '3D Visualization'],
  },
  {
    title: 'Drawings & documentation',
    icon: 'drawing',
    items: ['Construction Documents', 'AutoCAD', 'PDF to CAD Conversion', 'Microsoft Excel'],
  },
  {
    title: 'BIM coordination',
    icon: 'layers',
    items: ['IFC & openBIM', 'Dynamo for Revit'],
  },
]

export const skills: string[] = skillGroups.flatMap((g) => g.items)
