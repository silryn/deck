import type { Ref } from 'vue'
import { computed, ref, watchEffect } from 'vue'

/**
 * Chair controls shared by the two-sided debate slides (对辩 / 自由辩论).
 *
 * `pro`/`con` are template refs to <Timer> instances. 切换 hands the floor to
 * the other side. When neither side is running (round start, or right after
 * 暂停) it gives the floor to the side opposite the last speaker — so the very
 * first press starts 正方, per debate convention. A side with no time left is
 * never started, and a running side is never stopped unless the other side
 * can actually take over.
 */

interface TimerHandle {
  start: () => void
  stop: () => void
  reset: () => void
  isRunning: boolean
  timeLeft: number
}

export function useDebateSwitch(pro: Ref<TimerHandle | null>, con: Ref<TimerHandle | null>) {
  const lastActive = ref<'pro' | 'con'>('con')
  watchEffect(() => {
    if (pro.value?.isRunning) lastActive.value = 'pro'
  })
  watchEffect(() => {
    if (con.value?.isRunning) lastActive.value = 'con'
  })

  function switchSides() {
    const p = pro.value
    const c = con.value
    if (!p || !c) return
    if (p.isRunning) {
      if (c.timeLeft <= 0) return
      p.stop()
      c.start()
    }
    else if (c.isRunning) {
      if (p.timeLeft <= 0) return
      c.stop()
      p.start()
    }
    else {
      const [first, fallback] = lastActive.value === 'pro' ? [c, p] : [p, c]
      if (first.timeLeft > 0) first.start()
      else if (fallback.timeLeft > 0) fallback.start()
    }
  }

  function pauseBoth() {
    pro.value?.stop()
    con.value?.stop()
  }

  const anyRunning = computed(() => !!(pro.value?.isRunning || con.value?.isRunning))

  return { switchSides, pauseBoth, anyRunning }
}
