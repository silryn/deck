import { type ChildProcess, execSync, spawn } from 'node:child_process'
import { existsSync, readdirSync } from 'node:fs'
import net from 'node:net'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import vue from '@vitejs/plugin-vue'
import sirv from 'sirv'
import unocss from 'unocss/vite'
import { defineConfig, type Plugin, type ProxyOptions } from 'vite'

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

function knownSlugs(): string[] {
  if (!existsSync(packagesRoot)) return []
  return readdirSync(packagesRoot, { withFileTypes: true })
    .filter(d => d.isDirectory() && existsSync(path.join(packagesRoot, d.name, 'slides.md')))
    .map(d => d.name)
    .sort()
}

function looksLikeAsset(p: string) {
  return /\.[a-z0-9]+$/i.test(p)
}

// Ask the OS for a free TCP port. We bind to 0 on 127.0.0.1, read back the
// assigned port, and immediately close. There's a small race window between
// release and slidev's own bind, but in practice we've never lost it.
function findFreePort(): Promise<number> {
  return new Promise((resolve, reject) => {
    const srv = net.createServer()
    srv.unref()
    srv.once('error', reject)
    srv.listen(0, '127.0.0.1', () => {
      const addr = srv.address()
      if (addr && typeof addr === 'object') {
        const { port } = addr
        srv.close(() => resolve(port))
      }
      else {
        srv.close()
        reject(new Error('failed to allocate a free port'))
      }
    })
  })
}

// Per-talk static handler for build/preview mode. In dev we proxy to slidev
// instead, but this is still useful for `vite preview` after `bun run build`.
function talkRouter(): Plugin {
  const slugs = new Set(knownSlugs())
  const distServe = new Map<string, ReturnType<typeof sirv>>()
  const publicServe = new Map<string, ReturnType<typeof sirv>>()
  for (const slug of slugs) {
    const distDir = path.join(distRoot, slug)
    if (existsSync(distDir))
      distServe.set(slug, sirv(distDir, { dev: true, etag: true }))
    const publicDir = path.join(packagesRoot, slug, 'public')
    if (existsSync(publicDir))
      publicServe.set(slug, sirv(publicDir, { dev: true, etag: true }))
  }

  return {
    name: 'deck-talk-router',
    // Preview only: in dev the spawner+proxy plugin owns /<slug>/*, and
    // `vite build` never creates a server, so a middleware there is dead code.
    apply(_config, env) {
      return !!env.isPreview
    },
    // Not `configureServer` — the preview server only invokes this hook.
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = (req.url || '').split('?')[0]
        const m = url.match(/^\/([^/]+)(?:\/(.*))?$/)
        if (!m) return next()
        const [, slug, rest = ''] = m
        if (!slugs.has(slug)) return next()

        const origUrl = req.url!
        const innerUrl = `/${rest}${origUrl.slice(url.length)}`

        const fallback = () => {
          req.url = origUrl
          const dist = distServe.get(slug)
          if (dist && !looksLikeAsset(rest || 'index.html')) {
            req.url = '/index.html'
            dist(req, res, () => {
              req.url = origUrl
              res.statusCode = 404
              res.setHeader('Content-Type', 'text/plain; charset=utf-8')
              res.end(`Not found: ${origUrl}`)
            })
            return
          }
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/plain; charset=utf-8')
          res.end(`Not found: ${origUrl}`)
        }

        const tryPublic = () => {
          const pub = publicServe.get(slug)
          if (!pub) return fallback()
          req.url = innerUrl
          pub(req, res, fallback)
        }

        const dist = distServe.get(slug)
        if (dist) {
          req.url = innerUrl
          dist(req, res, tryPublic)
        }
        else {
          tryPublic()
        }
      })
    },
  }
}

