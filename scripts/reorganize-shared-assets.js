import { cpSync, existsSync, mkdirSync, rmSync, symlinkSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const sharedDir = join(__dirname, '..', 'public', 'demos', '_shared')
const symlinkType = process.platform === 'win32' ? 'junction' : 'dir'

function moveDir(source, destination) {
  if (!existsSync(source)) {
    console.warn(`[skip] ${source}`)
    return
  }

  rmSync(destination, { recursive: true, force: true })
  mkdirSync(dirname(destination), { recursive: true })
  cpSync(source, destination, { recursive: true })
  rmSync(source, { recursive: true, force: true })
  console.log(`[ok] ${source} -> ${destination}`)
}

moveDir(join(sharedDir, 'template', 'images'), join(sharedDir, 'demo2', 'images'))
moveDir(join(sharedDir, 'assets', 'images'), join(sharedDir, 'demo3', 'images'))

rmSync(join(sharedDir, 'template'), { recursive: true, force: true })
rmSync(join(sharedDir, 'assets'), { recursive: true, force: true })

for (let i = 4; i <= 10; i += 1) {
  const demoDir = join(sharedDir, `demo${i}`)
  const linkPath = join(demoDir, 'images')
  const target = join(sharedDir, 'demo3', 'images')

  mkdirSync(demoDir, { recursive: true })

  if (existsSync(linkPath)) {
    rmSync(linkPath, { recursive: true, force: true })
  }

  symlinkSync(
    process.platform === 'win32' ? target : '../demo3/images',
    linkPath,
    symlinkType
  )
  console.log(`[link] demo${i}/images -> demo3/images`)
}

console.log('\nHoàn tất cấu trúc public/demos/_shared/demo1 … demo10')
