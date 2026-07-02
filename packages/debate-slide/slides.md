---
layout: center
highlighter: shiki
css: unocss
colorSchema: dark
transition: fade-out
title: 辩论赛决赛
exportFilename: 辩论赛决赛
lineNumbers: false
drawings:
  persist: false
mdc: true
clicks: 0
glowSeed: 233
routerMode: hash
---

<script setup>
import { useParams } from './composables/useParams'
const p = useParams()
</script>

<div class="translate-x--14 translate-y-10">

# {{ p.title }}

{{ p.subtitle }}

</div>

---
layout: center
---

# 🎯 比赛开始

<div class="mt-8">

<div v-click="1" class="mt-4 text-lg opacity-80">

- 主席开场致辞
- 介绍计时员
- 介绍评委
- 介绍到场嘉宾与学生代表

</div>

</div>

---
layout: center
---

<script setup>
import { useParams } from './composables/useParams'
const p = useParams()
</script>

# 📋 辩题与队伍介绍

<div class="mt-8">

<div v-click="1" class="mt-6 text-xl font-bold text-center p-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg">
{{ p.motion }}
</div>

</div>

<div v-click="2" class="mt-8 grid grid-cols-2 gap-8">

<div class="text-center p-4 bg-green-500/10 rounded-lg">

### 正方

{{ p.proTeam }}

</div>

<div class="text-center p-4 bg-red-500/10 rounded-lg">

### 反方

{{ p.conTeam }}

</div>

</div>

---
layout: center
---

# 🎤 环节一：开篇陈词

<div class="flex items-center justify-center gap-8">
  <Timer :duration="180" label="正方一辩" color="green" />
  <Timer :duration="180" label="反方一辩" color="red" />
</div>

---
layout: center
---

<script setup>
import { ref } from 'vue'
import { useDebateSwitch } from './composables/useDebateSwitch'

const proTimer = ref(null)
const conTimer = ref(null)
const { switchSides, pauseBoth, anyRunning } = useDebateSwitch(proTimer, conTimer)
</script>

# 💬 环节二：对辩

<div class="flex items-center justify-center gap-8">
  <Timer ref="proTimer" :duration="90" label="正方二辩" color="green" />
  <Timer ref="conTimer" :duration="90" label="反方二辩" color="red" />
</div>

<div class="mt-6 flex items-center justify-center gap-3">
  <button 
    @click="switchSides"
    class="px-6 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition flex items-center gap-2"
  >
    <div class="i-carbon-arrows-horizontal text-xl"></div>
    <span>切换</span>
  </button>
  <button 
    @click="pauseBoth"
    :disabled="!anyRunning"
    class="px-6 py-2 rounded-lg bg-white/10 enabled:hover:bg-white/20 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center gap-2"
  >
    <div class="i-carbon-pause text-xl"></div>
    <span>暂停</span>
  </button>
</div>

---
layout: center
---

# 📝 环节三：三辩小结

<div class="flex items-center justify-center gap-8">
  <Timer :duration="90" label="正方三辩" color="green" />
  <Timer :duration="90" label="反方三辩" color="red" />
</div>

---
layout: center
---

<script setup>
import { ref } from 'vue'
import { useDebateSwitch } from './composables/useDebateSwitch'

const proDebateTimer = ref(null)
const conDebateTimer = ref(null)
const { switchSides, pauseBoth, anyRunning } = useDebateSwitch(proDebateTimer, conDebateTimer)
</script>

# ⚡ 环节四：自由辩论

<div class="flex items-center justify-center gap-8">
  <Timer ref="proDebateTimer" :duration="240" label="正方" color="green" />
  <Timer ref="conDebateTimer" :duration="240" label="反方" color="red" />
</div>

<div class="mt-6 flex items-center justify-center gap-3">
  <button 
    @click="switchSides"
    class="px-6 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition flex items-center gap-2"
  >
    <div class="i-carbon-arrows-horizontal text-xl"></div>
    <span>切换</span>
  </button>
  <button 
    @click="pauseBoth"
    :disabled="!anyRunning"
    class="px-6 py-2 rounded-lg bg-white/10 enabled:hover:bg-white/20 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center gap-2"
  >
    <div class="i-carbon-pause text-xl"></div>
    <span>暂停</span>
  </button>
</div>

---
layout: center
---

# 🎯 环节五：总结陈词

<div class="flex items-center justify-center gap-8">
  <Timer :duration="210" label="正方四辩" color="green" />
  <Timer :duration="210" label="反方四辩" color="red" />
</div>

---
layout: center
---

# 🏆 评审与投票

<div class="mt-8 space-y-6">

<div v-click="1" class="p-4 bg-blue-500/10 rounded-lg">
<div class="flex items-center gap-3">
<div class="i-carbon-checkmark-outline text-2xl"></div>
<div>宣布比赛结束</div>
</div>
</div>

<div v-click="2" class="p-4 bg-blue-500/10 rounded-lg">
<div class="flex items-center gap-3">
<div class="i-carbon-user-multiple text-2xl"></div>
<div>评委商议结果</div>
</div>
</div>

<div v-click="3" class="p-4 bg-blue-500/10 rounded-lg">
<div class="flex items-center gap-3">
<div class="i-carbon-thumbs-up text-2xl"></div>
<div>同学投票最佳人气辩手</div>
</div>
</div>

<div v-click="4" class="p-4 bg-blue-500/10 rounded-lg">
<div class="flex items-center gap-3">
<div class="i-carbon-chat text-2xl"></div>
<div>特邀评委与家长代表点评</div>
</div>
</div>

</div>

---
layout: center
---

# 🎊 公布结果与颁奖

<div class="mt-12 space-y-8">

<div v-click="1" class="text-center p-8 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg">
<div class="text-3xl font-bold mb-2">📢 书记公布比赛结果</div>
</div>

<div v-click="2" class="text-center p-8 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg">
<div class="text-3xl font-bold mb-2">🏅 校长颁奖</div>
</div>

</div>

---
layout: center
---

# 🌟 闭幕词

<div v-click="1" class="mt-12 space-y-6 text-lg">

<div class="p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg">
<div class="flex items-center gap-3 mb-3">
<div class="i-fluent-emoji-sparkles text-2xl"></div>
<div class="font-bold">强调辩论意义</div>
</div>
<div class="text-sm opacity-80 ml-9">
通过辩论培养批判性思维与表达能力
</div>
</div>

<div v-click="2" class="p-6 bg-gradient-to-r from-green-500/10 to-teal-500/10 rounded-lg">
<div class="flex items-center gap-3 mb-3">
<div class="i-fluent-emoji-rocket text-2xl"></div>
<div class="font-bold">展望未来</div>
</div>
<div class="text-sm opacity-80 ml-9">
期待更多精彩的思想碰撞
</div>
</div>

<div v-click="3" class="text-center mt-12">
<div class="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-red-400 bg-clip-text text-transparent">
明年再见!
</div>
<div class="text-xl mt-4 opacity-70">
See you next year!
</div>
</div>

</div>

---
layout: end
---

# 感谢观看

Thank you for watching
