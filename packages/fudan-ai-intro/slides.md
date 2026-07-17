---
layout: center
highlighter: shiki
css: unocss
colorSchema: dark
transition: fade-out
title: 2026复旦大学计算机工作站 · AI引导课程
glowSeed: 101
controls: false
---

<div class="text-center" font-cn>
  <div v-motion :initial="{ y: -20, opacity: 0 }" :enter="{ y: 0, opacity: 1, transition: { delay: 100 } }" class="text-xs tracking-[0.3em] uppercase opacity-40 mb-6">
    2026 · 复旦大学计算机工作站
  </div>
  <div v-motion :initial="{ y: 30, opacity: 0 }" :enter="{ y: 0, opacity: 1, transition: { type: 'spring', stiffness: 90, damping: 14, delay: 250 } }" class="text-5xl font-bold mb-4 bg-gradient-to-r from-violet-300 via-purple-200 to-cyan-300 bg-clip-text text-transparent">
    AI 引导课程
  </div>

</div>

---
layout: center
glowSeed: 217
---

<div font-cn class="max-w-2xl mx-auto w-full">
  <div v-motion :initial="{ x: -20, opacity: 0 }" :enter="{ x: 0, opacity: 1, transition: { type: 'spring', stiffness: 100, damping: 14 } }" class="text-xs tracking-[0.25em] uppercase opacity-40 mb-3">
    时代在变
  </div>
  <h1 v-motion :initial="{ y: 20, opacity: 0 }" :enter="{ y: 0, opacity: 1, transition: { type: 'spring', stiffness: 90, damping: 14, delay: 150 } }" class="text-4xl font-bold mb-8 leading-snug">
    在新时代，<br>
    <span class="bg-gradient-to-r from-violet-300 to-cyan-300 bg-clip-text text-transparent">发生了什么变化？</span>
  </h1>
  <div v-click class="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 mb-4">
    <span class="text-2xl shrink-0">🌊</span>
    <div>
      <div class="font-semibold text-lg text-violet-200">AI 的兴起，翻天覆地</div>
      <div class="text-sm opacity-60 mt-1">ChatGPT、Claude、Gemini……大模型在两年内重塑了整个行业</div>
    </div>
  </div>
  <div v-click class="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 px-6 py-4">
    <span class="text-2xl shrink-0">🤔</span>
    <div>
      <div class="font-semibold text-lg text-cyan-200">大家都在用 AI 做什么？</div>
      <div class="text-sm opacity-60 mt-1">写报告、查资料、做图、聊天……你呢？</div>
    </div>
  </div>
</div>

---
layout: center
glowSeed: 333
---

