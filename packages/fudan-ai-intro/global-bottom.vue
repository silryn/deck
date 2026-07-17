<script setup lang="ts">
import { useGlowPolygons } from '../_shared/useGlowPolygons'

const { poly1, poly2, poly3, hue, opacity } = useGlowPolygons()
</script>

<template>
  <div>
    <div
      class="bg transform-gpu overflow-hidden pointer-events-none"
      :style="{ filter: `blur(70px) hue-rotate(${hue}deg)` }"
      aria-hidden="true"
    >
      <div
        class="clip bg-gradient-to-r from-[#6b21a8] to-[#4c1d95]"
        :style="{ 'clip-path': `polygon(${poly1})`, 'opacity': opacity }"
      />
      <div
        class="clip bg-gradient-to-l from-[#7c3aed] to-[#3b0764]"
        :style="{ 'clip-path': `polygon(${poly2})`, 'opacity': opacity }"
      />
      <div
        class="clip bg-gradient-to-t from-[#06b6d4] to-[#a5f3fc]"
        :style="{ 'clip-path': `polygon(${poly3})`, 'opacity': 0.18 }"
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
</style>
