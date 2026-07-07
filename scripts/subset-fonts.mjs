// scripts/subset-fonts.mjs
// 中文字体子集化：把 scripts/fonts-src/ 下的原始 woff2 裁剪为
//   [站内实际用到的字] ∪ [GB2312 一级常用字 ~3760] ∪ [ASCII + 常用标点]
// 输出覆盖到 public/fonts/（沿用原文件名，@font-face 无需改）。
//
// 未来新增页面/文案后，重跑 `npm run subset:fonts` 即可把新字纳入；
// 万一漏掉，@font-face 的 font-display: swap 会回退系统中文字体，文字仍可读。
//
// 用法：node scripts/subset-fonts.mjs

import { readFile, writeFile, readdir, stat } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import subsetFont from 'subset-font'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

const SRC_DIR = path.join(root, 'scripts', 'fonts-src')
const OUT_DIR = path.join(root, 'public', 'fonts')
const FONTS = [
  'AlibabaPuHuiTi-3-55-Regular.woff2',
  'AlibabaPuHuiTi-3-65-Medium.woff2',
  'AlibabaPuHuiTi-3-85-Bold.woff2',
]

// 扫描这些目录里的源码文本，提取所有字符
const SCAN_DIRS = ['pages', 'components', 'composables', 'layouts', 'utils']
const SCAN_FILES = ['app.vue', 'nuxt.config.ts']
const SCAN_EXT = new Set(['.vue', '.ts', '.js', '.mjs', '.json'])

async function walk(dir, acc = []) {
  let entries
  try { entries = await readdir(dir, { withFileTypes: true }) } catch { return acc }
  for (const e of entries) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) await walk(p, acc)
    else if (SCAN_EXT.has(path.extname(e.name))) acc.push(p)
  }
  return acc
}

function gb2312Level1() {
  // GB2312 一级汉字：区 16–55（lead 0xB0–0xD7），位 0xA1–0xFE，≈3755 常用字
  const dec = new TextDecoder('gbk')
  const set = new Set()
  for (let lead = 0xb0; lead <= 0xd7; lead++) {
    for (let trail = 0xa1; trail <= 0xfe; trail++) {
      const ch = dec.decode(Uint8Array.from([lead, trail]))
      if (ch && ch !== '�') set.add(ch)
    }
  }
  return set
}

async function main() {
  const chars = new Set()

  // 1) ASCII 可见字符 + 空格
  for (let c = 0x20; c <= 0x7e; c++) chars.add(String.fromCharCode(c))

  // 2) 常用中英标点 / 符号（GB2312 多数已含，显式补全以防万一）
  for (const ch of '，。、；：？！“”‘’（）《》【】〈〉…—～·「」『』％℃°±×÷≈①②③④⑤⑥⑦⑧⑨⑩　＆／') chars.add(ch)

  // 3) GB2312 一级常用字安全集
  for (const ch of gb2312Level1()) chars.add(ch)

  // 4) 站内实际用到的字符（含中文、生僻符号、emoji 等）
  const files = []
  for (const d of SCAN_DIRS) files.push(...(await walk(path.join(root, d))))
  for (const f of SCAN_FILES) {
    const p = path.join(root, f)
    try { await stat(p); files.push(p) } catch { /* skip */ }
  }
  for (const f of files) {
    const text = await readFile(f, 'utf8')
    for (const ch of text) chars.add(ch)
  }

  const text = Array.from(chars).join('')
  console.log(`字符集大小：${chars.size}（含 GB2312 一级 + 站内实用字 + 标点）`)

  for (const name of FONTS) {
    const inBuf = await readFile(path.join(SRC_DIR, name))
    const outBuf = await subsetFont(inBuf, text, { targetFormat: 'woff2' })
    await writeFile(path.join(OUT_DIR, name), outBuf)
    const before = (inBuf.length / 1024 / 1024).toFixed(2)
    const after = (outBuf.length / 1024).toFixed(0)
    console.log(`✓ ${name}: ${before} MB → ${after} KB`)
  }
  console.log('完成。原始字体保留在 scripts/fonts-src/，请勿删除。')
}

main().catch((e) => { console.error(e); process.exit(1) })