<div font-cn class="grid grid-cols-2 gap-8 max-w-3xl mx-auto w-full">
  <div class="flex flex-col justify-center">
    <div v-motion :initial="{ x: -20, opacity: 0 }" :enter="{ x: 0, opacity: 1, transition: { type: 'spring', stiffness: 90, damping: 14 } }" class="text-xs tracking-[0.25em] uppercase opacity-40 mb-3">
      AI 的帮助
    </div>
    <h2 v-motion :initial="{ y: 20, opacity: 0 }" :enter="{ y: 0, opacity: 1, transition: { type: 'spring', stiffness: 90, damping: 14, delay: 120 } }" class="text-3xl font-bold mb-6 leading-snug">
      AI 给了我们<br>
      <span class="bg-gradient-to-r from-violet-300 to-pink-300 bg-clip-text text-transparent">很多帮助</span>
    </h2>
    <div v-click class="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
      <div class="text-base font-semibold text-violet-200 mb-1">💡 但你有没有想过……</div>
      <div class="text-sm opacity-80 leading-relaxed">
        我们可以用 AI 来<span class="text-cyan-300 font-bold">编程</span>？<br>
        不只是查文档——而是让 AI <span class="text-violet-300 font-semibold">直接写代码</span>。
      </div>
    </div>
  </div>

  <div v-motion :initial="{ y: 20, opacity: 0, scale: 0.96 }" :enter="{ y: 0, opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 80, damping: 14, delay: 300 } }" class="rounded-2xl border border-white/10 bg-white/5 overflow-hidden shadow-2xl self-center">
    <div class="flex items-center gap-1.5 px-3 py-2 bg-white/5 border-b border-white/10">
      <div class="w-2 h-2 rounded-full bg-red-400/70"></div>
      <div class="w-2 h-2 rounded-full bg-yellow-400/70"></div>
      <div class="w-2 h-2 rounded-full bg-green-400/70"></div>
      <div class="ml-2 flex-1 rounded bg-white/10 h-4 text-[9px] flex items-center px-2 opacity-50">taobao.com</div>
    </div>
    <div class="p-4 space-y-3">
      <div class="flex items-center gap-2">
        <div class="w-6 h-6 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-xs font-bold shrink-0">淘</div>
        <span class="text-xs font-semibold opacity-80">淘宝 AI 助手</span>
        <span class="ml-auto text-[9px] px-1.5 py-0.5 rounded-full bg-violet-500/30 text-violet-300">AI</span>
      </div>
      <div class="rounded-xl bg-white/5 px-3 py-2 text-xs opacity-70 text-right">有什么优惠券推荐吗？</div>
      <div class="rounded-xl border border-violet-400/20 bg-violet-500/10 px-3 py-2 text-xs">
        <div class="font-semibold text-violet-200 mb-1">为您找到以下专属优惠 🎉</div>
        <div class="flex justify-between items-center bg-white/5 rounded px-2 py-1 mb-1">
          <span class="opacity-70">闪购满200减30</span>
          <span class="text-orange-300 font-bold">¥30</span>
        </div>
        <div class="flex justify-between items-center bg-white/5 rounded px-2 py-1">
          <span class="opacity-70">AI推荐专享券</span>
          <span class="text-pink-300 font-bold">9折</span>
        </div>
      </div>
    </div>
  </div>
</div>

---
layout: center
glowSeed: 448
glowHue: 270
---

<div font-cn class="max-w-2xl mx-auto w-full">
  <div class="text-center mb-5">
    <div v-motion :initial="{ scale: 0.8, opacity: 0 }" :enter="{ scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 80, damping: 12, delay: 100 } }" class="inline-block mb-3 px-3 py-1 rounded-full border border-violet-400/30 bg-violet-500/10 text-violet-300 text-xs tracking-widest uppercase">
      一个新概念
    </div>
    <h1 v-motion :initial="{ y: 20, opacity: 0 }" :enter="{ y: 0, opacity: 1, transition: { type: 'spring', stiffness: 90, damping: 14, delay: 200 } }" class="text-5xl font-bold mb-2 pb-2 bg-gradient-to-r from-violet-300 via-fuchsia-200 to-cyan-300 bg-clip-text text-transparent">
      Vibe Coding
    </h1>
    <div v-motion :initial="{ y: 10, opacity: 0 }" :enter="{ y: 0, opacity: 1, transition: { delay: 380 } }" class="text-sm opacity-50">
      早在 <span class="text-violet-300">2025年2月</span>，AI研究员 <span class="text-cyan-300">Andrej Karpathy</span> 首次提出这一概念
    </div>
  </div>

  <div v-click class="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 mb-4">
    <div class="text-violet-300 font-semibold text-sm mb-1">💬 原话是这样的</div>
    <div class="text-xs opacity-70 italic leading-relaxed">"There's a new kind of coding I call 'vibe coding', where you fully give in to the vibes, embrace exponentials, and forget that the code even exists."</div>
    <div class="text-xs opacity-40 mt-1">— Andrej Karpathy, Feb 2025</div>
  </div>

  <div class="grid grid-cols-3 gap-3">
    <div v-click class="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center">
      <div class="text-xl mb-1">🎯</div>
      <div class="text-xs font-semibold text-violet-200">描述需求</div>
      <div class="text-[10px] opacity-50 mt-0.5">用自然语言说你想要什么</div>
    </div>
    <div v-click class="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center">
      <div class="text-xl mb-1">🤖</div>
      <div class="text-xs font-semibold text-cyan-200">AI生成代码</div>
      <div class="text-[10px] opacity-50 mt-0.5">让模型直接写实现</div>
    </div>
    <div v-click class="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center">
      <div class="text-xl mb-1">✨</div>
      <div class="text-xs font-semibold text-fuchsia-200">迭代优化</div>
      <div class="text-[10px] opacity-50 mt-0.5">不断对话直到满意</div>
    </div>
  </div>
