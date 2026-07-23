<script setup lang="ts">
import { computed } from 'vue'

import { useGlowPolygons } from '../../_shared/useGlowPolygons'
import { useWifi } from '../composables/useWifi'

const wifi = useWifi()

// Derive a stable hue from the title so different events get a different (but
// always soft) wash. Colors stay high-lightness pastels so the board reads
// clearly under a projector — the background never fights the foreground.
const titleHash = computed(() => {
  const s = wifi.value.title
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0
  return h
})

const h1 = computed(() => titleHash.value % 360)
const h2 = computed(() => (h1.value + 40) % 360)
const h3 = computed(() => (h1.value + 190) % 360)

const grad1 = computed(() => `linear-gradient(to right, hsl(${h1.value} 90% 82%), hsl(${h2.value} 90% 86%))`)
const grad2 = computed(() => `linear-gradient(to left, hsl(${h2.value} 88% 84%), hsl(${h1.value} 90% 88%))`)
const grad3 = computed(() => `linear-gradient(to top, hsl(${h3.value} 90% 82%), hsl(${(h3.value + 25) % 360} 95% 90%))`)

const baseSeed = computed(() => String(titleHash.value))
const { poly1, poly2, poly3 } = useGlowPolygons({ baseSeed })
</script>

<template>
  <div class="bg-base">
    <div
      class="bg transform-gpu overflow-hidden pointer-events-none"
      style="filter: blur(80px)"
      aria-hidden="true"
    >
      <div class="clip" :style="{ background: grad1, 'clip-path': `polygon(${poly1})`, 'opacity': 0.55 }" />
      <div class="clip" :style="{ background: grad2, 'clip-path': `polygon(${poly2})`, 'opacity': 0.5 }" />
      <div class="clip" :style="{ background: grad3, 'clip-path': `polygon(${poly3})`, 'opacity': 0.45 }" />
    </div>
  </div>
</template>

<style scoped>
.bg-base {
  position: absolute;
  inset: 0;
  z-index: -10;
  background: #f6f8fc;
}

.bg,
.clip {
  transition: all 2.5s ease;
}

.bg {
  position: absolute;
  inset: 0;
}

.clip {
  clip-path: circle(75%);
  aspect-ratio: 16 / 9;
  position: absolute;
  inset: 0;
}
</style>
