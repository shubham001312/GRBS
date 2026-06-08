# GRBS Website — Complete Agent Build Prompt
## "GPT Roadmap By Shubham" — Full-Stack Multi-Page Student Learning Portal

---

## 🎯 PROJECT OVERVIEW

Build a complete, multi-page static website called **"GPT Roadmap By Shubham"** (short: **GRBS**) — a student-focused LLM learning portal. The site must be split across **multiple HTML, CSS, and JS files** — never put everything in one file. Every page links to shared stylesheets and shared JS utilities. The result should look and feel like a human developer built it with care: clean, minimal, purposeful. No bloated frameworks, no CDN dependencies except Google Fonts.

**Work on all files in parallel — generate every file in a single pass, fully complete, with zero placeholder comments like "// add later" or "TODO". Every feature must be implemented, functional, and production-ready.**

---

## 📁 FILE STRUCTURE — BUILD ALL OF THESE

```
/
├── index.html              ← Home page
├── study.html              ← Study page (main feature)
├── roadmap.html            ← Roadmap overview page
├── about.html              ← About the developer
├── css/
│   ├── base.css            ← CSS reset, variables, typography, shared layout
│   ├── nav.css             ← Sidebar navigation styles
│   ├── home.css            ← Home page specific styles
│   ├── study.css           ← Study page specific styles
│   ├── roadmap.css         ← Roadmap page specific styles
│   ├── about.css           ← About page specific styles
│   └── footer.css          ← Footer styles
├── js/
│   ├── storage.js          ← All localStorage read/write helpers (username, progress)
│   ├── nav.js              ← Sidebar toggle logic, active link highlighting
│   ├── home.js             ← Home page: username prompt, progress dashboard
│   ├── study.js            ← Study page: phase accordion, checkbox ticking, phase locking
│   ├── roadmap.js          ← Roadmap page: dynamic phase card rendering
│   └── about.js            ← About page: (minimal, mostly static)
├── assets/
│   ├── logo.svg            ← GRBS text/icon logo (inline SVG, generated inline)
│   └── favicon.svg         ← Tab favicon (SVG, same icon, smaller)
└── favicon.svg             ← Root-level favicon link target
```

---

## 🎨 DESIGN SYSTEM — APPLY ACROSS ALL PAGES

### Aesthetic Direction
**"Scholar's Terminal"** — Clean, warm-off-white background like aged paper, monospace accents for code-feel, subtle geometric elements. Looks like a focused developer made a study tool for themselves, then polished it. NOT a SaaS product landing page. Warm, human, unhurried.

### Colors (CSS Variables in base.css)
```css
:root {
  --bg:         #F7F4EF;        /* warm off-white, like paper */
  --bg-card:    #FFFFFF;        /* pure white cards */
  --bg-sidebar: #1A1A2E;        /* deep navy sidebar */
  --accent:     #E84545;        /* bold red accent */
  --accent-2:   #F5A623;        /* amber for progress/highlights */
  --text:       #1C1C1E;        /* near-black body text */
  --text-muted: #6B6B76;        /* muted labels */
  --text-sidebar:#E8E8F0;       /* sidebar text */
  --border:     #E2DDD6;        /* warm border */
  --success:    #27AE60;        /* green for completed */
  --radius:     8px;
  --shadow:     0 2px 12px rgba(0,0,0,0.07);
  --transition: 0.2s ease;
}
```

### Typography (Google Fonts — link in every HTML head)
```html
<link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Lora:ital,wght@0,400;0,600;1,400&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
```
- **Headings**: `'Lora', serif` — warm, scholarly
- **Code/labels/nav**: `'Space Mono', monospace` — technical feel
- **Body/UI text**: `'Inter', sans-serif` — clean readability

### Logo (SVG — inline or img tag)
Design a simple SVG logo: the letters **GRBS** in Space Mono bold, with a small circuit-like bracket `{ }` surrounding it in the accent red color. Also output a 32×32 version as favicon.svg with just the G initial in a red square.

### Layout
- **Sidebar** fixed on left, 240px wide on desktop, slides in/out on mobile (hamburger toggle top-left)
- **Main content** has `margin-left: 240px` on desktop, full width on mobile
- Max content width: 860px, centered in the main area
- Sidebar is always on top of content on mobile (overlay with dark backdrop)
- All pages share the same sidebar and footer structure

### Mobile Responsiveness
- Sidebar: hidden by default on <768px, toggles as overlay
- Cards, phase boxes, topic rows: stack vertically on mobile
- Font sizes scale down slightly on mobile
- No horizontal overflow — text wraps, never clips
- Touch-friendly tap targets (min 44px height)

### Copyable Text
- All topic names, descriptions, resource links: use standard `<p>`, `<span>`, `<a>` — never `user-select: none`
- Add a small copy icon button next to each topic title that copies the topic name to clipboard on click using `navigator.clipboard.writeText()`

---

## 🗂️ SIDEBAR NAVIGATION — nav.js + nav.css

