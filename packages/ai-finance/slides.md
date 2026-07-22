---
layout: center
highlighter: shiki
css: unocss
colorSchema: dark
transition: fade-out
title: AI 赋能金融从业者
mdc: true
glowSeed: 188
---

<div class="text-center" font-cn>
  <div v-motion :initial="{ y: -20, opacity: 0 }" :enter="{ y: 0, opacity: 1, transition: { delay: 100 } }" class="text-xs tracking-[0.3em] uppercase opacity-40 mb-6">
    人工智能 · 金融应用
  </div>
  <div v-motion :initial="{ y: 30, opacity: 0 }" :enter="{ y: 0, opacity: 1, transition: { type: 'spring', stiffness: 90, damping: 14, delay: 250 } }" class="text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-300 via-green-200 to-amber-300 bg-clip-text text-transparent">
    AI 赋能金融从业者
  </div>
  <div v-motion :initial="{ y: 10, opacity: 0 }" :enter="{ y: 0, opacity: 1, transition: { delay: 250 } }" class="text-sm opacity-50">
    研究 · 交易 · 风控 · 合规——大模型正在重写工作流
  </div>
</div>

---
layout: center
glowSeed: 272
---

<div font-cn class="max-w-2xl mx-auto w-full">
  <div v-motion :initial="{ x: -20, opacity: 0 }" :enter="{ x: 0, opacity: 1, transition: { type: 'spring', stiffness: 100, damping: 14 } }" class="text-xs tracking-[0.25em] uppercase opacity-40 mb-3">
    行业背景
  </div>
  <h1 v-motion :initial="{ y: 20, opacity: 0 }" :enter="{ y: 0, opacity: 1, transition: { type: 'spring', stiffness: 90, damping: 14, delay: 150 } }" class="text-4xl font-bold mb-8 leading-snug">
    AI 已经来到<br>
    <span class="bg-gradient-to-r from-emerald-300 to-amber-300 bg-clip-text text-transparent">金融从业者的桌上</span>
  </h1>
  <div v-click class="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 mb-4">
    <span class="text-2xl shrink-0">📈</span>
    <div>
      <div class="font-semibold text-lg text-emerald-200">效率革命</div>
      <div class="text-sm opacity-60 mt-1">一篇研报、一个财务模型、一份合规文档——AI 可以在分钟内完成你过去需要数小时的工作</div>
    </div>
  </div>
  <div v-click class="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 mb-4">
    <span class="text-2xl shrink-0">🌐</span>
    <div>
      <div class="font-semibold text-lg text-amber-200">信息处理能力</div>
      <div class="text-sm opacity-60 mt-1">每日数百篇公告、新闻、研报——大模型能快速提炼关键信息，让你不再被信息洪流淹没</div>
    </div>
  </div>
  <div v-click class="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 px-6 py-4">
    <span class="text-2xl shrink-0">⚠️</span>
    <div>
      <div class="font-semibold text-lg text-orange-200">但不是魔法</div>
      <div class="text-sm opacity-60 mt-1">幻觉、数据滞后、监管灰区——用好 AI 需要理解它的边界</div>
    </div>
  </div>
</div>

---
layout: center
glowSeed: 355
glowHue: 140
---

