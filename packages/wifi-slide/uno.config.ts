// @ts-expect-error - Ignoring the error of missing types for the uno config
import config from '@slidev/client/uno.config'
import { mergeConfigs, presetAttributify, presetIcons, presetWebFonts, presetWind3 } from 'unocss'

export default mergeConfigs([
  config,
  {
    safelist: [
      ...Array.from({ length: 30 }, (_, i) => `delay-${(i + 1) * 100}`),
      // Card accent utilities are chosen dynamically by index, so pin the ones
      // UnoCSS can't see at build time.
      'from-sky-400', 'to-blue-500', 'text-blue-600', 'ring-blue-200', 'bg-blue-50', 'text-blue-700',
      'from-violet-400', 'to-fuchsia-500', 'text-fuchsia-600', 'ring-fuchsia-200', 'bg-fuchsia-50', 'text-fuchsia-700',
      'from-emerald-400', 'to-teal-500', 'text-teal-600', 'ring-teal-200', 'bg-teal-50', 'text-teal-700',
      'from-amber-400', 'to-orange-500', 'text-orange-600', 'ring-orange-200', 'bg-orange-50', 'text-orange-700',
      'from-rose-400', 'to-pink-500', 'text-rose-600', 'ring-rose-200', 'bg-rose-50', 'text-rose-700',
      'from-cyan-400', 'to-sky-500', 'text-cyan-600', 'ring-cyan-200', 'bg-cyan-50', 'text-cyan-700',
    ],
    presets: [
      presetWind3({
        dark: 'class',
      }),
      presetAttributify(),
      presetIcons({
        prefix: 'i-',
        scale: 1.2,
        extraProperties: {
          'display': 'inline-block',
          'vertical-align': 'middle',
        },
      }),
      presetWebFonts({
        fonts: {
          sans: 'DM Sans',
          cn: 'Noto Serif SC',
          mono: 'DM Mono',
        },
        timeouts: {
          failure: 30000,
          warning: 30000,
        },
      }),
    ],
  },
])
