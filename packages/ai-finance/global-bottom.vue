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
        class="clip bg-gradient-to-r from-[#14532d] to-[#166534]"
        :style="{ 'clip-path': `polygon(${poly1})`, 'opacity': opacity }"
      />
      <div
        class="clip bg-gradient-to-l from-[#78350f] to-[#92400e]"
        :style="{ 'clip-path': `polygon(${poly2})`, 'opacity': opacity }"
      />
      <div
        class="clip bg-gradient-to-t from-[#d97706] to-[#fef3c7]"
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

.light .clip {
  opacity: 1 !important;
}
</style>
