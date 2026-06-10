# 🚀 How to Deploy Your Professional GitHub Profile

## Step 1: Update Your Profile README

The file `PROFILE-README.md` in this folder should be placed in your **Shubham-Mallick** repository (which is your profile repo — the special repo that shows on your GitHub profile page).

### Option A: Using GitHub Web (Easiest)
1. Go to https://github.com/shubham001312/Shubham-Mallick
2. Click on `README.md`
3. Click the ✏️ **Edit** button (pencil icon)
4. Delete all existing content
5. Copy the contents of `PROFILE-README.md` from this folder
6. Paste it into the editor
7. Click **Commit changes**

### Option B: Using Git CLI
```bash
cd C:\Users\shubh\OneDrive\Desktop\GRBS\GitHub-Profile-Setup
copy PROFILE-README.md C:\Users\shubh\OneDrive\Desktop\Shubham-Mallick\README.md
cd C:\Users\shubh\OneDrive\Desktop\Shubham-Mallick
git add README.md
git commit -m "feat: professional GitHub profile README with featured projects, tech stack, stats, and goals"
git push origin main
```

---

## Step 2: Pin Your Best 6 Repositories

After updating your profile README, go to your GitHub profile and pin these 6 repositories:

1. Go to https://github.com/shubham001312
2. Click **"Customize your pins"** (the gear icon next to "Pinned")
3. Select these 6 repos:

| # | Repository | Why Pin? |
|---|-----------|----------|
| 1 | **GRBS** | Your flagship project — AI/ML roadmap tracker with PWA |
| 2 | **cuet-ai** | AI chatbot — Dockerized, deployed on Hugging Face |
| 3 | **newsbuzz** | Full-stack news app — deployed on GitHub Pages |
| 4 | **TalkBuzz** | AI chat app — TypeScript, Gemini API, live on AI Studio |
| 5 | **guzu--ANDROID_SOURCE_CODE** | Flutter Android app — cross-platform |
| 6 | **ROSHNI** | Photo gallery — deployed on GitHub Pages |

4. Click **Save pins**

---

## Step 3: Update Each Repository's README

For each repository, replace its README.md with the corresponding file from the `repo-readmes/` folder.

### For each repo, do this:

```bash
# Example for GRBS (repeat for each repo)
cd C:\Users\shubh\OneDrive\Desktop\GRBS\GitHub-Profile-Setup\repo-readmes

# Copy the README to the repo
copy GRBS.md C:\Users\shubh\OneDrive\Desktop\GRBS\README.md

# Go to the repo and commit
cd C:\Users\shubh\OneDrive\Desktop\GRBS
git add README.md
git commit -m "docs: professional README with badges, features, quick start, and project structure"
git push origin main
```

### Mapping: Which README goes where

| README File | Repository | Deployed URL |
|-------------|-----------|-------------|
| `GRBS.md` | GRBS | https://shubham001312.github.io/GRBS/ |
| `cuet-ai.md` | cuet-ai | https://shubham001312.github.io/cuet-ai/ |
| `newsbuzz.md` | newsbuzz | https://shubham001312.github.io/newsbuzz/ |
| `TalkBuzz.md` | TalkBuzz | https://ai.studio/apps/711f93ff-5996-4064-aa53-322513607bf5 |
| `ROSHNI.md` | ROSHNI | https://shubham001312.github.io/ROSHNI/ |
| `Goru.md` | Goru | https://ai.studio/apps/4228ebac-e4e4-49cc-92f3-4da3ae544e9b |
| `guzu.md` | guzu--ANDROID_SOURCE_CODE | — |
| `MINIMAL-CLOCK.md` | MINIMAL-CLOCK-VERSION-1.0.0 | — |
| `radhee-love.md` | radhee-love | https://shubham001312.github.io/radhee-love/ |
| `good-morning.md` | good-morning | https://shubham001312.github.io/good-morning/ |
| `C-Language-Learning-Progress.md` | C-Language-Learning-Progress | — |
| `SMALL-PROJECTS-PYTHON.md` | SMALL-PROJECTS-PYTHON | — |
| `MATHAMOTA.md` | MATHAMOTA | — |
| `MATHAMOTAA.md` | MATHAMOTAA | — |
| `Wifto.md` | Wifto | — |
| `Wifto-Platform.md` | Wifto-Platform | — |
| `wifto-project.md` | wifto-project | https://shubham001312.github.io/wifto-project/ |
| `-Wifto-python-html.md` | -Wifto-python-html | — |
| `chat.md` | chat- | — |
| `index.md` | index.html | — |
| `Labwork.md` | Labwork-26-05-26 | — |
| `lab-work-07.04.2026.md` | lab-work-07.04.2026 | — |

---

## Step 4: Add Topics/Tags to Each Repository

Go to each repository → Click **"About"** → Click the ⚙️ gear icon → Add topics:

| Repository | Suggested Topics |
|-----------|-----------------|
| GRBS | `ai-roadmap` `machine-learning` `pwa` `javascript` `education` |
| cuet-ai | `chatbot` `gemini-api` `docker` `python` `huggingface` |
| newsbuzz | `news` `javascript` `web-app` `netlify` |
| TalkBuzz | `ai-chat` `typescript` `gemini` `vite` |
| ROSHNI | `gallery` `html` `css` `responsive` |
| Goru | `ai-app` `typescript` `gemini` `vite` |
| guzu--ANDROID_SOURCE_CODE | `flutter` `android` `browser` `dart` `privacy` |
| radhee-love | `web-art` `html` `css` `animation` |
| good-morning | `web-art` `html` `css` |

---

## Step 5: Verify Everything

After deploying, check:

1. ✅ Your profile page at https://github.com/shubham001312 shows the new README
2. ✅ Your 6 pinned repos show the best projects
3. ✅ Each repo's README has proper badges, deploy links, and project descriptions
4. ✅ Click through all deploy links to make sure they work

---

## 📋 Quick Copy-Paste Commands

For the lazy approach, run these commands to update all repos at once:

```bash
# Set paths
SETUP="C:\Users\shubh\OneDrive\Desktop\GRBS\GitHub-Profile-Setup\repo-readmes"
DESKTOP="C:\Users\shubh\OneDrive\Desktop"

# GRBS
copy "%SETUP%\GRBS.md" "%DESKTOP%\GRBS\README.md"
cd "%DESKTOP%\GRBS" && git add README.md && git commit -m "docs: professional README" && git push

# cuet-ai
copy "%SETUP%\cuet-ai.md" "%DESKTOP%\cuet-ai\README.md"
cd "%DESKTOP%\cuet-ai" && git add README.md && git commit -m "docs: professional README" && git push

# newsbuzz
copy "%SETUP%\newsbuzz.md" "%DESKTOP%\newsbuzz\README.md"
cd "%DESKTOP%\newsbuzz" && git add README.md && git commit -m "docs: professional README" && git push

# (repeat for each repo...)
```

---

*All files are in: `C:\Users\shubh\OneDrive\Desktop\GRBS\GitHub-Profile-Setup\`*
