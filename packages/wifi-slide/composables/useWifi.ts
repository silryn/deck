import { computed, ref } from 'vue'

/**
 * URL query parameters → reactive WiFi-board data.
 *
 * Open the deck with e.g.
 *   /wifi-slide/?title=...&subtitle=...&nets=[{"ssid":"...","password":"...","auth":"WPA"}]
 * The `nets` param is a JSON array; URLSearchParams percent-encodes it for us,
 * so Chinese SSIDs / symbols in passwords survive the round-trip.
 *
 * In practice you never hand-write `nets` — the on-slide editor (gear button)
 * writes it via `setNetworks`. Slidev runs in hash-route mode (see
 * `routerMode: hash` in slides.md), so the query string lives BEFORE the `#`
 * and is preserved across slide navigation: set it once, then project.
 */

export type Auth = 'WPA' | 'WEP' | 'nopass'

export interface Network {
  ssid: string
  password: string
  auth: Auth
}

const DEFAULT_TITLE = '连接现场网络'
const DEFAULT_SUBTITLE = '扫码即可接入 · Scan to connect'

// Shown when the deck is opened with no `nets` param — a concrete example so
// it's immediately obvious what the board looks like once configured.
const DEFAULT_NETWORKS: Network[] = [
  { ssid: 'Venue-Guest', password: 'welcome2026', auth: 'WPA' },
  { ssid: 'Venue-5G', password: 'welcome2026', auth: 'WPA' },
]

const search = ref(typeof window !== 'undefined' ? window.location.search : '')

if (typeof window !== 'undefined') {
  // Hash-mode navigation doesn't touch `?search`, but external
  // back/forward (or manual edits) do — keep in sync.
  window.addEventListener('popstate', () => {
    search.value = window.location.search
  })
}

function parseNetworks(raw: string | null): Network[] {
  if (!raw)
    return DEFAULT_NETWORKS
  try {
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed))
      return DEFAULT_NETWORKS
    return parsed
      .filter((n): n is Partial<Network> => !!n && typeof n === 'object')
      .map(n => ({
        ssid: String(n.ssid ?? ''),
        password: String(n.password ?? ''),
        auth: (n.auth === 'WEP' || n.auth === 'nopass') ? n.auth : 'WPA',
      }))
  }
  catch {
    return DEFAULT_NETWORKS
  }
}

export function useWifi() {
  return computed(() => {
    const sp = new URLSearchParams(search.value)
    return {
      title: sp.get('title') || DEFAULT_TITLE,
      subtitle: sp.get('subtitle') || DEFAULT_SUBTITLE,
      networks: parseNetworks(sp.get('nets')),
    }
  })
}

function commit(sp: URLSearchParams) {
  if (typeof window === 'undefined')
    return
  const qs = sp.toString()
  const url = `${window.location.pathname}${qs ? `?${qs}` : ''}${window.location.hash}`
  window.history.replaceState(null, '', url)
  search.value = qs ? `?${qs}` : ''
}

export function setText(key: 'title' | 'subtitle', value: string) {
  if (typeof window === 'undefined')
    return
  const sp = new URLSearchParams(window.location.search)
  if (value)
    sp.set(key, value)
  else
    sp.delete(key)
  commit(sp)
}

export function setNetworks(networks: Network[]) {
  if (typeof window === 'undefined')
    return
  const sp = new URLSearchParams(window.location.search)
  // Trim empties so the URL never carries blank rows the editor left behind.
  const clean = networks.filter(n => n.ssid.trim() !== '')
  if (clean.length)
    sp.set('nets', JSON.stringify(clean))
  else
    sp.delete('nets')
  commit(sp)
}

/**
 * WiFi QR payload per the de-facto standard read by iOS/Android cameras:
 *   WIFI:T:WPA;S:<ssid>;P:<password>;H:false;;
 * Special characters ( \ ; , : " ) must be backslash-escaped in the fields.
 */
export function wifiPayload(n: Network): string {
  const esc = (s: string) => s.replace(/([\\;,:"])/g, '\\$1')
  if (n.auth === 'nopass')
    return `WIFI:T:nopass;S:${esc(n.ssid)};;`
  return `WIFI:T:${n.auth};S:${esc(n.ssid)};P:${esc(n.password)};;`
}
