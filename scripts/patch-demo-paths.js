/**
 * Cập nhật đường dẫn ảnh trong source demo → trỏ tới thư mục _shared khi deploy.
 * Chạy một lần: node scripts/patch-demo-paths.js
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const parentDir = join(__dirname, '..', '..')

const patches = [
  {
    folder: 'wedding-demo1',
    files: ['index.html', 'album.html'],
    replacements: [
      [/src="img\//g, 'src="../_shared/demo1/img/'],
      [/href="img\//g, 'href="../_shared/demo1/img/'],
      [/data-image-src="img\//g, 'data-image-src="../_shared/demo1/img/'],
      [/href="img\/Indu\//g, 'href="../_shared/demo1/img/Indu/'],
      [/src="img\/Indu\//g, 'src="../_shared/demo1/img/Indu/'],
      [/href="img\/Stu\//g, 'href="../_shared/demo1/img/Stu/'],
      [/src="img\/Stu\//g, 'src="../_shared/demo1/img/Stu/'],
    ],
  },
  {
    folder: 'wedding-demo1',
    files: ['css/main.css'],
    replacements: [[/\.\.\/img\//g, '../../_shared/demo1/img/']],
  },
  {
    folder: 'wedding_demo2',
    files: ['index.html'],
    replacements: [[/\.\/template\/images\//g, '../_shared/template/images/']],
  },
  {
    folder: 'wedding_demo2',
    files: ['template/css/style.css', 'template/css/libs.css'],
    replacements: [[/\.\.\/images\//g, '../../../_shared/template/images/']],
  },
  ...Array.from({ length: 8 }, (_, index) => {
    const folder = `wedding_demo${index + 3}`
    return {
      folder,
      files: ['index.html'],
      replacements: [
        [
          /\.\/assets\/images\/thank_img\.jpg/g,
          '../_shared/assets/images/thank_img.jpg',
        ],
      ],
    }
  }),
  ...Array.from({ length: 8 }, (_, index) => {
    const folder = `wedding_demo${index + 3}`
    return {
      folder,
      files: ['js/replaceText.js'],
      replacements: [
        [/const IMG_BASE = "\.\/assets\/images\/";/g, 'const IMG_BASE = "../_shared/assets/images/";'],
        [/\.\/assets\/images\//g, '../_shared/assets/images/'],
      ],
    }
  }),
]

let updated = 0

for (const patch of patches) {
  for (const file of patch.files) {
    const filePath = join(parentDir, patch.folder, file)

    if (!existsSync(filePath)) {
      console.warn(`[skip] ${filePath}`)
      continue
    }

    let content = readFileSync(filePath, 'utf8')
    const original = content

    for (const [pattern, replacement] of patch.replacements) {
      content = content.replace(pattern, replacement)
    }

    if (content !== original) {
      writeFileSync(filePath, content, 'utf8')
      updated += 1
      console.log(`[patched] ${patch.folder}/${file}`)
    }
  }
}

console.log(`\nĐã cập nhật ${updated} file.`)