</div>

---
layout: center
glowSeed: 512
glow: left
---

<div font-cn class="max-w-3xl mx-auto w-full">
  <div v-motion :initial="{ x: -20, opacity: 0 }" :enter="{ x: 0, opacity: 1, transition: { type: 'spring', stiffness: 90, damping: 14 } }" class="text-xs tracking-[0.25em] uppercase opacity-40 mb-2">主流工具</div>
  <h2 v-motion :initial="{ y: 20, opacity: 0 }" :enter="{ y: 0, opacity: 1, transition: { type: 'spring', stiffness: 90, damping: 14, delay: 120 } }" class="text-3xl font-bold mb-5">你可以用哪些工具？</h2>

  <div class="grid grid-cols-3 gap-4 mb-4">
    <div v-click class="delay-100 rounded-2xl border border-violet-400/25 px-5 py-5" style="background: linear-gradient(to bottom, #7c3aed22, #6d28d922)">
      <div class="flex items-center justify-between mb-3">
        <div class="i-simple-icons-anthropic text-xl opacity-70"></div>
        <span class="text-[10px] px-2 py-0.5 rounded-full bg-white/10 opacity-70">国际</span>
      </div>
      <div class="font-bold text-base mb-0.5">Claude Code</div>
      <div class="text-[11px] opacity-40 mb-2">Anthropic</div>
      <div class="text-xs opacity-65 leading-relaxed">终端原生，上下文极深，擅长大型代码库重构</div>
    </div>
    <div v-click class="delay-200 rounded-2xl border border-cyan-400/25 px-5 py-5" style="background: linear-gradient(to bottom, #0891b222, #1d4ed822)">
      <div class="flex items-center justify-between mb-3">
        <div class="i-carbon-terminal text-xl opacity-70"></div>
        <span class="text-[10px] px-2 py-0.5 rounded-full bg-white/10 opacity-70">开源</span>
      </div>
      <div class="font-bold text-base mb-0.5">OpenCode</div>
      <div class="text-[11px] opacity-40 mb-2">SST / 社区</div>
      <div class="text-xs opacity-65 leading-relaxed">开源 TUI，支持多模型，完全本地可控</div>
    </div>
    <div v-click class="delay-300 rounded-2xl border border-orange-400/25 px-5 py-5" style="background: linear-gradient(to bottom, #ea580c22, #d9770622)">
      <div class="flex items-center justify-between mb-3">
        <div class="i-carbon-cloud text-xl opacity-70"></div>
        <span class="text-[10px] px-2 py-0.5 rounded-full bg-white/10 opacity-70">国产</span>
      </div>
      <div class="font-bold text-base mb-0.5">Qwen Code</div>
      <div class="text-[11px] opacity-40 mb-2">阿里云</div>
      <div class="text-xs opacity-65 leading-relaxed">基于通义千问，中文理解强，国内访问无障碍</div>
    </div>
  </div>

  <div v-click class="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs opacity-60 text-center">
    此外还有 <span class="text-violet-300">Cursor</span>、<span class="text-cyan-300">Windsurf</span>、<span class="text-fuchsia-300">GitHub Copilot</span> 等 IDE 集成工具
  </div>
</div>

---
layout: center
glowSeed: 601
glowHue: 290
---

