<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref, watch } from 'vue'

import type { Auth, Network } from '../composables/useWifi'
import { setNetworks, setText, useWifi } from '../composables/useWifi'

const wifi = useWifi()
const open = ref(false)

// Hidden trigger: press "e" (edit) to toggle the settings panel — no visible
// button on the projected board. Guarded so it never fires while typing into a
// field (SSIDs/passwords contain "e"), and ignores modifier combos so browser
// shortcuts still work. Escape always closes.
function isTyping(t: EventTarget | null) {
  const el = t as HTMLElement | null
  if (!el)
    return false
  const tag = el.tagName
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || el.isContentEditable
}

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape' && open.value) {
    open.value = false
    return
  }
  if (e.key === 'e' && !e.metaKey && !e.ctrlKey && !e.altKey && !isTyping(e.target)) {
    e.preventDefault()
    open.value = !open.value
  }
}

onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))

// Local editable copy. Seeded from the URL when the panel opens so edits are
// staged locally, then flushed to the URL on every change (which is what
// actually drives the projected board).
const draft = reactive({
  title: '',
  subtitle: '',
  networks: [] as Network[],
})

function load() {
  draft.title = wifi.value.title
  draft.subtitle = wifi.value.subtitle
  draft.networks = wifi.value.networks.map(n => ({ ...n }))
}

watch(open, (v) => {
  if (v)
    load()
})

function flushText() {
  setText('title', draft.title)
  setText('subtitle', draft.subtitle)
}

function flushNets() {
  setNetworks(draft.networks)
}

function addRow() {
  draft.networks.push({ ssid: '', password: '', auth: 'WPA' as Auth })
}

function removeRow(i: number) {
  draft.networks.splice(i, 1)
  flushNets()
}
</script>

<template>
  <!-- Faint, discoverable hint (not a chunky button): sits quietly bottom-right,
       click OR press E to open. Hidden while the panel is open and in exports. -->
  <button
    v-if="!open"
    class="fixed bottom-3 right-3 z-30 flex items-center gap-1.5 rounded-full bg-white/50 px-3 py-1.5 text-xs text-slate-400 opacity-60 shadow-sm ring-1 ring-slate-900/5 backdrop-blur transition-all print:hidden hover:bg-white/90 hover:text-slate-700 hover:opacity-100"
    title="编辑网络 (E)"
    @click="open = true"
  >
    <div class="i-carbon-edit text-sm" />
    <span>编辑 · 按 E</span>
  </button>

  <Transition name="slide">
    <div
      v-if="open"
      class="fixed bottom-0 left-0 top-0 z-40 w-[380px] max-w-[92vw] overflow-y-auto bg-white/95 p-6 text-slate-700 shadow-2xl ring-1 ring-slate-900/10 backdrop-blur-xl print:hidden"
    >
      <div class="mb-4 flex items-center justify-between">
        <h2 class="text-lg font-bold text-slate-900">网络设置</h2>
        <button
          class="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
          title="关闭 (Esc)"
          @click="open = false"
        >
          <div class="i-carbon-close text-lg" />
        </button>
      </div>

      <label class="mb-1 block text-xs font-semibold text-slate-500">主标题</label>
      <input
        v-model="draft.title"
        class="mb-3 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
        placeholder="连接现场网络"
        @input="flushText"
      >

      <label class="mb-1 block text-xs font-semibold text-slate-500">副标题</label>
      <input
        v-model="draft.subtitle"
        class="mb-5 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
        placeholder="扫码即可接入 · Scan to connect"
        @input="flushText"
      >

      <div class="mb-2 flex items-center justify-between">
        <span class="text-xs font-semibold text-slate-500">网络列表</span>
        <span class="text-xs text-slate-400">{{ draft.networks.length }} 个</span>
      </div>

      <div
        v-for="(net, i) in draft.networks"
        :key="i"
        class="mb-3 rounded-xl border border-slate-200 bg-slate-50/60 p-3"
      >
        <div class="mb-2 flex items-center gap-2">
          <input
            v-model="net.ssid"
            class="min-w-0 flex-1 rounded-md border border-slate-200 bg-white px-2 py-1.5 text-sm outline-none focus:border-blue-400"
            placeholder="WiFi 名称 (SSID)"
            @input="flushNets"
          >
          <button
            class="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-500"
            title="删除"
            @click="removeRow(i)"
          >
            <div class="i-carbon-trash-can text-base" />
          </button>
        </div>
        <div class="flex items-center gap-2">
          <input
            v-model="net.password"
            class="min-w-0 flex-1 rounded-md border border-slate-200 bg-white px-2 py-1.5 font-mono text-sm outline-none focus:border-blue-400 disabled:bg-slate-100 disabled:text-slate-400"
            placeholder="密码"
            :disabled="net.auth === 'nopass'"
            @input="flushNets"
          >
          <select
            v-model="net.auth"
            class="shrink-0 rounded-md border border-slate-200 bg-white px-2 py-1.5 text-sm outline-none focus:border-blue-400"
            @change="flushNets"
          >
            <option value="WPA">WPA</option>
            <option value="WEP">WEP</option>
            <option value="nopass">开放</option>
          </select>
        </div>
      </div>

      <button
        class="mt-1 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-slate-300 py-2.5 text-sm text-slate-500 transition-colors hover:border-blue-400 hover:text-blue-600"
        @click="addRow"
      >
        <div class="i-carbon-add text-base" />
        添加网络
      </button>

      <p class="mt-5 text-xs leading-relaxed text-slate-400">
        设置会写入网址,可直接复制链接分享或投影。<br>
        按 <kbd class="rounded bg-slate-100 px-1 text-slate-500">E</kbd> 开关此面板,<kbd class="rounded bg-slate-100 px-1 text-slate-500">Esc</kbd> 关闭。
      </p>
    </div>
  </Transition>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