<div font-cn class="max-w-3xl mx-auto w-full">
  <div v-motion :initial="{ x: -20, opacity: 0 }" :enter="{ x: 0, opacity: 1, transition: { type: 'spring', stiffness: 90, damping: 14 } }" class="text-xs tracking-[0.25em] uppercase opacity-40 mb-2">场景一</div>
  <h2 v-motion :initial="{ y: 20, opacity: 0 }" :enter="{ y: 0, opacity: 1, transition: { type: 'spring', stiffness: 90, damping: 14, delay: 120 } }" class="text-3xl font-bold mb-5">研究与研报撰写</h2>
  <div class="grid grid-cols-2 gap-5">
    <div class="flex flex-col gap-3">
      <div v-click class="rounded-2xl border border-emerald-400/25 bg-emerald-500/5 px-5 py-4">
        <div class="text-emerald-300 font-semibold text-sm mb-2">📄 年报速读</div>
        <div class="text-xs opacity-70 leading-relaxed italic">"帮我总结这份年报的核心财务指标、主要风险因素，以及管理层对未来的展望，控制在 500 字以内。"</div>
      </div>
      <div v-click class="rounded-2xl border border-amber-400/25 bg-amber-500/5 px-5 py-4">
        <div class="text-amber-300 font-semibold text-sm mb-2">🔍 行业对比</div>
        <div class="text-xs opacity-70 leading-relaxed italic">"对比以下三家公司的 ROE、毛利率、资产负债率，找出最值得关注的差异点。"</div>
      </div>
      <div v-click class="rounded-2xl border border-orange-400/25 bg-orange-500/5 px-5 py-4">
        <div class="text-orange-300 font-semibold text-sm mb-2">✍️ 初稿生成</div>
        <div class="text-xs opacity-70 leading-relaxed italic">"基于以下数据，帮我起草一篇新能源板块的深度报告框架，包含投资逻辑、风险提示和估值方法。"</div>
      </div>
    </div>
    <div v-motion :initial="{ y: 20, opacity: 0 }" :enter="{ y: 0, opacity: 1, transition: { type: 'spring', stiffness: 80, damping: 18, delay: 120 } }" class="rounded-2xl border border-white/10 bg-white/5 overflow-hidden self-start">
      <div class="flex items-center gap-1.5 px-3 py-2 bg-white/5 border-b border-white/10">
        <div class="w-2 h-2 rounded-full bg-red-400/70"></div>
        <div class="w-2 h-2 rounded-full bg-yellow-400/70"></div>
        <div class="w-2 h-2 rounded-full bg-green-400/70"></div>
        <span class="ml-2 text-[9px] opacity-40">Claude · 研报助手</span>
      </div>
      <div class="p-4 space-y-3 text-xs">
        <div class="rounded-xl bg-white/5 px-3 py-2 opacity-70 text-right">请分析宁德时代 2024 年报的核心风险</div>
        <div class="rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-3 py-2 leading-relaxed">
          <div class="text-emerald-200 font-semibold mb-1">主要风险因素（摘要）</div>
          <div class="opacity-70 space-y-1">
            <div>• 原材料碳酸锂价格波动风险</div>
            <div>• 海外市场贸易壁垒加剧</div>
            <div>• 固态电池技术路线竞争</div>
            <div>• 客户集中度偏高（前五大客户占比 ~58%）</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

---
layout: center
glowSeed: 441
glowHue: 45
---

