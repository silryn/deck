---
theme: default
layout: center
highlighter: shiki
css: unocss
colorSchema: light
transition: fade-out
title: 网络连接
exportFilename: 网络连接
lineNumbers: false
drawings:
  persist: false
mdc: true
routerMode: hash
---

<script setup>
import { useWifi } from './composables/useWifi'
const wifi = useWifi()
</script>

<div class="flex flex-col items-center text-center">

<div
  v-motion
  :initial="{ scale: 0, opacity: 0 }"
  :enter="{ scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 140, damping: 12 } }"
  class="mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-sky-400 to-blue-600 shadow-xl shadow-blue-500/30"
>
  <div class="i-carbon-wifi text-5xl text-white" />
</div>

<h1
  v-motion
  :initial="{ y: 40, opacity: 0 }"
  :enter="{ y: 0, opacity: 1, transition: { delay: 150 } }"
  class="!mb-3 !text-6xl !font-bold !text-slate-800"
>
  {{ wifi.title }}
</h1>

<p
  v-motion
  :initial="{ y: 30, opacity: 0 }"
  :enter="{ y: 0, opacity: 1, transition: { delay: 300 } }"
  class="!text-2xl !text-slate-500"
>
  {{ wifi.subtitle }}
</p>

<div
  v-motion
  :initial="{ opacity: 0 }"
  :enter="{ opacity: 1, transition: { delay: 600 } }"
  class="mt-14 flex items-center gap-2 text-sm text-slate-400"
>
  <div class="i-carbon-arrow-right animate-pulse" />
  <span>按 <kbd class="rounded bg-slate-200/70 px-1.5 py-0.5 text-slate-600">空格</kbd> 查看网络与二维码</span>
</div>

</div>

---
layout: center
class: w-full
---

<script setup>
import { computed } from 'vue'
import { useWifi } from './composables/useWifi'
import NetworkCard from './components/NetworkCard.vue'

const wifi = useWifi()
const nets = computed(() => wifi.value.networks)
const count = computed(() => nets.value.length)

// Board must always fit a single 16:9 frame (1080p projector) — never scroll.
// So columns and QR size scale down with the count instead of stacking tall:
//   1 → one big centered card
//   2–4 → two columns
//   5+ → three columns, compact cards
const cols = computed(() => count.value <= 1 ? 1 : count.value <= 4 ? 2 : 3)
const compact = computed(() => count.value > 4)
const qrSize = computed(() => {
  const n = count.value
  if (n <= 2) return 132
  if (n <= 4) return 118
  if (n <= 6) return 104
  if (n <= 9) return 96
  return 88
})
const gridStyle = computed(() => ({
  gridTemplateColumns: `repeat(${cols.value}, minmax(0, 1fr))`,
  maxWidth: cols.value === 1 ? '40rem' : undefined,
}))
</script>

<div class="mx-auto w-[880px] max-w-full">

  <div class="mb-6 text-center">
    <h1 class="!mb-1 !text-3xl !font-bold !text-slate-800">{{ wifi.title }}</h1>
    <p class="!text-base !text-slate-500">{{ wifi.subtitle }}</p>
  </div>

  <div class="mx-auto grid" :class="compact ? 'gap-3' : 'gap-4'" :style="gridStyle">
    <NetworkCard
      v-for="(net, i) in nets"
      :key="i"
      v-motion
      :initial="{ y: 40, opacity: 0, scale: 0.96 }"
      :enter="{ y: 0, opacity: 1, scale: 1, transition: { delay: 120 + i * 90, type: 'spring', stiffness: 120, damping: 14 } }"
      :network="net"
      :index="i"
      :qr-size="qrSize"
      :compact="compact"
    />
  </div>

  <div v-if="nets.length === 0" class="mt-12 text-center text-slate-400">
    还没有网络 —— 点击左下角
    <div class="i-carbon-settings mx-1 inline-block" />
    添加
  </div>

</div>

---
layout: center
class: text-center
---

<script setup>
import { useWifi } from './composables/useWifi'
const wifi = useWifi()
</script>

<div
  v-motion
  :initial="{ scale: 0.8, opacity: 0 }"
  :enter="{ scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 120, damping: 14 } }"
  class="flex flex-col items-center"
>

<div class="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 shadow-xl shadow-emerald-500/30">
  <div class="i-carbon-checkmark text-4xl text-white" />
</div>

<h1 class="!text-5xl !font-bold !text-slate-800">已连接,尽情享用!</h1>
<p class="mt-3 text-xl text-slate-500">Enjoy the connection · 有需要随时扫码</p>

</div>
