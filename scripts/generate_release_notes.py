import os
import hashlib


print("Generating Release Notes...")


files = []

for root, dirs, filenames in os.walk("."):

    for filename in filenames:

        if filename.endswith(".apk"):

            path = os.path.join(root, filename)

            size = os.path.getsize(path) / (1024 * 1024)

            sha256 = hashlib.sha256()

            with open(path, "rb") as f:
                for chunk in iter(lambda: f.read(4096), b""):
                    sha256.update(chunk)

            files.append({
                "name": filename,
                "size": f"{size:.2f} MB",
                "sha": sha256.hexdigest()
            })


with open("release_notes.md", "w", encoding="utf-8") as f:

    f.write("# What's New\n\n")
    f.write("- تحسينات وإصلاحات\n\n")

    f.write("---\n\n")

    f.write("## 📦 Downloads\n\n")

    f.write("| File | Size | SHA-256 |\n")
    f.write("|------|------|---------|\n")


    for item in files:

        f.write(
            f"| {item['name']} | {item['size']} | `{item['sha'][:12]}...` |\n"
        )


    f.write("\n---\n\n")

    f.write("## 🛡 VirusTotal Analysis\n\n")

    f.write("| File | Status |\n")
    f.write("|------|--------|\n")


    for item in files:

        f.write(
            f"| {item['name']} | ⏳ Pending |\n"
        )


print("release_notes.md created")
