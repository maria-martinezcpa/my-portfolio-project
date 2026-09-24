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

export const CATEGORIES = ['BIM Modeling', 'Drawings', 'Visualization', 'GIS & Mapping'] as const
export type Category = (typeof CATEGORIES)[number]

export const OWNER = 'David Nguyen'
export const ROLE = 'BIM Modeler, GIS & Software Developer'
export const EMAILS = ['davidng924@gmail.com', 'stick0427@gmail.com']
export const TELEGRAM = 'https://t.me/housekeeper5252'
export const PHONE = '+1 (323) 505 2719'

export const navLinks: NavLink[] = [
  { label: 'Services', href: '#services' },
  { label: 'BIM', href: '#bim' },
  { label: 'Projects', href: '#projects' },
  { label: 'Process', href: '#process' },
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
  '10': 'GIS & Mapping',
  '11': 'GIS & Mapping',
}

// Newest first
export const projects: Project[] = sampleProjects
  .map((p) => ({ ...p, author: authors[p.id], category: categories[p.id] ?? 'BIM Modeling' }))
  .sort((a, b) => Date.parse(b.published) - Date.parse(a.published))

export interface SkillGroup {
  title: string
  icon: 'cube' | 'map' | 'code'
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'BIM & drafting',
    icon: 'cube',
    items: [
      'Autodesk Revit',
      'BIM Modeling',
      'Scan to BIM',
      'Construction Documents',
      'AutoCAD',
      '3D Visualization',
      'PDF to CAD Conversion',
    ],
  },
  {
    title: 'GIS & mapping',
    icon: 'map',
    items: [
      'ArcGIS Pro & QGIS',
      'BIM-GIS Integration',
      'Georeferencing',
      'Google Earth (KMZ)',
      'Site Selection & Zoning Analysis',
    ],
  },
  {
    title: 'Software & data',
    icon: 'code',
    items: ['Revit API (C#)', 'Dynamo', 'Python', 'React & TypeScript', 'IFC & openBIM', 'Microsoft Excel'],
  },
]

export const skills: string[] = skillGroups.flatMap((g) => g.items)
