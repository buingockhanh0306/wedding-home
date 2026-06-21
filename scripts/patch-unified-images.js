/**
 * Cập nhật mọi đường dẫn ảnh → ../_shared/images/
 */
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const weddingRoot = join(__dirname, '..')
const parentDir = join(weddingRoot, '..')

const replacements = [
  ['const IMG_BASE = `../_shared/${getDemoId()}/images/`', 'const IMG_BASE = "../_shared/images/"'],
  ['../../_shared/demo1/img/', '../../_shared/images/'],
  ['../_shared/demo1/img/', '../_shared/images/'],
  ['../../../_shared/demo2/images/', '../../../_shared/images/'],
  ['../_shared/demo2/images/', '../_shared/images/'],
  ['/demos/_shared/demo1/img/', '/demos/_shared/images/'],
  ['/demos/_shared/demo2/images/', '/demos/_shared/images/'],
]

for (let i = 3; i <= 10; i += 1) {
  replacements.push([`../_shared/demo${i}/images/`, '../_shared/images/'])
  replacements.push([`/demos/_shared/demo${i}/images/`, '/demos/_shared/images/'])
}

function patchFile(filePath) {
  if (!existsSync(filePath)) return false

  let content = readFileSync(filePath, 'utf8')
  const original = content

  for (const [from, to] of replacements) {
    content = content.split(from).join(to)
  }

  if (content !== original) {
    writeFileSync(filePath, content, 'utf8')
    return true
  }

  return false
}

function walkAndPatch(dir, extensions) {
  if (!existsSync(dir)) return 0

  let count = 0
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name)
    if (entry.isDirectory()) {
      count += walkAndPatch(fullPath, extensions)
      continue
    }
    if (extensions.some((ext) => entry.name.endsWith(ext)) && patchFile(fullPath)) {
      console.log(`[patched] ${fullPath}`)
      count += 1
    }
  }
  return count
}

let total = 0

if (patchFile(join(weddingRoot, 'public/demos/_shared/js/replaceText.js'))) {
  console.log('[patched] public/demos/_shared/js/replaceText.js')
  total += 1
}

if (patchFile(join(weddingRoot, 'src/data/demos.js'))) {
  console.log('[patched] src/data/demos.js')
  total += 1
}

const demoFolders = [
  'wedding-demo1',
  ...Array.from({ length: 9 }, (_, i) => `wedding_demo${i + 2}`),
]

for (const folder of demoFolders) {
  total += walkAndPatch(join(parentDir, folder), ['.html', '.css', '.js'])
}

console.log(`\nĐã cập nhật ${total} file → ../_shared/images/`)
