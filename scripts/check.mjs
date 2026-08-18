import { chromium } from 'playwright-core'
import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = fileURLToPath(new URL('..', import.meta.url))
const server = spawn('npx', ['vite', 'preview', '--port', '4175'], {
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

const sizes = [
  { name: 'desktop-1920', w: 1920, h: 1080 },
  { name: 'desktop-1440', w: 1440, h: 900 },
  { name: 'laptop-1366', w: 1366, h: 768 },
  { name: 'tablet-820', w: 820, h: 1180 },
  { name: 'mobile-390', w: 390, h: 844 },
  { name: 'mobile-375', w: 375, h: 667 },
]

const consoleErrors = []
const page = await browser.newPage()
page.on('console', (m) => {
  if (m.type() === 'error') consoleErrors.push(m.text())
})
page.on('pageerror', (e) => consoleErrors.push('PAGEERROR: ' + e.message))

const failures = []

for (const s of sizes) {
  await page.setViewportSize({ width: s.w, height: s.h })
  await page.goto('http://localhost:4175/', { waitUntil: 'networkidle' })

  const report = await page.evaluate(() => {
    const out = {
      horizontalOverflow: false,
      overflowEls: [],
      missingSections: [],
      duplicateIds: [],
      brokenAnchors: [],
      missingImages: [],
      viewportMeta: !document.querySelector('meta[name="viewport"]'),
    }

    if (document.documentElement.scrollWidth > window.innerWidth + 1) {
      out.horizontalOverflow = true
    }

    const rects = []
    for (const el of document.querySelectorAll('body *')) {
      const style = getComputedStyle(el)
      if (style.position === 'fixed' || style.display === 'none' || style.visibility === 'hidden') continue
      const r = el.getBoundingClientRect()
      if (r.width === 0 || r.height === 0) continue
      rects.push({
        tag: el.tagName.toLowerCase(),
        cls: String(el.className?.baseVal ?? el.className).split(' ')[0],
        txt: (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 50),
        l: r.left,
        r: r.right,
      })
    }
    rects.sort((a, b) => (b.r - b.l) - (a.r - a.l))
    for (const el of rects) {
      if (el.l < -1 || el.r > window.innerWidth + 1) {
        out.overflowEls.push(`${el.tag}.${el.cls} "${el.txt}" [${Math.round(el.l)}, ${Math.round(el.r)}]`)
      }
    }

    const ids = new Set()
    for (const el of document.querySelectorAll('[id]')) {
      if (ids.has(el.id)) out.duplicateIds.push(el.id)
      ids.add(el.id)
    }
    for (const id of ['top', 'core', 'capabilities', 'work', 'philosophy', 'process', 'why', 'about', 'contact']) {
      if (!document.getElementById(id)) out.missingSections.push(id)
    }
    for (const a of document.querySelectorAll('a[href^="#"]')) {
      const target = a.getAttribute('href').slice(1)
      if (target && !document.getElementById(target)) out.brokenAnchors.push(a.getAttribute('href'))
    }
    for (const img of document.querySelectorAll('img')) {
      if (img.complete && img.naturalWidth === 0) out.missingImages.push(img.src)
    }
    return out
  })

  for (const [k, v] of Object.entries(report)) {
    if (Array.isArray(v) && v.length) failures.push(`[${s.name}] ${k}: ${v.join(' | ')}`)
    if (k !== 'overflowEls' && v === true) failures.push(`[${s.name}] ${k}`)
  }
}

// Hero visibility check — the hero entrance is CSS-driven; wait for it to settle.
await page.setViewportSize({ width: 1440, height: 900 })
await page.goto('http://localhost:4175/', { waitUntil: 'networkidle' })
await page.waitForTimeout(1800)
const hero = await page.evaluate(() => {
  const q = (sel) => {
    const el = document.querySelector(sel)
    if (!el) return { found: false }
    const cs = getComputedStyle(el)
    const r = el.getBoundingClientRect()
    return { found: true, opacity: parseFloat(cs.opacity), w: r.width, h: r.height, top: r.top }
  }
  return {
    title: q('.hero-title'),
    brand: q('.hero-brand'),
    sub: q('.hero-sub'),
    pipeline: q('.pipeline'),
    vh: window.innerHeight,
  }
})
const heroProblems = []
for (const [name, d] of Object.entries(hero)) {
  if (name === 'vh') continue
  if (!d.found) heroProblems.push(`hero ${name} not found`)
  else if (d.opacity < 0.99) heroProblems.push(`hero ${name} opacity ${d.opacity}`)
  else if (d.w < 10 || d.h < 10) heroProblems.push(`hero ${name} zero size`)
}
if (hero.title.top < 0 || hero.title.top >= hero.vh) heroProblems.push(`hero title off-screen (top=${Math.round(hero.title.top)})`)
console.log('HERO_CHECK:', heroProblems.length ? heroProblems.join(' | ') : 'visible')

// Banner measurement — confirm the official brand asset renders at the intended size without distortion.
const banner = await page.evaluate(() => {
  const m = (sel) => {
    const el = document.querySelector(sel)
    if (!el) return { found: false }
    const r = el.getBoundingClientRect()
    return { found: true, w: Math.round(r.width), h: Math.round(r.height) }
  }
  return { nav: m('.logo-banner'), footer: m('.footer-banner') }
})
const b = banner.nav
const f = banner.footer
const bannerReport = []
if (!b.found) bannerReport.push('nav banner missing')
else bannerReport.push(`nav ${b.w}x${b.h}px`)
if (!f.found) bannerReport.push('footer banner missing')
else bannerReport.push(`footer ${f.w}x${f.h}px`)
console.log('BANNER:', bannerReport.join(' | '))

await browser.close()
server.kill()

console.log('CONSOLE_ERRORS:', JSON.stringify(consoleErrors, null, 2))
if (failures.length) {
  console.log('CHECK_FAILURES:')
  for (const f of failures) console.log('  - ' + f)
} else {
  console.log('CHECK_FAILURES: none')
}