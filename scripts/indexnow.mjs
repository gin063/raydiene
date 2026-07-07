// scripts/indexnow.mjs
// 部署上线后运行：npm run indexnow
// 把站点地图里的所有 URL 通过 IndexNow 通知搜索引擎（Bing 等），触发快速重新抓取。
//
// 前提：public/<KEY>.txt 已随站点部署，可在 https://<HOST>/<KEY>.txt 访问到，内容为 KEY 本身。
// 说明：只托管 key 文件不会被“检测到”——必须实际提交 URL，搜索引擎才会来校验 key 并激活 IndexNow。

const HOST = 'www.raydiene.cn'
const KEY = '9b625d609fec4211adbe1710c8de9f9a'
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`
const SITEMAP = `https://${HOST}/sitemap.xml`
const ENDPOINT = 'https://api.indexnow.org/indexnow' // 提交给 IndexNow 会自动分发给 Bing 等成员

async function main() {
  // 1) 自检：key 文件是否已正确上线
  let keyRes
  try { keyRes = await fetch(KEY_LOCATION) } catch (e) { console.error('无法访问 key 文件：', e.message); process.exit(1) }
  const keyBody = (await keyRes.text()).trim()
  if (keyRes.status !== 200 || keyBody !== KEY) {
    console.error(`✗ Key 文件未正确上线：${KEY_LOCATION}`)
    console.error(`  HTTP=${keyRes.status}，内容="${keyBody.slice(0, 40)}"`)
    console.error('  请先把 public/' + KEY + '.txt 部署上线，再运行本脚本。')
    process.exit(1)
  }
  console.log('✓ Key 文件在线校验通过：', KEY_LOCATION)

  // 2) 从站点地图解析 URL
  const xml = await (await fetch(SITEMAP)).text()
  const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim())
  if (!urlList.length) { console.error('✗ 未从 sitemap 解析到 URL：', SITEMAP); process.exit(1) }
  console.log(`解析到 ${urlList.length} 个 URL，提交中…`)

  // 3) 提交
  const r = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
  })
  const text = await r.text().catch(() => '')
  console.log(`IndexNow 响应：HTTP ${r.status} ${text}`)
  // 200=成功，202=已接受；403=key 不匹配；422=URL 不属于该 host / key 不符
  if (r.status === 200 || r.status === 202) console.log(`✓ 已提交 ${urlList.length} 个 URL`)
  else { console.error('✗ 提交失败，请检查 key 文件与 URL 归属'); process.exit(1) }
}

main().catch((e) => { console.error(e); process.exit(1) })
