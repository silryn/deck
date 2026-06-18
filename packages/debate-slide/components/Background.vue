<script setup lang="ts">
import { computed } from 'vue'

import { useGlowPolygons } from '../../_shared/useGlowPolygons'
import { useParams } from '../composables/useParams'

const params = useParams()

// Hash the motion (debate topic) into a stable number, then derive a 3-color
// palette directly in HSL: two close hues for the main wash, a complementary
// hue for the accent. Saturation/lightness are pinned to a tasteful range
// so every motion produces a coherent, "normal-looking" palette — no
// washed-out greys, no eye-burning neons.
//
// We deliberately avoid CSS `hue-rotate`: rotating a fixed blue base
// disproportionately favours warm tones at certain rotation values, so the
// deck would feel red-leaning regardless of motion. Generating colors
// directly distributes them uniformly across the spectrum.
const motionHash = computed(() => {
  const s = params.value.motion
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0
  return h
})

const h1 = computed(() => motionHash.value % 360)
const h2 = computed(() => (h1.value + 25) % 360)
const h3 = computed(() => (h1.value + 180) % 360) // complementary accent

const grad1 = computed(() => `linear-gradient(to right, hsl(${h1.value} 70% 45%), hsl(${h2.value} 75% 30%))`)
const grad2 = computed(() => `linear-gradient(to left, hsl(${h1.value} 70% 45%), hsl(${h2.value} 75% 30%))`)
const grad3 = computed(() => `linear-gradient(to top, hsl(${h3.value} 70% 50%), hsl(${(h3.value + 20) % 360} 80% 70%))`)

const baseSeed = computed(() => String(motionHash.value))
const { poly1, poly2, poly3, opacity } = useGlowPolygons({ baseSeed })
</script>

<template>
  <div>
    <div
      class="bg transform-gpu overflow-hidden pointer-events-none bg-black"
      style="filter: blur(70px)"
      aria-hidden="true"
    >
      <div
        class="clip"
        :style="{ background: grad1, 'clip-path': `polygon(${poly1})`, 'opacity': opacity }"
      />
      <div
        class="clip"
        :style="{ background: grad2, 'clip-path': `polygon(${poly2})`, 'opacity': opacity }"
      />
      <div
        class="clip"
        :style="{ background: grad3, 'clip-path': `polygon(${poly3})`, 'opacity': 0.2 }"
      />
    </div>
  </div>
</template>

<style scoped>
.bg,
.clip {
  transition: all 2.5s ease;
}

.bg {
  position: absolute;
  inset: 0;
  z-index: -10;
}

.clip {
  clip-path: circle(75%);
  aspect-ratio: 16 / 9;
  position: absolute;
  inset: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
