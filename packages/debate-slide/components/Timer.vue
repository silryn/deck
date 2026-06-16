<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { createSyncState } from '@slidev/client'

const props = defineProps<{
  duration: number
  label: string
  color?: string
  autoStart?: boolean
}>()

const emit = defineEmits<{
  start: []
  stop: []
}>()

// Timer state is wall-clock based, not tick-mutated. We sync:
//   - endsAt: absolute ms timestamp when timer hits 0 (only valid while running)
//   - pausedRemaining: seconds left at the moment we paused
//   - isRunning, hasWarned
// Every window derives the visible countdown from `endsAt - Date.now()`, so
// any number of windows can be open without compounding the tick rate, and
// the presenter/audience distinction goes away entirely.
const initial = {
  isRunning: false,
  endsAt: 0,
  pausedRemaining: props.duration,
  hasWarned: false,
}
const { state: syncState, init: initSync } = createSyncState({ ...initial }, { ...initial })
initSync(`timer-${props.label}`)

const now = ref(Date.now())
let tickId: number | null = null

function stopTick() {
  if (tickId !== null) {
    clearInterval(tickId)
    tickId = null
  }
}

function startTick() {
  if (tickId !== null) return
  now.value = Date.now()
  tickId = window.setInterval(() => {
    now.value = Date.now()
  }, 250)
}

const timeLeft = computed(() => {
  if (syncState.isRunning)
    return Math.max(0, Math.ceil((syncState.endsAt - now.value) / 1000))
  return syncState.pausedRemaining
})

watch(
  () => syncState.isRunning,
  (running) => {
    if (running) startTick()
    else stopTick()
  },
  { immediate: true },
)

// Drive the warning + auto-stop off the derived `timeLeft`, not the interval.
// Both fire on every window, but state mutations are idempotent and the
// `hasWarned` flag in sync state keeps the 30s beep from playing twice.
watch(timeLeft, (v, prev) => {
  if (!syncState.isRunning) return
  if (v <= 30 && v > 0 && !syncState.hasWarned) {
    syncState.hasWarned = true
    playWarningSound()
  }
  if (v === 0 && prev !== 0) {
    syncState.isRunning = false
    syncState.pausedRemaining = 0
    emit('stop')
    playWarningSound()
    setTimeout(() => playWarningSound(), 300)
  }
})

onMounted(() => {
  if (props.autoStart && !syncState.isRunning && syncState.pausedRemaining > 0)
    start()
})

onUnmounted(stopTick)

const minutes = computed(() => Math.floor(timeLeft.value / 60))
const seconds = computed(() => timeLeft.value % 60)
const progress = computed(() => (timeLeft.value / props.duration) * 100)
const isWarning = computed(() => timeLeft.value <= 30 && timeLeft.value > 0)
const isRunning = computed(() => syncState.isRunning)

const colorClass = computed(() => {
  if (isWarning.value) return 'text-yellow-400 border-yellow-400 animate-pulse'
  if (props.color === 'green') return 'text-green-400 border-green-400'
  if (props.color === 'red') return 'text-red-400 border-red-400'
  return 'text-blue-400 border-blue-400'
})

