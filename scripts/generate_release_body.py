import os
import json
import hashlib
import sys
import argparse
import requests
from pathlib import Path
from datetime import datetime

GITHUB_TOKEN = os.environ.get("GITHUB_TOKEN")
REPO = os.environ.get("GITHUB_REPOSITORY")

def get_release_assets(release_id):
    url = f"https://api.github.com/repos/{REPO}/releases/{release_id}"
    headers = {"Authorization": f"token {GITHUB_TOKEN}"}
    resp = requests.get(url, headers=headers)
    resp.raise_for_status()
    release = resp.json()
    return release.get("assets", [])

def calc_sha256(filepath):
    sha = hashlib.sha256()
    with open(filepath, "rb") as f:
        for chunk in iter(lambda: f.read(4096), b""):
            sha.update(chunk)
    return sha.hexdigest()

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--release-id", required=True)
    parser.add_argument("--tag", required=True)
    parser.add_argument("--output", default="final_body.md")
    args = parser.parse_args()

    release_id = args.release_id
    tag = args.tag

    # تحميل نتائج VirusTotal
    vt_results = {}
    if os.path.exists("vt_results.json"):
        with open("vt_results.json") as f:
            vt_results = json.load(f)

    assets = get_release_assets(release_id)

    files_info = []
    for asset in assets:
        name = asset["name"]
        if not name.lower().endswith(".apk"):
            continue
        local_path = f"assets/{name}"
        if not os.path.exists(local_path):
            print(f"تحذير: الملف {local_path} غير موجود محلياً، سيتم تخطي SHA256")
            size_mb = asset["size"] / (1024*1024)
            sha256_short = "غير متوفر"
        else:
            size_mb = os.path.getsize(local_path) / (1024*1024)
            sha256_short = calc_sha256(local_path)[:12] + "..."
        files_info.append({
            "name": name,
            "download_url": asset["browser_download_url"],
            "size_mb": f"{size_mb:.2f}",
            "sha256_short": sha256_short,
        })

    lines = []
    lines.append(f"# {tag}\n")
    lines.append("## 📦 التحميلات\n")
    lines.append("| الملف | الحجم | SHA-256 (مختصر) | تحميل |")
    lines.append("|-------|-------|----------------|-------|")
    for info in files_info:
        lines.append(
            f"| {info['name']} | {info['size_mb']} MB | `{info['sha256_short']}` | [تحميل]({info['download_url']}) |"
        )
    lines.append("")
    lines.append("---")
    lines.append("## 🛡️ فحص VirusTotal")
    lines.append("| الملف | الحالة | تقرير مفصل |")
    lines.append("|-------|--------|------------|")
    for info in files_info:
        name = info["name"]
        vt = vt_results.get(name, {})
        if vt and "error" not in vt:
            malicious = vt["malicious"]
            total = vt["total"]
            permalink = vt["permalink"]
            badge_color = "brightgreen" if malicious == 0 else "red"
            badge_url = f"https://img.shields.io/badge/{malicious}%2F{total}-Clean-{badge_color}"
            lines.append(
                f"| {name} | ![]({badge_url}) | [عرض التقرير]({permalink}) |"
            )
        else:
            lines.append(f"| {name} | ⚠️ فشل الفحص | - |")
    lines.append("")
    lines.append("---")
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    lines.append(f"*تم التوليد تلقائياً في {now}*")

    final = "\n".join(lines)
    with open(args.output, "w", encoding="utf-8") as f:
        f.write(final)
    print(f"✅ تم إنشاء {args.output}")

if __name__ == "__main__":
    main()
