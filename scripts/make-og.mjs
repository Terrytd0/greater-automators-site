import { chromium } from 'playwright-core'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import fs from 'node:fs'

const root = fileURLToPath(new URL('..', import.meta.url))
const svgPath = path.join(root, 'public', 'og-cover.svg')
const outPath = path.join(root, 'public', 'og-cover.png')

let browser
try {
  browser = await chromium.launch()
} catch (e) {
  console.log('NO_BROWSER')
  process.exit(0)
}

const svg = fs.readFileSync(svgPath, 'utf8')

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Space+Grotesk:wght@600;700&display=swap" rel="stylesheet" />
<style>html,body{margin:0;padding:0;width:1200px;height:630px;overflow:hidden}</style>
</head>
<body>
${svg}
</body>
</html>`

const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
await page.setContent(html)
await page.evaluate(async () => {
  await document.fonts.load('700 30px "Space Grotesk"')
  await document.fonts.load('700 46px "Space Grotesk"')
  await document.fonts.ready
})
await page.waitForTimeout(200)
await page.screenshot({ path: outPath })
await browser.close()
console.log('OK')
