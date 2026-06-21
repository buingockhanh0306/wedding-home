/**
 * Khôi phục public/demos/_shared từ dist (một lần khi mất dữ liệu).
 * Gộp demo1/img + demo2/images + demo3/images → _shared/images/
 */
import { cpSync, existsSync, lstatSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const distShared = join(root, 'dist', 'demos', '_shared')
const sharedDir = join(root, 'public', 'demos', '_shared')
const imagesDir = join(sharedDir, 'images')

function removePath(path) {
  try {
    lstatSync(path)
    rmSync(path, { recursive: true, force: true })
  } catch {
    /* path absent */
  }
}

if (!existsSync(distShared)) {
  console.error('[error] Không tìm thấy dist/demos/_shared — chạy build cũ hoặc khôi phục thủ công.')
  process.exit(1)
}

removePath(sharedDir)
mkdirSync(imagesDir, { recursive: true })

const sources = [
  join(distShared, 'demo1', 'img'),
  join(distShared, 'demo2', 'images'),
  join(distShared, 'demo3', 'images'),
]

for (const source of sources) {
  if (!existsSync(source)) {
    console.warn(`[skip] ${source}`)
    continue
  }
  cpSync(source, imagesDir, { recursive: true, errorOnExist: false })
  console.log(`[ok] merged ${source}`)
}

mkdirSync(join(sharedDir, 'js'), { recursive: true })
cpSync(join(distShared, 'js', 'replaceText.js'), join(sharedDir, 'js', 'replaceText.js'))

let replaceText = readFileSync(join(sharedDir, 'js', 'replaceText.js'), 'utf8')
replaceText = replaceText
  .replace(
    'const IMG_BASE = `../_shared/${getDemoId()}/images/`',
    'const IMG_BASE = "../_shared/images/"',
  )
  .replace(
    '// ======================== ẢNH (đặt file trong shared-assets/demo3/images/) ========================',
    '// ======================== ẢNH (đặt file trong public/demos/_shared/images/) ========================',
  )
writeFileSync(join(sharedDir, 'js', 'replaceText.js'), replaceText, 'utf8')

console.log('\n[ok] public/demos/_shared đã khôi phục')
