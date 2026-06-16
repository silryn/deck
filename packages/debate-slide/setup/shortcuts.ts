import { defineShortcutsSetup } from '@slidev/types'

export default defineShortcutsSetup((_nav, base) => {
  // Drop the goto-dialog binding (the `g` key opens the "Goto..." search overlay).
  return base.filter(s => s.name !== 'goto')
})
