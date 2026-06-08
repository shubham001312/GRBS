# 🤝 Contributing to GRBS — Global Roadmap to Become a World-Class AI Engineer

Thank you for your interest in contributing! This roadmap is a community-driven project, and we welcome contributions from learners, educators, and professionals worldwide.

## 📋 Table of Contents

- [Types of Contributions](#types-of-contributions)
- [How to Contribute](#how-to-contribute)
- [Adding New Resources](#adding-new-resources)
- [Reporting Issues](#reporting-issues)
- [Pull Request Guidelines](#pull-request-guidelines)
- [Code of Conduct](#code-of-conduct)

---

## 🎯 Types of Contributions

We accept contributions in the following categories:

### 1. 📚 Resource Suggestions
- Add high-quality YouTube videos, courses, or articles
- Suggest Hindi language alternatives for existing topics
- Recommend books, papers, or interactive learning platforms
- Fix broken or outdated resource links

### 2. 🐛 Bug Reports
- Report broken links or incorrect URLs
- Fix UI/UX issues on the website
- Report JavaScript errors or functionality bugs

### 3. ✨ Feature Requests
- Suggest new roadmap phases or topics
- Propose UI/UX improvements
- Request new language alternatives

### 4. 📝 Content Improvements
- Improve topic descriptions or outcomes
- Add better project ideas
- Enhance build tasks with clearer hints

---

## 🚀 How to Contribute

### Step 1: Fork the Repository
```bash
# Click the "Fork" button on GitHub, then clone your fork
git clone https://github.com/shubham001312/GRBS.git
cd GRBS
```

### Step 2: Create a Branch
```bash
# Use a descriptive branch name
git checkout -b feature/add-hindi-ml-resources
git checkout -b fix/broken-link-phase-5
git checkout -b docs/update-contributing-guide
```

### Step 3: Make Your Changes
- Follow the coding conventions of the existing project
- Test your changes locally by opening the HTML files in a browser
- Ensure all links work correctly

### Step 4: Commit Your Changes
```bash
# Use clear, descriptive commit messages
git commit -m "feat: add Hindi alternatives for Phase 5 ML topics"
git commit -m "fix: update broken YouTube link in Phase 3"
git commit -m "docs: improve contributing guidelines"
```

### Step 5: Push and Create a Pull Request
```bash
git push origin feature/add-hindi-ml-resources
```
Then go to GitHub and create a Pull Request with a clear description.

---

## 📚 Adding New Resources

If you're adding a new YouTube video or learning resource to `js/phases.js`, follow this format:

```javascript
// English resource
{ level: 'Video', url: 'https://www.youtube.com/watch?v=VIDEO_ID', label: 'Channel Name — Video Title' },

// Hindi resource
{ level: '🇮🇳 Hindi', url: 'https://www.youtube.com/watch?v=VIDEO_ID', label: 'Channel Name — Topic (Hindi)' },
```

### Resource Quality Guidelines
- ✅ **Preferred:** Tutorials with 100K+ views from established channels
- ✅ **Preferred:** Recent content (within last 2-3 years)
- ✅ **Preferred:** Content from channels like StatQuest, 3Blue1Brown, Karpathy, freeCodeCamp, etc.
- ❌ **Avoid:** Re-uploads, low-quality recordings, or outdated content
- ❌ **Avoid:** Paywalled content (use free resources only)
- ❌ **Avoid:** Duplicate resources (check if the topic already has similar resources)

---

## 🐛 Reporting Issues

Use our [Issue Templates](https://github.com/shubham001312/GRBS/issues/new/choose) to report:

- **Bug Report** — Broken links, UI issues, errors
- **Feature Request** — New topics, improvements, suggestions
- **Resource Suggestion** — New learning resources to add

---

## 🔀 Pull Request Guidelines

### PR Title Format
```
<type>: <description>

feat: add Hindi alternatives for Phase 14 MLOps topics
fix: correct broken YouTube link in Phase 8 NLP
docs: update README with contribution badges
refactor: reorganize phases.js for better readability
```

### PR Description Template
```markdown
## Description
Brief description of what this PR does.

## Type of Change
- [ ] Bug fix (broken link, UI fix)
- [ ] New resource addition
- [ ] Feature enhancement
- [ ] Documentation update

## Testing
- [ ] I have tested my changes locally
- [ ] All YouTube links return HTTP 200
- [ ] Changes work correctly in the browser

## Screenshots (if applicable)
Add screenshots showing your changes.
```

### PR Checklist
- [ ] Code follows the existing style and conventions
- [ ] Changes are tested locally
- [ ] YouTube links are verified (all return HTTP 200)
- [ ] Commit messages are clear and descriptive
- [ ] PR has a clear description of changes

---

## 📜 Code of Conduct

### Our Standards
- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Respect different viewpoints and experiences

### Contributing with Respect
- Use welcoming and inclusive language
- Be respectful of differing viewpoints
- Accept constructive criticism gracefully
- Focus on what is best for the community

---

## 🏷️ Labels for Issues

| Label | Description |
|-------|-------------|
| `good first issue` | Perfect for newcomers |
| `resource` | New resource suggestion |
| `bug` | Something is broken |
| `enhancement` | New feature or improvement |
| `hindi` | Hindi language content |
| `documentation` | Documentation updates |

---

## 📞 Getting Help

- Open a [Discussion](https://github.com/shubham001312/GRBS/discussions) for questions
- Check existing issues before creating a new one
- Tag maintainers in your PR for review

---

## 🙏 Thank You!

Every contribution helps make this roadmap better for AI/ML learners worldwide. Whether it's fixing a typo, adding a resource, or suggesting a new feature — we appreciate your help!
