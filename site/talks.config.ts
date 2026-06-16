export interface Talk {
  /** Folder name under packages/ — also the deployed sub-path. */
  slug: string
  /** Display title on the card. */
  title: string
  /** ISO date string; used for sorting (desc) and the "year" chip. */
  date: string
  /** Where/when this was presented; small text under the title. */
  venue?: string
  /** Optional short summary shown on hover / under the title. */
  description?: string
  /** Tags shown as filter chips at the top. First tag styles the card accent. */
  tags?: string[]
  /**
   * Cover image. Path is resolved against the talk in both dev (served from
   * packages/<slug>/public/ via vite middleware) and prod (built to dist/<slug>/).
   * Examples: 'screenshot.png', 'cover.gif'. Leave undefined for a gradient placeholder.
   */
  cover?: string
}

export const talks: Talk[] = [
  {
    slug: 'hello-deck',
    title: 'Hello Deck',
    date: '2026-01-01',
    description: 'A minimal Slidev starter — duplicate this entry to add your own talk.',
    tags: ['demo'],
  },
]
