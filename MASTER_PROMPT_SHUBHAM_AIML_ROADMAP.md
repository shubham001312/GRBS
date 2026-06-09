# MASTER PROMPT — SHUBHAM'S AI/ML ROADMAP TRACKER v2.0
# For: Claude Sonnet / GPT-4o level AI | Single-file HTML | GitHub Pages | Mobile-First

---

## ⚠️ READ BEFORE DOING ANYTHING

You are a **Principal AI Engineer, Staff ML Engineer, LLM Research Engineer, Software Architect,
Career Mentor, and Curriculum Designer** combined into one.

Your job is NOT to respond with text. Your job is to:
1. Read this entire prompt top to bottom before writing a single line of code.
2. Create a **complete to-do list** of every task (listed at the bottom of this prompt).
3. Work through that to-do list in order, checking each item off mentally before moving on.
4. Output a **single, self-contained HTML file** — no external JS files, no build step, no npm.
5. Every feature must work. No placeholders. No "TODO" comments in output code.
6. The final file must deploy directly to GitHub Pages by renaming it `index.html`.

---

## STUDENT PROFILE

- **Name:** Shubham
- **Degree:** B.Tech CSE (AI) — currently entering 2nd Semester
- **CGPA:** 7.5+ → Target 8+
- **College:** BBIT
- **Daily Study Time:** 4–5 hours outside college
- **Hardware:** Laptop with RTX 3050 (local GPU training possible)
- ** no need to mention student profile in the site of me , let the about sec as it is  
- **Interests:** AI, LLMs, GPTs, AI Products, Software Engineering

---

## CAREER GOALS (Priority Order)

1. **Get a paid internship before entering 3rd year**
2. **Become placement-ready before end of 7th semester**
3. Become an AI Engineer
4. Become an LLM Specialist
5. Build GPT-style models from scratch
6. Build complete AI products with professional interfaces
7. Achieve strong off-campus and global career opportunities

**Target Career Path:**
`Software Engineer → AI Engineer → LLM Specialist → AI Product Builder`

**DO NOT** optimize for Prompt Engineering or API-only development.
**DO** optimize for deep engineering skills.

---

## DESIGN REQUIREMENTS — MOBILE FIRST (NON-NEGOTIABLE)

- **Primary target screen:** 375px–430px wide (iPhone/Android standard)
- Bottom navigation bar (fixed, 4–5 tabs with icons)
- All cards must be full-width on mobile, max 600px on desktop
- Font size: minimum 14px body, 16px+ for headings
- Touch targets: minimum 44×44px for all tappable elements
- No horizontal scroll on any screen
- Dark mode default with light mode toggle
- Color palette: Deep navy `#0A0F1E`, accent blue `#4F8EF7`, accent green `#22D3A5`, warning amber `#F59E0B`, danger red `#EF4444`, surface `#131929`, card `#1C2640`
- Font: Inter (Google Fonts) for body; JetBrains Mono for code/stats
- All progress rings use SVG with stroke animation on load
- Smooth CSS transitions (no janky JS animations)

---

## APPLICATION ARCHITECTURE

### Storage
- Use `localStorage` for all persistence (no backend needed)
- Keys: `shubham_roadmap_v2`, `shubham_todos_v2`, `shubham_notes_v2`, `shubham_stats_v2`
- Auto-save on every change (debounced 500ms)
- Export to JSON button (downloads full state)
- Import from JSON button (restores state)

### Views / Tabs (Bottom Nav)
1. **Dashboard** — Overview stats, readiness meters, streak, today's tasks
2. **Roadmap** — All 14 phases accordion, topics checklist, resources, projects
3. **Projects** — Project tracker with status (Not Started / In Progress / Done / Deployed)
4. **Progress** — Visual charts, skill levels, readiness radars
5. **Goals** — Career roadmaps, milestones, internship/placement timelines

---

## DASHBOARD TAB — REQUIRED ELEMENTS

### Hero Section
- Greeting: "Hey Shubham 👋" with current date
- **Overall Completion %** — large animated ring (SVG)
- **Study streak** counter (days in a row with activity)

### Readiness Meters (animated progress bars, 0–100%)
Each meter has a label, percentage, color-coded fill, and tooltip on tap:
1. **Internship Readiness** (green when ≥ 60%)
2. **Placement Readiness** (green when ≥ 75%)
3. **AI Engineer Readiness**
4. **LLM Engineer Readiness**
5. **GPT Builder Readiness**
6. **Interview Readiness**
7. **Project Portfolio Strength**

Readiness scores are **auto-calculated** from phase completion percentages using this formula:

```
Internship Readiness = avg(Phase1×30% + Phase2×10% + Phase3×10% + Phase5×15% + Phase6×20% + Phase12×15%)
Placement Readiness = avg(Phase1×20% + Phase3×10% + Phase4×10% + Phase6×15% + Phase7×15% + Phase8×10% + Phase11×10% + Phase12×10%)
AI Engineer Readiness = avg(Phase3×10% + Phase5×10% + Phase6×15% + Phase7×20% + Phase8×15% + Phase9×15% + Phase11×15%)
LLM Engineer Readiness = avg(Phase8×10% + Phase9×20% + Phase10×30% + Phase11×20% + Phase14×20%)
GPT Builder Readiness = avg(Phase7×10% + Phase9×20% + Phase10×20% + Phase14×50%)
```

### Today's Focus Panel
- Shows the next 3 incomplete topics from the current active phase
- Each item has a "Mark Done" tap button
- Shows estimated time for each topic

### Quick Stats Row (scrollable horizontal chips)
- Topics Completed / Total Topics
- Projects Done / Total Projects
- Resources Bookmarked
- Notes Written

---

## ROADMAP TAB — FULL 14-PHASE CURRICULUM

Each phase renders as a **collapsible card** with:
- Phase number + title + status badge (Locked / Active / In Progress / Completed)
- Phase-level progress ring (SVG, animated)
- Estimated total hours
- Dependency badge (e.g., "Requires Phase 1")
- On expand: full topic list, resources, projects

### Phase completion rules:
- A phase is **Locked** if its dependency phase is < 60% complete
- A phase is **Active** if dependency is met and it has 0% completion
- A phase is **In Progress** if 1–99% complete
- A phase is **Completed** if 100% complete
- User can manually override lock (with a warning toast)

---

## COMPLETE 14-PHASE CURRICULUM DATA

### PHASE 1 — Programming Foundations
**Objective:** Build production-grade Python skills and developer workflow fundamentals.
**Why:** Every AI job requires clean Python. This is your bedrock.
**Estimated Hours:** 120 hours
**Dependencies:** None
**Interview Relevance:** High — Python coding rounds in every AI/ML interview
**Internship Relevance:** Critical — Internships require clean Python + Git
**Placement Relevance:** High

