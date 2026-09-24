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
  /** One to three sentences shown before the detailed description. */
  summary: string
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

// Short descriptions, written only from each project's own title, skills and description.
const summaries: Record<string, string> = {
  '01': 'A 3D house model built with Google Maps and Google Earth as the only source. It shows how a building can be modelled when no drawings are available.',
  '02': 'A modern, contemporary interior design for a corporate office, modelled in Autodesk Revit and rendered with Enscape.',
  '03': 'A deck plan prepared for a building permit, drawn with Autodesk AutoCAD and Revit.',
  '04': 'A Revit model created from scan data of an existing building, turning the captured conditions into a usable 3D model.',
  '05': 'A detailed model of a multi-family development — terrain, two multi-family residential buildings and several townhouses — based on existing site conditions and the client’s preliminary sketches, so the client could see how it would look in reality.',
  '06': 'Drawings from a complete construction set for a two-storey residential building in Florida, with the model, drawings, specifications and details produced in Revit.',
  '07': 'A standalone dialysis facility with 40 stations — 30 hemodialysis and 10 peritoneal dialysis — planned to meet growing demand in a comfortable, convenient and secure setting.',
  '08': 'Architectural construction documents for a large private residence, produced in AutoCAD with a focus on accuracy and buildable detailing. Only limited excerpts are shown because of confidentiality agreements.',
  '09': 'A warm, calming family living space defined by natural wood finishes, a vertical-panel TV feature wall and softly lit display niches.',
}

// Newest first
export const projects: Project[] = sampleProjects
  .map((p) => ({
    ...p,
    reference: referenceIds.has(p.id),
    summary: summaries[p.id] ?? '',
    category: categories[p.id] ?? 'BIM Modeling',
  }))
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
