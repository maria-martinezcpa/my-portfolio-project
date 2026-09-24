// A packed project grid with no empty gaps. On desktop, rows alternate between two
// projects (a wide and a narrow one, swapping sides) and three equal ones, and every
// image in a row shares one height so rows sit flush. Tablets use two even columns;
// phones stack the projects.
const SPAN: Record<number, string> = {
  4: 'lg:col-span-4',
  5: 'lg:col-span-5',
  6: 'lg:col-span-6',
  7: 'lg:col-span-7',
  12: 'lg:col-span-12',
}
const HEIGHT: Record<number, string> = {
  1: 'lg:h-[34vw]',
  2: 'lg:h-[29vw]',
  3: 'lg:h-[21vw]',
}

export interface Cell {
  /** grid column classes for the tile */
  cell: string
  /** sizing classes for the tile's image */
  aspect: string
}

// Split the projects into rows of 2 and 3, never leaving a single project alone.
function rowSizes(count: number) {
  const sizes: number[] = []
  let left = count
  while (left > 0) {
    let n = sizes.length % 2 === 0 ? 2 : 3
    if (n > left) n = left
    if (left - n === 1) n = n === 2 ? 3 : 2
    sizes.push(n)
    left -= n
  }
  return sizes
}

export function packedGrid(count: number): Cell[] {
  const cells: Cell[] = []
  let pairs = 0
  for (const n of rowSizes(count)) {
    const spans = n === 1 ? [12] : n === 3 ? [4, 4, 4] : pairs++ % 2 === 0 ? [7, 5] : [5, 7]
    for (const span of spans) {
      cells.push({ cell: SPAN[span], aspect: `aspect-[4/3] lg:aspect-auto ${HEIGHT[n]}` })
    }
  }
  // Two tablet columns: an odd last project spans both, so no hole is left.
  if (count % 2 === 1) {
    const last = cells[count - 1]
    last.cell += ' md:col-span-2'
    last.aspect = last.aspect.replace('aspect-[4/3]', 'aspect-[4/3] md:aspect-[2/1]')
  }
  return cells
}
