/**
 * Gộp demo1/img, demo2/images, demo3/images → public/demos/_shared/images/
 * Chạy một lần: node scripts/consolidate-shared-images.js
 */
import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, statSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const sharedDir = join(__dirname, '..', 'public', 'demos', '_shared')
const imagesDir = join(sharedDir, 'images')

const sources = [
  join(sharedDir, 'demo3', 'images'),
  join(sharedDir, 'demo2', 'images'),
  join(sharedDir, 'demo1', 'img'),
]

function copyTree(source, destination) {
  if (!existsSync(source)) {
    console.warn(`[skip] ${source}`)
    return
  }

  cpSync(source, destination, {
    recursive: true,
    force: false,
    errorOnExist: false,
  })
}

rmSync(imagesDir, { recursive: true, force: true })
mkdirSync(imagesDir, { recursive: true })

for (const source of sources) {
  copyTree(source, imagesDir)
  console.log(`[ok] merged ${source}`)
}

for (let i = 1; i <= 10; i += 1) {
  rmSync(join(sharedDir, `demo${i}`), { recursive: true, force: true })
}

console.log('\nĐã gộp về public/demos/_shared/images/ và xóa demo1…demo10 cũ.')