<div font-cn class="max-w-3xl mx-auto w-full">
  <div v-motion :initial="{ x: -20, opacity: 0 }" :enter="{ x: 0, opacity: 1, transition: { type: 'spring', stiffness: 90, damping: 14 } }" class="text-xs tracking-[0.25em] uppercase opacity-40 mb-2">场景二</div>
  <h2 v-motion :initial="{ y: 20, opacity: 0 }" :enter="{ y: 0, opacity: 1, transition: { type: 'spring', stiffness: 90, damping: 14, delay: 120 } }" class="text-3xl font-bold mb-5">财务建模与 Excel 自动化</h2>
  <div class="grid grid-cols-3 gap-4 mb-4">
    <div v-click class="rounded-2xl border border-emerald-400/25 px-5 py-5" style="background: linear-gradient(to bottom, #05966922, #06785522)">
      <div class="text-2xl mb-3">📊</div>
      <div class="font-bold text-sm mb-1">DCF 模型搭建</div>
      <div class="text-xs opacity-60 leading-relaxed">"帮我写一个三阶段 DCF 的 Excel 公式逻辑，含 WACC 加权计算和终值估算"</div>
    </div>
    <div v-click class="rounded-2xl border border-amber-400/25 px-5 py-5" style="background: linear-gradient(to bottom, #d9770622, #b4530022)">
      <div class="text-2xl mb-3">🔢</div>
      <div class="font-bold text-sm mb-1">VBA 脚本生成</div>
      <div class="text-xs opacity-60 leading-relaxed">"写一个 VBA 宏，批量从多个 Sheet 提取营收数据并汇总到总表，按年度排列"</div>
    </div>
    <div v-click class="rounded-2xl border border-orange-400/25 px-5 py-5" style="background: linear-gradient(to bottom, #ea580c22, #c2410c22)">
      <div class="text-2xl mb-3">🐍</div>
      <div class="font-bold text-sm mb-1">Python 数据处理</div>
      <div class="text-xs opacity-60 leading-relaxed">"用 pandas 读取这份 CSV，计算滚动 12 个月 ROE，并输出折线图"</div>
    </div>
  </div>
  <div v-click class="rounded-xl border border-white/10 bg-white/5 px-5 py-4">
    <div class="text-white/80 font-semibold text-sm mb-3">典型工作流</div>
    <div class="flex items-center gap-2 text-xs opacity-70 flex-wrap">
      <div class="px-3 py-1.5 rounded-lg bg-emerald-500/15 border border-emerald-400/20 text-emerald-200">上传财务数据</div>
      <div class="opacity-40">→</div>
      <div class="px-3 py-1.5 rounded-lg bg-white/8 border border-white/10">描述建模需求</div>
      <div class="opacity-40">→</div>
      <div class="px-3 py-1.5 rounded-lg bg-white/8 border border-white/10">AI 生成公式/代码</div>
      <div class="opacity-40">→</div>
      <div class="px-3 py-1.5 rounded-lg bg-white/8 border border-white/10">核验关键假设</div>
      <div class="opacity-40">→</div>
      <div class="px-3 py-1.5 rounded-lg bg-amber-500/15 border border-amber-400/20 text-amber-200">迭代优化</div>
    </div>
  </div>
</div>

---
layout: center
glowSeed: 527
glowHue: 20
---

<div font-cn class="max-w-3xl mx-auto w-full">
  <div v-motion :initial="{ x: -20, opacity: 0 }" :enter="{ x: 0, opacity: 1, transition: { type: 'spring', stiffness: 90, damping: 14 } }" class="text-xs tracking-[0.25em] uppercase opacity-40 mb-2">场景三</div>
  <h2 v-motion :initial="{ y: 20, opacity: 0 }" :enter="{ y: 0, opacity: 1, transition: { type: 'spring', stiffness: 90, damping: 14, delay: 120 } }" class="text-3xl font-bold mb-5">新闻与舆情监控</h2>
  <div class="grid grid-cols-2 gap-5">
    <div class="space-y-3">
      <div v-click class="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
        <div class="font-semibold text-sm text-emerald-200 mb-2">⚡ 实时摘要</div>
        <div class="text-xs opacity-70 leading-relaxed italic">"以下是今日 A 股相关新闻 50 条，请提炼出最可能影响市场情绪的 5 条，并说明逻辑。"</div>
      </div>
      <div v-click class="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
        <div class="font-semibold text-sm text-amber-200 mb-2">📡 政策解读</div>
        <div class="text-xs opacity-70 leading-relaxed italic">"这份央行货币政策报告的表述与上季度相比有哪些变化？对债市有什么信号意义？"</div>
      </div>
      <div v-click class="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
        <div class="font-semibold text-sm text-orange-200 mb-2">🌍 跨语言整合</div>
        <div class="text-xs opacity-70 leading-relaxed italic">"把这篇英文 Fed 声明翻译并标注关键词，附上对人民币汇率的潜在影响分析。"</div>
      </div>
    </div>
    <div v-motion :initial="{ y: 20, opacity: 0 }" :enter="{ y: 0, opacity: 1, transition: { type: 'spring', stiffness: 80, damping: 18, delay: 120 } }" class="rounded-2xl border border-white/10 bg-white/5 px-5 py-5 self-start">
      <div class="text-sm font-semibold text-white/80 mb-4">情绪标签示例</div>
      <div class="space-y-2 text-xs">
        <div class="flex items-center gap-3">
          <span class="px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 shrink-0">利空</span>
          <span class="opacity-60">美联储官员释放鹰派信号，加息预期升温</span>
        </div>
        <div class="flex items-center gap-3">
          <span class="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 shrink-0">利多</span>
          <span class="opacity-60">财政部宣布提前下达专项债额度 1.2 万亿</span>
        </div>
        <div class="flex items-center gap-3">
          <span class="px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-300 shrink-0">中性</span>
          <span class="opacity-60">央行开展 7 天逆回购 1500 亿，维持流动性</span>
        </div>
        <div class="flex items-center gap-3">
          <span class="px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 shrink-0">利空</span>
          <span class="opacity-60">某头部房企美元债再现违约传闻，股价跌停</span>
        </div>
        <div class="flex items-center gap-3">
          <span class="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 shrink-0">利多</span>
          <span class="opacity-60">发改委：新能源车下乡补贴政策延续至 2026</span>
        </div>
      </div>
    </div>
  </div>