<div font-cn class="max-w-2xl mx-auto w-full text-center">
  <div v-motion :initial="{ scale: 0.8, opacity: 0 }" :enter="{ scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 80, damping: 12, delay: 100 } }" class="text-4xl font-bold mb-2 bg-gradient-to-r from-violet-300 to-cyan-300 bg-clip-text text-transparent">
    AI 代替不了什么？
  </div>
  <div v-motion :initial="{ y: 10, opacity: 0 }" :enter="{ y: 0, opacity: 1, transition: { delay: 300 } }" class="text-sm opacity-50 mb-6">
    工具越强，<span class="text-violet-300">思维</span>越值钱
  </div>

  <div class="grid grid-cols-2 gap-4 text-left mb-5">
    <div v-click class="delay-0 rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
      <div class="text-xl mb-1">🧠</div>
      <div class="font-semibold text-sm text-violet-200 mb-1">系统性思维</div>
      <div class="text-xs opacity-60 leading-relaxed">拆解复杂问题、定义边界、做架构决策——AI 生成的是代码，不是判断力</div>
    </div>
    <div v-click class="delay-100 rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
      <div class="text-xl mb-1">🎯</div>
      <div class="font-semibold text-sm text-violet-200 mb-1">需求理解</div>
      <div class="text-xs opacity-60 leading-relaxed">真正听懂用户需要什么，把模糊的想法变成清晰的规格</div>
    </div>
    <div v-click class="delay-200 rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
      <div class="text-xl mb-1">🔍</div>
      <div class="font-semibold text-sm text-violet-200 mb-1">批判性审查</div>
      <div class="text-xs opacity-60 leading-relaxed">AI 会自信地犯错。读懂代码、识别漏洞，是你不可或缺的能力</div>
    </div>
    <div v-click class="delay-300 rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
      <div class="text-xl mb-1">🤝</div>
      <div class="font-semibold text-sm text-violet-200 mb-1">协作与沟通</div>
      <div class="text-xs opacity-60 leading-relaxed">与团队对齐方向、传递技术判断——这是人与人之间的事</div>
    </div>
  </div>

  <div v-click class="text-sm opacity-70">
    学编程，<span class="text-cyan-300 font-semibold">不只是学写代码</span>——是学会<span class="text-violet-300 font-semibold">用技术解决问题</span>。
  </div>
</div>

---
layout: center
glowSeed: 715
glowHue: 180
---

<div font-cn class="max-w-2xl mx-auto w-full">
  <div v-motion :initial="{ x: -20, opacity: 0 }" :enter="{ x: 0, opacity: 1, transition: { type: 'spring', stiffness: 90, damping: 14 } }" class="text-xs tracking-[0.25em] uppercase opacity-40 mb-2">准备环境</div>
  <h2 v-motion :initial="{ y: 20, opacity: 0 }" :enter="{ y: 0, opacity: 1, transition: { type: 'spring', stiffness: 90, damping: 14, delay: 120 } }" class="text-3xl font-bold mb-5">安装 Python 环境</h2>
</div>

<div font-cn class="text-xs opacity-50 mb-1.5 font-semibold tracking-wider uppercase max-w-2xl mx-auto">① 安装 uv（Python 包管理器）</div>

