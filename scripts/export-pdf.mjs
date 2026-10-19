import { createServer } from 'http'
import { readFileSync, existsSync, unlinkSync } from 'fs'
import { join, extname } from 'path'
import { fileURLToPath } from 'url'
import { chromium } from 'playwright'

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..')
const dist = join(root, 'dist')
const outPdf = join(root, 'SCMS-Blueprint.pdf')

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
}

function startStatic() {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      let urlPath = decodeURIComponent((req.url || '/').split('?')[0])
      if (urlPath === '/') urlPath = '/index.html'
      const file = join(dist, urlPath)
      if (!file.startsWith(dist) || !existsSync(file)) {
        res.writeHead(404)
        res.end('Not found')
        return
      }
      res.writeHead(200, { 'Content-Type': mime[extname(file)] || 'application/octet-stream' })
      res.end(readFileSync(file))
    })
    server.listen(4179, '127.0.0.1', () => resolve(server))
  })
}

if (!existsSync(join(dist, 'index.html'))) {
  console.error('dist/ missing. Run: npm run build')
  process.exit(1)
}

const server = await startStatic()
const browser = await chromium.launch({
  headless: true,
  channel: 'chrome',
})

const page = await browser.newPage({
  viewport: { width: 1100, height: 1400 },
  locale: 'fa-AF',
  deviceScaleFactor: 1,
})

await page.goto('http://127.0.0.1:4179/?pdf=1', {
  waitUntil: 'networkidle',
  timeout: 90000,
})

await page.waitForSelector('#structure', { timeout: 30000 })
await page.waitForTimeout(1500)

await page.addStyleTag({
  content: `
    @page { size: A4; margin: 10mm 12mm; background: white; }
    html, body, #root, .min-h-screen, .page-shell, .section-block {
      background: #ffffff !important;
    }
    .acc-item, details, table, article {
      break-inside: auto !important;
      page-break-inside: auto !important;
    }
    .print-keep, .kpi-tile, tr {
      break-inside: avoid !important;
      page-break-inside: avoid !important;
    }
  `,
})

await page.evaluate(async () => {
  document.documentElement.setAttribute('data-pdf', '1')
  document.querySelectorAll('details').forEach((el) => el.setAttribute('open', ''))
  document.querySelectorAll('.no-print').forEach((el) => el.remove())

  const imgs = [...document.images]
  await Promise.all(
    imgs.map(
      (img) =>
        new Promise((resolve) => {
          img.loading = 'eager'
          if (img.complete && img.naturalWidth > 0) return resolve()
          img.onload = () => resolve()
          img.onerror = () => resolve()
        }),
    ),
  )

  window.scrollTo(0, document.body.scrollHeight)
  await new Promise((r) => setTimeout(r, 600))
  window.scrollTo(0, 0)
  await new Promise((r) => setTimeout(r, 300))
})

await page.waitForTimeout(1000)

try {
  if (existsSync(outPdf)) unlinkSync(outPdf)
} catch {
  console.warn('Could not delete old PDF; writing over it.')
}

await page.pdf({
  path: outPdf,
  format: 'A4',
  printBackground: true,
  preferCSSPageSize: false,
  omitBackground: false,
  displayHeaderFooter: true,
  headerTemplate: '<div style="width:100%;background:white;"></div>',
  footerTemplate: `
    <div style="width:100%;font-size:8px;color:#64748B;padding:0 12mm;display:flex;justify-content:space-between;font-family:Tahoma,sans-serif;direction:rtl;background:white;">
      <span>SCMS — سند طراحی سیستم</span>
      <span class="pageNumber"></span>
    </div>
  `,
  margin: {
    top: '10mm',
    bottom: '14mm',
    left: '10mm',
    right: '10mm',
  },
})

await browser.close()
server.close()
console.log('PDF ready:', outPdf)
