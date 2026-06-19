# GRBS v7.0.0 — Glassmorphism Redesign & Dual-Theme System

**Release Date:** June 20, 2026
**Previous Version:** v6.5.0

---

## 🎨 Dual-Theme System — Neumorphism + Glassmorphism

GRBS now ships with **two premium design themes** that you can toggle with one click in the header:

### Neumorphism (Default)
- Soft light background `#e8eaf0`
- Raised card elements with subtle shadow pairs
- Clean, modern aesthetic with no backdrop blur
- Neumorphic buttons with inset/outset shadow effects
- Perfect for daytime use and reduced eye strain

### Glassmorphism
- Deep dark background `#0a0a1a` with animated gradient mesh
- Frosted glass cards with `backdrop-filter: blur(20px) saturate(180%)`
- Semi-transparent borders and glass panels
- Premium immersive dark theme aesthetic

### Theme Toggle
- Click the ☀️/🌙 button in the header to switch themes instantly
- Your choice is saved to `localStorage` and persists across sessions

---

## 🖥️ Auto OS Theme Detection

- New visitors automatically get the theme matching their OS `prefers-color-scheme` preference
- Dark OS → Glassmorphism, Light OS → Neumorphism
- Listens for real-time OS theme changes and auto-updates until user manually chooses
- Manual toggle overrides OS detection and persists via localStorage

---

## ✨ Smooth 400ms Crossfade Transition

- Polished 400ms transition between themes using CSS transitions
- Subtle opacity fade on main content during switch
- Scoped `theme-transitioning` class activates only during toggle
- Material Design easing `cubic-bezier(0.4, 0, 0.2, 1)` for smooth feel
- Restores element-specific transitions (rings, meters) after crossfade completes

---

## 🧹 Repository Cleanup

- Removed unnecessary files: APK, backup JSON, prompt files, staging directories
- Updated `.gitignore` with binary/backup file exclusions
- Cleaned up TalkBuzz subfolder
- Removed GitHub-Profile-Setup and _profile_staging directories

---

## ⚡ Other Improvements

- Bumped version to 7.0.0 across all files (CSS, JS, manifest, service worker)
- Updated `manifest.json` background color for theme support
- Updated HTML `theme-color` meta tag
- Responsive mobile fixes for both themes
- All 20 phases, 600+ resources, DSA track, and companies tab fully functional

---

## 📦 Files Changed

- `css/styles.css` — Complete glassmorphism redesign + neumorphism overrides + crossfade transitions
- `js/app.js` — Theme system with toggle, OS detection, localStorage persistence
- `index.html` — Version bump, theme-color meta, favicon link
- `sw.js` — Version bump to 7.0.0
- `manifest.json` — Background color updated for dark theme
- `README.md` — Updated documentation for v7.0.0 features

---

**Full Changelog:** https://github.com/shubham001312/GRBS/compare/v6.5.0...v7.0.0
