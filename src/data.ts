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
  author: string
}

export const OWNER = 'David Nguyen'
export const ROLE = 'BIM Modeler, GIS & Software Developer'
export const EMAILS = ['davidng924@gmail.com', 'stick0427@gmail.com']
export const TELEGRAM = 'https://t.me/housekeeper5252'
export const PHONE = '+1 (323) 505 2719'

export const navLinks: NavLink[] = [
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
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

// Newest first
export const projects: Project[] = sampleProjects
  .map((p) => ({ ...p, author: authors[p.id] }))
  .sort((a, b) => Date.parse(b.published) - Date.parse(a.published))

export const skills: string[] = [
  'Autodesk Revit',
  'BIM Modeling',
  'Scan to BIM',
  'Construction Documents',
  'AutoCAD',
  'Dynamo',
  '3D Visualization',
  'ArcGIS Pro & QGIS',
  'BIM-GIS Integration',
  'Georeferencing',
  'Google Earth (KMZ)',
  'PDF to CAD Conversion',
  'Site Selection & Zoning Analysis',
  'Microsoft Excel',
  'IFC & openBIM',
  'Revit API (C#)',
  'Python',
  'React & TypeScript',
]
