#!/usr/bin/env python3
"""수원대학교 학식 스크래퍼 - 매일 실행하면 cafeteria_data.json 업데이트"""

import json
from datetime import date
import requests
from bs4 import BeautifulSoup
from deep_translator import GoogleTranslator

CAFETERIA_URL = "https://www.suwon.ac.kr/index.html?menuno=1792"
OUTPUT = "cafeteria_data.json"

LANG_MAP = {
    "en": "en",
    "zh": "zh-CN",
    "ja": "ja",
    "vi": "vi",
    "th": "th",
}


def scrape_menus():
    """학생식당(테이블0) + 교직원식당(테이블1) 동시 스크래핑 - 같은 페이지"""
    headers = {"User-Agent": "Mozilla/5.0 (compatible; SuwonPortal/1.0)"}
    resp = requests.get(CAFETERIA_URL, headers=headers, timeout=15)
    resp.encoding = "utf-8"
    soup = BeautifulSoup(resp.text, "html.parser")

    week_el = soup.select_one(".r_btn_wrap p.fl.tp10")
    week_range = week_el.get_text(strip=True) if week_el else ""

    tables = soup.find_all("table")
    student_menu = {}
    faculty_menu = {}

    # 학생식당: 테이블0, 구조: 구분 | 코너명 | 월~금
    if len(tables) > 0:
        for row in tables[0].find_all("tr"):
            cells = row.find_all(["th", "td"])
            if len(cells) < 3:
                continue
            meal_type = cells[0].get_text(strip=True)
            corner = cells[1].get_text(strip=True)
            if not meal_type or meal_type == "구분":
                continue
            for day_idx in range(5):
                cell_idx = day_idx + 2
                if cell_idx >= len(cells):
                    continue
                items_ko = [s.strip() for s in cells[cell_idx].get_text(separator="\n").splitlines() if s.strip()]
                day_key = str(day_idx + 1)
                if day_key not in student_menu:
                    student_menu[day_key] = []
                if items_ko:
                    student_menu[day_key].append({"type": meal_type, "corner": corner, "items_ko": items_ko})

    # 교직원식당: 테이블1, 구조: 구분 | 월~금 (코너 없음)
    if len(tables) > 1:
        for row in tables[1].find_all("tr"):
            cells = row.find_all(["th", "td"])
            if len(cells) < 2:
                continue
            meal_type = cells[0].get_text(strip=True)
            if not meal_type or meal_type == "구분":
                continue
            for day_idx in range(5):
                cell_idx = day_idx + 1
                if cell_idx >= len(cells):
                    continue
                items_ko = [s.strip() for s in cells[cell_idx].get_text(separator="\n").splitlines() if s.strip()]
                day_key = str(day_idx + 1)
                if day_key not in faculty_menu:
                    faculty_menu[day_key] = []
                if items_ko:
                    faculty_menu[day_key].append({"type": meal_type, "items_ko": items_ko})

    return week_range, student_menu, faculty_menu


def translate_all(all_ko: list) -> dict:
    result = {ko: {} for ko in all_ko}
    joined = "\n".join(all_ko)

    for lang, gt_code in LANG_MAP.items():
        try:
            translated = GoogleTranslator(source="ko", target=gt_code).translate(joined)
            lines = translated.split("\n")
            for i, ko in enumerate(all_ko):
                result[ko][lang] = lines[i].strip() if i < len(lines) else ko
        except Exception as e:
            print(f"  [{lang}] 번역 실패: {e}")
            for ko in all_ko:
                result[ko][lang] = ko

    return result


def build_menu(raw_menu: dict, has_corner: bool = True) -> dict:
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
            row = {"type": entry["type"], "items": items}
            if has_corner:
                row["corner"] = entry["corner"]
            result[day_key].append(row)
    return result


def scrape():
    week_range, raw_student, raw_faculty = scrape_menus()

    print("=== 학생식당 ===")
    student_menu = build_menu(raw_student, has_corner=True)

    print("\n=== 교직원식당 ===")
    faculty_menu = build_menu(raw_faculty, has_corner=False)

    result = {
        "updated": str(date.today()),
        "weekRange": week_range,
        "menu": student_menu,
        "facultyMenu": faculty_menu,
    }

    with open(OUTPUT, "w", encoding="utf-8") as f:
        json.dump(result, f, ensure_ascii=False, indent=2)

    day_names = ["", "월", "화", "수", "목", "금"]
    print(f"\n완료: {OUTPUT}  |  기간: {week_range}")
    for day_key, entries in sorted(result["menu"].items()):
        if not entries:
            continue
        s = entries[0]["items"][0]
        print(f"  학생 {day_names[int(day_key)]}: {s['ko']} / {s.get('en', '')}")
    for day_key, entries in sorted(result["facultyMenu"].items()):
        if not entries:
            continue
        s = entries[0]["items"][0]
        print(f"  교직원 {day_names[int(day_key)]}: {s['ko']} / {s.get('en', '')}")


if __name__ == "__main__":
    scrape()
