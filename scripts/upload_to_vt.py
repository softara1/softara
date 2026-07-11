import os
import sys
import time
import json
import requests
from pathlib import Path

VT_API_KEY = os.environ.get("VT_API_KEY")
if not VT_API_KEY:
    print("❌ خطأ: لم يتم توفير VT_API_KEY")
    sys.exit(1)

VT_URL = "https://www.virustotal.com/api/v3/files"
HEADERS = {"x-apikey": VT_API_KEY}

def upload_file(filepath):
    """يرفع ملفاً إلى VirusTotal ويعيد analysis ID"""
    with open(filepath, "rb") as f:
        files = {"file": (os.path.basename(filepath), f)}
        resp = requests.post(VT_URL, headers=HEADERS, files=files)
    if resp.status_code == 200:
        data = resp.json()
        return data["data"]["id"]  # هذا هو analysis ID
    else:
        print(f"Failed to upload {filepath}, status {resp.status_code}")
        return None

def get_analysis(analysis_id):
    """ينتظر حتى اكتمال التحليل ويعيد نتائج (positives, total, permalink)"""
    url = f"https://www.virustotal.com/api/v3/analyses/{analysis_id}"
    while True:
        resp = requests.get(url, headers=HEADERS)
        if resp.status_code == 200:
            data = resp.json()
            status = data["data"]["attributes"]["status"]
            if status == "completed":
                stats = data["data"]["attributes"]["stats"]
                malicious = stats.get("malicious", 0)
                total = sum(stats.values())  # مجموع كل المحركات
                permalink = f"https://www.virustotal.com/gui/file/{data['meta']['file_info']['sha256']}/detection"
                return malicious, total, permalink
            else:
                print(f"  التحليل لا يزال قيد التنفيذ ({status})... الانتظار 30 ثانية")
                time.sleep(30)
        else:
            print(f"Error getting analysis: {resp.status_code}")
            time.sleep(30)

def main():
    if len(sys.argv) != 2:
        print("Usage: python vt_scan.py <assets_directory>")
        sys.exit(1)
    assets_dir = sys.argv[1]
    if not os.path.isdir(assets_dir):
        print(f"المجلد {assets_dir} غير موجود")
        sys.exit(1)

    apk_files = list(Path(assets_dir).glob("*.apk"))
    if not apk_files:
        print("لم يتم العثور على ملفات APK في المجلد.")
        sys.exit(0)

    # سنحفظ النتائج في ملف JSON مؤقت
    results = {}
    for apk_path in apk_files:
        name = apk_path.name
        print(f"\n📤 رفع {name} إلى VirusTotal...")
        analysis_id = upload_file(str(apk_path))
        if not analysis_id:
            print(f"  ❌ فشل رفع {name}")
            results[name] = {"error": "رفع فشل"}
            continue
        print(f"  ✅ تم الرفع، جاري انتظار التحليل...")
        malicious, total, permalink = get_analysis(analysis_id)
        print(f"  🛡️ النتيجة: {malicious}/{total} | {permalink}")
        results[name] = {
            "malicious": malicious,
            "total": total,
            "permalink": permalink
        }
        # احترام الحدود: 4 طلبات في الدقيقة للحسابات المجانية
        time.sleep(16)  # 15 ثانية بين كل طلب لضمان الالتزام

    # حفظ النتائج لملف JSON ليستخدمه السكربت التالي
    with open("vt_results.json", "w") as f:
        json.dump(results, f, indent=2)
    print("\n✅ اكتمل فحص جميع الملفات.")

if __name__ == "__main__":
    main()
