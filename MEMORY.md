# 🧠 GRBS — Session Memory File

> **Purpose:** This file captures the project state, completed tasks, and remaining work so that a new AI session can pick up seamlessly.

---

## 📋 Project Overview

**GRBS (Global Roadmap to Become a World-Class AI Engineer)** is a comprehensive 18-phase learning roadmap website with:
- Interactive HTML/CSS/JS website (no frameworks)
- 500+ curated YouTube video resources across 18 phases
- Hindi language alternatives for Indian learners
- Local storage-based progress tracking
- GitHub: `https://github.com/shubham001312/GRBS.git`
- GitHub Username: `shubham001312`

---

## 🗂️ Key Files

| File | Purpose |
|------|---------|
| `js/phases.js` | **Core data file** — All 18 phases, topics, resources, build tasks |
| `index.html` | Landing page |
| `roadmap.html` | Interactive roadmap viewer |
| `study.html` | Study mode with progress tracking |
| `about.html` | About page |
| `README.md` | GitHub README with badges, roadmap table, features |
| `CONTRIBUTING.md` | Contribution guidelines for open source |
| `.github/ISSUE_TEMPLATE/` | Bug report, feature request, resource suggestion templates |
| `.github/PULL_REQUEST_TEMPLATE.md` | PR template |

---

## ✅ Completed Tasks (This Session)

### 1. Updated YouTube URLs (Commit `aa13732`)
- Updated 52+ YouTube video links across all 18 phases
- Fixed broken/outdated URLs
- Updated resource labels to be more descriptive

### 2. Fixed Mismatched Resources (Commit `4d2f29d`)
- **Phase 14 (MLOps):** Monitoring → Evidently AI Data Drift (`J_uH5x57p-0`), W&B → Computerio W&B Tutorial (`_3z0r2k8Nh4`)
- **Phase 15 (Infrastructure):** DeepSpeed → DeepSpeed ZeRO Tutorial (`Zj4KiBdvK6s`), FSDP → PyTorch FSDP Tutorial (`8_k76AHu__s`), vLLM → Anyscale vLLM & PagedAttention (`5ZlavKF_98U`), TensorRT → Neural Internet ONNX & TensorRT (`zL3_rnjfrT4`)
- **Phase 17 (Portfolio):** Resume → AI Engineer Roadmap (`7MfBlmAomeM`), Interview → Exponent ML Interview Prep (`PLrtCHHeadkHqYX7O5cjHeWHzH2jzQqWg5`), Off-campus → Cold Job Outreach (`DjqQZBR4bcM`)

### 3. Added Hindi Alternatives (Commit `81fbd45`)
- FastAPI → CodeWithHarry — FastAPI (Hindi) (`52c7Kxp_14E`)
- Kubernetes → Easy Engineering Classes — Kubernetes (Hindi) (`mYVzuE3daY8`)
- GitHub Actions → The DevOps Hut — GitHub Actions (Hindi) (`ookIfjc8dW0`)
- MLflow → Vikash Das — MLflow (Hindi) (`GlvgqliaQaA`)
- Research Papers → CampusX — Research Papers (Hindi) (`x6slke5niqw`)

### 4. Created Open Source Infrastructure (Commit `81fbd45`)
- `README.md` — Professional, SEO-optimized with badges, roadmap table, features
- `CONTRIBUTING.md` — Contribution guidelines with PR templates, resource format
- `.github/ISSUE_TEMPLATE/bug_report.md` — Bug report template
- `.github/ISSUE_TEMPLATE/feature_request.md` — Feature request template
- `.github/ISSUE_TEMPLATE/resource_suggestion.md` — Resource suggestion template
- `.github/PULL_REQUEST_TEMPLATE.md` — PR template

### 5. Verified New URLs
- All 9 mismatched resource URLs → HTTP 200 ✅
- All 5 new Hindi URLs → HTTP 200 ✅

---

## 🔄 Remaining Tasks

