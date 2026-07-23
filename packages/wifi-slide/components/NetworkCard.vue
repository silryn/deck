<script setup lang="ts">
import { computed, ref } from 'vue'

import type { Network } from '../composables/useWifi'
import WifiQR from './WifiQR.vue'

const props = defineProps<{
  network: Network
  index: number
  qrSize?: number
  compact?: boolean
}>()

// A palette of light, projector-friendly gradient accents; each card picks one
// by index so a board of networks reads as a coherent set of distinct tiles.
const ACCENTS = [
  { from: 'from-sky-400', to: 'to-blue-500', text: 'text-blue-600', ring: 'ring-blue-200', chip: 'bg-blue-50 text-blue-700' },
  { from: 'from-violet-400', to: 'to-fuchsia-500', text: 'text-fuchsia-600', ring: 'ring-fuchsia-200', chip: 'bg-fuchsia-50 text-fuchsia-700' },
  { from: 'from-emerald-400', to: 'to-teal-500', text: 'text-teal-600', ring: 'ring-teal-200', chip: 'bg-teal-50 text-teal-700' },
  { from: 'from-amber-400', to: 'to-orange-500', text: 'text-orange-600', ring: 'ring-orange-200', chip: 'bg-orange-50 text-orange-700' },
  { from: 'from-rose-400', to: 'to-pink-500', text: 'text-rose-600', ring: 'ring-rose-200', chip: 'bg-rose-50 text-rose-700' },
  { from: 'from-cyan-400', to: 'to-sky-500', text: 'text-cyan-600', ring: 'ring-cyan-200', chip: 'bg-cyan-50 text-cyan-700' },
]

const accent = computed(() => ACCENTS[props.index % ACCENTS.length])
const authLabel = computed(() => props.network.auth === 'nopass' ? '开放网络' : props.network.auth)

const copied = ref('')
let copyTimer: ReturnType<typeof setTimeout> | undefined

async function copy(text: string, which: string) {
  if (!text)
    return
  try {
    await navigator.clipboard.writeText(text)
    copied.value = which
    clearTimeout(copyTimer)
    copyTimer = setTimeout(() => (copied.value = ''), 1400)
  }
  catch {
    // Clipboard blocked (insecure origin / permissions) — silently no-op;
    // the values are on screen anyway.
  }
}
</script>

<template>
  <div
    class="group relative flex items-center overflow-hidden rounded-3xl bg-white/80 shadow-xl ring-1 backdrop-blur-md transition-transform duration-300 hover:-translate-y-1"
    :class="[accent.ring, compact ? 'gap-4 p-4' : 'gap-6 p-6']"
  >
    <!-- accent bar -->
    <div class="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b" :class="[accent.from, accent.to]" />

    <div class="min-w-0 flex-1">
      <div class="mb-1 flex items-center gap-2">
        <div class="i-carbon-wifi" :class="[accent.text, compact ? 'text-lg' : 'text-xl']" />
        <span class="rounded-full px-2 py-0.5 text-xs font-semibold tracking-wide" :class="accent.chip">
          {{ authLabel }}
        </span>
      </div>

      <button
        class="block w-full text-left font-bold text-slate-800 leading-tight transition-colors break-words hover:text-slate-950"
        :class="compact ? 'text-lg' : 'text-2xl'"
        title="点击复制网络名称"
        @click="copy(network.ssid, 'ssid')"
      >
        {{ network.ssid }}
      </button>

      <div v-if="network.auth !== 'nopass'" class="mt-2 flex items-start gap-2">
        <span class="mt-1.5 shrink-0 text-sm text-slate-400">密码</span>
        <button
          class="group/pw flex w-full min-w-0 items-start justify-between gap-2 rounded-lg bg-slate-100 px-3 py-1.5 text-left font-mono text-slate-700 transition-colors hover:bg-slate-200"
          :class="compact ? 'text-sm' : 'text-base'"
          @click="copy(network.password, 'pw')"
        >
          <span class="min-w-0 whitespace-normal break-all">{{ network.password }}</span>
          <div
            class="mt-0.5 shrink-0 text-base opacity-40 transition-opacity group-hover/pw:opacity-90"
            :class="copied === 'pw' ? 'i-carbon-checkmark text-emerald-500 opacity-100' : 'i-carbon-copy'"
          />
        </button>
      </div>

      <div
        class="mt-1.5 h-3 text-xs font-medium text-emerald-500 transition-opacity"
        :class="copied ? 'opacity-100' : 'opacity-0'"
      >
        已复制到剪贴板
      </div>
    </div>

    <WifiQR class="shrink-0" :network="network" :size="qrSize ?? 160" />
  </div>
</template>
