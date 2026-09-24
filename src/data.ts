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
  author?: string
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

// Sample projects by other freelancers; each is shown with its author's name.
const authors: Record<string, string> = {
  '01': 'Ariel B.',
  '02': 'Arooba U.',
  '03': 'Jalal U.',
  '04': 'Jalal U.',
  '05': 'Juliia P.',
  '06': 'Juliia P.',
  '07': 'Kelly V.',
  '08': 'Kelly V.',
  '09': 'Mochammad Ichwan A.',
}

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
  .map((p) => ({ ...p, author: authors[p.id], category: categories[p.id] ?? 'BIM Modeling' }))
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
