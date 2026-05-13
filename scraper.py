#!/usr/bin/env python3
"""수원대학교 학식 스크래퍼 - 매일 실행하면 cafeteria_data.json 업데이트"""

import json
from datetime import date
import requests
from bs4 import BeautifulSoup
from deep_translator import GoogleTranslator

URL = "https://www.suwon.ac.kr/index.html?menuno=1792"
OUTPUT = "cafeteria_data.json"

# deep-translator 언어 코드 매핑
LANG_MAP = {
    "en": "en",
    "zh": "zh-CN",
    "ja": "ja",
    "vi": "vi",
    "th": "th",
}


def scrape_menu():
    headers = {"User-Agent": "Mozilla/5.0 (compatible; SuwonPortal/1.0)"}
    resp = requests.get(URL, headers=headers, timeout=15)
    resp.encoding = "utf-8"
    soup = BeautifulSoup(resp.text, "html.parser")

    week_el = soup.select_one(".r_btn_wrap p.fl.tp10")
    week_range = week_el.get_text(strip=True) if week_el else ""

    table = soup.select_one("#contents_table2 table")
    menu = {}

    if table:
        rows = table.select("tbody tr")
        for row in rows:
            cells = row.select("td")
            if len(cells) < 3:
                continue
            meal_type = cells[0].get_text(strip=True)
            corner = cells[1].get_text(strip=True)

            for day_idx in range(5):
                if day_idx + 2 >= len(cells):
                    continue
                cell = cells[day_idx + 2]
                items_ko = [
                    s.strip()
                    for s in cell.get_text(separator="\n").splitlines()
                    if s.strip()
                ]
                day_key = str(day_idx + 1)
                if day_key not in menu:
                    menu[day_key] = []
                if items_ko:
                    menu[day_key].append({
                        "type": meal_type,
                        "corner": corner,
                        "items_ko": items_ko,
                    })

    return week_range, menu


def translate_all(all_ko: list) -> dict:
    """각 언어로 번역. 반환: {ko_text: {en: ..., zh: ..., ...}}"""
    result = {ko: {} for ko in all_ko}
    joined = "\n".join(all_ko)  # 한번에 묶어서 번역 (API 호출 최소화)

    for lang, gt_code in LANG_MAP.items():
        try:
            translated = GoogleTranslator(source="ko", target=gt_code).translate(joined)
            lines = translated.split("\n")
            for i, ko in enumerate(all_ko):
                result[ko][lang] = lines[i].strip() if i < len(lines) else ko
        except Exception as e:
            print(f"  [{lang}] 번역 실패: {e}")
            for ko in all_ko:
                result[ko][lang] = ko  # 실패 시 한국어 그대로

    return result


def build_menu(raw_menu: dict) -> dict:
    all_ko = list({
        item
        for entries in raw_menu.values()
        for entry in entries
        for item in entry["items_ko"]
    })

    print(f"번역 중... ({len(all_ko)}개 항목, 5개 언어)")
    translations = translate_all(all_ko)

    result = {}
    for day_key, entries in raw_menu.items():
        result[day_key] = []
        for entry in entries:
            items = []
            for ko in entry["items_ko"]:
                item_obj = {"ko": ko}
                item_obj.update(translations.get(ko, {}))
                items.append(item_obj)
            result[day_key].append({
                "type": entry["type"],
                "corner": entry["corner"],
                "items": items,
            })
    return result


def scrape():
    week_range, raw_menu = scrape_menu()
    menu = build_menu(raw_menu)

    result = {
        "updated": str(date.today()),
        "weekRange": week_range,
        "menu": menu,
    }

    with open(OUTPUT, "w", encoding="utf-8") as f:
        json.dump(result, f, ensure_ascii=False, indent=2)

    day_names = ["", "월", "화", "수", "목", "금"]
    print(f"\n완료: {OUTPUT}  |  기간: {week_range}")
    for day_key, entries in sorted(result["menu"].items()):
        if not entries:
            continue
        s = entries[0]["items"][0]
        print(f"  {day_names[int(day_key)]}: {s['ko']} / {s.get('en', '')} / {s.get('zh', '')}")


if __name__ == "__main__":
    scrape()
