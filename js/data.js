/* ============================================
   Shubham's AI Journey — Curriculum Data
   15 Phases (0–14): Foundations → Build GPT From Scratch
   ============================================ */

function genTopics(groupId, items) {
  return items.map((item, i) => ({
    id: `g${groupId}_t${i}`,
    title: item[0],
    hours: item[1] || 4
  }));
}

const PHASES = [
  // ===== PHASE 0: Engineer Foundations =====
  {
    id: 0, emoji: '🛠️', title: 'Engineer Foundations',
    hours: 120, dependency: null, color: '#6366f1',
    objective: 'Master essential CS and engineering tools before writing any AI code.',
    interviewRelevance: 'High — every tech interview tests CS basics',
    topics: [
      { id: 'p0_t0', title: 'How computers work: CPU, memory, storage, binary', hours: 3 },
      { id: 'p0_t1', title: 'OS basics: processes, threads, memory management', hours: 4 },
      { id: 'p0_t2', title: 'Networking basics: TCP/IP, HTTP, DNS, ports', hours: 4 },
      { id: 'p0_t3', title: 'Linux basics: ls, cd, mkdir, grep, chmod, ssh', hours: 4 },
      { id: 'p0_t4', title: 'Shell scripting, env vars, package managers', hours: 3 },
      { id: 'p0_t5', title: 'Git init, commit, push, pull, branch, merge', hours: 4 },
      { id: 'p0_t6', title: 'Pull requests, rebasing, conflict resolution', hours: 3 },
      { id: 'p0_t7', title: 'README files, Markdown, GitHub profile', hours: 2 },
      { id: 'p0_t8', title: 'VS Code setup, extensions, shortcuts, debugging', hours: 2 },
      { id: 'p0_t9', title: 'Debugging: print, breakpoints, stack traces', hours: 3 },
    ],
    resources: [
      { level: 'Video', url: 'https://www.youtube.com/watch?v=O5nskjZ_GoI', label: 'Crash Course CS #1' },
      { level: '🇮🇳 Hindi', url: 'https://youtu.be/FETxgyyu904', label: 'Not Your College — CS Fundamentals' },
      { level: 'Video', url: 'https://youtu.be/8XBtAjKwCm4', label: 'OS In One Shot — Anuj Bhaiya' },
      { level: '🇮🇳 Hindi', url: 'https://youtu.be/xw_OuOhjauw', label: 'Knowledge Gate — OS' },
      { level: 'Video', url: 'https://www.youtube.com/watch?v=qiQR5rTSshw', label: 'freeCodeCamp — Networking' },
      { level: 'Video', url: 'https://www.youtube.com/watch?v=ZtqBQ68cfJc', label: 'freeCodeCamp — Linux CLI' },
      { level: 'Video', url: 'https://www.youtube.com/watch?v=RGOj5yH7evk', label: 'freeCodeCamp — Git & GitHub' },
      { level: '🇮🇳 Hindi', url: 'https://youtu.be/Ez8F0nW6S-w', label: 'ApnaCollege — Git & GitHub' },
    ],
    projects: [
      { id: 'p0_proj0', name: 'Linux CLI scavenger hunt', level: 'Beginner' },
      { id: 'p0_proj1', name: 'Git branching exercise', level: 'Beginner' },
      { id: 'p0_proj2', name: 'VS Code productivity setup', level: 'Beginner' },
      { id: 'p0_proj3', name: 'Debug a broken Python script', level: 'Intermediate' },
      { id: 'p0_proj4', name: 'Write a shell script automation', level: 'Intermediate' },
    ],
    milestones: [
      { id: 'p0_m0', text: 'Set up complete dev environment' },
      { id: 'p0_m1', text: 'Create GitHub repo with README & .gitignore' },
      { id: 'p0_m2', text: 'Write 5 shell commands to navigate/search files' },
      { id: 'p0_m3', text: 'Clone repo, branch, resolve conflict, submit PR' },
      { id: 'p0_m4', text: 'Debug a Python script using breakpoints' },
    ],
  },

  // ===== PHASE 1: Programming Mastery =====
  {
    id: 1, emoji: '💻', title: 'Programming Mastery',
    hours: 200, dependency: 0, color: '#818cf8',
    objective: 'Become a strong programmer in Python and C, master OOP, solve DSA problems.',
    interviewRelevance: 'Critical — Python coding rounds in every AI/ML interview',
    topics: [
      { id: 'p1_t0', title: 'Python basics: variables, control flow, functions, I/O', hours: 8 },
      { id: 'p1_t1', title: 'OOP: classes, inheritance, dunder methods, decorators', hours: 10 },
      { id: 'p1_t2', title: 'Comprehensions, generators, iterators, context managers', hours: 6 },
      { id: 'p1_t3', title: 'File handling, APIs, web scraping, virtual environments', hours: 6 },
      { id: 'p1_t4', title: 'Type hints, mypy, dataclasses, Protocol', hours: 4 },
      { id: 'p1_t5', title: 'Async programming: asyncio, async/await, aiohttp', hours: 6 },
      { id: 'p1_t6', title: 'C basics: variables, pointers, memory, structs', hours: 8 },
      { id: 'p1_t7', title: 'Memory management: malloc, free, buffer overflow', hours: 4 },
      { id: 'p1_t8', title: 'Arrays, strings, hash maps, stacks, queues', hours: 12 },
      { id: 'p1_t9', title: 'Trees, graphs, recursion, backtracking', hours: 14 },
      { id: 'p1_t10', title: 'Sorting, searching, Big-O analysis', hours: 10 },
      { id: 'p1_t11', title: 'LeetCode Easy/Medium problems (20+ solved)', hours: 20 },
    ],
    resources: [
      { level: '🇮🇳 Hindi', url: 'https://www.youtube.com/watch?v=gfDE2a7MKjA', label: 'CodeWithHarry — Python' },
      { level: '🇮🇳 Hindi', url: 'https://www.youtube.com/watch?v=vLqTf2b6GZw', label: 'Apna College — Python' },
      { level: 'Beginner', url: 'https://www.youtube.com/watch?v=_uQrJ0TkZlc', label: 'Programming with Mosh — Python' },
      { level: 'Intermediate', url: 'https://www.youtube.com/watch?v=HGOBQPFzWKo', label: 'freeCodeCamp — Python Full Course' },
      { level: 'Intermediate', url: 'https://www.youtube.com/watch?v=Ej_02ICOIgs', label: 'Corey Schafer — OOP' },
      { level: '🇮🇳 Hindi', url: 'https://youtu.be/UrsmFxEIp5k', label: 'CodeWithHarry — Python Complete' },
      { level: 'Video', url: 'https://www.youtube.com/watch?v=KJgsSFOSQv0', label: 'freeCodeCamp — C Full Course' },
      { level: '🇮🇳 Hindi', url: 'https://www.youtube.com/playlist?list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BEO', label: 'Striver — A2Z DSA' },
      { level: 'Video', url: 'https://www.youtube.com/watch?v=pkYVOmU3MgA', label: 'freeCodeCamp — DSA Full Course' },
    ],
    projects: [
      { id: 'p1_proj0', name: 'CLI to-do app with file persistence', level: 'Beginner' },
      { id: 'p1_proj1', name: 'CSV data processing script', level: 'Beginner' },
      { id: 'p1_proj2', name: 'DSA implementations from scratch', level: 'Intermediate' },
      { id: 'p1_proj3', name: '20 LeetCode solutions with explanations', level: 'Intermediate' },
      { id: 'p1_proj4', name: 'REST-ish CLI tool with argparse + async', level: 'Advanced' },
    ],
    milestones: [
      { id: 'p1_m0', text: 'Write a Python class with inheritance & dunder methods' },
      { id: 'p1_m1', text: 'Understand decorators by writing 3 custom ones' },
      { id: 'p1_m2', text: 'Push project to GitHub with .gitignore and README' },
      { id: 'p1_m3', text: 'Solve 50 LeetCode Easy problems' },
      { id: 'p1_m4', text: 'Write a generator function used in real code' },
      { id: 'p1_m5', text: 'Create virtual environment and manage deps' },
      { id: 'p1_m6', text: 'Write async code with asyncio' },
    ],
  },

  // ===== PHASE 2: Mathematics for AI =====
  {
    id: 2, emoji: '🧮', title: 'Mathematics for AI',
    hours: 100, dependency: 1, color: '#0ea5e9',
    objective: 'Build the math intuition that powers every neural network and ML algorithm.',
    interviewRelevance: 'Medium-High — ML interviews test math intuition',
    topics: [
      { id: 'p2_t0', title: 'Vectors, matrices, dot products, matrix multiplication', hours: 6 },
      { id: 'p2_t1', title: 'Eigenvalues, eigenvectors, SVD, decompositions', hours: 6 },
      { id: 'p2_t2', title: 'Tensor operations in NumPy/PyTorch', hours: 4 },
      { id: 'p2_t3', title: 'Derivatives, partial derivatives, chain rule', hours: 6 },
      { id: 'p2_t4', title: 'Gradient, Jacobian, Hessian', hours: 4 },
      { id: 'p2_t5', title: 'Automatic Differentiation (autograd concept)', hours: 4 },
      { id: 'p2_t6', title: 'Probability axioms, conditional probability, Bayes theorem', hours: 6 },
      { id: 'p2_t7', title: 'Distributions: Normal, Binomial, Bernoulli', hours: 4 },
      { id: 'p2_t8', title: 'MLE, cross-entropy loss, hypothesis testing', hours: 5 },
      { id: 'p2_t9', title: 'Gradient descent, SGD, momentum', hours: 4 },
      { id: 'p2_t10', title: 'Adam, RMSProp, learning rate scheduling', hours: 4 },
      { id: 'p2_t11', title: 'Convex vs non-convex optimization', hours: 3 },
    ],
    resources: [
      { level: 'Beginner', url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab', label: '3Blue1Brown — Linear Algebra' },
      { level: 'Beginner', url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr', label: '3Blue1Brown — Essence of Calculus' },
      { level: 'Video', url: 'https://www.youtube.com/watch?v=GkB4vW16QHI', label: 'StatQuest — Gradient Descent' },
      { level: 'Video', url: 'https://www.youtube.com/watch?v=VMj-3S1tku0', label: 'Karpathy — micrograd' },
      { level: 'Video', url: 'https://www.youtube.com/watch?v=HZGCoVF3YvM', label: 'StatQuest — Probability Fundamentals' },
      { level: 'Video', url: 'https://www.youtube.com/watch?v=XepXtl9YKwc', label: 'StatQuest — Maximum Likelihood' },
    ],
    projects: [
      { id: 'p2_proj0', name: 'Matrix multiplication from scratch', level: 'Beginner' },
      { id: 'p2_proj1', name: 'Micrograd: backpropagation from scratch', level: 'Intermediate' },
      { id: 'p2_proj2', name: 'Gradient descent visualizer', level: 'Intermediate' },
      { id: 'p2_proj3', name: 'Naive Bayes spam classifier', level: 'Advanced' },
      { id: 'p2_proj4', name: 'PCA from scratch using NumPy SVD', level: 'Advanced' },
    ],
    milestones: [
      { id: 'p2_m0', text: 'Explain matrix multiplication geometrically' },
      { id: 'p2_m1', text: 'Derive gradient descent update rule from calculus' },
      { id: 'p2_m2', text: 'Implement Bayes theorem for spam filter' },
      { id: 'p2_m3', text: 'Explain eigenvalues intuitively' },
      { id: 'p2_m4', text: 'Implement PCA from scratch using NumPy SVD' },
    ],
  },

  // ===== PHASE 3: Software Engineering =====
  {
    id: 3, emoji: '🏗️', title: 'Software Engineering',
    hours: 100, dependency: 1, color: '#06b6d4',
    objective: 'Understand OS, networks, databases, and build production systems.',
    interviewRelevance: 'Very High — Asked directly in internship/placement rounds',
    topics: [
      { id: 'p3_t0', title: 'Processes, threads, scheduling, concurrency', hours: 6 },
      { id: 'p3_t1', title: 'Memory management, virtual memory, file systems', hours: 5 },
      { id: 'p3_t2', title: 'TCP/IP, HTTP/HTTPS, DNS, REST', hours: 5 },
      { id: 'p3_t3', title: 'WebSockets, APIs, API design best practices', hours: 4 },
      { id: 'p3_t4', title: 'SQL fundamentals: SELECT, JOIN, GROUP BY, subqueries', hours: 6 },
      { id: 'p3_t5', title: 'PostgreSQL, schema design, indexing, normalization', hours: 5 },
      { id: 'p3_t6', title: 'Redis, NoSQL, when to use what', hours: 3 },
      { id: 'p3_t7', title: 'System design: scalability, caching, load balancing', hours: 8 },
      { id: 'p3_t8', title: 'FastAPI: REST endpoints, Pydantic, async, DI', hours: 10 },
      { id: 'p3_t9', title: 'Testing: unit tests, integration tests, pytest', hours: 6 },
    ],
    resources: [
      { level: 'Video', url: 'https://www.youtube.com/playlist?list=PLBlnK6fEyqRj9lld8sWIUNwlKfdUoPdFY', label: 'Neso Academy — OS Full Course' },
      { level: 'Video', url: 'https://www.youtube.com/watch?v=IPvYjXCsTg8', label: 'Kunal Kushwaha — Networking' },
      { level: 'Full course', url: 'https://www.youtube.com/watch?v=HXV3zeQKqGY', label: 'freeCodeCamp — SQL Full Course' },
      { level: '🇮🇳 Hindi', url: 'https://www.youtube.com/watch?v=ERCMXc8x7mc', label: 'Apna College — SQL' },
      { level: 'Video', url: 'https://www.youtube.com/playlist?list=PLMCXHnjXnTnvo6alSjVkgxV-VH6EPyvoX', label: 'Gaurav Sen — System Design' },
      { level: 'Video', url: 'https://www.youtube.com/watch?v=0sOvCWFmrtA', label: 'freeCodeCamp — FastAPI' },
      { level: 'Docs', url: 'https://fastapi.tiangolo.com/tutorial/', label: 'FastAPI Tutorial' },
    ],
    projects: [
      { id: 'p3_proj0', name: 'Producer-consumer program with threads', level: 'Beginner' },
      { id: 'p3_proj1', name: 'File System Simulator', level: 'Intermediate' },
      { id: 'p3_proj2', name: 'Mini DB engine with B-tree index', level: 'Advanced' },
      { id: 'p3_proj3', name: 'HTTP server from raw sockets', level: 'Internship' },
      { id: 'p3_proj4', name: 'Thread pool and connection pool', level: 'Placement' },
    ],
    milestones: [
      { id: 'p3_m0', text: 'Explain process vs thread to a 5-year-old' },
      { id: 'p3_m1', text: 'Implement a simple LRU cache' },
      { id: 'p3_m2', text: 'Write a multi-threaded file downloader' },
      { id: 'p3_m3', text: 'Design a database schema for a real app' },
      { id: 'p3_m4', text: 'Explain 3-way TCP handshake' },
    ],
  },

  // ===== PHASE 4: Frontend & AI Interface =====
  {
    id: 4, emoji: '🎨', title: 'Frontend & AI Interface',
    hours: 80, dependency: 1, color: '#f43f5e',
    objective: 'Build professional AI product interfaces. NOT web dev for its own sake.',
    interviewRelevance: 'Low-Medium (portfolio matters for AI roles)',
    topics: [
      { id: 'p4_t0', title: 'HTML5: semantic tags, forms, accessibility, canvas', hours: 5 },
      { id: 'p4_t1', title: 'CSS3: flexbox, grid, responsive, variables, animations', hours: 8 },
      { id: 'p4_t2', title: 'ES6+: promises, async/await, fetch, modules, DOM', hours: 10 },
      { id: 'p4_t3', title: 'React: components, hooks, props, routing', hours: 12 },
      { id: 'p4_t4', title: 'TypeScript basics for React', hours: 6 },
      { id: 'p4_t5', title: 'Streaming responses from LLM APIs, WebSockets', hours: 6 },
      { id: 'p4_t6', title: 'Tailwind CSS: utility-first, responsive modifiers', hours: 4 },
    ],
    resources: [
      { level: 'Video', url: 'https://www.youtube.com/watch?v=mU6anWqZJcc', label: 'freeCodeCamp — Web Dev Full Course' },
      { level: 'Video', url: 'https://www.youtube.com/playlist?list=PLwgFb6VsUj_lQTpQKDtLXKXElQychT_2j', label: 'Thapa Technical — HTML CSS JS' },
      { level: 'Video', url: 'https://www.youtube.com/watch?v=RVFAyFWO4go', label: 'Dave Gray — React Full Course 2024' },
      { level: 'Video', url: 'https://www.youtube.com/watch?v=BCg4U1FzODs', label: 'Traversy Media — TypeScript' },
      { level: 'Docs', url: 'https://tailwindcss.com/', label: 'Tailwind CSS Docs' },
    ],
    projects: [
      { id: 'p4_proj0', name: 'Static ChatGPT-style UI (hardcoded)', level: 'Beginner' },
      { id: 'p4_proj1', name: 'ChatGPT Clone UI with streaming', level: 'Intermediate' },
      { id: 'p4_proj2', name: 'AI Dashboard with model comparison', level: 'Intermediate' },
      { id: 'p4_proj3', name: 'AI Tutor Interface with session history', level: 'Advanced' },
      { id: 'p4_proj4', name: 'AI product landing page + demo', level: 'Advanced' },
    ],
    milestones: [
      { id: 'p4_m0', text: 'Build responsive layout without framework' },
      { id: 'p4_m1', text: 'Render streaming text from LLM API char by char' },
      { id: 'p4_m2', text: 'Create reusable React component library' },
      { id: 'p4_m3', text: 'Implement dark/light mode toggle' },
      { id: 'p4_m4', text: 'Connect real LLM API (Groq) to React chat' },
    ],
  },

  // ===== PHASE 5: Data Science Foundations =====
  {
    id: 5, emoji: '📊', title: 'Data Science Foundations',
    hours: 70, dependency: 2, color: '#10b981',
    objective: 'Master data manipulation, exploration, visualization — the language of ML.',
    interviewRelevance: 'High — Data cleaning skills tested in ML interviews',
    topics: [
      { id: 'p5_t0', title: 'NumPy: ndarray, indexing, slicing, boolean masks', hours: 5 },
      { id: 'p5_t1', title: 'NumPy: Broadcasting, vectorized ops, linear algebra', hours: 5 },
      { id: 'p5_t2', title: 'Pandas: Series, DataFrame, data loading', hours: 6 },
      { id: 'p5_t3', title: 'Pandas: Data cleaning — dropna, fillna, duplicates', hours: 4 },
      { id: 'p5_t4', title: 'Pandas: groupby, merge, pivot tables, apply/map', hours: 5 },
      { id: 'p5_t5', title: 'Matplotlib: line, bar, scatter, histogram', hours: 4 },
      { id: 'p5_t6', title: 'Seaborn: heatmap, pairplot, violin, regplot', hours: 4 },
      { id: 'p5_t7', title: 'Feature engineering: encoding, scaling, imputation', hours: 5 },
      { id: 'p5_t8', title: 'Feature selection: correlation, mutual info, RFECV', hours: 4 },
      { id: 'p5_t9', title: 'EDA workflow and reporting', hours: 4 },
    ],
    resources: [
      { level: 'Video', url: 'https://www.youtube.com/watch?v=QUT1VHiLmmI', label: 'freeCodeCamp — NumPy Full Course' },
      { level: 'Beginner', url: 'https://www.youtube.com/watch?v=vmEHCJofslg', label: 'Corey Schafer — Pandas' },
      { level: 'Full course', url: 'https://www.youtube.com/watch?v=e60ItwlZTKM', label: 'Keith Galli — Complete Pandas' },
      { level: 'Video', url: 'https://www.youtube.com/watch?v=3Xc3CA655Y4', label: 'Corey Schafer — Matplotlib' },
      { level: 'Video', url: 'https://www.youtube.com/watch?v=6GUZXDef2U0', label: 'freeCodeCamp — Seaborn' },
      { level: 'Course', url: 'https://www.kaggle.com/learn', label: 'Kaggle Learn' },
    ],
    projects: [
      { id: 'p5_proj0', name: 'EDA on Titanic dataset with report', level: 'Beginner' },
      { id: 'p5_proj1', name: 'Business Analytics Dashboard', level: 'Intermediate' },
      { id: 'p5_proj2', name: 'End-to-end EDA pipeline (auto PDF report)', level: 'Advanced' },
      { id: 'p5_proj3', name: 'Customer churn analysis', level: 'Internship' },
      { id: 'p5_proj4', name: 'Kaggle top-20% submission notebook', level: 'Placement' },
    ],
    milestones: [
      { id: 'p5_m0', text: 'Vectorize a loop in NumPy (no Python for-loops)' },
      { id: 'p5_m1', text: 'Clean a messy real-world dataset' },
      { id: 'p5_m2', text: 'Create correlation heatmap with 3 insights' },
      { id: 'p5_m3', text: 'Submit to 1 Kaggle competition' },
      { id: 'p5_m4', text: 'Write data analysis report for non-technical person' },
    ],
  },

  // ===== PHASE 6: Machine Learning =====
  {
    id: 6, emoji: '🤖', title: 'Machine Learning',
    hours: 120, dependency: 2, color: '#f59e0b',
    objective: 'Build, evaluate, and deploy classical ML models end-to-end.',
    interviewRelevance: 'Very High — core of every ML/AI interview',
    topics: [
      { id: 'p6_t0', title: 'Linear Regression: OLS, MSE, R², gradient descent', hours: 6 },
      { id: 'p6_t1', title: 'Regularization: L1 Lasso, L2 Ridge, ElasticNet', hours: 4 },
      { id: 'p6_t2', title: 'Logistic Regression: sigmoid, cross-entropy, AUC-ROC', hours: 5 },
      { id: 'p6_t3', title: 'Decision Trees: Gini, entropy, pruning', hours: 5 },
      { id: 'p6_t4', title: 'Random Forests: bagging, feature importance', hours: 4 },
      { id: 'p6_t5', title: 'Gradient Boosting: XGBoost, LightGBM', hours: 6 },
      { id: 'p6_t6', title: 'K-Means, DBSCAN, hierarchical clustering', hours: 5 },
      { id: 'p6_t7', title: 'PCA, t-SNE, UMAP for visualization', hours: 5 },
      { id: 'p6_t8', title: 'Cross-validation, K-Fold, Stratified K-Fold', hours: 3 },
      { id: 'p6_t9', title: 'Confusion matrix, precision, recall, F1, AUC-ROC', hours: 4 },
      { id: 'p6_t10', title: 'Hyperparameter tuning: GridSearchCV, Optuna', hours: 4 },
      { id: 'p6_t11', title: 'ML Pipeline: sklearn Pipeline, column transformers', hours: 5 },
      { id: 'p6_t12', title: 'Model interpretability: SHAP, LIME', hours: 5 },
    ],
    resources: [
      { level: 'Beginner', url: 'https://www.youtube.com/watch?v=nk2CQITm_eo', label: 'StatQuest — Linear Regression' },
      { level: 'Full course', url: 'https://www.youtube.com/watch?v=jGwO_UgTS7I', label: 'Andrew Ng — ML Specialization' },
      { level: '🇮🇳 Hindi', url: 'https://www.youtube.com/watch?v=JxgmHe2NyeY', label: 'Krish Naik — Complete ML' },
      { level: 'Beginner', url: 'https://www.youtube.com/watch?v=OtD8wVaFm6E', label: 'StatQuest — XGBoost' },
      { level: 'Video', url: 'https://www.youtube.com/watch?v=4b5d3muPQmA', label: 'StatQuest — K-Means' },
      { level: 'Video', url: 'https://www.youtube.com/watch?v=FgakZw6K1QQ', label: 'StatQuest — PCA' },
    ],
    projects: [
      { id: 'p6_proj0', name: 'Iris classification with 5 algorithms', level: 'Beginner' },
      { id: 'p6_proj1', name: 'Loan Default Prediction (full pipeline)', level: 'Intermediate' },
      { id: 'p6_proj2', name: 'Credit Card Fraud Detection + SHAP', level: 'Advanced' },
      { id: 'p6_proj3', name: 'Recommendation System (hybrid)', level: 'Internship' },
      { id: 'p6_proj4', name: 'End-to-end ML product deployed', level: 'Placement' },
    ],
    milestones: [
      { id: 'p6_m0', text: 'Implement linear regression from scratch' },
      { id: 'p6_m1', text: 'Explain bias-variance tradeoff with visual' },
      { id: 'p6_m2', text: 'Build model with AUC > 0.85 on Kaggle' },
      { id: 'p6_m3', text: 'Use SHAP to explain a prediction' },
      { id: 'p6_m4', text: 'Serialize and serve model via FastAPI' },
    ],
  },

  // ===== PHASE 7: Deep Learning =====
  {
    id: 7, emoji: '🧠', title: 'Deep Learning',
    hours: 140, dependency: 6, color: '#ef4444',
    objective: 'Build neural networks from scratch, understand backprop, master PyTorch.',
    interviewRelevance: 'High — DL is core for AI/ML roles',
    topics: [
      { id: 'p7_t0', title: 'Perceptron, MLP, activation functions (ReLU, GELU, Tanh)', hours: 6 },
      { id: 'p7_t1', title: 'Forward pass, loss functions, backpropagation', hours: 8 },
      { id: 'p7_t2', title: 'Weight init, batch normalization, dropout', hours: 5 },
      { id: 'p7_t3', title: 'Convolution op, kernels, stride, padding, pooling', hours: 6 },
      { id: 'p7_t4', title: 'CNN architectures: LeNet → ResNet → EfficientNet', hours: 6 },
      { id: 'p7_t5', title: 'Transfer learning with pretrained models', hours: 5 },
      { id: 'p7_t6', title: 'RNN: hidden state, vanishing gradient problem', hours: 5 },
      { id: 'p7_t7', title: 'LSTM: gates, cell state; GRU, bidirectional RNNs', hours: 6 },
      { id: 'p7_t8', title: 'Learning rate scheduling, gradient clipping, mixed precision', hours: 5 },
      { id: 'p7_t9', title: 'Regularization: dropout, weight decay, data augmentation', hours: 4 },
      { id: 'p7_t10', title: 'PyTorch: tensors, autograd, nn.Module, DataLoader', hours: 10 },
      { id: 'p7_t11', title: 'GPU training, device management, checkpointing', hours: 5 },
    ],
    resources: [
      { level: 'Best', url: 'https://www.youtube.com/watch?v=VMj-3S1tku0', label: 'Karpathy — micrograd' },
      { level: 'Visual', url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi', label: '3Blue1Brown — Neural Networks' },
      { level: 'Video', url: 'https://www.youtube.com/watch?v=Ilg3gGewQ5U', label: '3Blue1Brown — Backprop Calculus' },
      { level: 'Video', url: 'https://www.youtube.com/watch?v=YRhxdVk_sIs', label: 'Karpathy — CNN Stanford CS231n' },
      { level: 'Video', url: 'https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ', label: 'Karpathy — Neural Networks Zero to Hero' },
      { level: 'Course', url: 'https://course.fast.ai/', label: 'fast.ai Practical Deep Learning' },
    ],
    projects: [
      { id: 'p7_proj0', name: 'NumPy neural network on MNIST', level: 'Beginner' },
      { id: 'p7_proj1', name: 'CNN image classifier on CIFAR-10', level: 'Intermediate' },
      { id: 'p7_proj2', name: 'LSTM text generator', level: 'Advanced' },
      { id: 'p7_proj3', name: 'Transfer learning project on custom dataset', level: 'Internship' },
      { id: 'p7_proj4', name: 'Real-time image recognition API', level: 'Placement' },
    ],
    milestones: [
      { id: 'p7_m0', text: 'Implement backprop from scratch (follow Karpathy micrograd)' },
      { id: 'p7_m1', text: 'Train MNIST from scratch >99% accuracy with CNN' },
      { id: 'p7_m2', text: 'Explain vanishing gradients and why LSTM solves them' },
      { id: 'p7_m3', text: 'Use GPU for training and measure speedup vs CPU' },
      { id: 'p7_m4', text: 'Fine-tune ResNet on custom dataset' },
    ],
  },

  // ===== PHASE 8: NLP Foundations =====
  {
    id: 8, emoji: '💬', title: 'NLP Foundations',
    hours: 90, dependency: 7, color: '#ec4899',
    objective: 'Master text processing, embeddings, and modern NLP with Hugging Face.',
    interviewRelevance: 'High — NLP is core for LLM roles',
    topics: [
      { id: 'p8_t0', title: 'Text cleaning, tokenization (word, char, BPE, SentencePiece)', hours: 6 },
      { id: 'p8_t1', title: 'TF-IDF, stemming, lemmatization, NER with spaCy', hours: 5 },
      { id: 'p8_t2', title: 'Word2Vec (CBOW, Skip-gram), GloVe, cosine similarity', hours: 6 },
      { id: 'p8_t3', title: 'FastText, contextual embeddings, ELMo', hours: 4 },
      { id: 'p8_t4', title: 'Seq2Seq, attention for NMT, beam search', hours: 6 },
      { id: 'p8_t5', title: 'Text classification with LSTM, sentiment analysis', hours: 5 },
      { id: 'p8_t6', title: 'BERT: MLM pretraining, fine-tuning for classification, NER, QA', hours: 8 },
      { id: 'p8_t7', title: 'Transformers library: pipeline, Trainer API, tokenizers', hours: 6 },
    ],
    resources: [
      { level: 'Video', url: 'https://www.youtube.com/watch?v=zduSFxRajkE', label: 'Karpathy — Build GPT Tokenizer' },
      { level: '🇮🇳 Hindi', url: 'https://www.youtube.com/watch?v=3bPhDUSAUYI', label: 'Krish Naik — NLP' },
      { level: 'Full playlist', url: 'https://www.youtube.com/playlist?list=PLZoTAELRMXVMdJ5sqbCK2LiM0HhQVWNzm', label: 'Krish Naik — NLP Playlist' },
      { level: 'Video', url: 'https://www.youtube.com/watch?v=viZrOnJclY0', label: 'StatQuest — Word Embeddings' },
      { level: 'Video', url: 'https://www.youtube.com/watch?v=-9vVhYEXeyQ', label: 'Yannic Kilcher — BERT' },
      { level: 'Full course', url: 'https://huggingface.co/learn/nlp-course/chapter1/1', label: 'Hugging Face NLP Course' },
    ],
    projects: [
      { id: 'p8_proj0', name: 'Sentiment classifier (TF-IDF vs embeddings)', level: 'Beginner' },
      { id: 'p8_proj1', name: 'Resume Parser → structured JSON', level: 'Intermediate' },
      { id: 'p8_proj2', name: 'Text Classification pipeline with BERT', level: 'Advanced' },
      { id: 'p8_proj3', name: 'Multi-label intent classifier', level: 'Internship' },
      { id: 'p8_proj4', name: 'Production NLP API with pipeline', level: 'Placement' },
    ],
    milestones: [
      { id: 'p8_m0', text: 'Implement Word2Vec training from scratch' },
      { id: 'p8_m1', text: 'Fine-tune BERT on classification task' },
      { id: 'p8_m2', text: 'Build a working resume parser' },
      { id: 'p8_m3', text: 'Explain attention mechanism with own diagram' },
      { id: 'p8_m4', text: 'Deploy NLP model as REST API' },
    ],
  },

  // ===== PHASE 9: Transformers Deep Dive =====
  {
    id: 9, emoji: '🔮', title: 'Transformers Deep Dive',
    hours: 100, dependency: 7, color: '#8b5cf6',
    objective: 'Understand and implement the Transformer from scratch. Most important phase for LLMs.',
    interviewRelevance: 'Critical — every modern AI role tests Transformer knowledge',
    topics: [
      { id: 'p9_t0', title: 'Scaled dot-product attention: Q, K, V; softmax(QK^T/√dk)V', hours: 8 },
      { id: 'p9_t1', title: 'Why attention beats recurrence for long sequences', hours: 4 },
      { id: 'p9_t2', title: 'Multi-head attention: parallel heads, concat, projection', hours: 6 },
      { id: 'p9_t3', title: 'Positional encoding: sinusoidal, RoPE, ALiBi', hours: 5 },
      { id: 'p9_t4', title: 'Encoder stack: self-attention + FFN + LayerNorm + residuals', hours: 6 },
      { id: 'p9_t5', title: 'Decoder stack: masked self-attention + cross-attention + FFN', hours: 6 },
      { id: 'p9_t6', title: 'Encoder-only (BERT) vs Decoder-only (GPT) vs Seq2Seq (T5)', hours: 5 },
      { id: 'p9_t7', title: 'Scaling laws: Chinchilla, compute-optimal training', hours: 4 },
      { id: 'p9_t8', title: 'Flash attention, KV caching, grouped query attention', hours: 5 },
      { id: 'p9_t9', title: 'Mixture of Experts (MoE), sparse attention', hours: 4 },
    ],
    resources: [
      { level: 'Video', url: 'https://www.youtube.com/watch?v=eMlx5fFNoYc', label: '3Blue1Brown — Attention in Transformers' },
      { level: 'Paper', url: 'https://arxiv.org/abs/1706.03762', label: 'Attention Is All You Need' },
      { level: 'Video', url: 'https://www.youtube.com/watch?v=iDulhoQ2pro', label: 'Yannic Kilcher — Attention Is All You Need' },
      { level: 'Blog', url: 'https://jalammar.github.io/illustrated-transformer/', label: 'Jay Alammar — Illustrated Transformer' },
      { level: 'Full build', url: 'https://www.youtube.com/watch?v=kCc8FmEb1nY', label: "Karpathy — Let's build GPT (ESSENTIAL)" },
      { level: 'Blog', url: 'https://lilianweng.github.io/posts/2018-06-24-attention/', label: 'Lilian Weng — Attention? Attention!' },
    ],
    projects: [
      { id: 'p9_proj0', name: 'Scaled dot-product attention from scratch', level: 'Beginner' },
      { id: 'p9_proj1', name: 'Full transformer block in PyTorch', level: 'Intermediate' },
      { id: 'p9_proj2', name: 'Attention visualization tool', level: 'Advanced' },
      { id: 'p9_proj3', name: 'Read and present a transformer paper', level: 'Internship' },
      { id: 'p9_proj4', name: 'nanoGPT implementation', level: 'Placement' },
    ],
    milestones: [
      { id: 'p9_m0', text: 'Implement self-attention from scratch (no nn.MultiheadAttention)' },
      { id: 'p9_m1', text: 'Implement positional encoding (sinusoidal + learned)' },
      { id: 'p9_m2', text: 'Train Transformer on toy task (copy, sort)' },
      { id: 'p9_m3', text: 'Read "Attention Is All You Need" and annotate every equation' },
      { id: 'p9_m4', text: 'Build nanoGPT by following Karpathy tutorial exactly' },
    ],
  },

  // ===== PHASE 10: Build GPT From Scratch =====
  {
    id: 10, emoji: '⚙️', title: 'Build GPT From Scratch',
    hours: 150, dependency: 9, color: '#a855f7',
    objective: 'Build, train, and evaluate a GPT-2 level language model from first principles.',
    interviewRelevance: 'Critical — proves deep LLM understanding',
    topics: [
      { id: 'p10_t0', title: 'Bigram model → MLP → RNN baseline', hours: 8 },
      { id: 'p10_t1', title: 'Build GPT from scratch in PyTorch', hours: 15 },
      { id: 'p10_t2', title: 'BPE Tokenizer from scratch + training pipeline', hours: 10 },
      { id: 'p10_t3', title: 'Dataset preparation, batching, context windows', hours: 6 },
      { id: 'p10_t4', title: 'Gradient accumulation, mixed precision, warmup, cosine decay', hours: 8 },
      { id: 'p10_t5', title: 'Checkpointing, resume training, logging with wandb', hours: 5 },
      { id: 'p10_t6', title: 'Perplexity, loss curves, overfitting detection', hours: 5 },
      { id: 'p10_t7', title: 'Sampling: temperature, top-k, top-p (nucleus), beam search', hours: 5 },
    ],
    resources: [
      { level: 'Video', url: 'https://www.youtube.com/watch?v=PaCmpygFfXo', label: 'Karpathy — makemore Part 1' },
      { level: 'Video', url: 'https://www.youtube.com/watch?v=kCc8FmEb1nY', label: "Karpathy — Let's build GPT (2 hrs — ESSENTIAL)" },
      { level: 'Video', url: 'https://www.youtube.com/watch?v=zduSFxRajkE', label: 'Karpathy — Build GPT Tokenizer' },
      { level: 'Series', url: 'https://www.youtube.com/watch?v=UU1WVnMk4E8', label: 'Sebastian Raschka — LLM from Scratch' },
      { level: 'Book', url: 'https://www.morganclaypool.com/doi/abs/10.2200/S01062ED2V01Y202001AIM043', label: 'Build a Large Language Model from Scratch (Raschka)' },
    ],
    projects: [
      { id: 'p10_proj0', name: 'Micrograd — autograd engine (20 lines of Python)', level: 'Beginner' },
      { id: 'p10_proj1', name: 'NanoGPT trained on Shakespeare', level: 'Intermediate' },
      { id: 'p10_proj2', name: 'NanoGPT on custom domain data', level: 'Advanced' },
      { id: 'p10_proj3', name: 'GPT-2 reproduction with BPE tokenizer', level: 'Internship' },
      { id: 'p10_proj4', name: '"I built a GPT from scratch" blog post', level: 'Placement' },
    ],
    milestones: [
      { id: 'p10_m0', text: 'Implement autograd from scratch (micrograd)' },
      { id: 'p10_m1', text: 'Train character-level language model — generate names' },
      { id: 'p10_m2', text: 'Implement full self-attention from scratch' },
      { id: 'p10_m3', text: 'Train nanoGPT to loss < 1.5 on Shakespeare' },
      { id: 'p10_m4', text: 'Train GPT-2 style model on real dataset' },
      { id: 'p10_m5', text: 'Share repo publicly and write about it' },
    ],
  },

  // ===== PHASE 11: LLM Engineering =====
  {
    id: 11, emoji: '🎯', title: 'LLM Engineering',
    hours: 120, dependency: 9, color: '#d946ef',
    objective: 'Learn to work with, fine-tune, quantize, and deploy large language models.',
    interviewRelevance: 'Very High — LLM Engineer roles are actively hiring',
    topics: [
      { id: 'p11_t0', title: 'BPE: implement from scratch, SentencePiece, tiktoken', hours: 5 },
      { id: 'p11_t1', title: 'Pre-training LLMs: data pipelines, objectives, scaling laws', hours: 8 },
      { id: 'p11_t2', title: 'Full fine-tuning vs PEFT (LoRA, QLoRA)', hours: 8 },
      { id: 'p11_t3', title: 'LoRA: low-rank adaptation, rank selection, target modules', hours: 6 },
      { id: 'p11_t4', title: 'Instruction tuning, chat format fine-tuning', hours: 6 },
      { id: 'p11_t5', title: 'Quantization: INT8, INT4, GPTQ, AWQ, GGUF', hours: 6 },
      { id: 'p11_t6', title: 'Inference optimization: KV cache, vLLM, llama.cpp', hours: 6 },
      { id: 'p11_t7', title: 'Ollama: run local models (LLaMA 3, Mistral, Qwen)', hours: 4 },
      { id: 'p11_t8', title: 'Perplexity, BLEU, ROUGE, LM-Evaluation-Harness', hours: 5 },
      { id: 'p11_t9', title: 'Hugging Face Hub: download, upload, model cards', hours: 4 },
    ],
    resources: [
      { level: 'Video', url: 'https://www.youtube.com/watch?v=zduSFxRajkE', label: 'Karpathy — Build GPT Tokenizer' },
      { level: 'Video', url: 'https://www.youtube.com/watch?v=eC6Hd1hFvos', label: 'Maxime Labonne — Fine-tune Llama 3' },
      { level: 'Video', url: 'https://www.youtube.com/watch?v=dA-NhCtrrVE', label: 'Tim Dettmers — QLoRA explained' },
      { level: 'Paper', url: 'https://arxiv.org/abs/2106.09685', label: 'LoRA — Hu et al. 2021' },
      { level: 'Video', url: 'https://www.youtube.com/watch?v=_3FctggJ9r4', label: 'PTQ, GPTQ, AWQ, GGUF Explained' },
      { level: 'Docs', url: 'https://ollama.ai/', label: 'Ollama Documentation' },
    ],
    projects: [
      { id: 'p11_proj0', name: 'BPE tokenizer from scratch', level: 'Beginner' },
      { id: 'p11_proj1', name: 'Fine-tune Mistral-7B-Instruct with LoRA', level: 'Intermediate' },
      { id: 'p11_proj2', name: 'Domain-Specific Assistant', level: 'Advanced' },
      { id: 'p11_proj3', name: 'Fine-tuned model + eval + model card on HF', level: 'Internship' },
      { id: 'p11_proj4', name: 'QLoRA pipeline with automated evaluation', level: 'Placement' },
    ],
    milestones: [
      { id: 'p11_m0', text: 'Implement BPE tokenizer from scratch' },
      { id: 'p11_m1', text: 'Run LLaMA 3 locally using Ollama' },
      { id: 'p11_m2', text: 'Fine-tune model with QLoRA on RTX 3050' },
      { id: 'p11_m3', text: 'Push fine-tuned model to HF Hub' },
      { id: 'p11_m4', text: 'Evaluate model using LM-Evaluation-Harness' },
    ],
  },

  // ===== PHASE 12: RAG & AI Agents =====
  {
    id: 12, emoji: '🧬', title: 'RAG & AI Agents',
    hours: 90, dependency: 10, color: '#c084fc',
    objective: 'Build production-grade RAG systems and autonomous agents.',
    interviewRelevance: 'Very High — RAG is the #1 deployed AI pattern',
    topics: [
      { id: 'p12_t0', title: 'Text embeddings: OpenAI, sentence-transformers, BGE', hours: 5 },
      { id: 'p12_t1', title: 'Vector databases: FAISS, Chroma, Qdrant, Pinecone', hours: 5 },
      { id: 'p12_t2', title: 'Semantic search, hybrid search (BM25 + embeddings)', hours: 5 },
      { id: 'p12_t3', title: 'Chunking strategies: fixed, recursive, semantic', hours: 4 },
      { id: 'p12_t4', title: 'Re-ranking, query transformation, HyDE', hours: 5 },
      { id: 'p12_t5', title: 'LangChain RAG: document loaders, splitters, chains', hours: 8 },
      { id: 'p12_t6', title: 'Agent architectures: ReAct, Plan-and-Execute, function calling', hours: 8 },
      { id: 'p12_t7', title: 'Short-term vs long-term memory, conversation buffer', hours: 4 },
      { id: 'p12_t8', title: 'RAG evaluation: faithfulness, relevance, RAGAS', hours: 5 },
    ],
    resources: [
      { level: 'Video', url: 'https://www.youtube.com/watch?v=tcqEUSNCn8I', label: 'Sam Witteveen — LangChain + RAG' },
      { level: 'Video', url: 'https://www.youtube.com/watch?v=dN0lsF2NvmE', label: 'Vector Databases Explained' },
      { level: 'Video', url: 'https://www.youtube.com/watch?v=HSZ_uaif57o', label: 'freeCodeCamp — LangChain Full Course' },
      { level: 'Video', url: 'https://www.youtube.com/playlist?list=PLfaIDFEXuae2LXbO1_PKyVJiQ23ZztA0x', label: 'LangChain — RAG from Scratch' },
      { level: 'Video', url: 'https://www.youtube.com/watch?v=DWUdGhRrv2c', label: 'LangChain Agents' },
    ],
    projects: [
      { id: 'p12_proj0', name: 'PDF Q&A chatbot using FAISS + LLM', level: 'Beginner' },
      { id: 'p12_proj1', name: 'Research Assistant (multi-doc RAG + citations)', level: 'Intermediate' },
      { id: 'p12_proj2', name: 'AI Tutor (hybrid RAG + memory + feedback)', level: 'Advanced' },
      { id: 'p12_proj3', name: 'Company Knowledge Base Chatbot', level: 'Internship' },
      { id: 'p12_proj4', name: 'Production RAG with RAGAS + Redis caching', level: 'Placement' },
    ],
    milestones: [
      { id: 'p12_m0', text: 'Build PDF chatbot with source citations' },
      { id: 'p12_m1', text: 'Implement hybrid search (BM25 + dense)' },
      { id: 'p12_m2', text: 'Build ReAct agent with 3+ tools' },
      { id: 'p12_m3', text: 'Evaluate RAG system using RAGAS' },
      { id: 'p12_m4', text: 'Build stateful agent using LangGraph' },
    ],
  },

  // ===== PHASE 13: Backend for AI Products =====
  {
    id: 13, emoji: '⚡', title: 'Backend for AI Products',
    hours: 80, dependency: 1, color: '#10b981',
    objective: 'Build production-grade backends to serve AI models.',
    interviewRelevance: 'High — backend skills are essential for deployment',
    topics: [
      { id: 'p13_t0', title: 'Async routes, Pydantic models, dependency injection', hours: 6 },
      { id: 'p13_t1', title: 'REST API design: versioning, pagination, error handling', hours: 5 },
      { id: 'p13_t2', title: 'JWT tokens, OAuth2, API keys, rate limiting', hours: 6 },
      { id: 'p13_t3', title: 'PostgreSQL: SQLAlchemy ORM, Alembic migrations', hours: 6 },
      { id: 'p13_t4', title: 'Redis: caching, session storage, pub/sub', hours: 4 },
      { id: 'p13_t5', title: 'Streaming responses: SSE for LLM output', hours: 5 },
      { id: 'p13_t6', title: 'WebSockets for real-time chat with LLMs', hours: 5 },
    ],
    resources: [
      { level: 'Video', url: 'https://www.youtube.com/watch?v=0sOvCWFmrtA', label: 'freeCodeCamp — FastAPI' },
      { level: 'Docs', url: 'https://fastapi.tiangolo.com/tutorial/', label: 'FastAPI Tutorial' },
      { level: 'Docs', url: 'https://fastapi.tiangolo.com/tutorial/security/', label: 'FastAPI Security' },
      { level: 'Video', url: 'https://www.youtube.com/watch?v=bssWKAX74uA', label: 'Traversy Media — PostgreSQL' },
      { level: 'Docs', url: 'https://fastapi.tiangolo.com/async/', label: 'FastAPI Async' },
      { level: 'Docs', url: 'https://fastapi.tiangolo.com/websockets/', label: 'FastAPI WebSockets' },
    ],
    projects: [
      { id: 'p13_proj0', name: 'REST API for trained ML model', level: 'Beginner' },
      { id: 'p13_proj1', name: 'AI Chat API with streaming + auth', level: 'Intermediate' },
      { id: 'p13_proj2', name: 'Multi-model AI API (route GPT/LLaMA/Mistral)', level: 'Advanced' },
      { id: 'p13_proj3', name: 'AI SaaS backend (auth + subscriptions + rate limiting)', level: 'Internship' },
      { id: 'p13_proj4', name: 'Production backend with PostgreSQL + Redis + monitoring', level: 'Placement' },
    ],
    milestones: [
      { id: 'p13_m0', text: 'Build FastAPI app serving ML model <100ms latency' },
      { id: 'p13_m1', text: 'Implement JWT auth with refresh tokens' },
      { id: 'p13_m2', text: 'Stream LLM output via SSE' },
      { id: 'p13_m3', text: 'Add Redis caching and measure speedup' },
      { id: 'p13_m4', text: 'Write API docs with Swagger UI' },
    ],
  },

  // ===== PHASE 14: Deployment & MLOps =====
  {
    id: 14, emoji: '🚀', title: 'Deployment & MLOps',
    hours: 80, dependency: 13, color: '#f43f5e',
    objective: 'Deploy AI products to the real world and keep them running reliably.',
    interviewRelevance: 'High — deployment experience differentiates candidates',
    topics: [
      { id: 'p14_t0', title: 'Dockerfile, docker-compose, multi-stage builds', hours: 6 },
      { id: 'p14_t1', title: 'Kubernetes basics: pods, services, deployments', hours: 6 },
      { id: 'p14_t2', title: 'GitHub Actions: auto-test, auto-lint, auto-deploy', hours: 5 },
      { id: 'p14_t3', title: 'MLflow: experiment tracking, model registry, artifacts', hours: 6 },
      { id: 'p14_t4', title: 'Model monitoring: data drift, concept drift, performance', hours: 5 },
      { id: 'p14_t5', title: 'Hugging Face Spaces: deploy Gradio/Streamlit free', hours: 4 },
      { id: 'p14_t6', title: 'Cost optimization: batching, caching, right-sizing', hours: 4 },
    ],
    resources: [
      { level: 'Video', url: 'https://www.youtube.com/watch?v=3c-iBn73dDE', label: 'TechWorld with Nana — Docker Full Course' },
      { level: 'Video', url: 'https://www.youtube.com/watch?v=X48VuDVv0do', label: 'TechWorld with Nana — Kubernetes' },
      { level: 'Video', url: 'https://www.youtube.com/watch?v=R8_veViYyPw', label: 'GitHub Actions Tutorial' },
      { level: 'Video', url: 'https://www.youtube.com/watch?v=ksYIVDue8ak', label: 'freeCodeCamp — MLflow Tutorial' },
      { level: 'Video', url: 'https://www.youtube.com/watch?v=J_uH5x57p-0', label: 'Evidently AI — Data Drift' },
      { level: 'Course', url: 'https://fullstackdeeplearning.com/course/', label: 'Full Stack Deep Learning' },
    ],
    projects: [
      { id: 'p14_proj0', name: 'Dockerize ML model', level: 'Beginner' },
      { id: 'p14_proj1', name: 'CI/CD pipeline (train → eval → deploy on push)', level: 'Intermediate' },
      { id: 'p14_proj2', name: 'Full AI SaaS product deployed', level: 'Advanced' },
      { id: 'p14_proj3', name: 'Production deployment with rolling updates', level: 'Internship' },
      { id: 'p14_proj4', name: 'End-to-end MLOps pipeline (DVC + MLflow + GitHub Actions)', level: 'Placement' },
    ],
    milestones: [
      { id: 'p14_m0', text: 'Docker Compose multi-service app' },
      { id: 'p14_m1', text: 'GitHub Actions CI runs tests on every PR' },
      { id: 'p14_m2', text: 'Deploy AI product accessible via URL' },
      { id: 'p14_m3', text: 'Track experiments with MLflow' },
      { id: 'p14_m4', text: 'Set up basic monitoring and alerting' },
    ],
  },
];

// ============================================
// ALL PROJECTS (flat array for Projects tab)
// ============================================

const ALL_PROJECTS = [];

PHASES.forEach(phase => {
  phase.projects.forEach(proj => {
    ALL_PROJECTS.push({
      id: proj.id,
      name: proj.name,
      phaseId: phase.id,
      phaseTitle: phase.title,
      level: proj.level,
      status: 'notstarted'
    });
  });
});

// ============================================
// CAREER PATHS
// ============================================

const CAREER_PATHS = [
  {
    title: 'Internship Roadmap',
    emoji: '💼',
    target: 'Before 3rd Year',
    description: 'Get a paid internship with strong Python + ML + deployment skills.',
    steps: [
      { phase: 0, label: 'Month 1–2: Phase 0+1 — Foundations + Programming' },
      { phase: 5, label: 'Month 3–4: Phase 5 — Data Science' },
      { phase: 6, label: 'Month 4–5: Phase 6 — Machine Learning' },
      { phase: 13, label: 'Month 6: Phase 13 — Backend for AI' },
      { phase: 14, label: 'Month 7: Deploy portfolio + Apply' },
    ],
  },
  {
    title: 'Placement Roadmap',
    emoji: '🏢',
    target: 'Before End of 7th Semester',
    description: 'Full-stack AI engineer with system design + DSA + 5+ deployed projects.',
    steps: [
      { phase: 0, label: 'Year 1: Phases 0–3 — Foundations' },
      { phase: 5, label: 'Year 1–2: Phases 5–7 — DS + ML + DL' },
      { phase: 8, label: 'Year 2: Phases 8–10 — NLP + Transformers + GPT' },
      { phase: 11, label: 'Year 2–3: Phases 11–14 — LLM Eng + RAG + Backend + Deploy' },
    ],
  },
  {
    title: 'AI Engineer Path',
    emoji: '🤖',
    target: 'Specialized Track',
    description: 'End-to-end AI products: models + APIs + deployment + monitoring.',
    steps: [
      { phase: 1, label: 'Programming Mastery' },
      { phase: 5, label: 'Data Science Foundations' },
      { phase: 6, label: 'Machine Learning' },
      { phase: 7, label: 'Deep Learning' },
      { phase: 12, label: 'RAG & Agents' },
      { phase: 13, label: 'Backend for AI' },
      { phase: 14, label: 'Deployment & MLOps' },
    ],
  },
  {
    title: 'LLM Specialist Path',
    emoji: '🧠',
    target: 'Specialized Track',
    description: 'Fine-tuned models on HuggingFace + open-source LLM contributions.',
    steps: [
      { phase: 1, label: 'Programming Mastery' },
      { phase: 7, label: 'Deep Learning' },
      { phase: 8, label: 'NLP Foundations' },
      { phase: 9, label: 'Transformers Deep Dive' },
      { phase: 10, label: 'Build GPT From Scratch' },
      { phase: 11, label: 'LLM Engineering' },
    ],
  },
  {
    title: 'GPT Builder Path',
    emoji: '🔮',
    target: 'Specialized Track',
    description: 'Build GPT-2 reproduction from first principles.',
    steps: [
      { phase: 1, label: 'Programming Mastery' },
      { phase: 2, label: 'Mathematics for AI' },
      { phase: 7, label: 'Deep Learning' },
      { phase: 9, label: 'Transformers Deep Dive' },
      { phase: 10, label: 'Build GPT From Scratch' },
    ],
  },
];
