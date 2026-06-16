---
layout: center
highlighter: shiki
css: unocss
colorSchema: dark
transition: fade-out
title: Hello Deck
mdc: true
glowSeed: 229
---

# Hello Deck

A minimal Slidev starter — glow background, fade transitions, element animations.

<div class="pt-12 text-sm opacity-60">
  Press <kbd>space</kbd> to advance.
</div>

---
layout: default
glowSeed: 412
---

# What you get

- Markdown-driven slides — split with `---`
- Animated glow polygons that drift between slides
- Smooth `fade-out` transitions
- Per-element click reveals + motion entrances
- Shiki-highlighted code blocks

```ts
function greet(name: string) {
  return `hello, ${name}`
}
```

---
layout: default
glowSeed: 33
---

# Click-to-reveal

Press <kbd>space</kbd> to reveal items one by one.

<v-clicks>

- First, an idea shows up...
- then a second thought lands,
- a code snippet quietly slides in,
- and finally, the punchline. 🎯

</v-clicks>

<div v-click class="mt-8 rounded-lg border border-white/10 bg-white/5 p-4 font-mono text-sm">
  Each <code>v-click</code> reuses the fade+blur transition from <code>style.css</code>.
</div>

---
layout: center
class: text-center
glowSeed: 77
---

# Pop-in with v-motion

<div
  v-motion
  :initial="{ y: 80, opacity: 0, scale: 0.6 }"
  :enter="{ y: 0, opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 120, damping: 12, delay: 100 } }"
  class="inline-block rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 px-8 py-6 text-2xl font-semibold shadow-2xl"
>
  Hello! 👋
</div>

<div class="mt-10 grid grid-cols-3 gap-4 max-w-2xl mx-auto">
  <div
    v-for="(label, i) in ['fast', 'simple', 'fun']"
    :key="label"
    v-motion
    :initial="{ y: 40, opacity: 0 }"
    :enter="{ y: 0, opacity: 1, transition: { delay: 400 + i * 150 } }"
    class="rounded-xl border border-white/10 bg-white/5 py-4 text-sm uppercase tracking-widest"
  >
    {{ label }}
  </div>
</div>

---
layout: default
glow: left
glowSeed: 144
---

# Stagger with click + delay

<div class="mt-8 flex gap-3">
  <div
    v-for="n in 6"
    :key="n"
    v-click
    :class="`delay-${n * 100}`"
    class="h-16 w-16 rounded-lg bg-gradient-to-br from-cyan-400/80 to-blue-600/80 shadow-lg"
  />
</div>

<div v-click class="mt-10 text-sm opacity-70">
  The <code>delay-{{ '{' }}n*100{{ '}' }}</code> utilities are safelisted in <code>uno.config.ts</code>,
  so they survive UnoCSS's tree-shake even when only used dynamically.
</div>

---
layout: center
class: text-center
glow: bottom
glowSeed: 17
glowHue: 120
---

# Next steps

Edit `slides.md` to start writing.

See [the Slidev docs](https://sli.dev/) for layouts, components, and themes.
