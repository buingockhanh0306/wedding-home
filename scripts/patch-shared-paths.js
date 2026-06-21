/**
 * Cập nhật đường dẫn _shared theo tên demo1 … demo10.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const parentDir = join(__dirname, '..', '..')

const replacements = [
  ['../_shared/template/images/', '../_shared/demo2/images/'],
  ['../../../_shared/template/images/', '../../../_shared/demo2/images/'],
  ['../_shared/assets/images/', null],
]

function patchFile(folder, file, extraReplacements = []) {
  const filePath = join(parentDir, folder, file)
  if (!existsSync(filePath)) return false

  let content = readFileSync(filePath, 'utf8')
  const original = content

  for (const [from, to] of [...replacements.filter(([, to]) => to), ...extraReplacements]) {
    content = content.split(from).join(to)
  }

  if (content !== original) {
    writeFileSync(filePath, content, 'utf8')
    console.log(`[patched] ${folder}/${file}`)
    return true
  }

  return false
}

let updated = 0

if (patchFile('wedding_demo2', 'index.html')) updated += 1
if (patchFile('wedding_demo2', 'template/css/style.css')) updated += 1
if (patchFile('wedding_demo2', 'template/css/libs.css')) updated += 1

for (let i = 3; i <= 10; i += 1) {
  const folder = `wedding_demo${i}`
  const sharedPath = `../_shared/demo${i}/images/`

  if (
    patchFile(folder, 'index.html', [
      ['../_shared/assets/images/thank_img.jpg', `${sharedPath}thank_img.jpg`],
    ])
  ) {
    updated += 1
  }

  if (
    patchFile(folder, 'js/replaceText.js', [
      ['const IMG_BASE = "../_shared/assets/images/";', `const IMG_BASE = "${sharedPath}";`],
      ['../_shared/assets/images/', sharedPath],
    ])
  ) {
    updated += 1
  }
}

console.log(`\nĐã cập nhật ${updated} file.`)
