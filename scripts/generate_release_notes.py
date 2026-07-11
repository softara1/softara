import os
import hashlib


print("=" * 50)
print("Generating Release Notes...")
print("=" * 50)


apk_files = []


print("\nSearching for APK files...\n")


for root, dirs, filenames in os.walk("apk_files"):

    # تجاهل ملفات GitHub الداخلية
    if ".git" in root or ".github" in root:
        continue

    for filename in filenames:

        if filename.lower().endswith(".apk"):

            path = os.path.join(root, filename)

            print("FOUND APK:")
            print(path)

            size = os.path.getsize(path) / (1024 * 1024)

            sha256 = hashlib.sha256()

            with open(path, "rb") as f:

                for chunk in iter(lambda: f.read(4096), b""):
                    sha256.update(chunk)


            apk_files.append({

                "name": filename,
                "size": f"{size:.2f} MB",
                "sha": sha256.hexdigest()

            })


print("\nTotal APK files found:", len(apk_files))


with open("release_notes.md", "w", encoding="utf-8") as f:


    f.write("# What's New\n\n")

    f.write("- تحسينات وإصلاحات\n\n")


    f.write("---\n\n")


    f.write("## 📦 Downloads\n\n")


    f.write("| File | Size | SHA-256 |\n")
    f.write("|------|------|---------|\n")


    if apk_files:


        for item in apk_files:

            f.write(
                f"| {item['name']} | {item['size']} | `{item['sha'][:12]}...` |\n"
            )


    else:


        f.write("| No APK files found | - | - |\n")



    f.write("\n---\n\n")


    f.write("## 🛡 VirusTotal Analysis\n\n")


    f.write("| Build Variant | Status | Report |\n")
    f.write("|---------------|--------|--------|\n")



    if apk_files:


        for item in apk_files:

            f.write(
                f"| {item['name']} | ⏳ Pending | - |\n"
            )


    else:


        f.write("| No APK files found | - | - |\n")



print("\nrelease_notes.md created successfully")
