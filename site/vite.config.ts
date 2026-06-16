import { execSync } from 'node:child_process'
import { existsSync, readdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import vue from '@vitejs/plugin-vue'
import sirv from 'sirv'
import unocss from 'unocss/vite'
import { defineConfig } from 'vite'

const here = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(here, '..')
const packagesRoot = path.join(root, 'packages')
const distRoot = path.join(root, 'dist')

function git(cmd: string, fallback: string) {
  try {
    return execSync(`git ${cmd}`, { cwd: root, stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim()
  }
  catch {
    return fallback
  }
}

// Resolved once at vite startup. In CI, GitHub's default env vars take
// precedence; locally, we fall back to `git` and treat the build as "dev".
const buildInfo = {
  commit: (process.env.GITHUB_SHA || git('rev-parse HEAD', '')).slice(0, 7) || 'dev',
  branch: process.env.GITHUB_REF_NAME || git('rev-parse --abbrev-ref HEAD', 'local'),
  buildTime: new Date().toISOString(),
  runId: process.env.GITHUB_RUN_ID || null,
  repo: process.env.GITHUB_REPOSITORY || null,
  ci: !!process.env.GITHUB_ACTIONS,
}

function knownSlugs() {
  if (!existsSync(packagesRoot)) return new Set<string>()
  return new Set(
    readdirSync(packagesRoot, { withFileTypes: true })
      .filter(d => d.isDirectory())
      .map(d => d.name),
  )
}

function notBuiltPage(slug: string): string {
  return `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><title>${slug} · not built</title>
<style>
  body { font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; max-width: 38rem; margin: 4rem auto; padding: 0 1.25rem; color: #18181b; background: #fafaf9; }
  @media (prefers-color-scheme: dark) { body { background: #0a0a0a; color: #fafafa; } pre { background: #18181b !important; } }
  h1 { font-size: 1.25rem; margin: 0 0 1rem; }
  p { color: #71717a; line-height: 1.6; }
  pre { background: #f4f4f5; padding: .9rem 1rem; border-radius: 8px; font: .85rem/1.45 ui-monospace, monospace; overflow-x: auto; }
  a { color: inherit; }
</style></head>
<body>
  <h1>${slug} hasn't been built yet</h1>
  <p>This dev server serves built talks from <code>dist/</code>. Build them once, then refresh:</p>
  <pre>bun run build:talks</pre>
  <p>Or develop this talk directly in Slidev (separate port, with HMR):</p>
  <pre>cd packages/${slug}\nbun run dev</pre>
  <p><a href="/">← back to index</a></p>
</body>
</html>`
}

function looksLikeAsset(p: string) {
  return /\.[a-z0-9]+$/i.test(p)
}

function talkRouter() {
  const slugs = knownSlugs()
  // Per-talk sirv handlers. Don't use sirv's `single` mode — it serves
  // index.html for ANY missing path, which would corrupt MIME for missing
  // asset paths (e.g. .png that doesn't exist). We do SPA fallback ourselves,
  // only for paths without a file extension.
  const distServe = new Map<string, ReturnType<typeof sirv>>()
  const publicServe = new Map<string, ReturnType<typeof sirv>>()
  for (const slug of slugs) {
    const distDir = path.join(distRoot, slug)
    if (existsSync(distDir)) {
      distServe.set(slug, sirv(distDir, { dev: true, etag: true }))
    }
    const publicDir = path.join(packagesRoot, slug, 'public')
    if (existsSync(publicDir)) {
      publicServe.set(slug, sirv(publicDir, { dev: true, etag: true }))
    }
  }

  return {
    name: 'deck-talk-router',
    configureServer(server: any) {
      // Register synchronously (not via `return () => ...`) so this runs
      // BEFORE vite's built-in SPA index/fs.allow middlewares. We need to
      // claim /<slug>/... before they answer.
      server.middlewares.use((req: any, res: any, next: any) => {
          const url = (req.url || '').split('?')[0]
          const m = url.match(/^\/([^/]+)(?:\/(.*))?$/)
          if (!m) return next()
          const [, slug, rest = ''] = m
          if (!slugs.has(slug)) return next()

          const origUrl = req.url
          // Strip /<slug> prefix so sirv sees /<rest>[?query] under the talk root.
          const innerUrl = `/${rest}${origUrl.slice(url.length)}`

          const spaFallbackOr404 = () => {
            req.url = origUrl
            const dist = distServe.get(slug)
            if (dist && !looksLikeAsset(rest || 'index.html')) {
              // SPA route: serve the talk's index.html (matches the
              // `_redirects: /<slug>/* -> /<slug>/index.html 200` rule
              // Slidev writes for Netlify / Cloudflare Pages).
              req.url = '/index.html'
              dist(req, res, () => {
                req.url = origUrl
                res.statusCode = 404
                res.setHeader('Content-Type', 'text/plain; charset=utf-8')
                res.end(`Not found: ${origUrl}`)
              })
              return
            }
            if (!dist) {
              res.statusCode = 503
              res.setHeader('Content-Type', 'text/html; charset=utf-8')
              res.end(notBuiltPage(slug))
              return
            }
            res.statusCode = 404
            res.setHeader('Content-Type', 'text/plain; charset=utf-8')
            res.end(`Not found: ${origUrl}`)
          }

          const tryPublic = () => {
            const pub = publicServe.get(slug)
            if (!pub) return spaFallbackOr404()
            req.url = innerUrl
            pub(req, res, () => {
              spaFallbackOr404()
            })
          }

          const dist = distServe.get(slug)
          if (dist) {
            req.url = innerUrl
            dist(req, res, () => {
              tryPublic()
            })
          }
          else {
            tryPublic()
          }
        })
    },
  }
}

export default defineConfig({
  root: here,
  plugins: [vue(), unocss({ configFile: path.resolve(here, 'uno.config.ts') }), talkRouter()],
  define: {
    __BUILD_INFO__: JSON.stringify(buildInfo),
  },
  server: {
    fs: {
      allow: [here, packagesRoot, distRoot],
    },
  },
  build: {
    outDir: path.resolve(here, '../dist'),
    // Don't wipe sibling dist/<slug>/ folders produced by talk builds.
    // The top-level `build` script clears dist once via `cleanup:dist`.
    emptyOutDir: false,
  },
})