The hamburger (☰) icon sits in the **top-left corner** of every page, always visible.

**Sidebar contents (top to bottom):**
1. GRBS logo at top of sidebar
2. Nav links in this exact order:
   - 🏠 Home (`index.html`)
   - 📚 Study (`study.html`)
   - 🗺️ Roadmap (`roadmap.html`)
   - 👤 About (`about.html`)
3. A thin divider
4. At the bottom of sidebar: small text "Progress: X% complete" pulling from localStorage

**Behavior:**
- Active page link is highlighted with accent color left border + background tint
- On desktop: sidebar is always visible (no toggle needed)
- On mobile: sidebar starts hidden, hamburger toggles it; clicking outside closes it
- Smooth slide-in/out animation (`transform: translateX`)

---

## 🏠 PAGE 1 — HOME (index.html + home.css + home.js)

### Username Modal (First Visit)
On first visit (check `localStorage.getItem('grbs_username')`), show a **modal overlay** before any content renders:
- Clean centered card
- Header: "Welcome to GRBS 👋"
- Subtext: "What should we call you? (used only on this device)"
- Text input: placeholder "Your first name"
- Button: "Let's go →"
- On submit: save to `localStorage.setItem('grbs_username', name)`, close modal, render homepage
- Input must not be empty; show inline error if blank
- On subsequent visits: skip modal, load name from storage directly

### Home Page Content (after name is set)
**Header section:**
```
Good [morning/afternoon/evening], [Username]! 👋
You're learning to build LLMs from scratch.
```
(Time-based greeting using JS `new Date().getHours()`)

**Overall Progress Card:**
- Large circular progress ring (CSS/SVG, not canvas) showing overall % of all topics ticked
- Text inside: "X% Complete"
- Below: "X of Y topics done"

**Phase Progress Cards (6 cards in a 2-col grid, 1-col on mobile):**
One card per phase (Phase 0 through Phase 5). Each card shows:
- Phase name + emoji
- Mini progress bar (width % of topics ticked in that phase)
- "X/Y topics done" text
- Status badge: "Not Started" / "In Progress" / "Completed"
- Click card → navigates to `study.html#phase-N`

**Current Focus Widget:**
- Shows the name of the first incomplete topic across all phases
- "Currently learning: [Topic Name]" with a small arrow → links to study.html

**Quick Actions Row:**
- "Continue Studying →" button → study.html
- "View Roadmap →" button → roadmap.html

**Motivational Quote (static, changes daily based on `new Date().getDate() % quotes.length`):**
Array of 10 short study/coding/AI quotes in home.js. Display one per day.

---

## 📚 PAGE 2 — STUDY (study.html + study.css + study.js)

This is the **core of the site**. It is organized into **phases**. Each phase is an expandable accordion section. Phases must be **sequentially locked** — a phase only unlocks when all build tasks of the previous phase are ticked.

### Phase Structure (render all phases below)

Each phase renders as:
```
[Phase Header — click to expand/collapse]
  └─ [Topic List]
      └─ [Topic Row × N]
           ├─ Checkbox (tick = mark complete, saves to localStorage)
           ├─ Topic Name (copyable)
           ├─ Difficulty badge (Beginner / Intermediate / Advanced)
           ├─ Resource links: one per level (YouTube video links, see below)
           └─ Copy icon button
  └─ [Build Tasks Section]
      └─ [Build Task Row × N]
           ├─ Checkbox
           ├─ Task description (copyable)
           └─ Hint/notes text
```

**Phase locking logic (study.js):**
- Phase 0 is always unlocked
- Phase N unlocks only when ALL build tasks of Phase N-1 are checked
- Locked phases show a 🔒 icon and a message: "Complete all build tasks in [Previous Phase] to unlock"
- Locked phase headers are grayed out and not expandable

**Progress bar** at top of page: "Overall Study Progress: X%" — live updates as user ticks boxes

**Sticky phase navigation** (small pill buttons for each phase at top of page, clicking scrolls to that phase section)

---

### PHASE 0 — Programming Foundations (Always Unlocked)
*Goal: Go from zero to ready for AI/ML. Cover the languages and tools needed before any ML code.*

**Topics:**

**A. Python (Complete)**
- [ ] Python Basics (variables, data types, control flow, functions)
  - Beginner: https://www.youtube.com/watch?v=_uQrJ0TkZlc (Programming with Mosh — Python for Beginners 6hr)
  - Intermediate: https://www.youtube.com/watch?v=HGOBQPFzWKo (freeCodeCamp — Python Full Course)
  - Advanced: https://www.youtube.com/watch?v=p15xzjzR9j0 (Corey Schafer — Python OOP)
- [ ] Object-Oriented Programming (classes, inheritance, dunder methods)
  - Beginner: https://www.youtube.com/watch?v=JeznW_7DlB0 (Tech With Tim — OOP Python)
  - Intermediate: https://www.youtube.com/watch?v=Ej_02ICOIgs (Corey Schafer — OOP Playlist)
  - Advanced: https://www.youtube.com/watch?v=p15xzjzR9j0 (Corey Schafer — Dunder Methods)