</div>

---
layout: center
glowSeed: 613
glowHue: 0
---

<div font-cn class="max-w-3xl mx-auto w-full">
  <div v-motion :initial="{ x: -20, opacity: 0 }" :enter="{ x: 0, opacity: 1, transition: { type: 'spring', stiffness: 90, damping: 14 } }" class="text-xs tracking-[0.25em] uppercase opacity-40 mb-2">场景四</div>
  <h2 v-motion :initial="{ y: 20, opacity: 0 }" :enter="{ y: 0, opacity: 1, transition: { type: 'spring', stiffness: 90, damping: 14, delay: 120 } }" class="text-3xl font-bold mb-5">合规与法律文本审查</h2>
  <div class="grid grid-cols-2 gap-5 mb-4">
    <div v-click class="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
      <div class="text-sm font-semibold text-emerald-200 mb-3">📋 常见任务</div>
      <div class="space-y-2 text-xs opacity-70">
        <div class="flex items-start gap-2"><span class="text-emerald-400 shrink-0">•</span>合同条款风险点标注与摘要</div>
        <div class="flex items-start gap-2"><span class="text-emerald-400 shrink-0">•</span>监管新规与现有业务的合规差距分析</div>
        <div class="flex items-start gap-2"><span class="text-emerald-400 shrink-0">•</span>KYC / AML 文件要素核查</div>
        <div class="flex items-start gap-2"><span class="text-emerald-400 shrink-0">•</span>招股书、定期报告合规措辞优化</div>
        <div class="flex items-start gap-2"><span class="text-emerald-400 shrink-0">•</span>交叉对比多版本合同差异</div>
      </div>
    </div>
    <div v-click class="rounded-2xl border border-amber-400/20 bg-amber-500/5 px-5 py-4">
      <div class="text-sm font-semibold text-amber-200 mb-3">💬 提示词示例</div>
      <div class="space-y-2 text-xs opacity-70 italic">
        <div class="border-l-2 border-amber-400/30 pl-3">"审查这份基金合同，标出所有可能对投资者造成重大不利的条款，并建议修改措辞。"</div>
        <div class="border-l-2 border-amber-400/30 pl-3">"对照最新证监会 XX 号文，列出我们现有信披制度需要更新的地方。"</div>
      </div>
    </div>
  </div>
  <div v-click class="rounded-xl border border-orange-400/20 bg-orange-500/5 px-5 py-3 flex items-start gap-3">
    <span class="text-orange-300 text-lg shrink-0">⚠️</span>
    <div class="text-xs opacity-70 leading-relaxed">AI 不能替代持牌律师的法律意见。合规审查结果须由具备资质的合规/法律人员最终把关，尤其涉及监管报送、诉讼风险场景。</div>
  </div>
</div>

---
layout: center
glowSeed: 699
glowHue: 200
---

