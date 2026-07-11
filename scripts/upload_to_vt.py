import os

print("=" * 50)
print("Softara Release Automation")
print("=" * 50)

print("\nCurrent directory:")
print(os.getcwd())


print("\nProject files:")

for root, dirs, files in os.walk("."):

    # Ignore Git folder
    if ".git" in root:
        continue

    for file in files:
        print(os.path.join(root, file))


print("\nRelease preparation completed successfully.")