- [ ] List/Dict/Set Comprehensions, Generators, Decorators
  - Video: https://www.youtube.com/watch?v=3dt4OGnU5sM (Corey Schafer — Comprehensions)
- [ ] File Handling, APIs, Web Scraping
  - Video: https://www.youtube.com/watch?v=tb8gHvYlCFs (freeCodeCamp — APIs in Python)
- [ ] Virtual Environments, pip, conda
  - Video: https://www.youtube.com/watch?v=N5vscPTWKOk (Corey Schafer — venv)

**B. Command Line & Git**
- [ ] Linux/Terminal Basics (ls, cd, mkdir, grep, chmod, ssh)
  - Video: https://www.youtube.com/watch?v=ZtqBQ68cfJc (freeCodeCamp — Linux CLI)
- [ ] Git & GitHub (init, commit, push, branch, merge, pull requests)
  - Beginner: https://www.youtube.com/watch?v=RGOj5yH7evk (freeCodeCamp — Git & GitHub)
  - Intermediate: https://www.youtube.com/watch?v=Uszj_k0DGsg (freeCodeCamp — Advanced Git)
- [ ] Markdown (for README files and documentation)
  - Video: https://www.youtube.com/watch?v=_PPWWRV6gbA (Traversy Media — Markdown Crash Course)

**C. Data Structures & Algorithms (Python)**
- [ ] Arrays, Strings, HashMaps, Stacks, Queues
  - Video: https://www.youtube.com/watch?v=pkYVOmU3MgA (freeCodeCamp — DSA Full Course)
- [ ] Trees, Graphs, Recursion
  - Video: https://www.youtube.com/watch?v=fAAZixBzIAI (freeCodeCamp — Trees and Graphs)
- [ ] Sorting, Searching, Big-O Analysis
  - Video: https://www.youtube.com/watch?v=kPRA0W1kECg (freeCodeCamp — Algorithms)
- [ ] LeetCode Easy Problems (aim for 20 solved)
  - Resource: https://leetcode.com/problemset/all/?difficulty=EASY

**Build Tasks — Phase 0:**
- [ ] Write a Python script that reads a CSV file, filters rows, and outputs results to a new file
- [ ] Build a simple CLI to-do list app using Python with file persistence
- [ ] Push 2 Python projects to GitHub with proper README files
- [ ] Solve 10 LeetCode Easy problems and commit solutions to GitHub

---

### PHASE 1 — Mathematics for AI
*Goal: Build the math intuition that powers every neural network.*

**Topics:**

**A. Linear Algebra**
- [ ] Vectors, matrices, dot products, matrix multiplication
  - Beginner: https://www.youtube.com/watch?v=fNk_zzaMoSs (3Blue1Brown — Essence of Linear Algebra Playlist)
  - Intermediate: https://www.youtube.com/watch?v=7UJ4CFRGd-U (StatQuest — Linear Algebra for ML)
  - Advanced: https://www.youtube.com/playlist?list=PLE7DDD91010BC51F8 (MIT 18.06 Gilbert Strang)
- [ ] Eigenvalues, Eigenvectors, SVD
  - Video: https://www.youtube.com/watch?v=PFDu9oVAE-g (3Blue1Brown — Eigenvectors)
- [ ] Matrix decompositions (PCA, QR)
  - Video: https://www.youtube.com/watch?v=_UVHneBUBW0 (StatQuest — PCA)
- [ ] Tensor operations in NumPy/PyTorch
  - Video: https://www.youtube.com/watch?v=aircAruvnKk (3Blue1Brown — Neural Networks)

**B. Calculus & Differentiation**
- [ ] Derivatives, partial derivatives, chain rule
  - Beginner: https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr (3Blue1Brown — Essence of Calculus)
  - Intermediate: https://www.youtube.com/watch?v=WUvTyaaNkzM (Khan Academy — Multivariable Calculus)
- [ ] Gradient, Jacobian, Hessian
  - Video: https://www.youtube.com/watch?v=GkB4vW16QHI (StatQuest — Gradient Descent)
- [ ] Automatic Differentiation (autograd concept)
  - Video: https://www.youtube.com/watch?v=VMj-3S1tku0 (Karpathy — micrograd, build autograd from scratch)

**C. Probability & Statistics**
- [ ] Probability axioms, conditional probability, Bayes theorem
  - Video: https://www.youtube.com/watch?v=HZGCoVF3YvM (StatQuest — Probability Fundamentals)
- [ ] Distributions: Normal, Binomial, Bernoulli
  - Video: https://www.youtube.com/watch?v=oI3hZJqXJuc (StatQuest — Distributions)
- [ ] MLE, cross-entropy loss
  - Video: https://www.youtube.com/watch?v=6xqv98r4Ml8 (StatQuest — MLE)