<div font-cn class="max-w-3xl mx-auto w-full">
  <div v-motion :initial="{ x: -20, opacity: 0 }" :enter="{ x: 0, opacity: 1, transition: { type: 'spring', stiffness: 90, damping: 14 } }" class="text-xs tracking-[0.25em] uppercase opacity-40 mb-2">场景五</div>
  <h2 v-motion :initial="{ y: 20, opacity: 0 }" :enter="{ y: 0, opacity: 1, transition: { type: 'spring', stiffness: 90, damping: 14, delay: 120 } }" class="text-3xl font-bold mb-5">量化策略与数据分析</h2>
  <div class="grid grid-cols-2 gap-5">
    <div class="space-y-3">
      <div v-click class="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
        <div class="font-semibold text-sm text-emerald-200 mb-2">📐 因子挖掘</div>
        <div class="text-xs opacity-70 leading-relaxed italic">"帮我用 Python 计算过去 60 日动量因子，并检验其在 A 股全 A 样本上的 IC 和 IR。"</div>
      </div>
      <div v-click class="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
        <div class="font-semibold text-sm text-amber-200 mb-2">🔁 回测框架</div>
        <div class="text-xs opacity-70 leading-relaxed italic">"基于 backtrader 写一个双均线策略，加入手续费和滑点，输出年化收益和最大回撤。"</div>
      </div>
      <div v-click class="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
        <div class="font-semibold text-sm text-cyan-200 mb-2">📊 可视化报告</div>
        <div class="text-xs opacity-70 leading-relaxed italic">"把这份因子测试结果做成 plotly 交互图，按行业分组展示 IC 分布直方图。"</div>
      </div>
    </div>
    <div v-motion :initial="{ opacity: 0, y: 15 }" :enter="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80, damping: 18, delay: 120 } }" class="rounded-2xl border border-white/10 bg-white/5 overflow-hidden self-start">
      <div class="px-4 py-2 bg-white/5 border-b border-white/10 text-[10px] opacity-40 font-mono">momentum_factor.py</div>
      <pre class="px-4 py-4 text-[11px] leading-relaxed text-white/75 overflow-auto font-mono whitespace-pre">import pandas as pd
import numpy as np
def momentum(prices, window=60):
    ret = prices.pct_change(window)
    return ret.rank(axis=1, pct=True)
ic = factor.corrwith(
    forward_ret, axis=1
)  # IC均值 0.042  IR 1.31
</pre>
    </div>
  </div>
</div>

---
layout: center
glowSeed: 784
glowHue: 260
---

<div font-cn class="max-w-2xl mx-auto w-full text-center">
  <div v-motion :initial="{ scale: 0.8, opacity: 0 }" :enter="{ scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 80, damping: 12, delay: 100 } }" class="inline-block mb-3 px-3 py-1 rounded-full border border-emerald-400/30 bg-emerald-500/10 text-emerald-300 text-xs tracking-widest uppercase">
    工具选择
  </div>
  <div v-motion :initial="{ y: 20, opacity: 0 }" :enter="{ y: 0, opacity: 1, transition: { type: 'spring', stiffness: 90, damping: 14, delay: 200 } }" class="text-4xl font-bold mb-2 bg-gradient-to-r from-emerald-300 via-green-200 to-amber-300 bg-clip-text text-transparent">
    用哪些 AI 工具？
  </div>
  <div v-motion :initial="{ y: 10, opacity: 0 }" :enter="{ y: 0, opacity: 1, transition: { delay: 200 } }" class="text-sm opacity-50 mb-7">
    按场景选工具，而非盲目追新
  </div>
  <div class="grid grid-cols-3 gap-4 text-left mb-5">
    <div v-click class="rounded-2xl border border-emerald-400/25 px-5 py-5" style="background: linear-gradient(to bottom, #05966922, #06785522)">
      <div class="flex items-center justify-between mb-3">
        <div class="i-simple-icons-anthropic text-xl opacity-70"></div>
        <span class="text-[10px] px-2 py-0.5 rounded-full bg-white/10 opacity-70">通用</span>
      </div>
      <div class="font-bold text-sm mb-0.5">Claude</div>
      <div class="text-[10px] opacity-40 mb-2">Anthropic</div>
      <div class="text-xs opacity-65 leading-relaxed">长文档分析、合规文本、代码生成，上下文窗口超大</div>
    </div>
    <div v-click class="rounded-2xl border border-amber-400/25 px-5 py-5" style="background: linear-gradient(to bottom, #d9770622, #b4530022)">
      <div class="flex items-center justify-between mb-3">
        <div class="i-carbon-chart-line text-xl opacity-70"></div>
        <span class="text-[10px] px-2 py-0.5 rounded-full bg-white/10 opacity-70">数据</span>
      </div>
      <div class="font-bold text-sm mb-0.5">通义千问</div>
      <div class="text-[10px] opacity-40 mb-2">阿里云</div>
      <div class="text-xs opacity-65 leading-relaxed">中文金融语料强，国内数据访问无障碍，API 成本低</div>
    </div>
    <div v-click class="rounded-2xl border border-cyan-400/25 px-5 py-5" style="background: linear-gradient(to bottom, #0891b222, #1d4ed822)">
      <div class="flex items-center justify-between mb-3">
        <div class="i-carbon-search text-xl opacity-70"></div>
        <span class="text-[10px] px-2 py-0.5 rounded-full bg-white/10 opacity-70">搜索</span>
      </div>
      <div class="font-bold text-sm mb-0.5">Perplexity</div>
      <div class="text-[10px] opacity-40 mb-2">实时网络</div>
      <div class="text-xs opacity-65 leading-relaxed">实时联网搜索，带引用来源，适合快速市场资讯查询</div>
    </div>
  </div>
  <div v-click class="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs opacity-60 text-center">
    代码专项推荐 <span class="text-emerald-300">Claude Code</span> / <span class="text-amber-300">Cursor</span>；本地部署可选 <span class="text-cyan-300">Qwen-72B</span> 私有化
  </div>
