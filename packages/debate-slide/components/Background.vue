<script setup lang="ts">
import { computed } from 'vue'

import { useGlowPolygons } from '../../_shared/useGlowPolygons'
import { useParams } from '../composables/useParams'

const params = useParams()

// Hash the motion (debate topic) into a stable number, then derive both the
// base hue rotation and the polygon-layout seed from it. Different motions
// get visually different backgrounds; the same motion is reproducible across
// reloads and audience devices. Frontmatter `glowHue` / `glowSeed` still
// layer on top (handled inside useGlowPolygons).
const motionHash = computed(() => {
  const s = params.value.motion
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0
  return h
})
const baseHue = computed(() => motionHash.value % 360)
const baseSeed = computed(() => String(motionHash.value))

const { poly1, poly2, poly3, hue, opacity } = useGlowPolygons({ baseHue, baseSeed })
</script>

<template>
  <div>
    <div
      class="bg transform-gpu overflow-hidden pointer-events-none bg-black"
      :style="{ filter: `blur(70px) hue-rotate(${hue}deg)` }"
      aria-hidden="true"
    >
      <div
        class="clip bg-gradient-to-r from-[#3b82f6] to-[#1e40af]"
        :style="{ 'clip-path': `polygon(${poly1})`, 'opacity': opacity }"
      />
      <div
        class="clip bg-gradient-to-l from-[#3b82f6] to-[#1e40af]"
        :style="{ 'clip-path': `polygon(${poly2})`, 'opacity': opacity }"
      />
      <div
        class="clip bg-gradient-to-t from-[#3b82f6] to-[#1e40af]"
        :style="{ 'clip-path': `polygon(${poly3})`, 'opacity': 0.2 }"
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
