# GRBS — Daily Check Report

**Date:** June 10, 2026  
**Auditor:** Buffy (AI Agent)  
**Mode:** Daily Check-up

---

## Sites Audited

| # | Site | URL | Type |
|---|------|-----|------|
| 1 | **GRBS** | https://shubham001312.github.io/GRBS/ | PWA (Service Worker + Manifest) |
| 2 | **Shubham-Mallick-deploy** | https://shubham001312.github.io/Shubham-Mallick/ | Static (GitHub Pages) |
| 3 | **portfolio-site** | `GitHub-Profile-Setup/portfolio-site/` | Dev source (deployed via deploy.sh) |

---

## Issues Found & Fixed

### 🔴 CRITICAL — GRBS PWA Not Updating

**Problem:** Installed PWA showed old content after deployment.  
**Root Cause:** `sw.js` used a fixed `CACHE_NAME = 'grbs-v2'` with cache-first strategy and no version-based invalidation.  
**Fix:** Upgraded to v3.0.0 with:
- Dynamic cache name: `grbs-cache-${APP_VERSION}`
- Auto-deletes all old caches on activate
- Sends `SW_UPDATED` message to all open tabs

### 🔴 CRITICAL — No Update Notification

**Problem:** Users had no way to know a new version was available.  
**Root Cause:** `index.html` registered the SW but never checked for updates.  
**Fix:** Added:
- "Update Available" banner with Refresh/Dismiss buttons
- Auto-check for new SW every 30 minutes
- Listens for `SW_UPDATED` message from service worker

### 🟡 BUG — Heatmap Crashes

**Problem:** Activity heatmap in Progress tab threw `ReferenceError: days is not defined`.  
**Root Cause:** `progress.js` `renderHeatmap()` used undefined variable `days` instead of constant `7`.  
**Fix:** Replaced with `daysPerWeek = 7`.

### 🟡 BUG — Wrong Phase Count

**Problem:** `manifest.json` description said "14 phases" but curriculum has 15 (Phase 0–14).  
**Fix:** Updated to "15 phases, 70+ projects".

### 🟡 BUG — Outdated Copyright

**Problem:** `about.js` footer showed "© 2025".  
**Fix:** Updated to "© 2026".

### 🟢 SYNC — Deploy Missing Features

**Problem:** `Shubham-Mallick-deploy/js/main.js` was missing GitHub API fallback, skeleton loading, and dynamic stats from `portfolio-site`.  
**Fix:** Synced `main.js` with full GitHub API integration, 1-hour stat caching, and `clearGithubCache()`.

---

## Files Modified

| File | Change |
|------|--------|
| `sw.js` | v2 → v3.0.0, versioned cache, old cache cleanup, SW_UPDATED messaging |
| `index.html` | Update banner HTML + SW detection logic, version comment updated |
| `manifest.json` | Phase count fixed (14 → 15) |
| `js/progress.js` | Heatmap `days` → `daysPerWeek = 7` |
| `js/about.js` | Copyright 2025 → 2026 |
| `css/styles.css` | Update banner CSS (fixed position, red accent) |
| `Shubham-Mallick-deploy/js/main.js` | Synced with GitHub API features |

---

## Deployment Guide

### GRBS (PWA)
1. Push to `main` branch → GitHub Pages auto-deploys
2. SW v3.0.0 auto-cleans old caches on first visit
3. Users see "Update Available" banner → click Refresh

### Portfolio (Static)
1. Run `bash GitHub-Profile-Setup/portfolio-site/deploy.sh`
2. Or push `Shubham-Mallick-deploy/` directly to GitHub
3. No PWA installed → users need hard refresh (Ctrl+Shift+R)

---

## Cache Strategy

| Asset | GRBS | Portfolio |
|-------|------|-----------|
| HTML | Network-first | No caching |
| CSS/JS | Cache-first, versioned | Browser cache |
| CDN (Chart.js) | Cache-first | N/A |
| Images | Cache-first | Browser cache |
