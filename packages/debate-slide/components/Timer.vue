<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useTimerState } from '../composables/useTimerState'

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

// Wall-clock, persisted, shared per label across instances and windows —
// see useTimerState for the design notes.
const syncState = useTimerState(props.label, props.duration * 1000)

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
  const remainingMs = syncState.isRunning ? syncState.endsAt - now.value : syncState.pausedRemainingMs
  return Math.max(0, Math.ceil(remainingMs / 1000))
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
watch(timeLeft, (v) => {
  if (!syncState.isRunning) return
  if (v <= 30 && v > 0 && !syncState.hasWarned) {
    syncState.hasWarned = true
    playWarningSound()
  }
  if (v === 0)
    finish()
})

onMounted(() => {
  // A running timer that expired while nothing was watching (page reload,
  // presenter-view remount) can't be finalized by the watcher above — the
  // derived timeLeft never *changes* from 0. Finalize it here, silently.
  if (syncState.isRunning && syncState.endsAt <= Date.now()) {
    syncState.isRunning = false
    syncState.pausedRemainingMs = 0
  }
  if (props.autoStart && !syncState.isRunning && syncState.pausedRemainingMs > 0)
    start()
})

onUnmounted(stopTick)

const minutes = computed(() => Math.floor(timeLeft.value / 60))
const seconds = computed(() => timeLeft.value % 60)
const progress = computed(() => (timeLeft.value / props.duration) * 100)
const isWarning = computed(() => timeLeft.value <= 30 && timeLeft.value > 0)
const isRunning = computed(() => syncState.isRunning)

const colorClass = computed(() => {
  if (isWarning.value) {
    // Yellow marks "in the warning zone"; the pulse means "and counting" —
    // a paused timer holds the color but stops flashing.
    return isRunning.value
      ? 'text-yellow-400 border-yellow-400 animate-pulse'
      : 'text-yellow-400 border-yellow-400'
  }
  if (props.color === 'green') return 'text-green-400 border-green-400'
  if (props.color === 'red') return 'text-red-400 border-red-400'
  return 'text-blue-400 border-blue-400'
})

function playWarningSound() {
  const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIGGS57OihUBELTKXh8bllHAU2jdXvzn0pBSh+zPDajzsKElyx6OyrWBUIQ5zd8sFuJAUuhM/z24k2CBhku+zooVARC0yl4fG5ZRwFNo3V7859KQUofsz03I87ChJcsevsq1gVCEOc3fLBbiQFLoTP89uJNggYZLvs6KFQEQtMpeHxuWUcBTaN1e/OfSkFKH7M9NyPOwsSXLHr7KtYFQhDnN3ywW4kBS6Ez/PbiTYIGGS77OihUBELTKXh8bllHAU2jdXvzn0pBSh+zPTcjzsKElyx6+yrWBUIQ5zd8sFuJAUuhM/z24k2CBhku+zooVARC0yl4fG5ZRwFNo3V7859KQUofsz03I87ChJcsevsq1gVCEOc3fLBbiQFLoTP89uJNggYZLvs6KFQEQtMpeHxuWUcBTaN1e/OfSkFKH7M9NyPOwsSXLHr7KtYFQhDnN3ywW4kBS6Ez/PbiTYIGGS77OihUBELTKXh8bllHAU2jdXvzn0pBSh+zPTcjzsKElyx6+yrWBUIQ5zd8sFuJAUuhM/z24k2CBhku+zooVARC0yl4fG5ZRwFNo3V7859KQUofsz03I87ChJcsevsq1gVCEOc3fLBbiQFLoTP89uJNggYZLvs6KFQEQtMpeHxuWUcBTaN1e/OfSkFKH7M9NyPOwsSXLHr7KtYFQhDnN3ywW4kBS6Ez/PbiTYIGGS77OihUBELTKXh8bllHAU2jdXvzn0pBSh+zPTcjzsKElyx6+yrWBUIQ5zd8sFuJAUuhM/z24k2CBhku+zooVARC0yl4fG5ZRwFNo3V7859KQUofsz03I87ChJcsevsq1gVCEOc3fLBbiQFLoTP89uJNggYZLvs6KFQEQtMpeHxuWUcBTaN1e/OfSkFKH7M9NyPOwsSXLHr7KtYFQhDnN3ywW4kBS6Ez/PbiTYIGGS77OihUBELTKXh8bllHAU2jdXvzn0pBSh+zPTcjzsKElyx6+yrWBUIQ5zd8sFuJAUuhM/z24k2CBhku+zooVARC0yl4fG5ZRwFNo3V7859KQUofsz03I87ChJcsevsq1gVCEOc3fLBbiQFLoTP89uJNggYZLvs6KFQEQtMpeHxuWUcBTaN1e/OfSkFKH7M9NyPOwsSXLHr7KtYFQ==')
  audio.play().catch(() => {})
}

function start() {
  if (syncState.isRunning || syncState.pausedRemainingMs <= 0) return
  syncState.endsAt = Date.now() + syncState.pausedRemainingMs
  syncState.isRunning = true
  syncState.savedAt = Date.now()
  emit('start')
}

function stop() {
  if (!syncState.isRunning) return
  const remainingMs = Math.max(0, syncState.endsAt - Date.now())
  if (remainingMs === 0) {
    // Pausing in the instant after expiry is the end of time, not a pause.
    finish()
    return
  }
  syncState.pausedRemainingMs = remainingMs
  syncState.isRunning = false
  syncState.savedAt = Date.now()
  emit('stop')
}

function finish() {
  syncState.isRunning = false
  syncState.pausedRemainingMs = 0
  syncState.savedAt = Date.now()
  emit('stop')
  playWarningSound()
  setTimeout(() => playWarningSound(), 300)
}

function reset() {
  syncState.isRunning = false
  syncState.endsAt = 0
  syncState.pausedRemainingMs = props.duration * 1000
  syncState.hasWarned = false
  syncState.savedAt = Date.now()
  emit('stop')
}

watch(() => props.duration, (newDuration) => {
  syncState.isRunning = false
  syncState.endsAt = 0
  syncState.pausedRemainingMs = newDuration * 1000
  syncState.hasWarned = false
  syncState.savedAt = Date.now()
})

defineExpose({ start, stop, reset, isRunning, timeLeft })
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
          :class="isRunning ? 'transition-all duration-1000' : ''"
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
        class="p-2 rounded-lg bg-white/10 enabled:hover:bg-white/20 disabled:opacity-40 disabled:cursor-not-allowed transition"
        :disabled="isRunning || timeLeft === 0"
      >
        <div class="i-carbon-play text-xl"></div>
      </button>
      <button
        @click="stop"
        class="p-2 rounded-lg bg-white/10 enabled:hover:bg-white/20 disabled:opacity-40 disabled:cursor-not-allowed transition"
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
