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
    slug: 'wifi-slide',
    title: '现场网络连接',
    date: '2026-07-23',
    venue: '通用模板',
    description:
      '浅色投影友好的入网看板:多组 SSID/密码 + WiFi 二维码,支持自定义主副标题,设置写入 URL。',
    tags: ['wifi', 'template', 'qr'],
  },
  {
    slug: 'ai-finance',
    title: 'AI 赋能金融从业者',
    date: '2026-07-20',
    venue: '金融科技应用',
    description: '研究、建模、合规、量化——大模型正在重写金融从业者的工作流',
    tags: ['ai', 'finance', '金融'],
  },
  {
    slug: 'fudan-ai-intro',
    title: '2026复旦大学计算机工作站 · AI引导课程',
    date: '2026-07-17',
    venue: '复旦大学计算机工作站',
    description: 'AI 兴起、Vibe Coding、主流工具与 AI 边界——面向新生的 AI 编程引导课',
    tags: ['ai', 'vibe-coding', 'fudan'],
  },
  {
    slug: 'debate-slide',
    title: '辩论赛决赛',
    date: '2025-12-17',
    description:
      'URL 可传参的辩论赛流程模板:?title=...&subtitle=...&motion=...&proTeam=...&conTeam=...',
    tags: ['debate', 'template'],
  },
  {
    slug: 'hello-deck',
    title: 'Hello Deck',
    date: '2026-01-01',
    description: 'A minimal Slidev starter — duplicate this entry to add your own talk.',
    tags: ['demo'],
  },
]