</div>

---
layout: center
glowSeed: 871
glowHue: 30
---

<div font-cn class="max-w-2xl mx-auto w-full text-center">
  <div v-motion :initial="{ scale: 0.8, opacity: 0 }" :enter="{ scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 80, damping: 12, delay: 100 } }" class="text-4xl font-bold mb-2 bg-gradient-to-r from-orange-300 to-red-300 bg-clip-text text-transparent">
    AI 的边界与风险
  </div>
  <div v-motion :initial="{ y: 10, opacity: 0 }" :enter="{ y: 0, opacity: 1, transition: { delay: 300 } }" class="text-sm opacity-50 mb-6">
    越强大的工具，越需要清醒的使用者
  </div>
  <div class="grid grid-cols-2 gap-4 text-left mb-5">
    <div v-click class="rounded-2xl border border-red-400/20 bg-red-500/5 px-5 py-4">
      <div class="text-xl mb-1">🎭</div>
      <div class="font-semibold text-sm text-red-200 mb-1">幻觉与编造</div>
      <div class="text-xs opacity-60 leading-relaxed">AI 会自信地给出错误数据——财务数字、引用来源务必人工核验，不可直接引用入报告</div>
    </div>
    <div v-click class="rounded-2xl border border-orange-400/20 bg-orange-500/5 px-5 py-4">
      <div class="text-xl mb-1">📅</div>
      <div class="font-semibold text-sm text-orange-200 mb-1">数据滞后</div>
      <div class="text-xs opacity-60 leading-relaxed">模型有知识截止日，实时行情、最新公告、今日政策无法从通用 LLM 直接获取</div>
    </div>
    <div v-click class="rounded-2xl border border-yellow-400/20 bg-yellow-500/5 px-5 py-4">
      <div class="text-xl mb-1">🔒</div>
      <div class="font-semibold text-sm text-yellow-200 mb-1">数据安全</div>
      <div class="text-xs opacity-60 leading-relaxed">未公开的客户信息、内幕敏感数据严禁输入公有云 AI，注意合规红线与保密协议</div>
    </div>
    <div v-click class="rounded-2xl border border-amber-400/20 bg-amber-500/5 px-5 py-4">
      <div class="text-xl mb-1">⚖️</div>
      <div class="font-semibold text-sm text-amber-200 mb-1">监管灰区</div>
      <div class="text-xs opacity-60 leading-relaxed">AI 生成的投资建议、研报可能触碰投顾资质要求，使用前需确认合规边界</div>
    </div>
  </div>
  <div v-click class="text-sm opacity-70">
    核心原则：AI 是<span class="text-emerald-300 font-semibold">加速器</span>，不是<span class="text-red-300 font-semibold">替代者</span>——最终判断权始终在人。
  </div>