### HIGH PRIORITY
1. **Verify ALL 150+ YouTube URLs** — Need to run curl on all URLs from phases.js and fix any broken ones. The basher agent extracted 150 unique URLs to `/tmp/all_urls.txt` but the full verification was interrupted. Run:
   ```bash
   while IFS= read -r url; do status=$(curl -o /dev/null -s -w '%{http_code}' -L "$url" --max-time 10 2>/dev/null); echo "$status $url"; done < /tmp/all_urls.txt | tee /tmp/url_results.txt
   ```
   Then check for non-200 status codes.

### MEDIUM PRIORITY
2. **Add more Hindi alternatives** to topics that still lack them:
   - Docker (advanced) — CodeWithHarry has a Docker course in Hindi
   - CUDA/GPU Programming — Very limited Hindi content, may need English
   - DeepSpeed/FSDP/vLLM — Advanced topics, limited Hindi content
   - System Design (AI-specific) — CodeWithHarry has a system design course

3. **Phase 15 (Distributed Training)** — DeepSpeed, FSDP, vLLM, and TensorRT topics still all use the same `Aladdin Persson — PyTorch Advanced` video. The specific topic videos were added but the PyTorch on GPU, Data parallelism, DDP topics still share one generic video. Consider finding more specific resources.

### LOW PRIORITY
4. **Website testing** — Open `index.html` in browser to verify the website works correctly with the updated phases.js data
5. **SEO optimization** — Add meta tags, Open Graph tags to HTML files
6. **Add a LICENSE file** — MIT license for open source
7. **Add a `.gitignore` file** — If not already present

---

## 📝 Important Notes

### Hindi Resource Label Convention
All Hindi resources follow this format:
```javascript
{ level: '🇮🇳 Hindi', url: 'https://www.youtube.com/watch?v=VIDEO_ID', label: 'Channel — Topic (Hindi)' }
```
Note: Label uses `(Hindi)` not `in Hindi`.

### Resource Format in phases.js
```javascript
{ level: 'Video', url: 'https://www.youtube.com/watch?v=VIDEO_ID', label: 'Channel — Video Title' },
{ level: '🇮🇳 Hindi', url: 'https://www.youtube.com/watch?v=VIDEO_ID', label: 'Channel — Topic (Hindi)' },
{ level: 'Docs', url: 'https://...', label: 'Documentation Title' },
{ level: 'Paper', url: 'https://arxiv.org/abs/...', label: 'Paper Title — Authors' },
```

### Git Workflow
- Branch: `main`
- Remote: `origin` → `https://github.com/shubham001312/GRBS.git`
- Commit messages: `feat:`, `fix:`, `docs:` prefix convention
- Always verify YouTube URLs with curl before committing

### Windows Environment
- Shell: bash (Git Bash on Windows)
- Use `grep -oE` not `grep -oP` (Perl regex not supported)
- Use `\r\n` line endings (Windows CRLF)

---

## 📊 Session Statistics

| Metric | Value |
|--------|-------|
| Total Commits | 3 |
| Files Modified | 1 (js/phases.js) |
| Files Created | 6 (README.md, CONTRIBUTING.md, 3 issue templates, PR template) |
| YouTube URLs Updated | 52+ |
| Mismatched Resources Fixed | 9 |
| Hindi Alternatives Added | 5 |
| Total YouTube URLs in phases.js | ~150 unique |

---

## 🔗 Quick References

- **GitHub Repo:** https://github.com/shubham001312/GRBS
- **Main Data File:** `js/phases.js`
- **All YouTube URLs:** Extract with `grep -oE 'https://www.youtube.com/(watch\?v=|playlist\?list=)[a-zA-Z0-9_-]+' js/phases.js | sort -u`
- **Hindi Resources:** Search with `grep -n '🇮🇳 Hindi' js/phases.js`

---

*Last updated: Session end — all changes committed and pushed to `main`*
