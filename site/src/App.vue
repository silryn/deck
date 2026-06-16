<script setup lang="ts">
import { computed, ref } from 'vue'

import { talks } from '../talks.config'

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

function gradientFor(slug: string) {
  let hash = 0
  for (let i = 0; i < slug.length; i++) hash = (hash * 31 + slug.charCodeAt(i)) >>> 0
  const h1 = hash % 360
  const h2 = (h1 + 60) % 360
  return `linear-gradient(135deg, hsl(${h1} 70% 60%) 0%, hsl(${h2} 70% 45%) 100%)`
}
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
        class="group cursor-pointer overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] transition hover:-translate-y-1 hover:shadow-xl"
        @click="open(talk.slug)"
      >
        <div
          class="relative aspect-video overflow-hidden"
          :style="!talk.cover ? { background: gradientFor(talk.slug) } : undefined"
        >
          <img
            v-if="talk.cover"
            :src="`/${talk.slug}/${talk.cover}`"
            :alt="talk.title"
            loading="lazy"
            class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          >
          <div
            v-else
            class="absolute inset-0 flex items-end p-5 text-white"
          >
            <span class="font-mono text-xs uppercase tracking-widest opacity-80">
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
  </main>
</template>
