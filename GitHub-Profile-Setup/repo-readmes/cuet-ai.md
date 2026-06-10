<div align="center">

# 🎓 CUET-AI

### *AI-powered assistant for CUET students — official-link-first answers with smart guardrails*

[![Live Demo](https://img.shields.io/badge/🌐_Try_It-2496ED?style=for-the-badge&logo=huggingface&logoColor=white)](https://shubham001312-cuet-ai.hf.space/)
[![GitHub Stars](https://img.shields.io/github/stars/shubham001312/cuet-ai?style=for-the-badge&color=yellow)](https://github.com/shubham001312/cuet-ai/stargazers)

---

</div>

## 🎯 What is CUET-AI?

**CUET-AI** is a browser-based AI chatbot designed specifically for CUET students. It provides accurate, official-link-first answers about admissions, programs, schedules, and campus life — powered by Google's Gemini API with built-in rate limiting and context management.

## ✨ Features

- 🤖 **AI-Powered Answers** — Uses Gemini 2.5 Flash for intelligent responses
- 🔗 **Official Links First** — Prioritizes official CUET sources
- 🛡️ **Rate Limiting** — Prevents free-tier API abuse
- 📝 **Conversation Memory** — Maintains context within a session
- 🐳 **Dockerized** — One-command deployment anywhere
- 🌐 **Public Deployment** — Live on Hugging Face Spaces
- 🔒 **Secure** — Server-side API key management

## 🚀 Quick Start

### Option 1: Docker (Recommended)

```bash
git clone https://github.com/shubham001312/cuet-ai.git
cd cuet-ai
docker-compose up --build
```

### Option 2: Local Python

```bash
export GEMINI_API_KEY="your-api-key-here"
python app.py --open-browser
```

### Option 3: Hugging Face Spaces

1. Fork this repository
2. Create a new Docker Space on Hugging Face
3. Add `GEMINI_API_KEY` as a secret in Space Settings
4. Deploy!

## ⚙️ Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `GEMINI_API_KEY` | — | Your Gemini API key (required) |
| `GEMINI_MODEL` | `gemini-2.5-flash-lite` | Model to use |
| `CUET_AI_RATE_LIMIT_MAX_REQUESTS` | `20` | Max requests per window |
| `CUET_AI_RATE_LIMIT_WINDOW_SECONDS` | `3600` | Rate limit window |
| `CUET_AI_CONTEXT_MESSAGES` | `8` | Messages kept in context |

## 🛠️ Tech Stack

| Component | Technology |
|-----------|-----------|
| Backend | Python (stdlib only — no pip packages!) |
| AI Model | Google Gemini 2.5 Flash |
| Containerization | Docker + Docker Compose |
| Deployment | Hugging Face Spaces |

## 📄 License

Educational and development purposes.

---

<div align="center">

**Built with ❤️ by [Shubham Mallick](https://github.com/shubham001312)**

</div>