</div>

---
layout: center
glowSeed: 944
glowHue: 160
---

<div font-cn class="max-w-2xl mx-auto w-full">
  <div v-motion :initial="{ x: -20, opacity: 0 }" :enter="{ x: 0, opacity: 1, transition: { type: 'spring', stiffness: 90, damping: 14 } }" class="text-xs tracking-[0.25em] uppercase opacity-40 mb-2">最佳实践</div>
  <h2 v-motion :initial="{ y: 20, opacity: 0 }" :enter="{ y: 0, opacity: 1, transition: { type: 'spring', stiffness: 90, damping: 14, delay: 120 } }" class="text-3xl font-bold mb-6 leading-snug">
    怎么用好 AI？<br>
    <span class="bg-gradient-to-r from-emerald-300 to-amber-300 bg-clip-text text-transparent">金融场景提示词技巧</span>
  </h2>
  <div class="space-y-3">
    <div v-click class="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
      <span class="text-lg shrink-0">🎯</span>
      <div>
        <div class="font-semibold text-sm text-emerald-200 mb-1">给足背景上下文</div>
        <div class="text-xs opacity-60">不要只说"分析这家公司"，给出行业、时间窗口、分析目的（买方/卖方/内部决策）</div>
      </div>
    </div>
    <div v-click class="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
      <span class="text-lg shrink-0">📎</span>
      <div>
        <div class="font-semibold text-sm text-amber-200 mb-1">直接粘贴原文数据</div>
        <div class="text-xs opacity-60">将财报片段、合同条款、新闻原文一并附上，避免 AI 依赖可能过时的训练知识</div>
      </div>
    </div>
    <div v-click class="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
      <span class="text-lg shrink-0">🔢</span>
      <div>
        <div class="font-semibold text-sm text-cyan-200 mb-1">要求结构化输出</div>
        <div class="text-xs opacity-60">"以 Markdown 表格输出，包含指标名称、数值、同比变化、解读"——结构化便于复用和审查</div>
      </div>
    </div>
    <div v-click class="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
      <span class="text-lg shrink-0">🔍</span>
      <div>
        <div class="font-semibold text-sm text-orange-200 mb-1">让 AI 自我质疑</div>
        <div class="text-xs opacity-60">"请列出这个分析中你不确定的地方"或"哪些结论依赖了你无法核实的假设？"</div>
      </div>
    </div>
  </div>
</div>

---
layout: center
class: text-center
glowSeed: 1023
glowHue: 120
---

<div font-cn class="max-w-2xl mx-auto w-full text-center">
  <div
    v-motion
    :initial="{ y: 80, opacity: 0, scale: 0.6 }"
    :enter="{ y: 0, opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 120, damping: 12, delay: 100 } }"
    class="inline-block rounded-2xl bg-gradient-to-br from-emerald-400 to-amber-500 px-8 py-6 text-2xl font-semibold shadow-2xl mb-8"
  >
    开始用 AI 重塑你的工作流 💼
  </div>

  <div class="mt-2 grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
    <div
      v-for="(item, i) in [{ label: '研究提效', sub: '年报·研报·对比' }, { label: '建模加速', sub: 'DCF·VBA·Python' }, { label: '合规辅助', sub: '合同·监管·文书' }]"
      :key="item.label"
      v-motion
      :initial="{ y: 40, opacity: 0 }"
      :enter="{ y: 0, opacity: 1, transition: { delay: 200 + i * 100 } }"
      class="rounded-xl border border-white/10 bg-white/5 py-4 px-3"
    >
      <div class="text-sm font-semibold text-emerald-200 mb-1">{{ item.label }}</div>
      <div class="text-[10px] opacity-50">{{ item.sub }}</div>
    </div>
  </div>

  <div v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, transition: { delay: 900 } }" class="text-sm opacity-50">
    工具在变，<span class="text-emerald-300">判断力</span>与<span class="text-amber-300">专业素养</span>永远是核心竞争力。
  </div>
</div>
