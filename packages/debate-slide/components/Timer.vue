<script setup lang="ts">
import { ref, computed, watch } from 'vue'
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

const { state: syncState, init: initSync } = createSyncState(
  { timeLeft: props.duration, isRunning: props.autoStart || false, hasWarned: false },
  { timeLeft: props.duration, isRunning: props.autoStart || false, hasWarned: false }
)
initSync(`timer-${props.label}`)

const isPresenter = window.location.hash.startsWith('#/presenter/')

watch(() => syncState.isRunning, (running) => {
  if (running && !intervalId.value && isPresenter) {
    intervalId.value = window.setInterval(() => {
      if (syncState.timeLeft > 0) {
        syncState.timeLeft--
        if (syncState.timeLeft === 30 && !syncState.hasWarned) {
          syncState.hasWarned = true
          playWarningSound()
        }
      } else {
        stop()
        playWarningSound()
        setTimeout(() => playWarningSound(), 300)
      }
    }, 1000)
  } else if (!running && intervalId.value) {
    clearInterval(intervalId.value)
    intervalId.value = null
  }
})

const timeLeft = computed({
  get: () => syncState.timeLeft,
  set: (val) => { syncState.timeLeft = val }
})
const isRunning = computed({
  get: () => syncState.isRunning,
  set: (val) => { syncState.isRunning = val }
})
const hasWarned = computed({
  get: () => syncState.hasWarned,
  set: (val) => { syncState.hasWarned = val }
})
const intervalId = ref<number | null>(null)

const minutes = computed(() => Math.floor(timeLeft.value / 60))
const seconds = computed(() => timeLeft.value % 60)
const progress = computed(() => (timeLeft.value / props.duration) * 100)
const isWarning = computed(() => timeLeft.value <= 30 && timeLeft.value > 0)

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
  if (syncState.isRunning) return
  syncState.isRunning = true
  emit('start')
}

function stop() {
  syncState.isRunning = false
  emit('stop')
}

function reset() {
  stop()
  syncState.timeLeft = props.duration
  syncState.hasWarned = false
}

watch(() => props.duration, (newDuration) => {
  syncState.timeLeft = newDuration
  stop()
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
