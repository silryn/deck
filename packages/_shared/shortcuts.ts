import { defineShortcutsSetup } from '@slidev/types'

// Drop the goto-dialog binding (the `g` key opens the "Goto..." search overlay).
export default defineShortcutsSetup((_nav, base) => {
  return base.filter(s => s.name !== 'goto')
})
