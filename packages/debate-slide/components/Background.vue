<script setup lang="ts">
import { useNav } from '@slidev/client'
import seedrandom from 'seedrandom'
import { computed, ref, watch } from 'vue'
import { useParams } from '../composables/useParams'

const { currentSlideRoute } = useNav()
const params = useParams()

// Hash the motion (debate topic) into a stable number, then derive both the
// hue rotation and the polygon-layout seed from it. Different motions get
// visually different backgrounds; the same motion is reproducible across
// reloads and audience devices.
const motionHash = computed(() => {
  const s = params.value.motion
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0
  return h
})

export type Range = [number, number]

export type Distribution =
  | 'full'
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'center'
  | 'topmost'

const formatter = computed(() => (currentSlideRoute.value.meta?.slide as any)?.frontmatter || {})
const distribution = computed(() => (formatter.value.glow || 'full') as Distribution)
const opacity = computed<number>(() => +(formatter.value.glowOpacity ?? 0.4))
// Motion drives the base hue; frontmatter `glowHue` is layered on as a
// per-slide offset (so individual slides can still tilt away from the base).
const hue = computed<number>(() => (motionHash.value % 360) + (+(formatter.value.glowHue || 0)))
// Motion is the base seed; frontmatter `glowSeed` (if set) is folded in,
// so a slide can opt into its own layout while still reflecting the motion.
// `glowSeed: false` keeps the "regenerate every render" escape hatch.
const seed = computed<string>(() => {
  const fm = formatter.value.glowSeed
  if (fm === 'false' || fm === false) return Date.now().toString()
  const base = String(motionHash.value)
  return fm ? `${base}-${fm}` : base
})
const theme = computed(() => (formatter.value.theme || 'dark') as 'light' | 'dark')
const overflow = 0.3
const disturb = 0.3
const disturbChance = 0.3

function distributionToLimits(distribution: Distribution) {
  const min = -0.2
  const max = 1.2
  let x: Range = [min, max]
  let y: Range = [min, max]

  function intersection(a: Range, b: Range): Range {
    return [Math.max(a[0], b[0]), Math.min(a[1], b[1])]
  }

  const limits = distribution.split('-')

  for (const limit of limits) {
    switch (limit) {
      case 'topmost':
        y = intersection(y, [-0.5, 0])
        break
      case 'top':
        y = intersection(y, [min, 0.6])
        break
      case 'bottom':
        y = intersection(y, [0.4, max])
        break
      case 'left':
        x = intersection(x, [min, 0.6])
        break
      case 'right':
        x = intersection(x, [0.4, max])
        break
      case 'xcenter':
        x = intersection(x, [0.25, 0.75])
        break
      case 'ycenter':
        y = intersection(y, [0.25, 0.75])
        break
      case 'center':
        x = intersection(x, [0.25, 0.75])
        y = intersection(y, [0.25, 0.75])
        break
      case 'full':
        x = intersection(x, [0, 1])
        y = intersection(y, [0, 1])
        break
      default:
        break
    }
  }

  return { x, y }
}

function distance2([x1, y1]: Range, [x2, y2]: Range) {
  return (x2 - x1) ** 2 + (y2 - y1) ** 2
}

function usePloy(number = 16) {
  function getPoints(): Range[] {
    const limits = distributionToLimits(distribution.value)
    const rng = seedrandom(`${seed.value}-${currentSlideRoute.value.no}`)
    function randomBetween([a, b]: Range) {
      return rng() * (b - a) + a
    }
    function applyOverflow(random: number, overflow: number) {
      random = random * (1 + overflow * 2) - overflow
      return rng() < disturbChance ? random + (rng() - 0.5) * disturb : random
    }
    return Array.from({ length: number })
      .fill(0)
      .map(() => [
        applyOverflow(randomBetween(limits.x), overflow),
        applyOverflow(randomBetween(limits.y), overflow),
      ])
  }

  const points = ref(getPoints())
  const poly = computed(() => points.value.map(([x, y]) => `${x * 100}% ${y * 100}%`).join(', '))

  function jumpPoints() {
    const newPoints = new Set(getPoints())
    points.value = points.value.map((o) => {
      let minDistance = Number.POSITIVE_INFINITY
      let closest: Range | undefined
      for (const n of newPoints) {
        const d = distance2(o, n)
        if (d < minDistance) {
          minDistance = d
          closest = n
        }
      }
      newPoints.delete(closest)
      return closest
    })
  }

  watch(currentSlideRoute, () => {
    jumpPoints()
  })

  return poly
}

const poly1 = usePloy(10)
const poly2 = usePloy(6)
const poly3 = usePloy(3)
</script>

<template>
  <div>
    <div
      class="bg transform-gpu overflow-hidden pointer-events-none"
      :style="{ filter: `blur(70px) hue-rotate(${hue}deg)` }"
      :class="[
        theme === 'light' ? 'bg-white scale-150' : 'bg-black',
      ]"
      aria-hidden="true"
    >
      <template v-if="theme === 'light'">
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
      </template>
      <template v-else>
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
      </template>
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