```bash {v-click}
# macOS / Linux
curl -LsSf https://astral.sh/uv/install.sh | sh
# Windows (PowerShell)
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

<div font-cn class="text-xs opacity-50 mt-4 mb-1.5 font-semibold tracking-wider uppercase max-w-2xl mx-auto">② 初始化项目并运行</div>

```bash {v-click}
uv init my-project   # 新建项目
cd my-project
uv run main.py       # 直接运行，自动管理依赖
```

<div font-cn v-click class="rounded-xl border border-cyan-400/20 bg-cyan-500/5 px-4 py-3 text-xs opacity-70 leading-relaxed max-w-2xl mx-auto mt-4">
  💡 uv 比 pip 快 10-100 倍，不需要手动 <code class="text-cyan-300">python -m venv</code>，是目前最推荐的 Python 工作流。
</div>

---
layout: center
glowSeed: 720
glowHue: 200
---

<div font-cn class="max-w-2xl mx-auto w-full">
  <div v-motion :initial="{ x: -20, opacity: 0 }" :enter="{ x: 0, opacity: 1, transition: { type: 'spring', stiffness: 90, damping: 14 } }" class="text-xs tracking-[0.25em] uppercase opacity-40 mb-2">从零开始</div>
  <h2 v-motion :initial="{ y: 20, opacity: 0 }" :enter="{ y: 0, opacity: 1, transition: { type: 'spring', stiffness: 90, damping: 14, delay: 120 } }" class="text-3xl font-bold mb-5">第一步：Hello, World</h2>

  <div v-click class="rounded-2xl border border-white/10 bg-white/5 overflow-hidden mb-4">
    <div class="flex items-center gap-2 px-4 py-2 bg-white/5 border-b border-white/10 text-xs opacity-50">
      <div class="i-carbon-terminal text-sm"></div>
      hello.py
    </div>
    <pre class="px-5 py-4 text-sm leading-relaxed overflow-auto"><code><span class="text-fuchsia-300">print</span><span class="text-white/70">(</span><span class="text-green-300">"Hello, World!"</span><span class="text-white/70">)</span></code></pre>
  </div>

  <div v-click class="rounded-2xl border border-cyan-400/20 bg-cyan-500/5 px-5 py-4 mb-4">
    <div class="text-cyan-300 text-xs font-semibold mb-2">💬 试着这样跟 AI 说</div>
    <div class="text-xs opacity-70 italic leading-relaxed">"帮我写一个 Python 程序，在终端输出 Hello, World!"</div>
  </div>

  <div class="grid grid-cols-3 gap-3">
    <div v-click class="rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-center">
      <div class="text-base mb-1">📝</div>
      <div class="text-xs font-semibold opacity-80">描述需求</div>
    </div>
    <div v-click class="rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-center">
      <div class="text-base mb-1">▶️</div>
      <div class="text-xs font-semibold opacity-80">运行代码</div>
    </div>
    <div v-click class="rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-center">
      <div class="text-base mb-1">🔁</div>
      <div class="text-xs font-semibold opacity-80">继续迭代</div>
    </div>
  </div>
</div>

---
layout: center
glowSeed: 810
glowHue: 260
---

<div font-cn class="max-w-2xl mx-auto w-full">
  <div v-motion :initial="{ x: -20, opacity: 0 }" :enter="{ x: 0, opacity: 1, transition: { type: 'spring', stiffness: 90, damping: 14 } }" class="text-xs tracking-[0.25em] uppercase opacity-40 mb-2">进阶一步</div>
  <h2 v-motion :initial="{ y: 20, opacity: 0 }" :enter="{ y: 0, opacity: 1, transition: { type: 'spring', stiffness: 90, damping: 14, delay: 120 } }" class="text-3xl font-bold mb-4">稍微复杂一点：猜数字</h2>
</div>

```python
import random
secret = random.randint(1, 100)
while True:
    guess = int(input("猜一个 1-100 的数："))
    if guess < secret:    # 太小了
        print("小了！")
    elif guess > secret:  # 太大了
        print("大了！")
    else:
        print("猜对了！")
        break
```

<div font-cn v-click class="rounded-xl border border-violet-400/20 bg-violet-500/5 px-4 py-3 text-xs opacity-70 leading-relaxed max-w-2xl mx-auto mt-4">
  💡 这里出现了 <span class="text-violet-300 font-semibold">循环</span>、<span class="text-cyan-300 font-semibold">条件判断</span>、<span class="text-fuchsia-300 font-semibold">随机数</span>、<span class="text-orange-300 font-semibold">输入输出</span>——都是编程最核心的概念。
</div>

---
layout: center
glowSeed: 900
glowHue: 140
---

<div font-cn class="max-w-3xl mx-auto w-full">
  <div v-motion :initial="{ x: -20, opacity: 0 }" :enter="{ x: 0, opacity: 1, transition: { type: 'spring', stiffness: 90, damping: 14 } }" class="text-xs tracking-[0.25em] uppercase opacity-40 mb-2">综合项目</div>
  <h2 v-motion :initial="{ y: 20, opacity: 0 }" :enter="{ y: 0, opacity: 1, transition: { type: 'spring', stiffness: 90, damping: 14, delay: 120 } }" class="text-3xl font-bold mb-4">挑战：贪吃蛇</h2>
</div>

```python
import pygame, random
snake = [(10, 10)]
direction = (1, 0)
food = spawn_food()
while running:
    for event in pygame.event.get():
        direction = handle_input(event)  # 处理方向键
    head = move(snake[0], direction)
    snake.insert(0, head)
    if head == food:
        food = spawn_food()
    else:
        snake.pop()
    draw(snake, food)
