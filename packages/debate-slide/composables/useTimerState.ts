import { createSyncState } from '@slidev/client'

/**
 * Shared, persisted sync state for one named countdown timer.
 *
 * Timer state is wall-clock based, not tick-mutated:
 *   - endsAt: absolute ms timestamp when the timer hits 0 (only valid while running)
 *   - pausedRemainingMs: ms left at the moment of pause — kept un-rounded so a
 *     pause/resume round trip never refunds (or eats) part of a second
 *   - isRunning, hasWarned, savedAt
 * Every window derives the visible countdown from `endsAt - Date.now()`, so
 * any number of windows can be open without compounding the tick rate.
 *
 * Two deliberate choices here, both load-bearing:
 *
 * 1. Module scope. Slidev's createSyncState has no dispose; calling it in
 *    component setup would stack a fresh channel listener on every remount
 *    (the presenter view remounts slides on navigation) and, worse, restart
 *    the state from defaults. One entry per label, created on first use,
 *    handed back to every Timer instance that mounts with that label.
 *
 * 2. persist=true. In the static production build there is no server and the
 *    default BroadcastChannel sync never replays state to new listeners — a
 *    reload mid-round would come back at full duration, and a late-opened
 *    window would show (and happily broadcast) stale defaults. localStorage
 *    persistence replays synchronously on init and syncs across windows via
 *    storage events. In dev (`slidev --remote`) neither mechanism is active;
 *    cross-window sync only works in the built output.
 */
export interface TimerSyncState {
  isRunning: boolean
  endsAt: number
  pausedRemainingMs: number
  hasWarned: boolean
  /** wall-clock ms of the last control action; lets us expire leftovers below */
  savedAt: number
}

// localStorage outlives the event: without this, opening the deck next week
// would restore last week's half-elapsed timers. A debate runs a couple of
// hours; anything older than this is leftovers and starts fresh.
const STALE_MS = 6 * 60 * 60 * 1000

const states = new Map<string, TimerSyncState>()

export function useTimerState(label: string, durationMs: number): TimerSyncState {
  let state = states.get(label)
  if (!state) {
    const initial: TimerSyncState = {
      isRunning: false,
      endsAt: 0,
      pausedRemainingMs: durationMs,
      hasWarned: false,
      savedAt: 0,
    }
    const sync = createSyncState<TimerSyncState>({ ...initial }, { ...initial }, true)
    sync.init(`timer-${label}`)
    state = sync.state
    if (state.savedAt && Date.now() - state.savedAt > STALE_MS)
      Object.assign(state, initial)
    states.set(label, state)
  }
  return state
}