// Spawn `slidev --base /<slug>/ --port <port>` per talk, then proxy
// `/<slug>/*` to that port (HMR websockets included). Children are killed
// on server close / SIGINT / SIGTERM / process exit so we don't leak ports.
function slidevDevSpawner(ports: Map<string, number>): Plugin {
  const children: ChildProcess[] = []
  let killed = false

  function killAll() {
    if (killed) return
    killed = true
    for (const c of children) {
      if (!c.killed) {
        try {
          c.kill('SIGTERM')
        }
        catch {}
      }
    }
  }

  return {
    name: 'deck-slidev-spawner',
    // `apply: 'serve'` covers both `vite dev` and `vite preview`. We don't
    // want to spawn slidev for preview (that mode serves built output), so
    // the caller passes an empty `ports` map for preview and we no-op below.
    apply: 'serve',
    configureServer(server) {
      if (ports.size === 0) return

      for (const [slug, port] of ports) {
        const cwd = path.join(packagesRoot, slug)
        // stdio[0] = 'pipe' is load-bearing: slidev calls
        // `process.stdin.resume()` to listen for shortcut keys, but if stdin
        // is `'ignore'` it gets /dev/null which EOFs immediately and slidev
        // exits right after printing its ready banner. A pipe stays open
        // until we explicitly end it (we never do), so slidev keeps running.
        const child = spawn(
          'bun',
          ['x', 'slidev', '--base', `/${slug}/`, '--port', String(port)],
          {
            cwd,
            stdio: ['pipe', 'pipe', 'pipe'],
            env: { ...process.env, FORCE_COLOR: '1' },
          },
        )
        children.push(child)

        // Prefix each line so simultaneously-spawning talks stay readable.
        const tag = `\x1b[36m[${slug}]\x1b[0m `
        const prefix = (stream: NodeJS.ReadableStream, sink: NodeJS.WritableStream) => {
          let buf = ''
          stream.on('data', (chunk: Buffer) => {
            buf += chunk.toString()
            const lines = buf.split('\n')
            buf = lines.pop() ?? ''
            for (const line of lines) sink.write(`${tag}${line}\n`)
          })
        }
        if (child.stdout) prefix(child.stdout, process.stdout)
        if (child.stderr) prefix(child.stderr, process.stderr)

        child.on('exit', (code, signal) => {
          if (!killed && code !== 0 && code !== null) {
            // eslint-disable-next-line no-console
            console.error(`${tag}slidev exited with code ${code} (signal ${signal})`)
          }
        })
      }

      server.httpServer?.once('close', killAll)
      process.once('SIGINT', () => { killAll(); process.exit(130) })
      process.once('SIGTERM', () => { killAll(); process.exit(143) })
      process.once('exit', killAll)
    },
  }
}

export default defineConfig(async ({ command, isPreview }) => {
  const slugs = knownSlugs()
  const isDev = command === 'serve' && !isPreview

  const proxy: Record<string, ProxyOptions> = {}
  const ports = new Map<string, number>()

  if (isDev) {
    for (const slug of slugs)
      ports.set(slug, await findFreePort())
    for (const [slug, port] of ports) {
      // Matches /<slug> exactly and /<slug>/anything (including the HMR
      // websocket upgrade path). `ws: true` makes vite forward the upgrade.
      // `localhost` (not 127.0.0.1) is intentional: slidev's vite resolves
      // its host to whatever Node's DNS picks for "localhost" — on modern
      // Linux that's `::1`, so an IPv4-only target won't reach it.
      proxy[`^/${slug}(?:/.*)?$`] = {
        target: `http://localhost:${port}`,
        ws: true,
        changeOrigin: false,
      }
    }
  }

  return {
    root: here,
    plugins: [
      vue(),
      unocss({ configFile: path.resolve(here, 'uno.config.ts') }),
      talkRouter(),
      slidevDevSpawner(ports),
    ],
    define: {
      __BUILD_INFO__: JSON.stringify(buildInfo),
    },
    server: {
      proxy,
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
  }
})
