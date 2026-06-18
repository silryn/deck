<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue'

import type { Talk } from '../talks.config'
import { talks } from '../talks.config'

declare const __BUILD_INFO__: {
  commit: string
  branch: string
  buildTime: string
  runId: string | null
  repo: string | null
  ci: boolean
}

const build = __BUILD_INFO__

const commitUrl = computed(() =>
  build.repo && build.commit !== 'dev'
    ? `https://github.com/${build.repo}/commit/${build.commit}`
    : null,
)
const runUrl = computed(() =>
  build.repo && build.runId
    ? `https://github.com/${build.repo}/actions/runs/${build.runId}`
    : null,
)
const buildTimeLabel = computed(() => {
  const d = new Date(build.buildTime)
  if (Number.isNaN(d.getTime())) return build.buildTime
  return d.toLocaleString(undefined, {
    year: 'numeric', month: 'short', day: '2-digit',
    hour: '2-digit', minute: '2-digit',
    timeZoneName: 'short',
  })
})

const sorted = [...talks].sort((a, b) => b.date.localeCompare(a.date))

const allTags = computed(() => {
  const set = new Set<string>()
  for (const t of sorted) for (const tag of t.tags ?? []) set.add(tag)
  return [...set]
})

const activeTag = ref<string | null>(null)

const filtered = computed(() => {
  if (!activeTag.value) return sorted
  return sorted.filter(t => (t.tags ?? []).includes(activeTag.value!))
})

function open(slug: string) {
  window.location.href = `/${slug}/`
}

function year(date: string) {
  return date.slice(0, 4)
}

