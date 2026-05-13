#!/usr/bin/env python3
"""수원대학교 학식 스크래퍼 - 매일 실행하면 cafeteria_data.json 업데이트"""

import json
import re
from datetime import date
import requests
from bs4 import BeautifulSoup

URL = "https://www.suwon.ac.kr/index.html?menuno=1792"
OUTPUT = "cafeteria_data.json"


def scrape():
    headers = {"User-Agent": "Mozilla/5.0 (compatible; SuwonPortal/1.0)"}
    resp = requests.get(URL, headers=headers, timeout=15)
    resp.encoding = "utf-8"
    soup = BeautifulSoup(resp.text, "html.parser")

    # 주간 날짜 범위
    week_el = soup.select_one(".r_btn_wrap p.fl.tp10")
    week_range = week_el.get_text(strip=True) if week_el else ""

    # 학생 식단 테이블 (종합강의동)
    table = soup.select_one("#contents_table2 table")
    menu = {}

    if table:
        rows = table.select("tbody tr")
        for row in rows:
            cells = row.select("td")
            if len(cells) < 3:
                continue
            meal_type = cells[0].get_text(strip=True)   # 중식/석식 등
            corner = cells[1].get_text(strip=True)       # 코너명

            for day_idx in range(5):  # 월=1 ~ 금=5
                if day_idx + 2 >= len(cells):
                    continue
                cell = cells[day_idx + 2]
                items = [
                    s.strip()
                    for s in cell.get_text(separator="\n").splitlines()
                    if s.strip()
                ]
                day_key = str(day_idx + 1)
                if day_key not in menu:
                    menu[day_key] = []
                if items:
                    menu[day_key].append({
                        "type": meal_type,
                        "corner": corner,
                        "items": items,
                    })

    result = {
        "updated": str(date.today()),
        "weekRange": week_range,
        "menu": menu,
    }

    with open(OUTPUT, "w", encoding="utf-8") as f:
        json.dump(result, f, ensure_ascii=False, indent=2)

    day_names = ["", "월", "화", "수", "목", "금"]
    print(f"업데이트 완료: {OUTPUT}")
    print(f"기간: {week_range}")
    for day_key, entries in sorted(menu.items()):
        items_preview = entries[0]["items"][:2] if entries else []
        print(f"  {day_names[int(day_key)]}: {', '.join(items_preview)}...")


if __name__ == "__main__":
    scrape()