function playWarningSound() {
  const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIGGS57OihUBELTKXh8bllHAU2jdXvzn0pBSh+zPDajzsKElyx6OyrWBUIQ5zd8sFuJAUuhM/z24k2CBhku+zooVARC0yl4fG5ZRwFNo3V7859KQUofsz03I87ChJcsevsq1gVCEOc3fLBbiQFLoTP89uJNggYZLvs6KFQEQtMpeHxuWUcBTaN1e/OfSkFKH7M9NyPOwsSXLHr7KtYFQhDnN3ywW4kBS6Ez/PbiTYIGGS77OihUBELTKXh8bllHAU2jdXvzn0pBSh+zPTcjzsKElyx6+yrWBUIQ5zd8sFuJAUuhM/z24k2CBhku+zooVARC0yl4fG5ZRwFNo3V7859KQUofsz03I87ChJcsevsq1gVCEOc3fLBbiQFLoTP89uJNggYZLvs6KFQEQtMpeHxuWUcBTaN1e/OfSkFKH7M9NyPOwsSXLHr7KtYFQhDnN3ywW4kBS6Ez/PbiTYIGGS77OihUBELTKXh8bllHAU2jdXvzn0pBSh+zPTcjzsKElyx6+yrWBUIQ5zd8sFuJAUuhM/z24k2CBhku+zooVARC0yl4fG5ZRwFNo3V7859KQUofsz03I87ChJcsevsq1gVCEOc3fLBbiQFLoTP89uJNggYZLvs6KFQEQtMpeHxuWUcBTaN1e/OfSkFKH7M9NyPOwsSXLHr7KtYFQhDnN3ywW4kBS6Ez/PbiTYIGGS77OihUBELTKXh8bllHAU2jdXvzn0pBSh+zPTcjzsKElyx6+yrWBUIQ5zd8sFuJAUuhM/z24k2CBhku+zooVARC0yl4fG5ZRwFNo3V7859KQUofsz03I87ChJcsevsq1gVCEOc3fLBbiQFLoTP89uJNggYZLvs6KFQEQtMpeHxuWUcBTaN1e/OfSkFKH7M9NyPOwsSXLHr7KtYFQhDnN3ywW4kBS6Ez/PbiTYIGGS77OihUBELTKXh8bllHAU2jdXvzn0pBSh+zPTcjzsKElyx6+yrWBUIQ5zd8sFuJAUuhM/z24k2CBhku+zooVARC0yl4fG5ZRwFNo3V7859KQUofsz03I87ChJcsevsq1gVCEOc3fLBbiQFLoTP89uJNggYZLvs6KFQEQtMpeHxuWUcBTaN1e/OfSkFKH7M9NyPOwsSXLHr7KtYFQ==')
  audio.play().catch(() => {})
}

function start() {
  if (syncState.isRunning || syncState.pausedRemaining <= 0) return
  syncState.endsAt = Date.now() + syncState.pausedRemaining * 1000
  syncState.isRunning = true
  emit('start')
}

function stop() {
  if (!syncState.isRunning) return
  syncState.pausedRemaining = Math.max(0, Math.ceil((syncState.endsAt - Date.now()) / 1000))
  syncState.isRunning = false
  emit('stop')
}

function reset() {
  syncState.isRunning = false
  syncState.endsAt = 0
  syncState.pausedRemaining = props.duration
  syncState.hasWarned = false
  emit('stop')
}

watch(() => props.duration, (newDuration) => {
  syncState.isRunning = false
  syncState.endsAt = 0
  syncState.pausedRemaining = newDuration
  syncState.hasWarned = false
})

defineExpose({ start, stop, reset, isRunning })
</script>

<template>
  <div class="flex flex-col items-center gap-3 p-6 rounded-2xl border-2 backdrop-blur-sm" :class="colorClass">
    <div class="text-xl font-bold opacity-80">{{ label }}</div>
    <div class="relative w-48 h-48 flex items-center justify-center">
      <svg class="absolute w-full h-full transform -rotate-90">
        <circle
          cx="96"
          cy="96"
          r="88"
          stroke="currentColor"
          stroke-width="6"
          fill="none"
          class="opacity-20"
        />
        <circle
          cx="96"
          cy="96"
          r="88"
          stroke="currentColor"
          stroke-width="6"
          fill="none"
          class="transition-all duration-1000"
          :stroke-dasharray="`${2 * Math.PI * 88}`"
          :stroke-dashoffset="`${2 * Math.PI * 88 * (1 - progress / 100)}`"
        />
      </svg>
      <div class="text-5xl font-bold font-mono">
        {{ minutes.toString().padStart(2, '0') }}:{{ seconds.toString().padStart(2, '0') }}
      </div>
    </div>
    <div class="flex gap-3">
      <button
        @click="start"
        class="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
        :disabled="isRunning"
      >
        <div class="i-carbon-play text-xl"></div>
      </button>
      <button
        @click="stop"
        class="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
        :disabled="!isRunning"
      >
        <div class="i-carbon-pause text-xl"></div>
      </button>
      <button
        @click="reset"
        class="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
      >
        <div class="i-carbon-reset text-xl"></div>
      </button>
    </div>
  </div>
</template>
