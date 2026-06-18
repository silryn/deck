import { useNav } from '@slidev/client'
import seedrandom from 'seedrandom'
import type { ComputedRef } from 'vue'
import { computed, ref, watch } from 'vue'

/**
 * Shared polygon-glow background algorithm.
 *
 * Each deck has its own colors / layout markup; only the math is generic.
 * The polygons drift between slide changes, with hue and layout controlled
 * by per-slide frontmatter (`glowHue`, `glowSeed`, `glowOpacity`, `glow`).
 *
 * Decks can also pass a `baseHue` / `baseSeed` — for example, debate-slide
 * derives them from the `?motion=` query param so the background reflects
 * the topic. Frontmatter values layer on top.
 *
 * Credits to @pi0 @Atinux for the original polygon glow approach.
 */

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

export interface UseGlowPolygonsOptions {
  /** Base hue (degrees, 0–360) added to any frontmatter `glowHue`. */
  baseHue?: ComputedRef<number>
  /** Base seed prepended to any frontmatter `glowSeed`. */
  baseSeed?: ComputedRef<string>
}

const OVERFLOW = 0.3
const DISTURB = 0.3
const DISTURB_CHANCE = 0.3

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

export function useGlowPolygons(options: UseGlowPolygonsOptions = {}) {
  const { currentSlideRoute } = useNav()

  const formatter = computed(() => (currentSlideRoute.value.meta?.slide as any)?.frontmatter || {})
  const distribution = computed(() => (formatter.value.glow || 'full') as Distribution)
  const opacity = computed<number>(() => +(formatter.value.glowOpacity ?? 0.4))

  const hue = computed<number>(() => (options.baseHue?.value ?? 0) + (+(formatter.value.glowHue || 0)))

  const seed = computed<string>(() => {
    const fm = formatter.value.glowSeed
    if (fm === 'false' || fm === false) return Date.now().toString()
    const base = options.baseSeed?.value
    if (base) return fm ? `${base}-${fm}` : base
    return fm || 'default'
  })

  function usePloy(count = 16) {
    function getPoints(): Range[] {
      const limits = distributionToLimits(distribution.value)
      const rng = seedrandom(`${seed.value}-${currentSlideRoute.value.no}`)
      function randomBetween([a, b]: Range) {
        return rng() * (b - a) + a
      }
      function applyOverflow(random: number, overflow: number) {
        random = random * (1 + overflow * 2) - overflow
        return rng() < DISTURB_CHANCE ? random + (rng() - 0.5) * DISTURB : random
      }
      return Array.from({ length: count })
        .fill(0)
        .map(() => [
          applyOverflow(randomBetween(limits.x), OVERFLOW),
          applyOverflow(randomBetween(limits.y), OVERFLOW),
        ] as Range)
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
        if (closest) newPoints.delete(closest)
        return closest ?? o
      })
    }

    watch(currentSlideRoute, () => {
      jumpPoints()
    })

    return poly
  }

  return {
    poly1: usePloy(10),
    poly2: usePloy(6),
    poly3: usePloy(3),
    hue,
    opacity,
  }
}
