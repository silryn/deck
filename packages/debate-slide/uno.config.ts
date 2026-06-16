import config from '@slidev/client/uno.config'
import { mergeConfigs, presetAttributify, presetIcons, presetWebFonts, presetWind } from 'unocss'

export default mergeConfigs([
  config,
  {
    safelist: [
      ...Array.from({ length: 30 }, (_, i) => `delay-${(i + 1) * 100}`),
    ],
    presets: [
      presetWind({
        dark: 'class',
      }),
      presetAttributify(),
      presetIcons({
        scale: 1.2,
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
