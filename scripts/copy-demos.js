import { cpSync, existsSync, lstatSync, mkdirSync, rmSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const projectRoot = join(__dirname, '..')
const parentDir = join(projectRoot, '..')
const targetDir = join(projectRoot, 'public', 'demos')
const sharedDir = join(targetDir, '_shared')

/** @type {{ id: string, folder: string }[]} */
const demos = [
  { id: 'demo1', folder: 'wedding-demo1' },
  { id: 'demo2', folder: 'wedding_demo2' },
  { id: 'demo3', folder: 'wedding_demo3' },
  { id: 'demo4', folder: 'wedding_demo4' },
  { id: 'demo5', folder: 'wedding_demo5' },
  { id: 'demo6', folder: 'wedding_demo6' },
  { id: 'demo7', folder: 'wedding_demo7' },
  { id: 'demo8', folder: 'wedding_demo8' },
  { id: 'demo9', folder: 'wedding_demo9' },
  { id: 'demo10', folder: 'wedding_demo10' },
]

function pathExists(path) {
  try {
    lstatSync(path)
    return true
  } catch {
    return false
  }
}

mkdirSync(targetDir, { recursive: true })

if (pathExists(sharedDir)) {
  try {
    if (lstatSync(sharedDir).isSymbolicLink()) {
      rmSync(sharedDir, { force: true })
    }
  } catch {
    /* ignore */
  }
}

if (!pathExists(sharedDir)) {
  console.warn('[warn] Chưa có public/demos/_shared — chạy: node scripts/restore-shared.js')
}

for (const demo of demos) {
  rmSync(join(targetDir, demo.id), { recursive: true, force: true })
}

let copied = 0

for (const demo of demos) {
  const source = join(parentDir, demo.folder)

  if (!existsSync(source)) {
    console.warn(`[skip] ${demo.id}: không tìm thấy ${source}`)
    continue
  }

  cpSync(source, join(targetDir, demo.id), {
    recursive: true,
    filter: (path) => !path.includes('.git'),
  })

  copied += 1
  console.log(`[ok] ${demo.folder} -> public/demos/${demo.id}`)
}

console.log(`\nĐã copy ${copied}/${demos.length} mẫu. Ảnh chung: public/demos/_shared/`)
