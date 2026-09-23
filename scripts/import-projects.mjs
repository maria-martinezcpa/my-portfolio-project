// Reads ./projects/NN - Title/description.md + images, writes optimized
// images to public/projects/NN/ and project data to src/sample-projects.json.
// Run: npm run import-projects
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const ROOT = path.resolve(import.meta.dirname, '..')
const SRC = path.join(ROOT, 'projects')
const OUT_IMG = path.join(ROOT, 'public', 'projects')
const OUT_JSON = path.join(ROOT, 'src', 'sample-projects.json')
const MAX_WIDTH = 1600

function section(md, heading) {
  const start = md.indexOf(`## ${heading}`)
  if (start < 0) return ''
  const body = md.slice(md.indexOf('\n', start) + 1)
  const end = body.search(/^## /m)
  return (end < 0 ? body : body.slice(0, end)).trim()
}

fs.rmSync(OUT_IMG, { recursive: true, force: true })
const projects = []

for (const folder of fs.readdirSync(SRC).sort()) {
  const dir = path.join(SRC, folder)
  const mdPath = path.join(dir, 'description.md')
  if (!fs.existsSync(mdPath)) continue
  const id = folder.match(/^(\d+)/)?.[1] ?? folder
  const md = fs.readFileSync(mdPath, 'utf8').replace(/\r\n/g, '\n')

  const title = md.match(/^# (.+)$/m)?.[1].trim() ?? folder
  const role = md.match(/\*\*Role:\*\*\s*(.+)$/m)?.[1].trim() ?? ''
  const published = md.match(/\*\*Published on (.+?)\*\*/)?.[1].trim() ?? ''
  const description = section(md, 'Project description')
    .replace(/_No description on the page._/, '')
    // join hard-wrapped lines, keep paragraph breaks
    .split(/\n{2,}/)
    .map((p) => p.replace(/\n/g, ' ').trim())
    .filter(Boolean)
  const skills = section(md, 'Skills and deliverables')
    .split('\n')
    .map((l) => l.replace(/^- /, '').trim())
    .filter((l) => l && !l.startsWith('_'))
  const imageFiles = [...section(md, 'Images').matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)].map((m) => m[1])

  const outDir = path.join(OUT_IMG, id)
  fs.mkdirSync(outDir, { recursive: true })
  const images = []
  for (const file of imageFiles) {
    const src = path.join(dir, file)
    if (!fs.existsSync(src)) continue
    const name = path.parse(file).name + '.webp'
    const info = await sharp(src)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(path.join(outDir, name))
    images.push({ src: `/projects/${id}/${name}`, width: info.width, height: info.height })
  }

  projects.push({ id, title, role, published, description, skills, images })
  console.log(`${id}  ${title}  (${images.length} images)`)
}

fs.writeFileSync(OUT_JSON, JSON.stringify(projects, null, 2) + '\n')
console.log(`\nWrote ${projects.length} projects to ${path.relative(ROOT, OUT_JSON)}`)
