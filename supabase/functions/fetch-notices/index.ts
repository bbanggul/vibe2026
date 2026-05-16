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

  // Extract notice IDs and titles from <a onclick="submitForm(this,'view',ID);" title='TITLE'>
  const linkRegex = /submitForm\(this,'view',(\d+)\);" title='([^']+)'/g
  const ids: string[] = []
  const titles: string[] = []
  let m
  while ((m = linkRegex.exec(html)) !== null) {
    ids.push(m[1])
    titles.push(m[2])
  }

  // Extract dates from <span class="date">YYYY-MM-DD</span>
  const dateRegex = /<span class="date">(\d{4}-\d{2}-\d{2})<\/span>/g
  const dates: string[] = []
  while ((m = dateRegex.exec(html)) !== null) {
    dates.push(m[1])
  }

  for (let i = 0; i < ids.length; i++) {
    results.push({
      id: ids[i],
      title: titles[i],
      date: dates[i] ?? new Date().toISOString().split('T')[0],
      url: `${NOTICE_DETAIL_BASE}${ids[i]}`,
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

    // 100개 초과 시 오래된 것부터 삭제
    const { count } = await sb.from('notices').select('*', { count: 'exact', head: true })
    if ((count ?? 0) > 100) {
      const { data: oldest } = await sb
        .from('notices')
        .select('id')
        .order('published_at', { ascending: true })
        .limit((count ?? 0) - 100)
      if (oldest && oldest.length > 0) {
        await sb.from('notices').delete().in('id', oldest.map(r => r.id))
      }
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