function fmtDate(date: string) {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

// Talks that share a first tag share an accent — so a series of "debate"
// talks all look like one family. Falls back to the slug when no tags are set,
// which keeps the gradient stable per-card.
function gradientFor(talk: Talk) {
  const key = talk.tags?.[0] ?? talk.slug
  let hash = 0
  for (let i = 0; i < key.length; i++) hash = (hash * 31 + key.charCodeAt(i)) >>> 0
  const h1 = hash % 360
  const h2 = (h1 + 60) % 360
  return `linear-gradient(135deg, hsl(${h1} 70% 60%) 0%, hsl(${h2} 70% 45%) 100%)`
}

// Mount the live first-slide iframe only for cards within (or near) the
// viewport. Without this every card spins up a full Slidev SPA on page load
// and keeps it running — fine for two talks, expensive once there are ten.
// `rootMargin: 200px` pre-loads just-off-screen cards so scrolling stays
// smooth; cards that leave the viewport unmount and free their runtime.
const visible = ref(new Set<string>())
const observer = typeof window !== 'undefined' && 'IntersectionObserver' in window
  ? new IntersectionObserver(
      (entries) => {
        let changed = false
        for (const e of entries) {
          const slug = (e.target as HTMLElement).dataset.slug
          if (!slug) continue
          if (e.isIntersecting) {
            if (!visible.value.has(slug)) {
              visible.value.add(slug)
              changed = true
            }
          }
          else if (visible.value.delete(slug)) {
            changed = true
          }
        }
        if (changed) visible.value = new Set(visible.value)
      },
      { rootMargin: '200px' },
    )
  : null

function observeCard(el: Element | null, slug: string) {
  if (!observer) {
    // No-IO fallback: act as if every card is visible (matches old behavior).
    if (!visible.value.has(slug)) {
      visible.value.add(slug)
      visible.value = new Set(visible.value)
    }
    return
  }
  if (el) observer.observe(el)
}

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <main class="mx-auto max-w-6xl px-6 py-12">
    <header class="mb-10">
      <h1 class="text-3xl font-semibold tracking-tight">
        Silryn's Deck
      </h1>
      <p class="mt-2 text-sm text-[var(--muted)]">
        My slidev talks.
      </p>
    </header>

    <div class="mb-8 flex flex-wrap items-center gap-2">
      <button
        class="rounded-full border px-3 py-1 text-sm transition"
        :class="activeTag === null
          ? 'border-transparent bg-[var(--fg)] text-[var(--bg)]'
          : 'border-[var(--border)] hover:border-[var(--fg)]'"
        @click="activeTag = null"
      >
        All
        <span class="ml-1 opacity-60">{{ sorted.length }}</span>
      </button>
      <button
        v-for="tag in allTags"
        :key="tag"
        class="rounded-full border px-3 py-1 text-sm transition"
        :class="activeTag === tag
          ? 'border-transparent bg-[var(--fg)] text-[var(--bg)]'
          : 'border-[var(--border)] hover:border-[var(--fg)]'"
        @click="activeTag = tag"
      >
        {{ tag }}
      </button>
    </div>

    <ul class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <li
        v-for="talk in filtered"
        :key="talk.slug"
        :ref="(el) => observeCard(el as Element | null, talk.slug)"
        :data-slug="talk.slug"
        class="group cursor-pointer overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] transition hover:-translate-y-1 hover:shadow-xl"
        @click="open(talk.slug)"
      >
        <div
          class="relative aspect-video overflow-hidden"
          :style="{ background: gradientFor(talk) }"
        >
          <img
            v-if="talk.cover"
            :src="`/${talk.slug}/${talk.cover}`"
            :alt="talk.title"
            loading="lazy"
            class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          >
          <iframe
            v-else-if="visible.has(talk.slug)"
            :src="`/${talk.slug}/`"
            :title="`${talk.title} — first slide`"
            loading="lazy"
            scrolling="no"
            tabindex="-1"
            aria-hidden="true"
            class="absolute inset-0 h-full w-full pointer-events-none border-0 bg-black transition duration-500 group-hover:scale-105"
          />
          <div class="absolute bottom-0 left-0 p-3">
            <span class="rounded bg-black/40 px-2 py-0.5 font-mono text-[11px] uppercase tracking-widest text-white/90 backdrop-blur">
              {{ year(talk.date) }}
            </span>
          </div>
        </div>

        <div class="space-y-3 p-5">
          <div class="flex items-baseline justify-between gap-3">
            <h2 class="line-clamp-2 text-lg font-medium leading-snug">
              {{ talk.title }}
            </h2>
          </div>
          <div class="flex items-center justify-between text-xs text-[var(--muted)]">
            <span>{{ fmtDate(talk.date) }}</span>
            <span v-if="talk.venue">{{ talk.venue }}</span>
          </div>
          <p
            v-if="talk.description"
            class="line-clamp-2 text-sm text-[var(--muted)]"
          >
            {{ talk.description }}
          </p>
          <div
            v-if="talk.tags?.length"
            class="flex flex-wrap gap-1.5 pt-1"
          >
            <span
              v-for="tag in talk.tags"
              :key="tag"
              class="rounded-full bg-[var(--border)]/50 px-2 py-0.5 text-[11px] text-[var(--muted)]"
            >
              #{{ tag }}
            </span>
          </div>
        </div>
      </li>
    </ul>

    <p
      v-if="!filtered.length"
      class="mt-12 text-center text-sm text-[var(--muted)]"
    >
      No talks under #{{ activeTag }}.
    </p>

    <footer class="mt-16 border-t border-[var(--border)] pt-5 font-mono text-[11px] text-[var(--muted)]">
      <div class="flex flex-wrap items-center gap-x-3 gap-y-1">
        <span>
          <span class="opacity-60">commit</span>
          <a
            v-if="commitUrl"
            :href="commitUrl"
            target="_blank"
            rel="noopener"
            class="ml-1 underline-offset-2 hover:underline"
          >{{ build.commit }}</a>
          <span v-else class="ml-1">{{ build.commit }}</span>
        </span>
        <span class="opacity-40">·</span>
        <span>
          <span class="opacity-60">branch</span>
          <span class="ml-1">{{ build.branch }}</span>
        </span>
        <span class="opacity-40">·</span>
        <span>
          <span class="opacity-60">built</span>
          <span class="ml-1">{{ buildTimeLabel }}</span>
        </span>
        <template v-if="runUrl">
          <span class="opacity-40">·</span>
          <a
            :href="runUrl"
            target="_blank"
            rel="noopener"
            class="underline-offset-2 hover:underline"
          >
            <span class="opacity-60">run</span>
            <span class="ml-1">#{{ build.runId }}</span>
          </a>
        </template>
        <span
          v-if="!build.ci"
          class="ml-auto rounded bg-[var(--border)]/50 px-1.5 py-0.5 text-[10px] uppercase tracking-widest opacity-70"
        >
          local
        </span>
      </div>
    </footer>
  </main>
</template>