```

<div font-cn class="grid grid-cols-2 gap-3 max-w-3xl mx-auto mt-3">
  <div v-click class="rounded-xl border border-green-400/20 bg-green-500/5 px-4 py-3">
    <div class="text-green-300 text-xs font-semibold mb-1">涉及的概念</div>
    <div class="text-xs opacity-70 space-y-1">
      <div>• 列表操作（蛇身增长/缩短）</div>
      <div>• 事件循环（游戏主循环）</div>
      <div>• 碰撞检测（边界 & 自身）</div>
      <div>• 外部库 pygame</div>
    </div>
  </div>
  <div v-click class="rounded-xl border border-cyan-400/20 bg-cyan-500/5 px-4 py-3">
    <div class="text-cyan-300 text-xs font-semibold mb-2">💬 这样跟 AI 协作</div>
    <div class="text-xs opacity-70 space-y-1 italic">
      <div>"先帮我搭好窗口和基本循环"</div>
      <div>"加上蛇的移动逻辑"</div>
      <div>"碰到边界游戏结束"</div>
      <div>"我想加个分数显示"</div>
    </div>
  </div>
</div>

---
layout: center
glowSeed: 999
glowHue: 310
---

<div font-cn class="max-w-2xl mx-auto w-full text-center">
  <div v-motion :initial="{ scale: 0.8, opacity: 0 }" :enter="{ scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 80, damping: 12, delay: 100 } }" class="inline-block mb-3 px-3 py-1 rounded-full border border-violet-400/30 bg-violet-500/10 text-violet-300 text-xs tracking-widest uppercase">
    开始探索
  </div>
  <h1 v-motion :initial="{ y: 20, opacity: 0 }" :enter="{ y: 0, opacity: 1, transition: { type: 'spring', stiffness: 90, damping: 14, delay: 200 } }" class="text-4xl font-bold mb-2 bg-gradient-to-r from-violet-300 via-fuchsia-200 to-cyan-300 bg-clip-text text-transparent">
    怎么和 AI 对话？
  </h1>
  <div v-motion :initial="{ y: 10, opacity: 0 }" :enter="{ y: 0, opacity: 1, transition: { delay: 350 } }" class="text-sm opacity-50 mb-7">
    工具不重要，习惯最重要
  </div>

  <div class="grid grid-cols-2 gap-4 text-left mb-5">
    <div v-click class="rounded-2xl border border-violet-400/25 bg-violet-500/5 px-5 py-4">
      <div class="text-violet-300 font-semibold text-sm mb-2">🌐 网页端</div>
      <div class="space-y-2 text-xs opacity-70">
        <div class="flex items-center gap-2"><span class="text-white/50">•</span> <span class="text-violet-200 font-medium">claude.ai</span> — 无需注册即可试用</div>
        <div class="flex items-center gap-2"><span class="text-white/50">•</span> <span class="text-cyan-200 font-medium">chat.qwen.ai</span> — 国内访问，中文优化</div>
        <div class="flex items-center gap-2"><span class="text-white/50">•</span> <span class="text-fuchsia-200 font-medium">kimi.moonshot.cn</span> — 长文档、中文理解强</div>
      </div>
    </div>
    <div v-click class="rounded-2xl border border-cyan-400/25 bg-cyan-500/5 px-5 py-4">
      <div class="text-cyan-300 font-semibold text-sm mb-2">💻 编码工具</div>
      <div class="space-y-2 text-xs opacity-70">
        <div class="flex items-center gap-2"><span class="text-white/50">•</span> <span class="text-violet-200 font-medium">Claude Code</span> — 终端，上下文极深</div>
        <div class="flex items-center gap-2"><span class="text-white/50">•</span> <span class="text-orange-200 font-medium">Cursor</span> — VS Code 同款体验</div>
        <div class="flex items-center gap-2"><span class="text-white/50">•</span> <span class="text-cyan-200 font-medium">Qwen Code</span> — 国内，免费可用</div>
      </div>
    </div>
    <div v-click class="col-span-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
      <div class="text-white/80 font-semibold text-sm mb-2">💡 怎么问才有好结果？</div>
      <div class="grid grid-cols-3 gap-3 text-xs opacity-70">
        <div><span class="text-green-300 font-semibold">说清楚目标</span><br>不要只说"帮我写代码"，说"帮我用 Python 写一个……"</div>
        <div><span class="text-violet-300 font-semibold">分步骤提问</span><br>先搭骨架，再加功能，不要一次要求太多</div>
        <div><span class="text-cyan-300 font-semibold">把错误贴给它</span><br>直接把报错信息粘贴进去，让 AI 帮你看</div>
      </div>
    </div>
  </div>

  <div v-click class="text-sm opacity-60">
    最好的学习方式：<span class="text-violet-300 font-semibold">动手做一个你感兴趣的小项目</span>，边做边问。
  </div>
</div>
