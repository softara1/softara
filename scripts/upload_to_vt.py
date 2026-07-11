import os

print("=" * 50)
print("Softara Release Automation")
print("=" * 50)

print("Current directory:")
print(os.getcwd())

print("\nFiles in current directory:")

for root, dirs, files in os.walk("."):
    for file in files:
        print(os.path.join(root, file))
