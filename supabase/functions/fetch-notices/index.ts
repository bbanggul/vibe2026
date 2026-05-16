import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const NOTICE_URL = 'https://www.suwon.ac.kr/index.html?menuno=674'
const NOTICE_DETAIL_BASE = 'https://www.suwon.ac.kr/index.html?menuno=674&act=view&bbsno='

const LANG_MAP: Record<string, string> = {
  en: 'en', zh: 'zh-CN', ja: 'ja', vi: 'vi', th: 'th',
}

async function translateText(text: string, targetLang: string): Promise<string> {
  try {
    const resp = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=ko|${targetLang}`
    )
    const json = await resp.json()
    return json?.responseData?.translatedText || text
  } catch {
    return text
  }
}

function parseNotices(html: string) {
  const results: Array<{ id: string; title: string; date: string; url: string }> = []

  // Match each <tr> that contains a submitForm onclick
  const trRegex = /<tr[\s\S]*?<\/tr>/gi
  let trMatch
  while ((trMatch = trRegex.exec(html)) !== null) {
    const row = trMatch[0]
    const onclickMatch = /submitForm\(this,'view',(\d+)\)/.exec(row)
    const titleMatch = /title='([^']+)'/.exec(row)
    const dateMatch = /(\d{4}-\d{2}-\d{2})/.exec(row)
    if (!onclickMatch || !titleMatch) continue

    results.push({
      id: onclickMatch[1],
      title: titleMatch[1],
      date: dateMatch ? dateMatch[1] : new Date().toISOString().split('T')[0],
      url: `${NOTICE_DETAIL_BASE}${onclickMatch[1]}`,
    })
  }
  return results
}

Deno.serve(async () => {
  try {
    const sb = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    )

    // Fetch notice list from university
    const resp = await fetch(NOTICE_URL, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; SuwonBot/1.0)' },
    })
    if (!resp.ok) throw new Error(`fetch failed: ${resp.status}`)
    const html = await resp.text()

    const notices = parseNotices(html)
    if (notices.length === 0) {
      return new Response(JSON.stringify({ success: true, found: 0, inserted: 0 }), {
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Get existing notice IDs
    const { data: existing } = await sb.from('notices').select('notice_id')
    const existingIds = new Set((existing ?? []).map((n: { notice_id: string }) => n.notice_id))

    const newNotices = notices.filter(n => !existingIds.has(n.id))

    let inserted = 0
    for (const notice of newNotices) {
      // Translate to all 5 languages in parallel
      const [titleEn, titleZh, titleJa, titleVi, titleTh] = await Promise.all([
        translateText(notice.title, LANG_MAP.en),
        translateText(notice.title, LANG_MAP.zh),
        translateText(notice.title, LANG_MAP.ja),
        translateText(notice.title, LANG_MAP.vi),
        translateText(notice.title, LANG_MAP.th),
      ])

      const { error } = await sb.from('notices').insert({
        notice_id:    notice.id,
        title_ko:     notice.title,
        title_en:     titleEn,
        title_zh:     titleZh,
        title_ja:     titleJa,
        title_vi:     titleVi,
        title_th:     titleTh,
        url:          notice.url,
        published_at: notice.date,
      })
      if (!error) inserted++
    }

    return new Response(
      JSON.stringify({ success: true, found: notices.length, inserted }),
      { headers: { 'Content-Type': 'application/json' } },
    )
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
})
