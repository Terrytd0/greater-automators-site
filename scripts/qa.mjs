import { chromium } from 'playwright-core'
import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import fs from 'node:fs'

const root = fileURLToPath(new URL('..', import.meta.url))
const outDir = path.join(root, 'qa-shots')
fs.mkdirSync(outDir, { recursive: true })

const sizes = [
  { name: 'desktop-1920', w: 1920, h: 1080 },
  { name: 'desktop-1440', w: 1440, h: 900 },
  { name: 'laptop-1366', w: 1366, h: 768 },
  { name: 'tablet-820', w: 820, h: 1180 },
  { name: 'mobile-390', w: 390, h: 844 },
  { name: 'mobile-375', w: 375, h: 667 },
]

const server = spawn('npx', ['vite', 'preview', '--port', '4174'], {
  cwd: root,
  stdio: 'ignore',
  shell: true,
})

const wait = (ms) => new Promise((r) => setTimeout(r, ms))
await wait(2500)

let browser
try {
  browser = await chromium.launch()
} catch (e) {
  console.log('NO_BROWSER')
  server.kill()
  process.exit(0)
}

const consoleErrors = []
const page = await browser.newPage()
page.on('console', (m) => {
  if (m.type() === 'error') consoleErrors.push(m.text())
})
page.on('pageerror', (e) => consoleErrors.push('PAGEERROR: ' + e.message))

for (const s of sizes) {
  await page.setViewportSize({ width: s.w, height: s.h })
  await page.goto('http://localhost:4174/', { waitUntil: 'networkidle' })
  await page.waitForTimeout(1400)
  // full page shot
  await page.screenshot({ path: path.join(outDir, `${s.name}-full.png`), fullPage: true })
  // above the fold shot
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForTimeout(600)
  await page.screenshot({ path: path.join(outDir, `${s.name}-fold.png`) })

  // per-section shots at desktop
  if (s.name === 'desktop-1440') {
    for (const id of ['core', 'capabilities', 'work', 'philosophy', 'process', 'why', 'about', 'contact']) {
      const el = await page.$(`#${id}`)
      if (el) {
        await el.scrollIntoViewIfNeeded()
        await page.waitForTimeout(500)
        await el.screenshot({ path: path.join(outDir, `sec-${id}.png`) })
      }
    }
  }
}

console.log('CONSOLE_ERRORS:', JSON.stringify(consoleErrors, null, 2))

await browser.close()
server.kill()
console.log('DONE')