- [ ] Hypothesis testing, confidence intervals
  - Video: https://www.youtube.com/watch?v=0oc49DyA3hU (StatQuest — Hypothesis Testing)

**D. Optimization**
- [ ] Gradient descent, SGD, momentum
  - Video: https://www.youtube.com/watch?v=IHZwWFHWa-w (3Blue1Brown — Gradient Descent)
- [ ] Adam, RMSProp, learning rate scheduling
  - Video: https://www.youtube.com/watch?v=mdKjMPmcWjY (Andrej Karpathy — Optimization)
- [ ] Convex vs non-convex optimization
  - Video: https://www.youtube.com/watch?v=ORrStCArmP4 (DeepMind — Optimization for DL)

**Build Tasks — Phase 1:**
- [ ] Implement matrix multiplication from scratch in Python (no NumPy) and verify with NumPy
- [ ] Build micrograd: implement backpropagation from scratch following Karpathy's tutorial
- [ ] Implement gradient descent to minimize a 2D function and plot the path using matplotlib
- [ ] Prove Bayes theorem in writing and implement a spam classifier using naive Bayes from scratch

---

### PHASE 2 — Data Science Toolkit
*Goal: Become fluent in the tools every ML engineer uses daily.*

**Topics:**

**A. NumPy**
- [ ] ndarray creation, indexing, slicing, boolean masks
  - Video: https://www.youtube.com/watch?v=QUT1VHiLmmI (freeCodeCamp — NumPy Full Course)
- [ ] Broadcasting rules and vectorized operations
  - Video: https://www.youtube.com/watch?v=vN5dAZrS58E (Keith Galli — NumPy Tutorial)
- [ ] Linear algebra ops: dot, matmul, linalg
  - Video: https://www.youtube.com/watch?v=8Y0qQEh7dJg (Sentdex — NumPy for ML)

**B. Pandas**
- [ ] Series, DataFrame, data loading (CSV, JSON, Excel)
  - Beginner: https://www.youtube.com/watch?v=vmEHCJofslg (Corey Schafer — Pandas Playlist)
  - Full course: https://www.youtube.com/watch?v=e60ItwlZTKM (Keith Galli — Complete Pandas)
- [ ] Data cleaning: dropna, fillna, astype, duplicates
  - Video: https://www.youtube.com/watch?v=bDhvCp3_lYw (Rob Mulla — Pandas in 30 min)
- [ ] groupby, merge, pivot tables, apply/map

**C. Matplotlib & Seaborn**
- [ ] Line, bar, scatter, histogram, box plots
  - Video: https://www.youtube.com/watch?v=3Xc3CA655Y4 (Corey Schafer — Matplotlib)
- [ ] Seaborn: heatmap, pairplot, violin, regplot
  - Video: https://www.youtube.com/watch?v=6GUZXDef2U0 (freeCodeCamp — Seaborn)
- [ ] Multi-panel figures and publication quality export

**D. Feature Engineering & Data Cleaning**
- [ ] Missing value imputation strategies
  - Video: https://www.youtube.com/watch?v=WhWKMJeVVME (Krish Naik — Feature Engineering Playlist)
- [ ] Encoding: one-hot, label, target encoding
  - Video: https://www.youtube.com/watch?v=wr9gUr-eWdA (Abhishek Thakur — Feature Engineering)
- [ ] Scaling: StandardScaler, MinMaxScaler, RobustScaler
- [ ] Feature selection: correlation matrix, mutual info, RFECV

**Build Tasks — Phase 2:**
- [ ] Complete EDA on the Titanic dataset: cleaning, visualization, and a 5-insight report
- [ ] Build a data pipeline that loads a CSV, cleans missing values, encodes categoricals, and scales numerics
- [ ] Create a Matplotlib/Seaborn dashboard with 6 chart types on one dataset
- [ ] Submit a Kaggle notebook (any beginner competition) and make it public

---

### PHASE 3 — Machine Learning
*Goal: Train, evaluate, and deploy classical ML models end-to-end.*

**Topics:**

**A. Regression**
- [ ] Linear Regression: OLS, MSE, R², gradient descent
  - Beginner: https://www.youtube.com/watch?v=nk2CQITm_eo (StatQuest — Linear Regression)
  - Full course: https://www.youtube.com/watch?v=jGwO_UgTS7I (Andrew Ng — ML Week 1-3 via Coursera free audit)
- [ ] Regularization: L1 Lasso, L2 Ridge, ElasticNet
  - Video: https://www.youtube.com/watch?v=NGf0voTMlcs (StatQuest — Ridge Regression)
- [ ] Logistic Regression: sigmoid, cross-entropy, AUC-ROC
  - Video: https://www.youtube.com/watch?v=yIYKR4sgzI8 (StatQuest — Logistic Regression)

**B. Trees & Ensembles**
- [ ] Decision Trees: Gini, entropy, pruning
  - Video: https://www.youtube.com/watch?v=7VeUPuFGJHk (StatQuest — Decision Trees)