**Topics & Subtopics:**
- Python Syntax (variables, types, operators, f-strings, walrus operator)
- Control Flow (if/elif/else, match-case, ternary)
- Functions (args, kwargs, closures, lambda, *args/**kwargs)
- OOP (classes, inheritance, polymorphism, dunder methods, dataclasses)
- Modules & Packages (import system, __init__.py, virtual environments, pip, uv)
- File Handling (text, binary, CSV, JSON, pathlib)
- Exception Handling (try/except/finally, custom exceptions, context managers)
- Decorators (function decorators, class decorators, functools)
- Generators & Iterators (yield, generator expressions, itertools)
- Async Programming (asyncio, async/await, aiohttp basics)
- Type Hints (typing module, Protocol, TypeVar, runtime checking with mypy)
- Git & GitHub (init, add, commit, push, pull, branch, merge, rebase, PR workflow, .gitignore)
- Linux Basics (ls, cd, mkdir, grep, find, chmod, ssh, tmux, vim basics)
- SQL Basics (SELECT, WHERE, JOIN, GROUP BY, subqueries, indexes — SQLite + PostgreSQL)
- DSA in Python:
  - Arrays & Strings (two pointers, sliding window)
  - Linked Lists (singly, doubly, Floyd's cycle)
  - Stacks & Queues (monotonic stack, deque)
  - Trees (BFS, DFS, BST operations, tree DP)
  - Hash Tables (collision handling, frequency maps)
  - Recursion & Backtracking
  - Sorting (bubble, merge, quick, heap, timsort internals)
  - Searching (binary search, ternary search)
  - Complexity Analysis (Big O, space complexity, amortized)

**Resources:**
- 🎬 English YouTube: "Python Full Course" — Programming with Mosh → https://www.youtube.com/watch?v=_uQrJ0TkZlc
- 🎬 Hindi YouTube: "Python Tutorial for Beginners" — CodeWithHarry → https://www.youtube.com/watch?v=UrsmFxEIp5k
- 📚 Free Course: CS50P (Harvard) → https://cs50.harvard.edu/python/
- 📖 Book: "Fluent Python" by Luciano Ramalho (O'Reilly)
- 📄 Docs: https://docs.python.org/3/
- 🏋️ Practice: LeetCode (Easy 50 problems) → https://leetcode.com/
- 🎬 DSA English: Abdul Bari → https://www.youtube.com/watch?v=0IAPZzGSbME&list=PLDN4rrl48XKpZkf03iYFl-O29szjTrs_O
- 🎬 DSA Hindi: Striver A2Z → https://www.youtube.com/playlist?list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz
- 🎬 Git: "Git and GitHub for Beginners" — freeCodeCamp → https://www.youtube.com/watch?v=RGOj5yH7evk

**Projects:**
- Beginner: Student Management System (CRUD with JSON file storage)
- Intermediate: CLI Expense Tracker (with categories, monthly reports, charts in terminal)
- Advanced: CLI AI Assistant (calls OpenAI/Groq API, maintains conversation history)
- Internship-Level: REST-ish CLI tool with argparse + async requests + proper error handling
- Placement-Level: Full Python package with tests (pytest), CI with GitHub Actions, README

**Milestone Checklist:**
- [ ] Write a Python class with inheritance and dunder methods
- [ ] Understand decorators by writing 3 custom ones
- [ ] Push a project to GitHub with proper .gitignore and README
- [ ] Solve 50 LeetCode Easy problems in Python
- [ ] Write a generator function that's used in real code
- [ ] Create a virtual environment and manage dependencies
- [ ] Write async code with asyncio

---

### PHASE 2 — Computer Science Foundations
**Objective:** Understand how computers actually work — OS, networks, databases, complexity.
**Why:** CS fundamentals are tested in every serious interview. Understanding OS helps with performance optimization in AI systems.
**Estimated Hours:** 80 hours
**Dependencies:** Phase 1 ≥ 60%
**Interview Relevance:** Very High — Asked directly in internship/placement rounds

**Topics & Subtopics:**
- Operating Systems (processes, threads, scheduling, memory management, virtual memory, deadlocks, semaphores)
- Computer Networks (OSI model, TCP/IP, HTTP/HTTPS, DNS, TLS, WebSockets, REST vs gRPC)
- Database Systems (ACID, normalization, indexing, query optimization, transactions, CAP theorem)
- Complexity Analysis (P vs NP intuition, recurrence relations, master theorem)
- System Design Basics (load balancing, caching, CDN, microservices intro)

**Resources:**
- 🎬 English: "Operating Systems" — Gate Smashers → https://www.youtube.com/playlist?list=PLxCzCOWd7aiGz9donHRrE9I3Mwn6XdP8p
- 🎬 Hindi: "OS in Hindi" — Knowledge Gate → https://www.youtube.com/playlist?list=PLmXKhU9FNesR1rn1AEJtkXbnAKnaqEEha
- 🎬 Networks: "Computer Networking Full Course" — Kunal Kushwaha → https://www.youtube.com/watch?v=IPvYjXCsTg8
- 📚 Free Course: MIT OCW 6.004 (Computer Architecture) → https://ocw.mit.edu/
- 📖 Book: "Operating System Concepts" (Silberschatz) + "Computer Networks" (Tanenbaum)
- 🏋️ Practice: InterviewBit OS/DBMS sections → https://www.interviewbit.com/

**Projects:**
- Beginner: Write a producer-consumer program using threads in Python
- Intermediate: File System Simulator (directory tree, create/delete/move with permissions)
- Advanced: Mini Database engine with B-tree index, basic SQL parser
- Internship-Level: HTTP server from scratch using raw sockets in Python
- Placement-Level: Implement a thread pool and connection pool

**Milestone Checklist:**
- [ ] Explain process vs thread to a 5-year-old
- [ ] Implement a simple LRU cache
- [ ] Write a multi-threaded file downloader
- [ ] Design a simple database schema for a real app
- [ ] Explain the 3-way TCP handshake

---

### PHASE 3 — Mathematics for AI
**Objective:** Build mathematical intuition for understanding ML algorithms deeply.
**Why:** You cannot debug ML models, understand why they fail, or read research papers without solid math. This is what separates engineers from API callers.
**Estimated Hours:** 100 hours
**Dependencies:** Phase 1 ≥ 50%
**Interview Relevance:** Medium-High — ML interviews test math intuition
**Note:** Learn math alongside Phase 5–6, not sequentially

**Topics & Subtopics:**
- Linear Algebra:
  - Vectors, matrices, tensors
  - Matrix multiplication (WHY it works geometrically)
  - Determinants, inverse, transpose
  - Eigenvalues and eigenvectors (crucial for PCA)
  - SVD (Singular Value Decomposition)
  - Vector spaces, basis, rank
- Probability & Statistics:
  - Probability axioms, conditional probability
  - Bayes' Theorem (the most important formula in ML)
  - Random variables, distributions (Gaussian, Bernoulli, Binomial, Poisson)
  - Expectation, variance, covariance
  - Maximum Likelihood Estimation (MLE)
  - Hypothesis testing, p-values, confidence intervals
- Calculus:
  - Derivatives (chain rule, product rule — MUST for backprop)
  - Partial derivatives and gradients
  - Gradient descent intuition (visualize the loss landscape)
  - Jacobians and Hessians (conceptual understanding)
  - Taylor series approximation
- Optimization:
  - Convex vs non-convex optimization
  - Gradient descent variants (SGD, momentum, Adam, RMSprop)
  - Learning rate scheduling
  - Local vs global minima, saddle points

**Resources:**
- 🎬 Linear Algebra: 3Blue1Brown "Essence of Linear Algebra" → https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab
- 🎬 Calculus: 3Blue1Brown "Essence of Calculus" → https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr
- 🎬 Statistics: StatQuest with Josh Starmer → https://www.youtube.com/c/joshstarmer
- 🎬 Hindi Math: "Mathematics for ML" — CodeBasics → https://www.youtube.com/watch?v=8oI8hHp2bcc
- 📚 Free Course: fast.ai "Practical Deep Learning" (math embedded) → https://course.fast.ai/
- 📖 Book: "Mathematics for Machine Learning" (Deisenroth, Faisal, Ong) — free PDF → https://mml-book.github.io/
- 🏋️ Practice: Khan Academy → https://www.khanacademy.org/math/linear-algebra

**Projects:**
- Beginner: Visualize matrix multiplication and dot products in matplotlib
- Intermediate: Implement gradient descent from scratch on a quadratic function
- Advanced: Build PCA from scratch using NumPy (no sklearn) and apply to image compression
- Internship-Level: Build a visual neural network backpropagation simulator
- Placement-Level: Mathematical writeup explaining why attention is dot-product similarity

**Milestone Checklist:**
- [ ] Explain why matrix multiplication is not commutative geometrically
- [ ] Derive the gradient descent update rule from calculus first principles
- [ ] Implement Bayes' Theorem for a spam filter
- [ ] Explain eigenvalues intuitively (what they mean geometrically)
- [ ] Implement PCA from scratch using NumPy SVD

---

### PHASE 4 — Frontend & AI Interface Development
**Objective:** Build professional AI product interfaces. NOT web development for its own sake.
**Why:** AI products need UIs. A model without a UI is a research project. To get internships, you need demos. Demos need UIs.
**Estimated Hours:** 80 hours
**Dependencies:** Phase 1 ≥ 70%
**⚠️ WARNING:** Do NOT turn this into a web dev roadmap. Stop after React + TypeScript basics. The goal is to build ChatGPT-style interfaces, not become a frontend engineer.
**Interview Relevance:** Low-Medium (not core for AI roles, but portfolio matters)
**Internship Relevance:** High — live demos of AI projects require functional UIs

**Topics & Subtopics:**
- HTML5 (semantic tags, forms, accessibility basics, canvas)
- CSS3 (flexbox, grid, responsive design, CSS variables, animations)
- JavaScript (ES6+: promises, async/await, fetch API, modules, DOM manipulation)
- React (components, hooks: useState/useEffect/useRef/useCallback, props, routing with react-router)
- TypeScript (types, interfaces, generics — enough to type React props)
- API Integration (fetch/axios, streaming responses from LLM APIs, WebSockets for real-time)
- Tailwind CSS (utility-first, responsive modifiers — skip writing custom CSS after this)

**Resources:**
- 🎬 English HTML/CSS/JS: "Web Development Full Course" — freeCodeCamp → https://www.youtube.com/watch?v=mU6anWqZJcc
- 🎬 Hindi: "HTML CSS JavaScript" — Thapa Technical → https://www.youtube.com/playlist?list=PLwgFb6VsUj_lQTpQKDtLXKXElQychT_2j
- 🎬 React: "React Full Course 2024" — Dave Gray → https://www.youtube.com/watch?v=RVFAyFWO4go
- 🎬 TypeScript: "TypeScript for Beginners" — Traversy Media → https://www.youtube.com/watch?v=BCg4U1FzODs
- 📚 Free Course: The Odin Project (only HTML/CSS/JS sections) → https://www.theodinproject.com/
- 📖 Book: "React - The Complete Guide" (Scrimba free track)
- 🏋️ Practice: Build 3 projects from scratch (no templates)

**Projects:**
- Beginner: Static ChatGPT-style UI (no backend, hardcoded responses)
- Intermediate: ChatGPT Clone UI (React + fetch + streaming from Groq API)
- Advanced: AI Dashboard with multiple model comparison, streaming, markdown rendering
- Internship-Level: AI Tutor Interface with session history, code highlighting, file upload
- Placement-Level: Full AI product landing page + demo interface with authentication state

**Milestone Checklist:**
- [ ] Build a responsive layout without any framework
- [ ] Render streaming text from an LLM API character by character
- [ ] Create a reusable React component library for your AI projects
- [ ] Implement dark/light mode toggle
- [ ] Connect a real LLM API (Groq is free) to your React chat interface

---

### PHASE 5 — Data Science Foundations
**Objective:** Master data manipulation, exploration, and visualization — the language of ML.
**Why:** Every ML project starts with data. Bad data = bad model. You must be fluent in data.
**Estimated Hours:** 70 hours
**Dependencies:** Phase 1 ≥ 70%, Phase 3 ≥ 30%

**Topics & Subtopics:**
- NumPy (ndarray, broadcasting, vectorized operations, einsum, memory layout)
- Pandas (DataFrame, Series, groupby, merge, pivot, handling missing data, time series)
- Data Cleaning (outlier detection, imputation strategies, data type conversion, duplicates)
- EDA (exploratory data analysis: distributions, correlations, feature relationships)
- Data Visualization (matplotlib, seaborn, plotly — static vs interactive charts)
- Feature Engineering (encoding, normalization, scaling, binning, interaction features)
- Kaggle Workflow (notebooks, datasets, submission pipeline)

**Resources:**
- 🎬 English: "NumPy and Pandas" — Corey Schafer → https://www.youtube.com/playlist?list=PL-osiE80TeTsWmV9i9c58mdDCSskIFdDS
- 🎬 Hindi: "Data Science Full Course" — Krish Naik → https://www.youtube.com/playlist?list=PLZoTAELRMXVP8-wzKPtrRST3jNCprvMZj
- 📚 Free Course: Kaggle Learn (Pandas, Data Visualization) → https://www.kaggle.com/learn
- 📖 Book: "Python for Data Analysis" by Wes McKinney
- 📄 Docs: https://pandas.pydata.org/docs/
- 🏋️ Practice: Kaggle competitions (Titanic, House Prices) → https://www.kaggle.com/

**Projects:**
- Beginner: EDA on Titanic dataset — write a findings report
- Intermediate: Business Analytics Dashboard (real dataset, 5+ chart types, insights summary)
- Advanced: End-to-end EDA pipeline that auto-generates a PDF report
- Internship-Level: Customer churn analysis with actionable business recommendations
- Placement-Level: Kaggle top-20% submission with documented feature engineering notebook

**Milestone Checklist:**
- [ ] Vectorize a loop in NumPy (no Python for-loops)
- [ ] Clean a messy real-world dataset (handle nulls, outliers, types)
- [ ] Create a correlation heatmap and explain 3 insights
- [ ] Submit to at least 1 Kaggle competition
- [ ] Write a data analysis report that a non-technical person can understand

---

### PHASE 6 — Machine Learning
**Objective:** Build a deep understanding of classical ML algorithms — implement them, tune them, deploy them.
**Why:** ML is the foundation of everything. You must understand WHY algorithms work, not just call sklearn.fit().
**Estimated Hours:** 120 hours
**Dependencies:** Phase 3 ≥ 60%, Phase 5 ≥ 70%

**Topics & Subtopics:**
- Regression (linear, polynomial, ridge, lasso, elastic net — derive cost functions)
- Classification (logistic regression, decision trees, random forests, SVM, k-NN, naive Bayes)
- Ensemble Methods (bagging, boosting, XGBoost, LightGBM, stacking, voting)
- Clustering (k-means, DBSCAN, hierarchical, Gaussian mixture models)
- Dimensionality Reduction (PCA, t-SNE, UMAP)
- Model Evaluation (precision, recall, F1, ROC-AUC, confusion matrix, cross-validation)
- Hyperparameter Tuning (GridSearchCV, RandomizedSearchCV, Optuna)
- Feature Selection (RFE, SHAP values, feature importance)
- ML Pipeline (sklearn Pipeline, column transformers, preprocessing)
- Model Interpretability (SHAP, LIME, partial dependence plots)

**Resources:**
- 🎬 English: "Machine Learning" — StatQuest → https://www.youtube.com/playlist?list=PLblh5JKOoLUICTaGLRoHQDuF_7q2GfuJF
- 🎬 Hindi: "Machine Learning Full Course" — CampusX → https://www.youtube.com/playlist?list=PLKnIA16_RmvYuZauWaPlRTC54KxSNLtNn
- 📚 Free Course: Andrew Ng ML Specialization (Coursera — audit free) → https://www.coursera.org/specializations/machine-learning-introduction
- 📖 Book: "Hands-On Machine Learning" by Aurélien Géron (O'Reilly)
- 📄 Docs: https://scikit-learn.org/stable/
- 🏋️ Practice: Kaggle (titanic → house prices → tabular competitions)

**Projects:**
- Beginner: Iris classification with 5 algorithms compared
- Intermediate: Loan Default Prediction (full pipeline: clean → engineer → train → evaluate → explain)
- Advanced: Credit Card Fraud Detection (imbalanced data, SHAP explainability, API endpoint)
- Internship-Level: Recommendation System (collaborative + content-based hybrid, ~10k items)
- Placement-Level: End-to-end ML product (train → serialize → FastAPI → deployed → monitored)

**Milestone Checklist:**
- [ ] Implement linear regression from scratch (no sklearn) with gradient descent
- [ ] Explain the bias-variance tradeoff with a visual
- [ ] Build a model that achieves AUC > 0.85 on a Kaggle dataset
- [ ] Use SHAP to explain why a model made a specific prediction
- [ ] Serialize and serve a trained model via FastAPI

---

### PHASE 7 — Deep Learning
**Objective:** Build neural networks from scratch, understand backpropagation deeply, master PyTorch.
**Why:** Deep learning is the engine of modern AI. LLMs are deep neural networks. You cannot build GPT without mastering this.
**Estimated Hours:** 140 hours
**Dependencies:** Phase 3 ≥ 70%, Phase 6 ≥ 50%

**Topics & Subtopics:**
- Neural Networks (perceptron, MLP, activation functions, weight initialization)
- Backpropagation (chain rule, computational graphs, vanishing/exploding gradients)
- Training Dynamics (batch size, learning rate, dropout, batch norm, layer norm)
- Convolutional Neural Networks (filters, pooling, stride, padding, receptive field, AlexNet→ResNet)
- Recurrent Neural Networks (vanilla RNN, BPTT, vanishing gradient problem)
- LSTM & GRU (gates, cell state, forget gate — understand why they solve the RNN problem)
- PyTorch Deep Dive:
  - Tensors, autograd, computation graph
  - nn.Module, custom layers, loss functions
  - DataLoader, Dataset, transforms
  - Training loop from scratch
  - GPU training, device management
  - Checkpointing, mixed precision (torch.cuda.amp)
- TensorFlow/Keras (secondary — know enough to read code, use for quick prototyping)

**Resources:**
- 🎬 English (BEST): Andrej Karpathy "Neural Networks: Zero to Hero" → https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ
- 🎬 English: 3Blue1Brown "Neural Networks" series → https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi
- 🎬 Hindi: "Deep Learning" — Krish Naik → https://www.youtube.com/playlist?list=PLZoTAELRMXVPGU70ZGsckrMdr0FteeRUi
- 🎬 PyTorch: "PyTorch for Deep Learning" — Daniel Bourke → https://www.youtube.com/watch?v=Z_ikDlimN6A
- 📚 Free Course: fast.ai "Practical Deep Learning for Coders" → https://course.fast.ai/
- 📖 Book: "Deep Learning" by Goodfellow, Bengio, Courville (free PDF) → https://www.deeplearningbook.org/
- 🏋️ Practice: Kaggle deep learning competitions

**Projects:**
- Beginner: MNIST digit classifier from scratch (no high-level APIs, raw PyTorch)
- Intermediate: Image Classifier (ResNet fine-tuning on custom dataset — your own photos)
- Advanced: Object Detection system (YOLOv8 fine-tuned on custom dataset)
- Internship-Level: OCR System for Indian language documents
- Placement-Level: Real-time image recognition API (Flask/FastAPI + PyTorch + Docker)

**Milestone Checklist:**
- [ ] Implement backpropagation from scratch (follow Karpathy's micrograd)
- [ ] Train MNIST from scratch, achieve >99% accuracy with CNN
- [ ] Explain vanishing gradients and why LSTM solves them
- [ ] Use GPU for training and measure speedup vs CPU
- [ ] Fine-tune ResNet on a custom dataset with your own photos

---

### PHASE 8 — Natural Language Processing (NLP)
**Objective:** Master text processing, classical NLP, and transition to transformers.
**Why:** NLP is the direct precursor to LLMs. You need to understand tokenization, embeddings, and attention from the ground up.
**Estimated Hours:** 90 hours
**Dependencies:** Phase 7 ≥ 60%

**Topics & Subtopics:**
- Text Preprocessing (tokenization, stemming, lemmatization, stop words, regex for NLP)
- Classical NLP (TF-IDF, bag of words, n-grams, named entity recognition, POS tagging)
- Word Embeddings (Word2Vec skip-gram & CBOW — implement the training loop)
- FastText (subword information, handling OOV words, compare with Word2Vec)
- Sequence Models (apply LSTM/GRU from Phase 7 to text tasks)
- Attention Mechanism (intuition first — "paying attention to relevant words")
- Hugging Face Transformers library (pipelines, tokenizers, pre-trained models)
- Transfer Learning in NLP (pre-trained embeddings → fine-tuned models)

**Resources:**
- 🎬 English: "NLP with Python" — Sentdex → https://www.youtube.com/playlist?list=PLQVvvaa0QuDf2JswnfiGkliBInZnIC4HL
- 🎬 Hindi: "NLP Full Course" — CampusX → https://www.youtube.com/playlist?list=PLKnIA16_RmvZo7fp5kkIth6nRTeQQsjfX
- 🎬 Attention: "Attention Is All You Need" explained — Yannic Kilcher → https://www.youtube.com/watch?v=iDulhoQ2pro
- 📚 Free Course: Hugging Face NLP Course → https://huggingface.co/learn/nlp-course/
- 📖 Book: "Speech and Language Processing" by Jurafsky & Martin (free) → https://web.stanford.edu/~jurafsky/slp3/
- 🏋️ Practice: Kaggle NLP competitions

**Projects:**
- Beginner: Sentiment Analysis on movie reviews (compare TF-IDF vs embeddings)
- Intermediate: Resume Parser (extract name, skills, experience, education — output structured JSON)
- Advanced: Text Classification pipeline with BERT fine-tuning
- Internship-Level: Multi-label intent classifier for a chatbot
- Placement-Level: Production NLP API with preprocessing + model + post-processing pipeline

**Milestone Checklist:**
- [ ] Implement Word2Vec training from scratch
- [ ] Fine-tune a BERT model on a classification task using Hugging Face
- [ ] Build a working resume parser
- [ ] Explain attention mechanism with your own diagram
- [ ] Deploy an NLP model as a REST API

---

### PHASE 9 — Transformers Architecture
**Objective:** Understand and implement the Transformer from scratch. This is the most important phase for LLM engineering.
**Why:** Every modern LLM (GPT, BERT, T5, LLaMA) is a Transformer. You cannot build or fine-tune LLMs without deeply understanding this architecture.
**Estimated Hours:** 100 hours
**Dependencies:** Phase 7 ≥ 70%, Phase 8 ≥ 60%

**Topics & Subtopics:**
- The Original "Attention Is All You Need" paper (read it, understand every equation)
- Self-Attention (query, key, value — the most important operation in AI)
- Scaled Dot-Product Attention (why we divide by √d_k)
- Multi-Head Attention (why multiple heads? what do different heads learn?)
- Positional Encoding (sinusoidal — why? learned alternatives)
- Layer Normalization (pre-norm vs post-norm, why it stabilizes training)
- Feed-Forward Networks (why each position independently?)
- Encoder Architecture (BERT family)
- Decoder Architecture (GPT family — causal masking is critical)
- Encoder-Decoder (T5, BART — seq2seq tasks)
- Transformer Variants (ViT for vision, CLIP, Whisper)

**Resources:**
- 🎬 English (BEST): Karpathy "Let's build GPT" → https://www.youtube.com/watch?v=kCc8FmEb1nY
- 🎬 English: "Illustrated Transformer" talk — Jay Alammar → https://www.youtube.com/watch?v=4Bdc55j80l8
- 🎬 Hindi: "Transformer Architecture Explained" — Krish Naik → https://www.youtube.com/watch?v=SMZQrJ_L1vo
- 🎬 Visual Intro: 3Blue1Brown "Attention in Transformers" → https://www.youtube.com/watch?v=eMlx5fFNoYc
- 📖 Blog: Jay Alammar "The Illustrated Transformer" → https://jalammar.github.io/illustrated-transformer/
- 📖 Blog: Lilian Weng "Attention? Attention!" → https://lilianweng.github.io/posts/2018-06-24-attention/
- 📚 Free Course: Andrej Karpathy's Zero-to-Hero → https://karpathy.ai/zero-to-hero.html
- 🏋️ Practice: Implement from scratch, then compare with HuggingFace implementation

**Projects:**
- Beginner: Implement scaled dot-product attention from scratch
- Intermediate: Implement full Transformer encoder from scratch in PyTorch
- Advanced: Implement Transformer from scratch (encoder + decoder) — train on translation task
- Internship-Level: BERT fine-tuned for question answering on a custom FAQ dataset
- Placement-Level: Build and explain a mini-Transformer (nanoGPT style) in a blog post

**Milestone Checklist:**
- [ ] Implement self-attention from scratch (no nn.MultiheadAttention)
- [ ] Implement positional encoding — sinusoidal AND learned
- [ ] Train a Transformer on a toy task (e.g., copy task, sort task)
- [ ] Read "Attention Is All You Need" and annotate every equation
- [ ] Build nanoGPT by following Karpathy's tutorial exactly

---

### PHASE 10 — LLM Engineering
**Objective:** Learn how to work with, fine-tune, quantize, and deploy large language models.
**Why:** This is the Phase that gets you LLM Engineer jobs. Fine-tuning and quantization skills are actively hiring right now.
**Estimated Hours:** 120 hours
**Dependencies:** Phase 9 ≥ 70%

**Topics & Subtopics:**
- Tokenization Deep Dive (BPE — implement it from scratch, SentencePiece, tiktoken)
- Pre-training LLMs (data pipelines, training objectives, scaling laws, data curation)
- Fine-Tuning Strategies:
  - Full fine-tuning (when to use, costs)
  - LoRA (Low-Rank Adaptation — understand the math: ΔW = BA)
  - QLoRA (quantized LoRA — 4-bit training on RTX 3050)
  - PEFT (Parameter-Efficient Fine-Tuning library)
  - Instruction tuning (Alpaca, OpenOrca style)
  - Chat format fine-tuning (apply_chat_template)
- Quantization (GPTQ, AWQ, GGUF, bitsandbytes — run LLaMA on your RTX 3050)
- Evaluation (perplexity, BLEU, ROUGE, LM-Evaluation-Harness, MT-Bench)
- Inference Optimization (KV cache, continuous batching, vLLM, llama.cpp)
- Model Hub (Hugging Face Hub — download, upload, model cards)
- Ollama (run local models — LLaMA 3, Mistral, Qwen on your laptop)

**Resources:**
- 🎬 English (BEST): Karpathy "Let's build the GPT Tokenizer" → https://www.youtube.com/watch?v=zduSFxRajkE
- 🎬 English: "LLM Fine-Tuning" — Maxime Labonne → https://www.youtube.com/watch?v=eC6Hd1hFvos
- 🎬 Hindi: "LLM Engineering" — Krish Naik → https://www.youtube.com/playlist?list=PLZoTAELRMXVN9VbAx5I2VvloTtYmlApe3
- 📚 Free Course: Hugging Face LLM Course → https://huggingface.co/learn/llm-course/
- 📚 Free Course: LLM Course by Maxime Labonne → https://huggingface.co/blog/mlabonne/llm-course
- 📖 Book: "Build a Large Language Model From Scratch" — Sebastian Raschka
- 🏋️ Practice: Fine-tune Mistral-7B on your RTX 3050 using QLoRA

**Projects:**
- Beginner: BPE tokenizer implemented from scratch
- Intermediate: Fine-tune Mistral-7B-Instruct with LoRA on a custom Q&A dataset
- Advanced: Domain-Specific Assistant (fine-tuned on your college's data or a specific domain)
- Internship-Level: Fine-tuned model + evaluation + model card + pushed to Hugging Face Hub
- Placement-Level: QLoRA fine-tuning pipeline with automated evaluation and comparison report

**Milestone Checklist:**
- [ ] Implement BPE tokenizer from scratch (can tokenize any text)
- [ ] Run LLaMA 3 locally using Ollama
- [ ] Fine-tune any model with QLoRA on your RTX 3050
- [ ] Push a fine-tuned model to Hugging Face Hub with a proper model card
- [ ] Evaluate a model using LM-Evaluation-Harness

---

### PHASE 11 — RAG Systems & AI Agents
**Objective:** Build production-grade retrieval-augmented generation systems and autonomous agents.
**Why:** RAG is the #1 skill asked for in AI Engineer job descriptions right now. Agents are the next wave.
**Estimated Hours:** 90 hours
**Dependencies:** Phase 10 ≥ 50%

**Topics & Subtopics:**
- Embeddings (semantic embeddings, sentence-transformers, embedding models on HuggingFace)
- Vector Databases (FAISS, ChromaDB, Qdrant, Pinecone — understand ANN search)
- RAG Pipeline (chunk → embed → store → retrieve → augment → generate)
- Advanced RAG (re-ranking, hybrid search BM25+dense, HyDE, RAG fusion)
- LangChain (chains, memory, document loaders, text splitters — learn the abstractions)
- LangGraph (stateful agents, graph-based workflows, conditional routing)
- Agent Architectures (ReAct, Plan-and-Execute, function calling, tool use)
- Memory Systems (short-term: conversation buffer; long-term: vector store memory)
- Evaluation (RAGAS framework, faithfulness, relevance, context recall)

**Resources:**
- 🎬 English: "LangChain Full Course" — freeCodeCamp → https://www.youtube.com/watch?v=HSZ_uaif57o
- 🎬 English: "RAG from Scratch" — LangChain YouTube → https://www.youtube.com/playlist?list=PLfaIDFEXuae2LXbO1_PKyVJiQ23ZztA0x
- 🎬 Hindi: "RAG System Building" — Krish Naik → https://www.youtube.com/playlist?list=PLZoTAELRMXVNMRCnCkBu8Tx0VcVjFBHLd
- 📚 Free Course: LangChain Academy → https://academy.langchain.com/
- 📄 Docs: https://python.langchain.com/docs/introduction/
- 🏋️ Practice: Build 3 different RAG systems from scratch

**Projects:**
- Beginner: PDF Q&A chatbot using FAISS + any LLM
- Intermediate: Research Assistant (multi-document RAG + source citation)
- Advanced: AI Tutor (hybrid RAG + conversation memory + feedback loop)
- Internship-Level: Company Knowledge Base Chatbot with user authentication
- Placement-Level: Production RAG system with RAGAS evaluation, monitoring, Redis caching

**Milestone Checklist:**
- [ ] Build a PDF chatbot that answers questions with source citations
- [ ] Implement hybrid search (BM25 + dense) and show improvement over naive RAG
- [ ] Build a ReAct agent with at least 3 tools (search, calculator, file reader)
- [ ] Evaluate your RAG system using RAGAS metrics
- [ ] Build a stateful agent using LangGraph

---

### PHASE 12 — Backend for AI Products
**Objective:** Build production-grade backends to serve AI models.
**Why:** AI models stuck in Jupyter notebooks don't help anyone. You need to serve them. Backend skills + AI = full-stack AI engineer (very employable).
**Estimated Hours:** 80 hours
**Dependencies:** Phase 1 ≥ 90%, Phase 6 ≥ 50%

**Topics & Subtopics:**
- FastAPI (async routes, Pydantic models, dependency injection, middleware, background tasks)
- REST API Design (versioning, pagination, error handling, OpenAPI/Swagger)
- Authentication (JWT tokens, OAuth2, API keys, rate limiting)
- PostgreSQL (psycopg2, SQLAlchemy ORM, Alembic migrations)
- Redis (caching, session storage, pub/sub, rate limiting)
- Async I/O (async database queries, concurrent API calls)
- Streaming Responses (SSE for streaming LLM output to frontend)
- File Storage (handling model artifacts, MinIO, S3 basics)
- WebSockets (real-time chat with LLMs)

**Resources:**
- 🎬 English: "FastAPI Full Course" — Traversy Media → https://www.youtube.com/watch?v=0sOvCWFmrtA
- 🎬 English: "FastAPI Tutorial" — TechWithTim → https://www.youtube.com/watch?v=7t2alSnE2-I
- 🎬 Hindi: "FastAPI in Hindi" — CodeWithHarry → https://www.youtube.com/watch?v=u2MYHwGdlCA
- 📚 Free Course: FastAPI official tutorial → https://fastapi.tiangolo.com/tutorial/
- 📖 Book: "Building APIs with FastAPI" — Practical examples
- 🏋️ Practice: Build the backend for your Phase 11 RAG project

**Projects:**
- Beginner: REST API for a trained ML model (predict endpoint)
- Intermediate: AI Chat API with streaming + conversation history + auth
- Advanced: Multi-model AI API (route between GPT/LLaMA/Mistral based on task)
- Internship-Level: AI SaaS backend (user auth, subscription tiers, rate limiting, logging)
- Placement-Level: Production backend with PostgreSQL + Redis + background jobs + monitoring

**Milestone Checklist:**
- [ ] Build a FastAPI app that serves an ML model with < 100ms latency
- [ ] Implement JWT authentication with refresh tokens
- [ ] Stream LLM output via Server-Sent Events (SSE)
- [ ] Add Redis caching and measure speedup
- [ ] Write API documentation with Swagger UI

---

### PHASE 13 — Deployment & MLOps
**Objective:** Deploy AI products to the real world and keep them running reliably.
**Why:** "It works on my laptop" is not a skill. Deployed AI products are how you get internships and placement. MLOps is a dedicated job track.
**Estimated Hours:** 80 hours
**Dependencies:** Phase 12 ≥ 60%

**Topics & Subtopics:**
- Docker (Dockerfile, docker-compose, multi-stage builds, container best practices)
- CI/CD (GitHub Actions — auto-test, auto-lint, auto-deploy on push)
- Cloud Basics (free tier: Railway, Render, Hugging Face Spaces, Vercel for frontend)
- MLflow (experiment tracking, model registry, artifact logging)
- Monitoring (logging with structlog, Prometheus + Grafana basics, error tracking)
- Model Versioning (DVC — Data Version Control, model registry patterns)
- Inference Optimization (model quantization for deployment, ONNX export)
- Cost Optimization (batching, caching, right-sizing)

**Resources:**
- 🎬 English: "Docker Full Course" — TechWorld with Nana → https://www.youtube.com/watch?v=3c-iBn73dDE
- 🎬 Hindi: "Docker Tutorial" — Hitesh Choudhary → https://www.youtube.com/watch?v=9zUHg7xjIqQ
- 🎬 MLflow: "MLflow Tutorial" — freeCodeCamp → https://www.youtube.com/watch?v=ksYIVDue8ak
- 📚 Free Course: "Full Stack Deep Learning" → https://fullstackdeeplearning.com/course/
- 📄 Docs: https://mlflow.org/docs/latest/index.html
- 🏋️ Practice: Deploy Phase 12 backend to Railway + Hugging Face Spaces

**Projects:**
- Beginner: Dockerize any ML model and run it in a container
- Intermediate: CI/CD pipeline that trains, evaluates, and deploys on push
- Advanced: Full AI SaaS product deployed (frontend + backend + model + monitoring)
- Internship-Level: Production deployment with rolling updates and zero downtime
- Placement-Level: End-to-end MLOps pipeline (DVC + MLflow + GitHub Actions + Monitoring)

**Milestone Checklist:**
- [ ] Docker Compose a multi-service app (API + database + redis)
- [ ] Set up GitHub Actions CI that runs tests on every PR
- [ ] Deploy an AI product that anyone can access via a URL
- [ ] Track experiments with MLflow and compare model versions
- [ ] Set up basic monitoring and alerting

---

### PHASE 14 — Build GPT From Scratch
**Objective:** Build a GPT-2 level language model completely from scratch — every line of code, every math operation, no black boxes.
**Why:** This is the ultimate proof of LLM engineering depth. It's also the most intellectually satisfying thing you'll ever build. This phase is what separates you from API wrapper developers forever.
**Estimated Hours:** 150 hours
**Dependencies:** Phase 9 ≥ 80%, Phase 10 ≥ 70%

**Build Sequence (DO NOT SKIP STEPS):**
1. **Character-Level Model** — predict next character, understand autoregressive generation
2. **Bigram Model** — n-gram statistics, log probabilities, sampling
3. **Neural Language Model (MLP)** — feed-forward language model (Bengio 2003 paper)
4. **Backpropagation Engine** — implement micrograd (autograd from scratch)
5. **WaveNet-style MLP** — hierarchical character model
6. **RNN Language Model** — sequential processing, hidden state
7. **LSTM Language Model** — gated recurrent unit, overcome vanishing gradients
8. **Transformer Language Model** — full transformer decoder (causal, autoregressive)
9. **NanoGPT** — follow Karpathy exactly, train on Shakespeare / custom data on RTX 3050
10. **GPT-2 Style Reproduction** — multi-GPU training (simulate with gradient accumulation), BPE tokenizer, train from scratch on a real dataset

**Resources:**
- 🎬 REQUIRED: Andrej Karpathy "Neural Networks: Zero to Hero" (ALL videos) → https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ
- 🎬 "Let's reproduce GPT-2 (124M)" — Karpathy → https://www.youtube.com/watch?v=l8pRSuU81PU
- 🎬 "Let's build the GPT Tokenizer" — Karpathy → https://www.youtube.com/watch?v=zduSFxRajkE
- 📚 Code: NanoGPT repository → https://github.com/karpathy/nanoGPT
- 📚 Code: Micrograd → https://github.com/karpathy/micrograd
- 📖 Paper: "Attention Is All You Need" (Vaswani et al. 2017)
- 📖 Paper: "Language Models are Few-Shot Learners" (GPT-3 paper)
- 🏋️ Practice: Follow every video, type every line by hand (no copy-paste)

**Projects:**
- Beginner: Micrograd — your own autograd engine (20 lines of Python)
- Intermediate: NanoGPT trained on Shakespeare dataset, generating convincing text
- Advanced: NanoGPT trained on your college's study material or a domain corpus
- Internship-Level: GPT-2 reproduction with BPE tokenizer, logged with MLflow, pushed to HuggingFace
- Placement-Level: Complete writeup: "I built a GPT from scratch" blog post with code, loss curves, generated samples

**Milestone Checklist:**
- [ ] Implement and understand autograd from scratch (micrograd)
- [ ] Train a character-level language model — generate names
- [ ] Implement full self-attention from scratch (no nn.MultiheadAttention)
- [ ] Train nanoGPT to loss < 1.5 on Shakespeare
- [ ] Train GPT-2 style model on a real dataset using your RTX 3050
- [ ] Share the repo publicly and write about it

---

### ADVANCED PHASE (Post-Internship / Post-Placement Only)

**Why these are delayed:**
These topics require expensive compute, are research-level, and will not help with your immediate
internship or placement goals. Learning RLHF before you understand the Transformer is like learning
F1 racing before you can drive — dangerous and counterproductive.
Revisit these after you have an internship and placement confirmed.

**Topics (in order):**
- CUDA Programming (custom GPU kernels with Numba, CUDA C basics, memory coalescing)
- Triton (OpenAI Triton — write GPU kernels in Python, FlashAttention understanding)
- DeepSpeed (ZeRO optimization, mixed precision, model parallelism)
- FSDP (Fully Sharded Data Parallel — train models that don't fit on one GPU)
- RLHF (Reinforcement Learning from Human Feedback — PPO, reward modeling)
- DPO (Direct Preference Optimization — simpler than RLHF, state of the art 2024)
- GRPO (Group Relative Policy Optimization — used in DeepSeek-R1)
- AI Safety (alignment, interpretability, red-teaming, constitutional AI)

---

## PROJECTS TAB — COMPLETE PROJECT TRACKER

### Project Status Options
- `Not Started` — grey badge
- `In Progress` — amber badge with spinner
- `Done (Local)` — blue badge
- `Deployed & Live` — green badge with 🚀
- `On GitHub` — purple badge

### All 70 Projects (from all phases)
Each project has: Name, Phase, Difficulty (⭐ to ⭐⭐⭐⭐⭐), Status dropdown, GitHub URL field, Live URL field, Notes field, Date completed.

Render as a filterable card grid. Filters: Phase, Difficulty, Status, Type (Beginner/Internship/Placement).

---

## PROGRESS TAB — VISUAL ANALYTICS

### Charts to Render (using Chart.js or D3.js — embed in HTML)
1. **Radar Chart** — Skill balance across 8 dimensions
   - Python, Math, ML, Deep Learning, NLP, Transformers, LLM Engineering, Deployment
2. **Bar Chart** — Hours spent per phase (estimated vs actual — user inputs actual)
3. **Line Chart** — Weekly completion rate over time (derived from localStorage timestamps)
4. **Donut Chart** — Project completion breakdown by type
5. **Heatmap** — Daily activity calendar (GitHub contribution graph style)

### Skill Level Tags (shown as chips, user sets them)
For each major skill: `Beginner` | `Familiar` | `Proficient` | `Expert`

### Confidence Level Slider (1–10 per phase)
User rates their confidence after completing each phase.

---

## GOALS TAB — CAREER ROADMAPS

### Show 5 Career Paths as Vertical Timelines

**1. Internship Roadmap** (Target: Before 3rd Year)
- Month 1–2: Complete Phase 1 + DSA Basics
- Month 3–4: Complete Phase 5 + Phase 6
- Month 5: Build Loan Prediction + Fraud Detection projects
- Month 6: Add Phase 12 (FastAPI) — serve models
- Month 7: Apply to internships — portfolio ready
- Key skills: Python, ML, Data Science, Git, FastAPI

**2. Placement Roadmap** (Target: Before End of 7th Semester)
- Year 1-2: Phases 1–8
- Year 2-3: Phases 9–13
- Before placement: 5+ deployed projects, GitHub active, LeetCode 150+ problems
- Key skills: Full stack AI, System design, DSA, ML deployment

**3. AI Engineer Roadmap**
- Phases 1, 3, 5, 6, 7, 8, 11, 12, 13 (in that order)
- Key output: End-to-end AI products that work in production

**4. LLM Specialist Roadmap**
- Phases 1, 3, 7, 8, 9, 10, 11, 14 (in that order)
- Key output: Fine-tuned models on HuggingFace, contributions to open-source LLM projects

**5. GPT Builder Roadmap**
- Phases 1, 3, 7, 9, 14 (in that order, with others running parallel)
- Key output: GPT-2 reproduction repo on GitHub with full documentation

### Unified Roadmap Merge Visualization
Show a Gantt-style horizontal timeline showing how all 5 paths merge:
- Shared foundation (Phases 1–3) runs first
- Then paths diverge and reconverge
- Color-code by which career path each phase feeds

### Milestone Tracker
Top-level milestones with completion checkbox:
- [ ] First GitHub commit
- [ ] First deployed project (live URL)
- [ ] First Kaggle submission
- [ ] Fine-tune a model locally
- [ ] 50 LeetCode problems solved
- [ ] First internship application sent
- [ ] First internship offer received
- [ ] 5 projects deployed
- [ ] HuggingFace profile with a model
- [ ] 100 GitHub contributions
- [ ] First placement interview
- [ ] Placement confirmed

---

## GLOBAL UI REQUIREMENTS

### Header (shown on all tabs)
- App name: "Shubham's AI Journey" with a ⚡ icon
- Phase indicator: "Currently on Phase X"
- Dark/Light mode toggle (🌙/☀️)
- Sync indicator (🟢 Saved / 🟡 Saving...)

### Toast Notifications
- "✅ Phase X topic marked complete!" (green)
- "🎯 Phase X completed! Unlocking Phase Y..." (gold, with confetti)
- "💾 Progress saved" (subtle grey, auto-dismiss 2s)
- "⚠️ Phase Y is locked. Complete Phase X first." (amber)

### Confetti Animation
- Trigger on: phase completion, milestone unlocking, project marked Deployed
- Use canvas-confetti via CDN: https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js

### Offline Support
- Add a `<link rel="manifest">` with a basic PWA manifest
- Service worker for caching (inline in HTML using a blob)
- Shows "📴 Offline mode — changes saved locally" when no internet

### Search
- Global search bar (tap to expand) — searches topic names, project names, resource names
- Real-time filter of visible items

---

## TECHNICAL IMPLEMENTATION REQUIREMENTS

### HTML File Structure
```
index.html
├── <head>
│   ├── Meta tags (viewport, theme-color, PWA)
│   ├── Google Fonts (Inter + JetBrains Mono)
│   ├── CDN: canvas-confetti
│   ├── CDN: Chart.js
│   ├── Inline <style> (all CSS — mobile-first, no external .css file)
│   └── PWA manifest (inline JSON blob)
├── <body>
│   ├── #app (root container)
│   ├── .header (sticky top bar)
│   ├── .tab-content (switchable views)
│   │   ├── #tab-dashboard
│   │   ├── #tab-roadmap
│   │   ├── #tab-projects
│   │   ├── #tab-progress
│   │   └── #tab-goals
│   ├── .bottom-nav (fixed bottom navigation)
│   └── #toast-container
└── <script>
    ├── DATA (all 14 phases as JS objects)
    ├── STATE management (load/save to localStorage)
    ├── RENDERERS (one function per tab)
    ├── EVENT HANDLERS
    ├── ANALYTICS CALCULATIONS
    └── INIT (bootstrap on DOMContentLoaded)
```

### Data Structure
```javascript
const ROADMAP_DATA = {
  phases: [
    {
      id: 1,
      title: "Programming Foundations",
      emoji: "🐍",
      hours: 120,
      dependency: null, // phase id or null
      topics: [
        { id: "p1_t1", title: "Python Syntax & Variables", hours: 4, done: false },
        // ... all topics
      ],
      resources: {
        youtube_en: { title: "...", url: "..." },
        youtube_hi: { title: "...", url: "..." },
        course: { title: "...", url: "..." },
        book: "...",
        docs: "...",
        practice: { title: "...", url: "..." }
      },
      projects: {
        beginner: "...",
        intermediate: "...",
        advanced: "...",
        internship: "...",
        placement: "..."
      },
      milestones: [
        { id: "p1_m1", text: "...", done: false }
      ]
    }
    // ... 14 phases
  ]
}
```

### Key JavaScript Functions Required
- `calculateReadiness()` — returns object with all readiness scores
- `getPhaseStatus(phaseId)` — locked/active/inprogress/completed
- `markTopicDone(phaseId, topicId)` — updates state, auto-saves, triggers confetti if phase completed
- `renderDashboard()`, `renderRoadmap()`, `renderProjects()`, `renderProgress()`, `renderGoals()`
- `switchTab(tabName)` — handles bottom nav navigation
- `saveState()` / `loadState()` — localStorage persistence
- `exportData()` / `importData()` — JSON export/import
- `searchTopics(query)` — global search
- `showToast(message, type)` — notification system
- `calculateStreak()` — study streak from activity timestamps

---

## TO-DO LIST FOR THE AI — WORK THROUGH IN ORDER

Before writing code, the AI must verify each item. Nothing ships until all 50 items are checked.

### PHASE A — DATA COMPLETENESS
- [ ] A1: Phase 1 has ALL topics listed with hours estimates
- [ ] A2: Phase 2 has ALL topics listed with hours estimates
- [ ] A3: Phase 3 has ALL topics listed with hours estimates
- [ ] A4: Phase 4 has ALL topics listed with hours estimates
- [ ] A5: Phase 5 has ALL topics listed with hours estimates
- [ ] A6: Phase 6 has ALL topics listed with hours estimates
- [ ] A7: Phase 7 has ALL topics listed with hours estimates
- [ ] A8: Phase 8 has ALL topics listed with hours estimates
- [ ] A9: Phase 9 has ALL topics listed with hours estimates
- [ ] A10: Phase 10 has ALL topics listed with hours estimates
- [ ] A11: Phase 11 has ALL topics listed with hours estimates
- [ ] A12: Phase 12 has ALL topics listed with hours estimates
- [ ] A13: Phase 13 has ALL topics listed with hours estimates
- [ ] A14: Phase 14 has ALL 10 build steps listed
- [ ] A15: Every phase has 5 projects (beginner/intermediate/advanced/internship/placement)
- [ ] A16: Every phase has 5+ milestone checklist items
- [ ] A17: Every phase has all 6 resource types (YouTube EN, YouTube HI, Course, Book, Docs, Practice)
- [ ] A18: All YouTube links point to real, specific URLs (not channel homepages)
- [ ] A19: All 70 projects are in the project tracker data

### PHASE B — UI COMPLETENESS
- [ ] B1: Mobile layout works at 375px (no overflow, no horizontal scroll)
- [ ] B2: Bottom navigation renders with 5 tabs and icons
- [ ] B3: All 5 tabs render without errors
- [ ] B4: Dashboard shows all 7 readiness meters
- [ ] B5: Dashboard shows today's focus panel
- [ ] B6: Roadmap tab shows all 14 phase cards
- [ ] B7: Phase cards collapse/expand correctly
- [ ] B8: Topic checkboxes work and save to localStorage
- [ ] B9: Resource links open in new tab
- [ ] B10: Progress tab shows radar chart
- [ ] B11: Progress tab shows activity heatmap
- [ ] B12: Goals tab shows all 5 career path timelines
- [ ] B13: Dark mode is default and looks good
- [ ] B14: Light mode toggle works
- [ ] B15: All progress rings animate on load

### PHASE C — FUNCTIONALITY
- [ ] C1: localStorage saves on every topic completion
- [ ] C2: Progress persists after page refresh
- [ ] C3: Phase lock/unlock logic works correctly
- [ ] C4: Readiness scores auto-calculate correctly
- [ ] C5: Confetti triggers on phase completion
- [ ] C6: Toast notifications appear and auto-dismiss
- [ ] C7: Export to JSON works (downloads file)
- [ ] C8: Import from JSON works (restores state)
- [ ] C9: Study streak calculates correctly
- [ ] C10: Search filters topics in real-time

### PHASE D — QUALITY
- [ ] D1: No "TODO" comments in output code
- [ ] D2: No placeholder text anywhere
- [ ] D3: No broken links in resources (use verified URLs from this prompt)
- [ ] D4: File is self-contained (single HTML, no external JS files)
- [ ] D5: File works when renamed to index.html on GitHub Pages
- [ ] D6: No console errors on load
- [ ] D7: Font loading doesn't block render (font-display: swap)
- [ ] D8: All images/icons are CSS or Unicode (no broken <img> tags)
- [ ] D9: Tap targets are ≥ 44px on mobile
- [ ] D10: PWA manifest included

### PHASE E — GITHUB
- [ ] E1: Add a comment at top of file: `<!-- Version: 2.0 | Last Updated: [date] -->`
- [ ] E2: File is named index.html in output
- [ ] E3: Write commit message suggestion: `feat: complete roadmap tracker v2.0 - 14 phases, projects, goals, mobile-first`

---

## FINAL INSTRUCTION

After completing all 50 to-do items, output:
1. The complete `index.html` file (single file, all CSS + JS inline)
2. The commit message to use
3. Instructions to deploy to GitHub Pages (3 steps max)

The output HTML file must be the ONLY deliverable. Do not explain what you did.
Do not add caveats. Do not say "here's the file". Just output the file.

If the file would exceed your context window, split it and explicitly label each part:
- `<!-- PART 1 OF 2: HEAD + CSS + DATA -->` 
- `<!-- PART 2 OF 2: JS + HTML STRUCTURE -->`

The user will concatenate the parts manually.

---

*End of Master Prompt v2.0*
*Built for Shubham — B.Tech CSE (AI), BBIT | Goal: Internship → Placement → LLM Engineer*
