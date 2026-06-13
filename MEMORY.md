# GRBS — Memory Context

## Project: GRBS (Global Roadmap to Become a World-Class AI Engineer)
**Last Updated:** June 13, 2026
**Version:** 6.0.0

## Last Task Completed
- Built a full-featured AI learning roadmap tracker with 15 phases (0–14)
- Dashboard with progress ring, readiness meters, smart recommendations, achievements, weekly digest, AI timeline, notes, and cloud sync (GitHub Gist)
- Phases include: Engineer Foundations, Programming Mastery, Mathematics for AI, Software Engineering, Frontend & AI Interface, Data Science Foundations, Machine Learning, Deep Learning, NLP Foundations, Transformers Deep Dive, Build GPT From Scratch, LLM Engineering, RAG & AI Agents, Backend for AI Products, Deployment & MLOps
- Personal AI Assistant project thread across all phases (v0 → v12)
- Career paths: Internship, Placement, AI Engineer, LLM Specialist, GPT Builder
- Features: Command palette (Ctrl+K), touch gestures, keyboard shortcuts, confetti, offline support, PWA service worker, data export/import, streak tracking, activity heatmap

## Current Architecture
- **index.html** — Single-page app shell, script loading order matters
- **css/styles.css** — All styles, light theme, mobile-first (375px+)
- **js/app.js** — Main init, navigation, search, keyboard shortcuts, touch gestures
- **js/data.js** — All 15 phases with topics, resources, projects, milestones
- **js/state.js** — State management (localStorage), phase status, streak, utilities
- **js/dashboard.js** — Dashboard tab renderer
- **js/roadmap.js** — Roadmap tab renderer
- **js/projects.js** — Projects tab renderer
- **js/progress.js** — Progress tab with charts
- **js/goals.js** — Goals tab with career paths
- **js/about.js** — About tab
- **js/achievements.js** — Achievement system
- **js/smart-recommendations.js** — Smart recommendation engine
- **js/difficulty-predictor.js** — Difficulty prediction
- **js/resource-ratings.js** — Resource rating system
- **js/weekly-digest.js** — Weekly digest
- **js/ai-timeline.js** — AI assistant evolution timeline
- **js/notes.js** — Notes system
- **js/gist-sync.js** — GitHub Gist sync
- **js/command-palette.js** — Command palette
- **js/icons.js** — Icon helper function

## Key Conventions
- Vanilla JS (no framework), all functions are global
- Template literals for HTML rendering
- localStorage for persistence (keys prefixed with `shubham_` or `grbs_`)
- CSS custom properties for theming
- Mobile-first responsive design
- All script tags loaded at bottom of body in index.html
- State is merged on load: fresh data structure + saved user progress

## New Feature: Study Timer
- Added horizontal full-screen stopwatch/timer for study sessions
- Black background overlay, minimal design, mobile+desktop friendly
- Accessible via button at top of dashboard section
- Tracks session time for the learning progress algorithm
- Persists session history in localStorage