- [ ] Random Forests: bagging, feature importance, OOB
  - Video: https://www.youtube.com/watch?v=J4Wdy0Wc_xQ (StatQuest — Random Forests)
- [ ] Gradient Boosting: XGBoost, LightGBM
  - Beginner: https://www.youtube.com/watch?v=OtD8wVaFm6E (StatQuest — XGBoost series)
  - Advanced: https://www.youtube.com/watch?v=3CC4N4z3GJc (Krish Naik — XGBoost full)

**C. Unsupervised Learning**
- [ ] K-Means: centroid init, convergence, elbow method
  - Video: https://www.youtube.com/watch?v=4b5d3muPQmA (StatQuest — K-Means)
- [ ] DBSCAN, Hierarchical Clustering
  - Video: https://www.youtube.com/watch?v=RDZUdRSDOok (StatQuest — DBSCAN)
- [ ] PCA: variance explained, scree plots, 2D projection
  - Video: https://www.youtube.com/watch?v=FgakZw6K1QQ (StatQuest — PCA clearly explained)
- [ ] t-SNE and UMAP for visualization
  - Video: https://www.youtube.com/watch?v=NEaUSP4YerM (StatQuest — t-SNE)

**D. Model Evaluation**
- [ ] Cross-validation, K-Fold, Stratified K-Fold
  - Video: https://www.youtube.com/watch?v=fSytzGwwBVw (StatQuest — Cross Validation)
- [ ] Confusion matrix, precision, recall, F1, AUC-ROC
- [ ] Hyperparameter tuning: GridSearchCV, RandomizedSearchCV

**Build Tasks — Phase 3:**
- [ ] Build House Price Predictor: Linear Regression + Ridge + feature engineering; deploy on Streamlit
- [ ] Customer Churn Model: XGBoost + SHAP values for interpretability; end-to-end sklearn pipeline
- [ ] Customer Segmentation: K-Means + PCA visualization on e-commerce dataset
- [ ] Enter a Kaggle tabular competition and reach top 40%

---

### PHASE 4 — Deep Learning & NLP
*Goal: Understand neural networks deeply and build sequence models and BERT classifiers.*

**Topics:**

**A. Neural Networks from Scratch**
- [ ] Perceptron, MLP, activation functions (ReLU, Sigmoid, GELU, Tanh)
  - Best resource: https://www.youtube.com/watch?v=VMj-3S1tku0 (Andrej Karpathy — micrograd, zero to hero Ep.1)
  - Visual: https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi (3Blue1Brown — Neural Networks Series)
- [ ] Forward pass, loss, backpropagation (chain rule)
  - Video: https://www.youtube.com/watch?v=Ilg3gGewQ5U (3Blue1Brown — Backpropagation Calculus)
- [ ] Weight initialization: Xavier, He; batch normalization; dropout
  - Video: https://www.youtube.com/watch?v=dXB-KQYkzNU (DeepMind — Weight Init)
- [ ] PyTorch fundamentals: tensors, autograd, nn.Module, DataLoader
  - Full course: https://www.youtube.com/watch?v=Z_ikDlimN6A (freeCodeCamp — PyTorch for DL full course)

**B. Convolutional Neural Networks (CNN)**
- [ ] Convolution op, kernels, stride, padding, pooling
  - Video: https://www.youtube.com/watch?v=YRhxdVk_sIs (Andrej Karpathy — CNN Stanford CS231n)
- [ ] Architectures: LeNet, AlexNet, VGG, ResNet, EfficientNet
  - Video: https://www.youtube.com/watch?v=dQw4YYWF-I (deeplizard — CNN architectures overview — replace with: https://www.youtube.com/watch?v=ACmuBbuXn20)
- [ ] Transfer learning with pretrained models (torchvision)
  - Video: https://www.youtube.com/watch?v=K0lWSB2QoIQ (Sentdex — PyTorch Transfer Learning)

**C. RNN, LSTM, GRU**
- [ ] RNN: hidden state, vanishing gradient problem
  - Video: https://www.youtube.com/watch?v=AsNTP8Kwu80 (StatQuest — RNN)
- [ ] LSTM: forget, input, output gates, cell state
  - Video: https://www.youtube.com/watch?v=YCzL96nL7j0 (StatQuest — LSTM)
- [ ] GRU, bidirectional RNNs, seq2seq
  - Video: https://www.youtube.com/watch?v=8HyCNIVRbSU (deeplizard — RNN/LSTM/GRU)

**D. NLP Foundations**
- [ ] Text cleaning, tokenization types (word, char, BPE, SentencePiece)
  - Video: https://www.youtube.com/watch?v=zduSFxRajkE (Andrej Karpathy — Let's build the GPT Tokenizer)
- [ ] TF-IDF, stemming, lemmatization, NER with spaCy
  - Full NLP playlist: https://www.youtube.com/playlist?list=PLZoTAELRMXVMdJ5sqbCK2LiM0HhQVWNzm (Krish Naik — NLP Playlist)
