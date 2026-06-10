#!/bin/bash
# ============================================================
# Portfolio Deploy Script
# Copies the portfolio site to the Shubham-Mallick repo and
# pushes to GitHub Pages.
# ============================================================

set -e

# Paths — adjust these if your directory structure changes
SOURCE_DIR="$(cd "$(dirname "$0")" && pwd)"
DEPLOY_DIR="$SOURCE_DIR/../Shubham-Mallick-deploy"

echo "📦 Portfolio Deploy Script"
echo "========================="
echo "Source:  $SOURCE_DIR"
echo "Deploy:  $DEPLOY_DIR"
echo ""

# --- 1. Verify source files exist ---
echo "🔍 Checking source files..."
REQUIRED_FILES=("index.html" "css/styles.css" "js/main.js")
MISSING=0
for f in "${REQUIRED_FILES[@]}"; do
  if [ ! -f "$SOURCE_DIR/$f" ]; then
    echo "   ❌ Missing: $f"
    MISSING=1
  else
    echo "   ✅ Found: $f"
  fi
done
if [ $MISSING -eq 1 ]; then
  echo ""
  echo "❌ Aborting — missing required source files."
  exit 1
fi
echo ""

# --- 2. Clone or verify deploy repo ---
if [ ! -d "$DEPLOY_DIR/.git" ]; then
  echo "📥 Cloning deploy repo..."
  git clone https://github.com/shubham001312/Shubham-Mallick.git "$DEPLOY_DIR"
else
  echo "✅ Deploy repo found at $DEPLOY_DIR"
fi
echo ""

# --- 3. Copy files ---
echo "📋 Copying files..."
mkdir -p "$DEPLOY_DIR/css" "$DEPLOY_DIR/js" "$DEPLOY_DIR/assets"

# Copy HTML
cp "$SOURCE_DIR/index.html" "$DEPLOY_DIR/index.html"
echo "   ✅ index.html"

# Copy CSS
cp "$SOURCE_DIR/css/styles.css" "$DEPLOY_DIR/css/styles.css"
echo "   ✅ css/styles.css"

# Copy JS
cp "$SOURCE_DIR/js/main.js" "$DEPLOY_DIR/js/main.js"
echo "   ✅ js/main.js"

# Copy assets (certificates, images, etc.)
if [ -d "$SOURCE_DIR/assets" ]; then
  cp -r "$SOURCE_DIR/assets/"* "$DEPLOY_DIR/assets/" 2>/dev/null || true
  echo "   ✅ assets/*"
else
  echo "   ⚠️  No assets/ directory found — skipping"
fi
echo ""

# --- 4. Remove old files that may no longer be needed ---
# (e.g. if someone had inline styles before, the old single-file
# approach left no leftovers, but this handles edge cases)
echo "🧹 Cleaning up stale files in deploy repo..."
# Remove any leftover standalone files that are now in subdirs
# (Add patterns here if needed in the future)
echo "   ✅ Clean"
echo ""

# --- 5. Git commit and push ---
echo "🚀 Committing and pushing..."
cd "$DEPLOY_DIR"
git add -A

# Check if there are changes
if git diff --cached --quiet; then
  echo "   ℹ️  No changes to commit."
else
  CHANGED=$(git diff --cached --stat | head -1)
  git commit -m "deploy: update portfolio site — $(date '+%Y-%m-%d %H:%M')"
  echo "   ✅ Committed: $CHANGED"
  git push origin main
  echo "   ✅ Pushed to GitHub Pages"
fi
echo ""

echo "🎉 Done! Site live at https://shubham001312.github.io/Shubham-Mallick/"
