import { computed, ref } from 'vue'

/**
 * URL query parameters → reactive slide data.
 *
 * Open the deck with e.g.
 *   /debate-slide/?title=...&subtitle=...&motion=...&proTeam=...&conTeam=...
 * and any slide using {{ p.title }} etc. will render that value.
 *
 * Slidev runs in hash-route mode (see `routerMode: hash` in slides.md
 * frontmatter), so the query string lives BEFORE the `#` and is preserved
 * across slide navigation — set it once on the URL and play through.
 */

// Defaults are placeholder tokens, not real content — open the deck without
// query params and every parameterized slot renders its own name in braces,
// so it's obvious what needs to be set.
const DEFAULTS = {
  title: '{title}',
  subtitle: '{subtitle}',
  motion: '{motion}',
  proTeam: '{proTeam}',
  conTeam: '{conTeam}',
} as const

export type ParamKey = keyof typeof DEFAULTS

const search = ref(typeof window !== 'undefined' ? window.location.search : '')

if (typeof window !== 'undefined') {
  // Hash-mode navigation doesn't touch `?search`, but external
  // back/forward (or manual edits) do — keep in sync.
  window.addEventListener('popstate', () => {
    search.value = window.location.search
  })
}

export function useParams() {
  return computed(() => {
    const sp = new URLSearchParams(search.value)
    const out = { ...DEFAULTS } as Record<ParamKey, string>
    for (const key of Object.keys(DEFAULTS) as ParamKey[]) {
      const v = sp.get(key)
      if (v != null && v !== '')
        out[key] = v
    }
    return out
  })
}

/** Write a param to the URL without reloading; reactive consumers update. */
export function setParam(key: ParamKey, value: string) {
  if (typeof window === 'undefined') return
  const sp = new URLSearchParams(window.location.search)
  if (value) sp.set(key, value)
  else sp.delete(key)
  const qs = sp.toString()
  const url = `${window.location.pathname}${qs ? `?${qs}` : ''}${window.location.hash}`
  window.history.replaceState(null, '', url)
  search.value = qs ? `?${qs}` : ''
}