- [ ] Word2Vec (CBOW, Skip-gram), GloVe, cosine similarity
  - Video: https://www.youtube.com/watch?v=viZrOnJclY0 (StatQuest — Word Embedding & Word2Vec)
- [ ] BERT: MLM pretraining, fine-tuning for classification, NER, QA
  - Video: https://www.youtube.com/watch?v=-9vVhYEXeyQ (Yannic Kilcher — BERT paper explained)
  - Hugging Face: https://www.youtube.com/watch?v=DQc2Mi7ZcS4 (Sentdex — BERT fine-tuning)
  - Full HF course: https://huggingface.co/learn/nlp-course/chapter1/1

**Build Tasks — Phase 4:**
- [ ] Implement a neural network from scratch using only NumPy (no PyTorch) and train on MNIST
- [ ] Train a CNN on CIFAR-10 with ResNet transfer learning; achieve >85% accuracy; deploy via Streamlit
- [ ] Build a sentiment classifier using LSTM on IMDB dataset in PyTorch
- [ ] Fine-tune BERT on a custom text classification dataset using Hugging Face; push to HF Hub

---

### PHASE 5 — Transformers & Building LLMs
*Goal: Understand and implement the transformer architecture, build GPT from scratch, fine-tune open LLMs, and deploy a ChatGPT clone.*

**Topics:**

**A. Attention Mechanism**
- [ ] Bahdanau (additive) attention — intuition and math
  - Video: https://www.youtube.com/watch?v=quoGRI-1l0A (Andrej Karpathy — Attention explained intuitively)
- [ ] Scaled dot-product attention: Q, K, V matrices; formula: softmax(QK^T/√dk)V
  - Video: https://www.youtube.com/watch?v=eMlx5fFNoYc (3Blue1Brown — Attention in Transformers)
  - Paper: https://arxiv.org/abs/1706.03762 (Attention Is All You Need — Vaswani et al. 2017)
- [ ] Why attention beats recurrence for long sequences

**B. Full Transformer Architecture**
- [ ] Multi-head attention: parallel heads, concat, projection
  - Video: https://www.youtube.com/watch?v=iDulhoQ2pro (Yannic Kilcher — Attention Is All You Need walkthrough)
- [ ] Sinusoidal positional encoding; RoPE (used in Llama); ALiBi
  - Video: https://www.youtube.com/watch?v=dichIcUZfOw (Andrej Karpathy — Building GPT step by step — The One)
- [ ] Encoder stack: self-attention + FFN + LayerNorm + residuals
- [ ] Decoder stack: masked self-attention + cross-attention + FFN
- [ ] Encoder-only (BERT) vs Decoder-only (GPT) vs Seq2Seq (T5, BART)
  - Resource: https://jalammar.github.io/illustrated-transformer/ (Jay Alammar — The Illustrated Transformer)
  - Full build: https://www.youtube.com/watch?v=kCc8FmEb1nY (Andrej Karpathy — Let's build GPT from scratch — ESSENTIAL)

**C. Build LLMs Stage by Stage**
- [ ] Stage 1 — Character-level language model (bigram → MLP → RNN baseline)
  - Video: https://www.youtube.com/watch?v=PaCmpygFfXo (Karpathy — makemore Part 1: bigrams)
  - Dataset: https://raw.githubusercontent.com/karpathy/char-rnn/master/data/tinyshakespeare/input.txt
- [ ] Stage 2 — Build GPT from scratch in PyTorch (token embeddings + positional + transformer blocks + LM head)
  - Video: https://www.youtube.com/watch?v=kCc8FmEb1nY (Karpathy — Let's build GPT — 2 hrs — WATCH ALL)
- [ ] Stage 3 — BPE Tokenizer from scratch + training pipeline (gradient accumulation, mixed precision, warmup)
  - Video: https://www.youtube.com/watch?v=zduSFxRajkE (Karpathy — Let's build the GPT Tokenizer)
  - Series: https://www.youtube.com/watch?v=UU1WVnMk4E8 (Sebastian Raschka — LLM from Scratch series)
- [ ] Stage 4 — Fine-tune Open LLMs with LoRA/QLoRA (Llama 3 8B or Mistral 7B on Colab)
  - Video: https://www.youtube.com/watch?v=eC6Hd1hFvos (Maxime Labonne — Fine-tune Llama 3 with QLoRA)
  - Explainer: https://www.youtube.com/watch?v=dA-NhCtrrVE (Tim Dettmers — QLoRA explained)
- [ ] Stage 5 — RAG pipeline + LangChain Agents + ChatGPT clone deployment
  - Video: https://www.youtube.com/watch?v=tcqEUSNCn8I (Sam Witteveen — LangChain + RAG)
  - Agents: https://www.youtube.com/watch?v=DWUdGhRrv2c (Data Independent — LangChain Agents)

**D. MLOps & Deployment**
- [ ] Docker: Dockerfile, docker-compose, containerize ML app
  - Video: https://www.youtube.com/watch?v=3c-iBn73dDE (TechWorld with Nana — Docker Full Course)
