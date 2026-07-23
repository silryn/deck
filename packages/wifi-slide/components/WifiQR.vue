<script setup lang="ts">
import QRCode from 'qrcode'
import { ref, watchEffect } from 'vue'

import type { Network } from '../composables/useWifi'
import { wifiPayload } from '../composables/useWifi'

const props = withDefaults(defineProps<{
  network: Network
  size?: number
}>(), {
  size: 200,
})

const dataUrl = ref('')
const error = ref('')

watchEffect(async () => {
  error.value = ''
  try {
    // Render at 2× the display size for crisp projection, then let CSS scale
    // it down. Pure black-on-white keeps maximum contrast for phone cameras.
    dataUrl.value = await QRCode.toDataURL(wifiPayload(props.network), {
      errorCorrectionLevel: 'M',
      margin: 1,
      width: props.size * 2,
      color: { dark: '#0f172a', light: '#ffffff' },
    })
  }
  catch (e) {
    error.value = String(e)
    dataUrl.value = ''
  }
})
</script>

<template>
  <div
    class="rounded-2xl bg-white p-3 shadow-lg ring-1 ring-slate-900/5"
    :style="{ width: `${size}px`, height: `${size}px` }"
  >
    <img
      v-if="dataUrl"
      :src="dataUrl"
      alt="WiFi QR code"
      class="h-full w-full"
      draggable="false"
    >
    <div v-else class="flex h-full w-full items-center justify-center text-xs text-slate-400">
      {{ error || '…' }}
    </div>
  </div>
</template>
