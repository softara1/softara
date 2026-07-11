import os
import json
import sys
import argparse
import requests
import re
from datetime import datetime

GITHUB_TOKEN = os.environ.get("GITHUB_TOKEN")
REPO = os.environ.get("GITHUB_REPOSITORY")

def get_current_release_body(release_id):
    """جلب الوصف الحالي للإصدار من GitHub API"""
    url = f"https://api.github.com/repos/{REPO}/releases/{release_id}"
    headers = {"Authorization": f"token {GITHUB_TOKEN}"}
    resp = requests.get(url, headers=headers)
    resp.raise_for_status()
    release = resp.json()
    return release.get("body", "")

def build_vt_table(assets, vt_results):
    """إنشاء صفوف جدول VirusTotal المدمج"""
    rows = []
    for asset in assets:
        name = asset["name"]
        if not name.lower().endswith(".apk"):
            continue
        download_url = asset["browser_download_url"]
        vt = vt_results.get(name, {})
        if vt and "error" not in vt:
            malicious = vt["malicious"]
            total = vt["total"]
            permalink = vt["permalink"]
            badge_color = "brightgreen" if malicious == 0 else "red"
            badge_url = f"https://img.shields.io/badge/{malicious}%2F{total}-Clean-{badge_color}"
            # اسم الملف كرابط تحميل
            file_link = f"[{name}]({download_url})"
            # شارة الحالة مع رابط التقرير (يمكن جعل الشارة نفسها رابطًا)
            status_badge = f"[![]( {badge_url} )]({permalink})"
            report_link = f"[View Report]({permalink})"
            rows.append(f"| {file_link} | {status_badge} | {report_link} |")
        else:
            rows.append(f"| {name} | ⚠️ فشل الفحص | - |")
    return rows

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--release-id", required=True)
    parser.add_argument("--tag", required=True)
    parser.add_argument("--output", default="final_body.md")
    args = parser.parse_args()

    release_id = args.release_id
    tag = args.tag

    # 1. تحميل نتائج VirusTotal
    vt_results = {}
    if os.path.exists("vt_results.json"):
        with open("vt_results.json") as f:
            vt_results = json.load(f)

    # 2. الحصول على أصول الإصدار الحالية
    url = f"https://api.github.com/repos/{REPO}/releases/{release_id}"
    headers = {"Authorization": f"token {GITHUB_TOKEN}"}
    resp = requests.get(url, headers=headers)
    resp.raise_for_status()
    release = resp.json()
    assets = release.get("assets", [])

    # 3. بناء صفوف الجدول المدمج
    table_rows = build_vt_table(assets, vt_results)
    if not table_rows:
        table_rows.append("| لم يتم العثور على ملفات APK | - | - |")

    # 4. تكوين الجدول
    table_header = [
        "| Build Variant | VirusTotal Status | Detailed Report |",
        "|---------------|-------------------|-----------------|"
    ]
    full_table = "\n".join(table_header + table_rows)

    # 5. قراءة الوصف الحالي للإصدار
    current_body = release.get("body", "")
    # البحث عن أي علامة لبداية جدول VirusTotal سابق (لنستبدله)
    # نمط يبحث عن "🛡️ VirusTotal Analysis" أو "## 🛡️ VirusTotal Analysis" حتى نهاية النص
    pattern = r"(^|\n)(🛡️ VirusTotal Analysis|## 🛡️ VirusTotal Analysis).*$"
    match = re.search(pattern, current_body, re.MULTILINE | re.DOTALL)
    if match:
        # إزالة الجدول القديم وكل ما بعده
        new_body = current_body[:match.start()].rstrip()
    else:
        # لا يوجد جدول قديم، نضيف الجدول بعد المحتوى الحالي مع فاصل
        new_body = current_body.rstrip() + "\n\n---\n"
    
    # إضافة الجدول الجديد
    new_body += f"\n## 🛡️ VirusTotal Analysis\n\n{full_table}\n\n"
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    new_body += f"*تم التحديث تلقائياً في {now}*"

    # 6. حفظ body الجديد في ملف
    with open(args.output, "w", encoding="utf-8") as f:
        f.write(new_body)
    print(f"✅ تم إنشاء {args.output}")

if __name__ == "__main__":
    main()