- [ ] FastAPI: REST endpoints for LLM inference, Pydantic, async
  - Docs: https://fastapi.tiangolo.com/tutorial/
  - Video: https://www.youtube.com/watch?v=0sOvCWFmrtA (freeCodeCamp — FastAPI)
- [ ] Hugging Face Hub: push models, Spaces (deploy Gradio/Streamlit free)
  - Video: https://www.youtube.com/watch?v=2TqTEpg3aUk (HF — Deploy to Spaces)
- [ ] AWS basics: EC2, S3, SageMaker
  - Video: https://www.youtube.com/watch?v=3hLmDS179YE (freeCodeCamp — AWS Practitioner full course)

**Build Tasks — Phase 5:**
- [ ] Implement scaled dot-product attention from scratch in PyTorch and verify attention weights visually
- [ ] Train a GPT model on the Tiny Shakespeare dataset following Karpathy's tutorial end-to-end
- [ ] Build a BPE tokenizer from scratch and tokenize a custom text corpus
- [ ] Fine-tune Mistral-7B or Llama-3-8B with QLoRA on Google Colab on a custom QA dataset; push to HF Hub
- [ ] Build a RAG chatbot over your own PDF documents using LangChain + FAISS
- [ ] Deploy your personal ChatGPT clone: fine-tuned LLM + RAG + FastAPI backend + Gradio UI → Hugging Face Spaces

---

## 🗺️ PAGE 3 — ROADMAP (roadmap.html + roadmap.css + roadmap.js)

This page is **read-only** — no checkboxes. It shows the learning architecture at a glance.

**Layout:** Vertical timeline — each phase is a card with a left-border color accent.

**Each phase card contains:**
- Phase number + name + estimated time
- Goal (one sentence)
- Topic list (clean bullet list, grouped by sub-topic)
- Learning outcomes (what you can do after this phase — 3–5 bullets)
- Projects built in this phase

**At the top of the page:** A horizontal progress bar pulled from localStorage showing "Your progress: X% of roadmap complete"

**Phase color coding:**
- Phase 0: `#6366f1` (indigo)
- Phase 1: `#0ea5e9` (sky blue)
- Phase 2: `#10b981` (emerald)
- Phase 3: `#f59e0b` (amber)
- Phase 4: `#ef4444` (red)
- Phase 5: `#8b5cf6` (purple)

**Roadmap.js** renders all phase cards dynamically from a `PHASES` data array defined in the file — no hardcoded HTML for phase content.

---

## 👤 PAGE 4 — ABOUT (about.html + about.css + about.js)

### Developer Section
```
About the Developer

[Profile section — centered card]
Name: Shubham Mallick
Role: B.Tech Student | AI & LLM Enthusiast | Developer
```

**Short intro (write this text exactly):**
> "I'm Shubham Mallick, a B.Tech student passionate about Artificial Intelligence and building intelligent systems from scratch. I created GRBS to make the journey from zero coding knowledge to building Large Language Models structured, free, and accessible to every student in India and beyond. This roadmap is what I wish existed when I started. I believe the best way to learn AI is to build it — one line of code at a time."

**Social/Links (styled as icon cards):**
- 🐙 GitHub: https://github.com/shubham001312
- 💼 LinkedIn: https://www.linkedin.com/in/shubham-mallick-061298378/

**About GRBS Section:**
```
About This Project

GPT Roadmap By Shubham (GRBS) is a free, open learning portal that guides B.Tech 
students from programming basics all the way to building and deploying Large Language 
Models. Every resource linked is free. Every project is practical. Every phase builds 
on the last.

Built with: HTML · CSS · JavaScript · ❤️
No frameworks. No databases. Just a student helping students.
```

**Tech Stack used in this site (list):** HTML5, CSS3, Vanilla JavaScript, Google Fonts, LocalStorage API

**Mission statement card:**
```
"Make LLM engineering education free, structured, and accessible to every student."
```

---

## 🔽 FOOTER — Shared on all pages (footer.css)

Footer structure (rendered via JS into each page or as shared HTML snippet included in each page):

```
Left column:
  GRBS Logo (small)
  "GPT Roadmap By Shubham"
  "© 2025 Shubham Mallick. All rights reserved."

Center column:
  Quick Links
  - Home
  - Study
  - Roadmap
  - About

Right column:
  Connect
  - GitHub (icon + link)
  - LinkedIn (icon + link)
  - "Built with ❤️ for students"
```

Footer background: `--bg-sidebar` (dark navy). Text: `--text-sidebar`.

---

## ⚙️ JAVASCRIPT — IMPLEMENTATION DETAILS

### storage.js — ALL localStorage keys and helpers
```javascript
const STORAGE_KEYS = {
  username: 'grbs_username',
  progress: 'grbs_progress',   // object: { phaseId_topicIndex: true/false, phaseId_buildIndex: true/false }
};

// Functions to export:
// getUsername() → string | null
// setUsername(name) → void
// getProgress() → object
// setProgress(key, value) → void
// getPhaseProgress(phaseId) → { total, done, buildTotal, buildDone }
// getOverallProgress() → { percent, done, total }
// clearAll() → void
```

### nav.js
- Query all `.nav-link` elements, add `.active` class to the one matching `window.location.pathname`
- Hamburger button (`#menu-toggle`) toggles `.sidebar-open` class on `<body>`
- Clicking backdrop (`.sidebar-overlay`) closes sidebar

### home.js
- On load: check username, show modal if absent
- Render circular SVG progress ring (use `stroke-dasharray` technique)
- Render phase progress cards from `PHASES` data
- Live update all progress numbers from storage on every page load

### study.js
- Build phase accordion from `PHASES` data array
- Phase locking: before opening a phase, check if prev phase build tasks are all done
- Each checkbox `input[type=checkbox]` saves state to storage on change
- Each checkbox restores state from storage on page load
- Smooth scroll to `#phase-N` on pill nav click
- Copy icon: `navigator.clipboard.writeText(topicName)`, show "Copied!" tooltip for 1.5s
- Live update progress bar at top

### roadmap.js
- Render all phase cards dynamically from `PHASES` data
- Pull user progress from storage and show progress bar

### about.js — (minimal)
- No dynamic logic needed; page is fully static

---

## 🖼️ LOGO & FAVICON

**Logo SVG (assets/logo.svg):**
Design an SVG showing:
- Red rounded square background
- White letters "GRBS" in Space Mono bold, centered
- Dimensions: 160×48px (wide, banner-style for sidebar header)

**Favicon (favicon.svg at root):**
- Red rounded square, 32×32
- White letter "G" centered
- Use `<link rel="icon" type="image/svg+xml" href="/favicon.svg">` in every HTML `<head>`

---

## ✅ QUALITY REQUIREMENTS — NON-NEGOTIABLE

1. **Zero broken links** — every YouTube link must be a real, correct URL from the content above
2. **Zero placeholder content** — no "Lorem ipsum", no "Coming soon", no "TODO"
3. **All phases fully written** — all 6 phases with all topics, all video links, all build tasks
4. **Phase locking enforced** — cannot open Phase N+1 until Phase N build tasks are all ticked
5. **localStorage persistence** — username and ALL checkbox states survive page refresh and navigation
6. **Mobile first** — sidebar overlay on mobile, no horizontal scroll on any screen size ≥ 320px
7. **Accessible** — all interactive elements keyboard-navigable; proper `aria-label` on icon buttons
8. **Copyable** — all topic text is selectable; copy button uses Clipboard API
9. **Consistent** — all pages use `base.css`, `nav.css`, `footer.css` — no inline styles except SVG
10. **No external JS libraries** — pure vanilla JavaScript only
11. **File hygiene** — each HTML file includes only its own page CSS plus shared CSS/JS; no inline `<style>` blocks except for critical above-the-fold CSS
12. **Fast** — no render-blocking resources; fonts loaded with `display=swap`

---

## 🚀 GENERATION INSTRUCTIONS FOR THE AI AGENT

Generate all files simultaneously. Work in this order to maximize parallel completion:

**Batch 1 (foundation — generate all at once):**
- `css/base.css` (full design system, CSS variables, typography, reset)
- `css/nav.css` + `css/footer.css`
- `js/storage.js` (all storage helpers)
- `js/nav.js` (sidebar logic)
- `assets/logo.svg` + `favicon.svg`

**Batch 2 (page CSS — generate all at once):**
- `css/home.css`
- `css/study.css`
- `css/roadmap.css`
- `css/about.css`

**Batch 3 (JS logic — generate all at once):**
- `js/home.js` (username modal, progress ring, phase cards)
- `js/study.js` (accordion, locking, checkboxes, copy)
- `js/roadmap.js` (dynamic phase card rendering)
- `js/about.js`

**Batch 4 (HTML pages — generate all at once):**
- `index.html`
- `study.html`
- `roadmap.html`
- `about.html`

**Each HTML page must:**
- Have correct `<meta charset>`, `<meta name="viewport" content="width=device-width, initial-scale=1">` 
- Link favicon.svg
- Link Google Fonts
- Link shared CSS: `base.css`, `nav.css`, `footer.css`
- Link page-specific CSS
- Include sidebar HTML markup (same across all pages)
- Include footer HTML markup
- Include `<main>` with page content
- Load `storage.js` first, then `nav.js`, then page-specific JS at end of `<body>`

**GRBS is complete when:** A student can visit the site, enter their name, tick topics one by one across 6 phases, see their progress tracked on the home page, and view the full roadmap — all with zero server, zero database, zero internet dependency after first load.

---
*Prompt authored for GRBS — GPT Roadmap By Shubham | Developer: Shubham Mallick | GitHub: https://github.com/shubham001312 | LinkedIn: https://www.linkedin.com/in/shubham-mallick-061298378/*
