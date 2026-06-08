/* ============================================
   GRBS — Shared PHASES Data
   All 18 phases: Beginner → World-Class AI Engineer
   ============================================ */

const PHASES = [
  /* ===== PHASE 0: Engineer Foundations ===== */
  {
    id: 'phase0',
    name: 'Engineer Foundations',
    goal: 'Master the essential CS and engineering tools before writing any AI code.',
    color: '#6366f1',
    estimatedTime: '~6–8 weeks',
    outcomes: [
      'Navigate Linux and the command line confidently',
      'Use Git and GitHub for version control',
      'Set up a professional development environment',
      'Debug effectively and read documentation',
    ],
    projects: [
      'Linux CLI scavenger hunt',
      'Git branching exercise',
      'VS Code productivity setup',
      'Debug a broken Python script',
    ],
    subsections: [
      {
        title: 'A. Computer Fundamentals',
        topics: [
          {
            name: 'How computers work: CPU, memory, storage, binary',
            difficulty: 'Beginner',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=O5nskjZ_GoI', label: 'Crash Course Computer Science #1' },
              { level: '🇮🇳 Hindi', url: 'https://www.youtube.com/watch?v=kYam6NoxbFE', label: 'Apna College — Computer Fundamentals (Hindi)' },
            ],
          },
          {
            name: 'Operating System basics: processes, threads, memory management',
            difficulty: 'Beginner',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/playlist?list=PLBlnK6fEyqRj9lld8sWIUNwlKfdUoPdFY', label: 'Neso Academy — OS Full Course' },
              { level: '🇮🇳 Hindi', url: 'https://www.youtube.com/playlist?list=PLx2O_z85fS05x-aC9y6k_y-56l8d4rXW7', label: 'Knowledge Gate — OS (Hindi)' },
            ],
          },
          {
            name: 'Networking basics: TCP/IP, HTTP, DNS, ports',
            difficulty: 'Beginner',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=qiQR5rTSshw', label: 'freeCodeCamp — Computer Networking Full Course' },
              { level: '🇮🇳 Hindi', url: 'https://www.youtube.com/playlist?list=PLx2O_z85fS06PkoMCl0C8sFhCd-jd0Xp6', label: 'Knowledge Gate — Computer Networks (Hindi)' },
            ],
          },
        ],
      },
      {
        title: 'B. Linux & Command Line',
        topics: [
          {
            name: 'Linux basics: ls, cd, mkdir, grep, chmod, ssh',
            difficulty: 'Beginner',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=ZtqBQ68cfJc', label: 'freeCodeCamp — Linux CLI' },
              { level: '🇮🇳 Hindi', url: 'https://www.youtube.com/watch?v=8JJ101D3knE', label: 'CodeWithHarry — Linux Tutorial (Hindi)' },
            ],
          },
          {
            name: 'Shell scripting, environment variables, package managers',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=gd7BXuUQ91w', label: 'NetworkChuck — 60 Linux Commands' },
            ],
          },
        ],
      },
      {
        title: 'C. Git & GitHub',
        topics: [
          {
            name: 'Git init, commit, push, pull, branch, merge',
            difficulty: 'Beginner',
            resources: [
              { level: 'Beginner', url: 'https://www.youtube.com/watch?v=RGOj5yH7evk', label: 'freeCodeCamp — Git & GitHub' },
              { level: '🇮🇳 Hindi', url: 'https://www.youtube.com/watch?v=8JJ101D3knE', label: 'CodeWithHarry — Git & GitHub (Hindi)' },
            ],
          },
          {
            name: 'Pull requests, rebasing, conflict resolution',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=Uszj_k0DGsg', label: 'freeCodeCamp — Advanced Git' },
            ],
          },
          {
            name: 'README files, Markdown, GitHub profile',
            difficulty: 'Beginner',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=_PPWWRV6gbA', label: 'Traversy Media — Markdown Crash Course' },
            ],
          },
        ],
      },
      {
        title: 'D. Development Tools',
        topics: [
          {
            name: 'VS Code setup, extensions, shortcuts, debugging',
            difficulty: 'Beginner',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=ifTF3ags0XI', label: 'Fireship — VS Code Productivity Tips' },
            ],
          },
          {
            name: 'Debugging techniques: print debugging, breakpoints, stack traces',
            difficulty: 'Beginner',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=b7VbiZBg-dA', label: ' Corey Schafer — Python Debugging' },
            ],
          },
        ],
      },
    ],
    buildTasks: [
      { name: 'Set up a complete dev environment: Python, VS Code, Git, Linux terminal', hint: 'Install Python 3.11+, configure VS Code with Python extension' },
      { name: 'Create a GitHub repository with a professional README, .gitignore, and commit history', hint: 'Use markdown, add badges, and describe your project' },
      { name: 'Write 5 shell commands to navigate, search, and manipulate files from the terminal', hint: 'Practice find, grep, chmod, pipe, and redirection' },
      { name: 'Clone a repo, create a branch, make changes, resolve a merge conflict, and submit a PR', hint: 'Practice the full Git workflow' },
    ],
  },

  /* ===== PHASE 1: Programming Mastery ===== */
  {
    id: 'phase1',
    name: 'Programming Mastery',
    goal: 'Become a strong programmer in Python and C, master OOP, and solve DSA problems.',
    color: '#818cf8',
    estimatedTime: '~10–14 weeks',
    outcomes: [
      'Write clean, efficient Python and C code',
      'Apply OOP principles and design patterns',
      'Solve data structure and algorithm problems',
      'Build CLI applications and push to GitHub',
    ],
    projects: [
      'CLI to-do app with file persistence',
      'CSV data processing script',
      'DSA implementations from scratch',
      '20 LeetCode Easy/Medium solutions',
    ],
    subsections: [
      {
        title: 'A. Python Complete',
        topics: [
          {
            name: 'Python basics: variables, control flow, functions, I/O',
            difficulty: 'Beginner',
            resources: [
              { level: 'Beginner', url: 'https://www.youtube.com/watch?v=_uQrJ0TkZlc', label: 'Programming with Mosh — Python' },
              { level: 'Intermediate', url: 'https://www.youtube.com/watch?v=HGOBQPFzWKo', label: 'freeCodeCamp — Python Full Course' },
              { level: '🇮🇳 Hindi', url: 'https://www.youtube.com/watch?v=gfDE2a7MKjA', label: 'CodeWithHarry — Python (Hindi)' },
              { level: '🇮🇳 Hindi', url: 'https://www.youtube.com/watch?v=vLqTf2b6GZw', label: 'Apna College — Python (Hindi)' },
            ],
          },
          {
            name: 'OOP: classes, inheritance, dunder methods, decorators',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Intermediate', url: 'https://www.youtube.com/watch?v=Ej_02ICOIgs', label: 'Corey Schafer — OOP Playlist' },
              { level: 'Advanced', url: 'https://www.youtube.com/watch?v=p15xzjzR9j0', label: 'Corey Schafer — Dunder Methods' },
              { level: '🇮🇳 Hindi', url: 'https://www.youtube.com/playlist?list=PLu0W_9lII9ahKZ42vg2w9ERPmShYbYAB7', label: 'CodeWithHarry — Python Complete (Hindi)' },
            ],
          },
          {
            name: 'Comprehensions, generators, iterators, context managers',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=3dt4OGnU5sM', label: 'Corey Schafer — Comprehensions' },
            ],
          },
          {
            name: 'File handling, APIs, web scraping, virtual environments',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=tb8gHvYlCFs', label: 'freeCodeCamp — APIs in Python' },
              { level: 'Video', url: 'https://www.youtube.com/watch?v=N5vscPTWKOk', label: 'Corey Schafer — Virtual Environments' },
            ],
          },
        ],
      },
      {
        title: 'B. C Programming',
        topics: [
          {
            name: 'C basics: variables, pointers, memory, structs',
            difficulty: 'Beginner',
            resources: [
              { level: 'Full course', url: 'https://www.youtube.com/watch?v=KJgsSFOSQv0', label: 'freeCodeCamp — C Full Course' },
              { level: '🇮🇳 Hindi', url: 'https://www.youtube.com/watch?v=irqbmMNs2Bo', label: 'Apna College — C Language (Hindi)' },
            ],
          },
          {
            name: 'Memory management: malloc, free, buffer overflow, valgrind',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=I37KvOIyN4c', label: 'CS50 — Memory & Pointers' },
            ],
          },
        ],
      },
      {
        title: 'C. Data Structures & Algorithms',
        topics: [
          {
            name: 'Arrays, strings, hash maps, stacks, queues',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=pkYVOmU3MgA', label: 'freeCodeCamp — DSA Full Course' },
              { level: '🇮🇳 Hindi', url: 'https://www.youtube.com/playlist?list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BEO', label: 'Striver — A2Z DSA Course (Hindi)' },
              { level: '🇮🇳 Hindi', url: 'https://www.youtube.com/playlist?list=PLdo5W4Ni4Fzn5yVzB2u0y2u5O-q4L4_rW', label: 'Jenny\'s Lectures — DSA (Hindi)' },
            ],
          },
          {
            name: 'Trees, graphs, recursion, backtracking',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=fAAZixBzIAI', label: 'freeCodeCamp — Trees and Graphs' },
              { level: '🇮🇳 Hindi', url: 'https://www.youtube.com/playlist?list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BEO', label: 'Striver — Trees & Graphs (Hindi)' },
            ],
          },
          {
            name: 'Sorting, searching, Big-O analysis',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=kPRA0W1kECg', label: 'freeCodeCamp — Algorithms' },
              { level: '🇮🇳 Hindi', url: 'https://www.youtube.com/watch?v=f9Aje_cN_CY', label: 'NeetCode — DSA in Python (Hindi)' },
            ],
          },
          {
            name: 'LeetCode Easy/Medium problems (aim for 20+ solved)',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Resource', url: 'https://leetcode.com/problemset/all/?difficulty=EASY', label: 'LeetCode — Easy Problems' },
              { level: '🇮🇳 Hindi', url: 'https://www.youtube.com/watch?v=f9Aje_cN_CY', label: 'NeetCode — DSA Roadmap (Hindi)' },
            ],
          },
        ],
      },
    ],
    buildTasks: [
      { name: 'Build a CLI to-do list app with file persistence and colored output', hint: 'Use argparse and JSON for storage' },
      { name: 'Implement 5 data structures from scratch (stack, queue, linked list, hash map, BST)', hint: 'Write tests for each implementation' },
      { name: 'Solve 10 LeetCode problems and commit solutions to GitHub with explanations', hint: 'Start with Easy, progress to Medium' },
      { name: 'Build a C program that manipulates memory with pointers and structs', hint: 'Implement a simple linked list in C' },
    ],
  },

  /* ===== PHASE 2: Mathematics for AI ===== */
  {
    id: 'phase2',
    name: 'Mathematics for AI',
    goal: 'Build the math intuition that powers every neural network and ML algorithm.',
    color: '#0ea5e9',
    estimatedTime: '~8–10 weeks',
    outcomes: [
      'Perform matrix operations by hand and in code',
      'Understand gradients and backpropagation intuitively',
      'Apply probability and statistics to ML problems',
      'Implement optimization algorithms from scratch',
    ],
    projects: [
      'Matrix multiplication from scratch',
      'Micrograd: backpropagation from scratch',
      'Gradient descent visualizer',
      'Naive Bayes spam classifier',
    ],
    subsections: [
      {
        title: 'A. Linear Algebra',
        topics: [
          {
            name: 'Vectors, matrices, dot products, matrix multiplication',
            difficulty: 'Beginner',
            resources: [
              { level: 'Beginner', url: 'https://www.youtube.com/watch?v=fNk_zzaMoSs', label: '3Blue1Brown — Essence of Linear Algebra' },
              { level: 'Intermediate', url: 'https://www.youtube.com/watch?v=7UJ4CFRGd-U', label: 'StatQuest — Linear Algebra for ML' },
              { level: 'Advanced', url: 'https://www.youtube.com/playlist?list=PLE7DDD91010BC51F8', label: 'MIT 18.06 Gilbert Strang' },
            ],
          },
          {
            name: 'Eigenvalues, eigenvectors, SVD, matrix decompositions',
            difficulty: 'Advanced',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=PFDu9oVAE-g', label: '3Blue1Brown — Eigenvectors' },
              { level: 'Video', url: 'https://www.youtube.com/watch?v=_UVHneBUBW0', label: 'StatQuest — PCA' },
            ],
          },
          {
            name: 'Tensor operations in NumPy/PyTorch',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=aircAruvnKk', label: '3Blue1Brown — Neural Networks' },
            ],
          },
        ],
      },
      {
        title: 'B. Calculus & Differentiation',
        topics: [
          {
            name: 'Derivatives, partial derivatives, chain rule',
            difficulty: 'Beginner',
            resources: [
              { level: 'Beginner', url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr', label: '3Blue1Brown — Essence of Calculus' },
              { level: 'Intermediate', url: 'https://www.youtube.com/watch?v=WUvTyaaNkzM', label: 'Khan Academy — Multivariable Calculus' },
            ],
          },
          {
            name: 'Gradient, Jacobian, Hessian',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=GkB4vW16QHI', label: 'StatQuest — Gradient Descent' },
            ],
          },
          {
            name: 'Automatic Differentiation (autograd concept)',
            difficulty: 'Advanced',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=VMj-3S1tku0', label: 'Karpathy — micrograd' },
            ],
          },
        ],
      },
      {
        title: 'C. Probability & Statistics',
        topics: [
          {
            name: 'Probability axioms, conditional probability, Bayes theorem',
            difficulty: 'Beginner',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=HZGCoVF3YvM', label: 'StatQuest — Probability Fundamentals' },
            ],
          },
          {
            name: 'Distributions: Normal, Binomial, Bernoulli',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=oI3hZJqXJuc', label: 'StatQuest — Distributions' },
            ],
          },
          {
            name: 'MLE, cross-entropy loss, hypothesis testing',
            difficulty: 'Advanced',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=XepXtl9YKwc', label: 'StatQuest — Maximum Likelihood' },
              { level: 'Video', url: 'https://www.youtube.com/watch?v=0oc49DyA3hU', label: 'StatQuest — Hypothesis Testing' },
            ],
          },
        ],
      },
      {
        title: 'D. Optimization',
        topics: [
          {
            name: 'Gradient descent, SGD, momentum',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=IHZwWFHWa-w', label: '3Blue1Brown — Gradient Descent' },
            ],
          },
          {
            name: 'Adam, RMSProp, learning rate scheduling',
            difficulty: 'Advanced',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=mdKjMPmcWjY', label: 'Karpathy — Optimization' },
            ],
          },
          {
            name: 'Convex vs non-convex optimization',
            difficulty: 'Advanced',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=ORrStCArmP4', label: 'DeepMind — Optimization for DL' },
            ],
          },
        ],
      },
    ],
    buildTasks: [
      { name: 'Implement matrix multiplication from scratch in Python (no NumPy) and verify with NumPy', hint: 'Use nested loops, then compare with np.matmul' },
      { name: 'Build micrograd: implement backpropagation from scratch following Karpathy\'s tutorial', hint: 'Follow the micrograd repo step by step' },
      { name: 'Implement gradient descent to minimize a 2D function and plot the path using matplotlib', hint: 'Try minimizing f(x,y) = x^2 + y^2' },
      { name: 'Prove Bayes theorem in writing and implement a spam classifier using naive Bayes from scratch', hint: 'Start with the math proof, then code it' },
    ],
  },

  /* ===== PHASE 3: Software Engineering ===== */
  {
    id: 'phase3',
    name: 'Software Engineering',
    goal: 'Understand operating systems, networks, databases, and how to build production systems.',
    color: '#06b6d4',
    estimatedTime: '~8–10 weeks',
    outcomes: [
      'Explain OS concepts (processes, threads, virtual memory)',
      'Design and query relational databases with SQL',
      'Build REST APIs and understand HTTP protocols',
      'Apply system design fundamentals',
    ],
    projects: [
      'Design a database schema for an e-commerce app',
      'Build a REST API with FastAPI',
      'Write SQL queries on a real dataset',
      'Create a system design document',
    ],
    subsections: [
      {
        title: 'A. Operating Systems',
        topics: [
          {
            name: 'Processes, threads, scheduling, concurrency',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/playlist?list=PLBlnK6fEyqRj9lld8sWIUNwlKfdUoPdFY', label: 'Neso Academy — OS Full Course' },
              { level: '🇮🇳 Hindi', url: 'https://www.youtube.com/playlist?list=PLx2O_z85fS05x-aC9y6k_y-56l8d4rXW7', label: 'Knowledge Gate — OS (Hindi)' },
            ],
          },
          {
            name: 'Memory management, virtual memory, file systems',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=d9WyerblWQc', label: 'Neso Academy — Memory Management' },
            ],
          },
        ],
      },
      {
        title: 'B. Computer Networks',
        topics: [
          {
            name: 'TCP/IP, HTTP/HTTPS, DNS, REST',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=qiQR5rTSshw', label: 'freeCodeCamp — Computer Networking' },
              { level: '🇮🇳 Hindi', url: 'https://www.youtube.com/playlist?list=PLx2O_z85fS06PkoMCl0C8sFhCd-jd0Xp6', label: 'Knowledge Gate — Networks (Hindi)' },
            ],
          },
          {
            name: 'WebSockets, APIs, API design best practices',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=hiUR8ZOpZ8M', label: 'Fireship — Every Type of API Explained' },
            ],
          },
        ],
      },
      {
        title: 'C. Databases & SQL',
        topics: [
          {
            name: 'SQL fundamentals: SELECT, JOIN, GROUP BY, subqueries',
            difficulty: 'Beginner',
            resources: [
              { level: 'Full course', url: 'https://www.youtube.com/watch?v=HXV3zeQKqGY', label: 'freeCodeCamp — SQL Full Course' },
              { level: '🇮🇳 Hindi', url: 'https://www.youtube.com/watch?v=ERCMXc8x7mc', label: 'Apna College — SQL (Hindi)' },
            ],
          },
          {
            name: 'PostgreSQL, schema design, indexing, normalization',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=bssWKAX74uA', label: 'Traversy Media — PostgreSQL Introduction' },
            ],
          },
          {
            name: 'Redis, NoSQL, when to use what',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=G1rOthIU-uo', label: 'Fireship — Redis in 100 Seconds' },
            ],
          },
        ],
      },
      {
        title: 'D. System Design & APIs',
        topics: [
          {
            name: 'System design fundamentals: scalability, caching, load balancing',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/playlist?list=PLMCXHnjXnTnvo6alSjVkgxV-VH6EPyvoX', label: 'Gaurav Sen — System Design' },
              { level: '🇮🇳 Hindi', url: 'https://www.youtube.com/watch?v=CuQmQpvw04I', label: 'Apna College — System Design (Hindi)' },
            ],
          },
          {
            name: 'FastAPI: REST endpoints, Pydantic, async, dependency injection',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Docs', url: 'https://fastapi.tiangolo.com/tutorial/', label: 'FastAPI Tutorial' },
              { level: 'Video', url: 'https://www.youtube.com/watch?v=0sOvCWFmrtA', label: 'freeCodeCamp — FastAPI' },
            ],
          },
          {
            name: 'Testing: unit tests, integration tests, pytest',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=6tNS--WetLI', label: 'Corey Schafer — Python Testing' },
            ],
          },
        ],
      },
    ],
    buildTasks: [
      { name: 'Design and create a PostgreSQL database schema for an e-commerce application with 5+ tables', hint: 'Use proper normalization, foreign keys, and indexes' },
      { name: 'Build a REST API with FastAPI that performs CRUD operations on a SQLite database', hint: 'Use Pydantic models and proper error handling' },
      { name: 'Write 10 SQL queries of increasing complexity on a practice dataset', hint: 'Include JOINs, subqueries, and aggregate functions' },
      { name: 'Write a system design document for a URL shortener like bit.ly', hint: 'Cover scalability, caching, and database design' },
    ],
  },

  /* ===== PHASE 4: Data Engineering & Data Science ===== */
  {
    id: 'phase4',
    name: 'Data Engineering & Data Science',
    goal: 'Master the tools every ML engineer uses daily: NumPy, Pandas, visualization, and feature engineering.',
    color: '#10b981',
    estimatedTime: '~6–8 weeks',
    outcomes: [
      'Load, clean, and transform datasets with Pandas',
      'Create publication-quality visualizations',
      'Engineer features for ML pipelines',
      'Perform end-to-end EDA on any dataset',
    ],
    projects: [
      'Titanic EDA with 5 insights',
      'Data cleaning pipeline',
      'Matplotlib/Seaborn dashboard',
      'Kaggle notebook submission',
    ],
    subsections: [
      {
        title: 'A. NumPy',
        topics: [
          {
            name: 'ndarray creation, indexing, slicing, boolean masks',
            difficulty: 'Beginner',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=QUT1VHiLmmI', label: 'freeCodeCamp — NumPy Full Course' },
              { level: '🇮🇳 Hindi', url: 'https://www.youtube.com/playlist?list=PLeo1K3hjS3uvCeTYTeyfe0-rN5r8zn9rw', label: 'codebasics — NumPy (Hindi)' },
            ],
          },
          {
            name: 'Broadcasting, vectorized operations, linear algebra ops',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=vN5dAZrS58E', label: 'Keith Galli — NumPy Tutorial' },
              { level: 'Video', url: 'https://www.youtube.com/watch?v=8Y0qQEh7dJg', label: 'Sentdex — NumPy for ML' },
            ],
          },
        ],
      },
      {
        title: 'B. Pandas',
        topics: [
          {
            name: 'Series, DataFrame, data loading (CSV, JSON, Excel)',
            difficulty: 'Beginner',
            resources: [
              { level: 'Beginner', url: 'https://www.youtube.com/watch?v=vmEHCJofslg', label: 'Corey Schafer — Pandas Playlist' },
              { level: 'Full course', url: 'https://www.youtube.com/watch?v=e60ItwlZTKM', label: 'Keith Galli — Complete Pandas' },
              { level: '🇮🇳 Hindi', url: 'https://www.youtube.com/playlist?list=PLeo1K3hjS3uvCeTYTeyfe0-rN5r8zn9rw', label: 'codebasics — Pandas (Hindi)' },
            ],
          },
          {
            name: 'Data cleaning: dropna, fillna, duplicates, type conversion',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=bDhvCp3_lYw', label: 'Rob Mulla — Pandas in 30 min' },
            ],
          },
          {
            name: 'groupby, merge, pivot tables, apply/map',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=vmEHCJofslg', label: 'Corey Schafer — Pandas GroupBy' },
            ],
          },
        ],
      },
      {
        title: 'C. Data Visualization',
        topics: [
          {
            name: 'Matplotlib: line, bar, scatter, histogram, subplots',
            difficulty: 'Beginner',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=3Xc3CA655Y4', label: 'Corey Schafer — Matplotlib' },
            ],
          },
          {
            name: 'Seaborn: heatmap, pairplot, violin, regplot',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=6GUZXDef2U0', label: 'freeCodeCamp — Seaborn' },
            ],
          },
        ],
      },
      {
        title: 'D. Feature Engineering & Data Cleaning',
        topics: [
          {
            name: 'Missing value imputation, encoding, scaling',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=xhB-dmKmzRk', label: 'Krish Naik — Feature Engineering' },
              { level: 'Video', url: 'https://www.youtube.com/watch?v=wr9gUr-eWdA', label: 'Abhishek Thakur — Feature Engineering' },
            ],
          },
          {
            name: 'Feature selection: correlation, mutual info, RFECV',
            difficulty: 'Advanced',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=wpNl-JwwplA', label: 'StatQuest — Feature Selection & Missing Data' },
            ],
          },
        ],
      },
    ],
    buildTasks: [
      { name: 'Complete EDA on the Titanic dataset: cleaning, visualization, and a 5-insight report', hint: 'Use Kaggle Titanic dataset, focus on data quality' },
      { name: 'Build a data pipeline that loads a CSV, cleans missing values, encodes categoricals, and scales numerics', hint: 'Use sklearn Pipeline and ColumnTransformer' },
      { name: 'Create a Matplotlib/Seaborn dashboard with 6 chart types on one dataset', hint: 'Use plt.subplots for multi-panel layout' },
      { name: 'Submit a Kaggle notebook (any beginner competition) and make it public', hint: 'Start with Titanic or House Prices competition' },
    ],
  },

  /* ===== PHASE 5: Machine Learning ===== */
  {
    id: 'phase5',
    name: 'Machine Learning',
    goal: 'Train, evaluate, and deploy classical ML models end-to-end.',
    color: '#f59e0b',
    estimatedTime: '~10–12 weeks',
    outcomes: [
      'Build and evaluate regression and classification models',
      'Use ensemble methods for competitive performance',
      'Perform unsupervised clustering and dimensionality reduction',
      'Tune hyperparameters and validate models properly',
    ],
    projects: [
      'House Price Predictor (Streamlit)',
      'Customer Churn Model with SHAP',
      'Customer Segmentation with K-Means + PCA',
      'Kaggle competition top 40%',
    ],
    subsections: [
      {
        title: 'A. Supervised Learning',
        topics: [
          {
            name: 'Linear Regression: OLS, MSE, R², gradient descent',
            difficulty: 'Beginner',
            resources: [
              { level: 'Beginner', url: 'https://www.youtube.com/watch?v=nk2CQITm_eo', label: 'StatQuest — Linear Regression' },
              { level: 'Full course', url: 'https://www.youtube.com/watch?v=jGwO_UgTS7I', label: 'Andrew Ng — ML Week 1-3' },
              { level: '🇮🇳 Hindi', url: 'https://www.youtube.com/watch?v=JxgmHe2NyeY', label: 'Krish Naik — Complete ML (Hindi)' },
              { level: '🇮🇳 Hindi', url: 'https://www.youtube.com/playlist?list=PLeo1K3hjS3uvCeTYTeyfe0-rN5r8zn9rw', label: 'codebasics — ML Playlist (Hindi)' },
            ],
          },
          {
            name: 'Regularization: L1 Lasso, L2 Ridge, ElasticNet',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=NGf0voTMlcs', label: 'StatQuest — Ridge Regression' },
            ],
          },
          {
            name: 'Logistic Regression: sigmoid, cross-entropy, AUC-ROC',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=yIYKR4sgzI8', label: 'StatQuest — Logistic Regression' },
            ],
          },
        ],
      },
      {
        title: 'B. Trees & Ensembles',
        topics: [
          {
            name: 'Decision Trees: Gini, entropy, pruning',
            difficulty: 'Beginner',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=7VeUPuFGJHk', label: 'StatQuest — Decision Trees' },
              { level: '🇮🇳 Hindi', url: 'https://www.youtube.com/watch?v=JxgmHe2NyeY', label: 'Krish Naik — Decision Trees (Hindi)' },
            ],
          },
          {
            name: 'Random Forests: bagging, feature importance, OOB',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=J4Wdy0Wc_xQ', label: 'StatQuest — Random Forests' },
            ],
          },
          {
            name: 'Gradient Boosting: XGBoost, LightGBM',
            difficulty: 'Advanced',
            resources: [
              { level: 'Beginner', url: 'https://www.youtube.com/watch?v=OtD8wVaFm6E', label: 'StatQuest — XGBoost series' },
              { level: 'Advanced', url: 'https://www.youtube.com/watch?v=3CC4N4z3GJc', label: 'Krish Naik — XGBoost full' },
            ],
          },
        ],
      },
      {
        title: 'C. Unsupervised Learning',
        topics: [
          {
            name: 'K-Means, DBSCAN, hierarchical clustering',
            difficulty: 'Beginner',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=4b5d3muPQmA', label: 'StatQuest — K-Means' },
              { level: 'Video', url: 'https://www.youtube.com/watch?v=RDZUdRSDOok', label: 'StatQuest — DBSCAN' },
            ],
          },
          {
            name: 'PCA, t-SNE, UMAP for visualization',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=FgakZw6K1QQ', label: 'StatQuest — PCA' },
              { level: 'Video', url: 'https://www.youtube.com/watch?v=NEaUSP4YerM', label: 'StatQuest — t-SNE' },
            ],
          },
        ],
      },
      {
        title: 'D. Model Evaluation',
        topics: [
          {
            name: 'Cross-validation, K-Fold, Stratified K-Fold',
            difficulty: 'Beginner',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=fSytzGwwBVw', label: 'StatQuest — Cross Validation' },
            ],
          },
          {
            name: 'Confusion matrix, precision, recall, F1, AUC-ROC',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=Kdsp6sozTKE', label: 'StatQuest — Confusion Matrix' },
              { level: 'Video', url: 'https://www.youtube.com/watch?v=8d3JbbSj-I8', label: 'StatQuest — Precision, Recall, F1' },
            ],
          },
          {
            name: 'Hyperparameter tuning: GridSearchCV, RandomizedSearchCV',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=Q-X1ukbxIs0', label: 'StatQuest — Hyperparameter Tuning' },
            ],
          },
        ],
      },
    ],
    buildTasks: [
      { name: 'Build House Price Predictor: Linear Regression + Ridge + feature engineering; deploy on Streamlit', hint: 'Use Kaggle House Prices dataset' },
      { name: 'Customer Churn Model: XGBoost + SHAP values for interpretability', hint: 'Focus on feature importance and model explainability' },
      { name: 'Customer Segmentation: K-Means + PCA visualization on e-commerce dataset', hint: 'Use UCI Online Retail dataset' },
      { name: 'Enter a Kaggle tabular competition and reach top 40%', hint: 'Start with feature engineering and ensemble methods' },
    ],
  },

  /* ===== PHASE 6: Deep Learning Foundations ===== */
  {
    id: 'phase6',
    name: 'Deep Learning Foundations',
    goal: 'Understand neural networks deeply — from perceptrons to CNNs and RNNs.',
    color: '#ef4444',
    estimatedTime: '~10–12 weeks',
    outcomes: [
      'Build neural networks from scratch with NumPy',
      'Train CNNs and transfer learning models',
      'Build LSTM-based sequence models',
      'Understand backpropagation intuitively',
    ],
    projects: [
      'NumPy neural network on MNIST',
      'CNN image classifier on CIFAR-10',
      'LSTM text generator',
      'Transfer learning project',
    ],
    subsections: [
      {
        title: 'A. Neural Networks from Scratch',
        topics: [
          {
            name: 'Perceptron, MLP, activation functions (ReLU, GELU, Tanh)',
            difficulty: 'Beginner',
            resources: [
              { level: 'Best resource', url: 'https://www.youtube.com/watch?v=VMj-3S1tku0', label: 'Karpathy — micrograd (zero to hero)' },
              { level: 'Visual', url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi', label: '3Blue1Brown — Neural Networks' },
              { level: '🇮🇳 Hindi', url: 'https://www.youtube.com/playlist?list=PLKnIA16_RmvYuZauWaPlRTC54KxSNLtNn', label: 'CampusX — 100 Days of Deep Learning (Hindi)' },
            ],
          },
          {
            name: 'Forward pass, loss functions, backpropagation',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=Ilg3gGewQ5U', label: '3Blue1Brown — Backpropagation Calculus' },
            ],
          },
          {
            name: 'Weight initialization, batch normalization, dropout',
            difficulty: 'Advanced',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=dXB-KQYkzNU', label: 'DeepMind — Weight Init' },
            ],
          },
        ],
      },
      {
        title: 'B. Convolutional Neural Networks',
        topics: [
          {
            name: 'Convolution op, kernels, stride, padding, pooling',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=YRhxdVk_sIs', label: 'Karpathy — CNN Stanford CS231n' },
            ],
          },
          {
            name: 'Architectures: LeNet, AlexNet, VGG, ResNet, EfficientNet',
            difficulty: 'Advanced',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=ACmuBbuXn20', label: 'CNN architectures overview' },
            ],
          },
          {
            name: 'Transfer learning with pretrained models (torchvision)',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=K0lWSB2QoIQ', label: 'Sentdex — PyTorch Transfer Learning' },
              { level: '🇮🇳 Hindi', url: 'https://www.youtube.com/playlist?list=PLKnIA16_RmvYuZauWaPlRTC54KxSNLtNn', label: 'CampusX — Transfer Learning (Hindi)' },
            ],
          },
        ],
      },
      {
        title: 'C. RNNs, LSTMs, GRUs',
        topics: [
          {
            name: 'RNN: hidden state, vanishing gradient problem',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=AsNTP8Kwu80', label: 'StatQuest — RNN' },
            ],
          },
          {
            name: 'LSTM: gates, cell state; GRU, bidirectional RNNs',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=YCzL96nL7j0', label: 'StatQuest — LSTM' },
              { level: 'Video', url: 'https://www.youtube.com/watch?v=8HyCNIVRbSU', label: 'deeplizard — RNN/LSTM/GRU' },
            ],
          },
        ],
      },
      {
        title: 'D. Training Techniques',
        topics: [
          {
            name: 'Learning rate scheduling, gradient clipping, mixed precision',
            difficulty: 'Advanced',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=mdKjMPmcWjY', label: 'Karpathy — Training Neural Networks' },
            ],
          },
          {
            name: 'Regularization: dropout, weight decay, data augmentation',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=dXB-KQYkzNU', label: 'DeepMind — Regularization Techniques' },
            ],
          },
        ],
      },
    ],
    buildTasks: [
      { name: 'Implement a neural network from scratch using only NumPy and train on MNIST', hint: 'Start with a simple MLP, use cross-entropy loss' },
      { name: 'Train a CNN on CIFAR-10 with ResNet transfer learning; achieve >85% accuracy', hint: 'Use torchvision.models.resnet18 pretrained' },
      { name: 'Build an LSTM text generator in PyTorch that generates Shakespeare-like text', hint: 'Use character-level encoding' },
      { name: 'Implement batch normalization and dropout from scratch and compare training curves', hint: 'Plot loss curves with and without regularization' },
    ],
  },

  /* ===== PHASE 7: PyTorch Mastery ===== */
  {
    id: 'phase7',
    name: 'PyTorch Mastery',
    goal: 'Become fluent in PyTorch — the framework used by most AI researchers.',
    color: '#f97316',
    estimatedTime: '~6–8 weeks',
    outcomes: [
      'Work with tensors, autograd, and GPU acceleration',
      'Build custom datasets and training loops',
      'Implement custom layers, losses, and optimizers',
      'Debug and profile PyTorch models',
    ],
    projects: [
      'Rebuild all DL projects in PyTorch',
      'Custom dataset and DataLoader',
      'Custom nn.Module with forward/backward',
      'GPU-accelerated training pipeline',
    ],
    subsections: [
      {
        title: 'A. Tensors & Autograd',
        topics: [
          {
            name: 'Tensor operations, broadcasting, GPU tensors',
            difficulty: 'Beginner',
            resources: [
              { level: 'Full course', url: 'https://www.youtube.com/watch?v=Z_ikDlimN6A', label: 'freeCodeCamp — PyTorch for DL' },
              { level: '🇮🇳 Hindi', url: 'https://www.youtube.com/watch?v=6EJaHBJhwDs', label: 'CampusX — PyTorch (Hindi)' },
            ],
          },
          {
            name: 'Autograd, computational graphs, backward()',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=VMj-3S1tku0', label: 'Karpathy — micrograd' },
            ],
          },
        ],
      },
      {
        title: 'B. nn.Module & Training Loops',
        topics: [
          {
            name: 'nn.Module, nn.Linear, nn.Sequential, custom layers',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Full course', url: 'https://www.youtube.com/watch?v=Z_ikDlimN6A', label: 'freeCodeCamp — PyTorch for DL' },
            ],
          },
          {
            name: 'Training loop: forward, loss, backward, optimizer.step()',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=VMj-3S1tku0', label: 'Karpathy — Building GPT' },
            ],
          },
        ],
      },
      {
        title: 'C. Datasets & DataLoading',
        topics: [
          {
            name: 'Dataset, DataLoader, transforms, custom datasets',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=Z_ikDlimN6A', label: 'freeCodeCamp — PyTorch DataLoader' },
            ],
          },
          {
            name: 'Data augmentation, prefetching, pin_memory',
            difficulty: 'Advanced',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=Ak4vq2ER6qQ', label: 'Aladdin Persson — PyTorch Advanced' },
            ],
          },
        ],
      },
      {
        title: 'D. Advanced PyTorch',
        topics: [
          {
            name: 'Custom loss functions, optimizers, learning rate schedulers',
            difficulty: 'Advanced',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=mdKjMPmcWjY', label: 'Karpathy — Optimization' },
            ],
          },
          {
            name: 'Model saving/loading, checkpointing, mixed precision training',
            difficulty: 'Advanced',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=Ak4vq2ER6qQ', label: 'Aladdin Persson — PyTorch Checkpointing' },
            ],
          },
        ],
      },
    ],
    buildTasks: [
      { name: 'Rebuild your NumPy neural network from Phase 6 in PyTorch', hint: 'Compare training speed and accuracy' },
      { name: 'Create a custom PyTorch Dataset for your own image/text data with proper transforms', hint: 'Implement __getitem__ and __len__' },
      { name: 'Build a custom training loop with learning rate scheduling and gradient clipping', hint: 'Use torch.optim.lr_scheduler' },
      { name: 'Train a model on GPU and benchmark CPU vs GPU performance', hint: 'Use torch.cuda.is_available() and .to(device)' },
    ],
  },

  /* ===== PHASE 8: NLP Foundations ===== */
  {
    id: 'phase8',
    name: 'NLP Foundations',
    goal: 'Master text processing, embeddings, and modern NLP with Hugging Face.',
    color: '#ec4899',
    estimatedTime: '~8–10 weeks',
    outcomes: [
      'Process and tokenize text for ML models',
      'Understand word embeddings (Word2Vec, GloVe)',
      'Build sequence models for NLP tasks',
      'Fine-tune BERT for classification and NER',
    ],
    projects: [
      'Sentiment classifier with LSTM',
      'Text summarizer',
      'NER system with spaCy',
      'BERT fine-tuning on custom dataset',
    ],
    subsections: [
      {
        title: 'A. Text Processing & Tokenization',
        topics: [
          {
            name: 'Text cleaning, tokenization (word, char, BPE, SentencePiece)',
            difficulty: 'Beginner',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=zduSFxRajkE', label: 'Karpathy — Build the GPT Tokenizer' },
              { level: '🇮🇳 Hindi', url: 'https://www.youtube.com/watch?v=3bPhDUSAUYI', label: 'Krish Naik — NLP Playlist (Hindi)' },
            ],
          },
          {
            name: 'TF-IDF, stemming, lemmatization, NER with spaCy',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Full playlist', url: 'https://www.youtube.com/playlist?list=PLZoTAELRMXVMdJ5sqbCK2LiM0HhQVWNzm', label: 'Krish Naik — NLP Playlist' },
            ],
          },
        ],
      },
      {
        title: 'B. Word Embeddings',
        topics: [
          {
            name: 'Word2Vec (CBOW, Skip-gram), GloVe, cosine similarity',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=viZrOnJclY0', label: 'StatQuest — Word Embedding & Word2Vec' },
            ],
          },
          {
            name: 'FastText, contextual embeddings, ELMo',
            difficulty: 'Advanced',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=-9vVhYEXeyQ', label: 'Yannic Kilcher — BERT paper' },
            ],
          },
        ],
      },
      {
        title: 'C. Sequence Models for NLP',
        topics: [
          {
            name: 'Seq2Seq, attention for NMT, beam search',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=quoGRI-1l0A', label: 'Karpathy — Attention intuitively' },
            ],
          },
          {
            name: 'Text classification with LSTM, sentiment analysis',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=AsNTP8Kwu80', label: 'StatQuest — RNN for NLP' },
            ],
          },
        ],
      },
      {
        title: 'D. Modern NLP with Hugging Face',
        topics: [
          {
            name: 'BERT: MLM pretraining, fine-tuning for classification, NER, QA',
            difficulty: 'Advanced',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=-9vVhYEXeyQ', label: 'Yannic Kilcher — BERT paper' },
              { level: 'Video', url: 'https://www.youtube.com/watch?v=4QHg8Ix8WWQ', label: 'Fine-Tuning BERT for Text Classification' },
              { level: 'Full course', url: 'https://huggingface.co/learn/nlp-course/chapter1/1', label: 'Hugging Face NLP Course' },
              { level: '🇮🇳 Hindi', url: 'https://www.youtube.com/watch?v=3bPhDUSAUYI', label: 'Krish Naik — BERT (Hindi)' },
            ],
          },
          {
            name: 'Transformers library: pipeline, Trainer API, tokenizers',
            difficulty: 'Advanced',
            resources: [
              { level: 'Full course', url: 'https://huggingface.co/learn/nlp-course/chapter1/1', label: 'Hugging Face NLP Course' },
            ],
          },
        ],
      },
    ],
    buildTasks: [
      { name: 'Build a sentiment classifier using LSTM on IMDB dataset in PyTorch', hint: 'Use torchtext or custom DataLoader' },
      { name: 'Fine-tune BERT on a custom text classification dataset using Hugging Face; push to HF Hub', hint: 'Use transformers library Trainer API' },
      { name: 'Build a named entity recognition (NER) system using spaCy on custom data', hint: 'Use spaCy training API' },
      { name: 'Compare Word2Vec, GloVe, and BERT embeddings on a similarity task', hint: 'Use cosine similarity and visualize with t-SNE' },
    ],
  },

  /* ===== PHASE 9: Transformers Deep Dive ===== */
  {
    id: 'phase9',
    name: 'Transformers Deep Dive',
    goal: 'Understand the transformer architecture in detail — the foundation of all modern LLMs.',
    color: '#8b5cf6',
    estimatedTime: '~10–12 weeks',
    outcomes: [
      'Implement self-attention and multi-head attention from scratch',
      'Understand positional encoding, layer norm, and residual connections',
      'Distinguish encoder-only, decoder-only, and seq2seq architectures',
      'Read and understand the Attention Is All You Need paper',
    ],
    projects: [
      'Scaled dot-product attention from scratch',
      'Full transformer block in PyTorch',
      'Attention visualization tool',
      'Read and present a transformer paper',
    ],
    subsections: [
      {
        title: 'A. Attention Mechanisms',
        topics: [
          {
            name: 'Bahdanau attention — intuition and math',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=quoGRI-1l0A', label: 'Karpathy — Attention intuitively' },
            ],
          },
          {
            name: 'Scaled dot-product attention: Q, K, V; softmax(QK^T/√dk)V',
            difficulty: 'Advanced',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=eMlx5fFNoYc', label: '3Blue1Brown — Attention in Transformers' },
              { level: 'Paper', url: 'https://arxiv.org/abs/1706.03762', label: 'Attention Is All You Need — Vaswani et al.' },
              { level: '🇮🇳 Hindi', url: 'https://www.youtube.com/watch?v=3bPhDUSAUYI', label: 'Krish Naik — Transformers (Hindi)' },
            ],
          },
          {
            name: 'Why attention beats recurrence for long sequences',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Blog', url: 'https://jalammar.github.io/illustrated-transformer/', label: 'Jay Alammar — Illustrated Transformer' },
            ],
          },
        ],
      },
      {
        title: 'B. Full Transformer Architecture',
        topics: [
          {
            name: 'Multi-head attention: parallel heads, concat, projection',
            difficulty: 'Advanced',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=iDulhoQ2pro', label: 'Yannic Kilcher — Attention Is All You Need' },
            ],
          },
          {
            name: 'Positional encoding: sinusoidal, RoPE, ALiBi',
            difficulty: 'Advanced',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=dichIcUZfOw', label: 'Karpathy — Building GPT step by step' },
            ],
          },
          {
            name: 'Encoder stack: self-attention + FFN + LayerNorm + residuals',
            difficulty: 'Advanced',
            resources: [
              { level: 'Blog', url: 'https://jalammar.github.io/illustrated-transformer/', label: 'Jay Alammar — Illustrated Transformer' },
            ],
          },
          {
            name: 'Decoder stack: masked self-attention + cross-attention + FFN',
            difficulty: 'Advanced',
            resources: [
              { level: 'Blog', url: 'https://jalammar.github.io/illustrated-transformer/', label: 'Jay Alammar — Illustrated Transformer' },
            ],
          },
          {
            name: 'Encoder-only (BERT) vs Decoder-only (GPT) vs Seq2Seq (T5)',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Full build', url: 'https://www.youtube.com/watch?v=kCc8FmEb1nY', label: 'Karpathy — Let\'s build GPT (ESSENTIAL)' },
            ],
          },
        ],
      },
      {
        title: 'C. Scaling Laws & Efficiency',
        topics: [
          {
            name: 'Scaling laws: Chinchilla, compute-optimal training',
            difficulty: 'Advanced',
            resources: [
              { level: 'Paper', url: 'https://arxiv.org/abs/2203.15556', label: 'Chinchilla — Hoffmann et al. 2022' },
            ],
          },
          {
            name: 'Flash attention, KV caching, grouped query attention',
            difficulty: 'Advanced',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=bCzRbO1ahh0', label: 'Andrej Karpathy — Flash Attention' },
            ],
          },
          {
            name: 'Mixture of Experts (MoE), sparse attention',
            difficulty: 'Advanced',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=XbIQknDnQUE', label: 'Yannic Kilcher — Mixtral MoE' },
            ],
          },
        ],
      },
    ],
    buildTasks: [
      { name: 'Implement scaled dot-product attention from scratch in PyTorch and verify with a heatmap', hint: 'Use matplotlib to plot attention weights' },
      { name: 'Build a complete transformer block (multi-head attention + FFN + LayerNorm + residual)', hint: 'Follow the original paper architecture' },
      { name: 'Read the Attention Is All You Need paper and write a 1-page summary', hint: 'Focus on the key innovations and why they matter' },
      { name: 'Implement a simple GPT model architecture with positional encoding and causal masking', hint: 'Use nn.TransformerDecoderLayer as reference' },
    ],
  },

  /* ===== PHASE 10: Build GPT From Scratch ===== */
  {
    id: 'phase10',
    name: 'Build GPT From Scratch',
    goal: 'Build, train, and evaluate a GPT-style language model from first principles.',
    color: '#a855f7',
    estimatedTime: '~12–16 weeks',
    outcomes: [
      'Build a character-level and token-level GPT from scratch',
      'Implement training pipelines with gradient accumulation and mixed precision',
      'Train a GPT model on custom datasets',
      'Understand sampling strategies and evaluation metrics',
    ],
    projects: [
      'Character GPT on Tiny Shakespeare',
      'NanoGPT reimplementation',
      'Mini GPT on custom dataset',
      'Personal LLM trained on your own data',
    ],
    subsections: [
      {
        title: 'A. Character-Level GPT',
        topics: [
          {
            name: 'Bigram model → MLP → RNN baseline',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=PaCmpygFfXo', label: 'Karpathy — makemore Part 1: bigrams' },
              { level: 'Dataset', url: 'https://raw.githubusercontent.com/karpathy/char-rnn/master/data/tinyshakespeare/input.txt', label: 'Tiny Shakespeare dataset' },
            ],
          },
          {
            name: 'Build GPT from scratch in PyTorch (embeddings + transformer blocks + LM head)',
            difficulty: 'Advanced',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=kCc8FmEb1nY', label: 'Karpathy — Let\'s build GPT (2 hrs — ESSENTIAL)' },
            ],
          },
        ],
      },
      {
        title: 'B. Token-Level GPT',
        topics: [
          {
            name: 'BPE Tokenizer from scratch + training pipeline',
            difficulty: 'Advanced',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=zduSFxRajkE', label: 'Karpathy — Build the GPT Tokenizer' },
              { level: 'Series', url: 'https://www.youtube.com/watch?v=UU1WVnMk4E8', label: 'Sebastian Raschka — LLM from Scratch' },
            ],
          },
          {
            name: 'Dataset preparation, batching, context windows',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=kCc8FmEb1nY', label: 'Karpathy — Let\'s build GPT' },
            ],
          },
        ],
      },
      {
        title: 'C. Training Pipelines',
        topics: [
          {
            name: 'Gradient accumulation, mixed precision (AMP), warmup, cosine decay',
            difficulty: 'Advanced',
            resources: [
              { level: 'Series', url: 'https://www.youtube.com/watch?v=UU1WVnMk4E8', label: 'Sebastian Raschka — LLM from Scratch' },
            ],
          },
          {
            name: 'Checkpointing, resume training, logging with wandb',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=kCc8FmEb1nY', label: 'Karpathy — Let\'s build GPT' },
            ],
          },
        ],
      },
      {
        title: 'D. Evaluation & Sampling',
        topics: [
          {
            name: 'Perplexity, loss curves, overfitting detection',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=kCc8FmEb1nY', label: 'Karpathy — Let\'s build GPT' },
            ],
          },
          {
            name: 'Sampling: temperature, top-k, top-p (nucleus), beam search',
            difficulty: 'Advanced',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=zduSFxRajkE', label: 'Karpathy — Sampling Strategies' },
            ],
          },
        ],
      },
    ],
    buildTasks: [
      { name: 'Train a character-level GPT on Tiny Shakespeare following Karpathy\'s tutorial end-to-end', hint: 'Follow the full notebook step by step' },
      { name: 'Build a BPE tokenizer from scratch and tokenize a custom text corpus', hint: 'Implement merge rules, test on your own text' },
      { name: 'Train a GPT model on your own custom dataset (blog posts, notes, etc.)', hint: 'Collect data, clean it, train for 1M+ tokens' },
      { name: 'Implement temperature, top-k, and top-p sampling and compare generation quality', hint: 'Try different temperatures and see the effect' },
    ],
  },

  /* ===== PHASE 11: LLM Engineering ===== */
  {
    id: 'phase11',
    name: 'LLM Engineering',
    goal: 'Fine-tune, quantize, and optimize open-source LLMs for real-world use.',
    color: '#d946ef',
    estimatedTime: '~10–12 weeks',
    outcomes: [
      'Fine-tune LLMs with LoRA and QLoRA',
      'Quantize models for efficient inference',
      'Understand distillation and alignment (RLHF concepts)',
      'Evaluate LLM outputs systematically',
    ],
    projects: [
      'Fine-tune Llama 3 8B with QLoRA',
      'Quantize a model and compare quality',
      'Build a custom chatbot with fine-tuned LLM',
      'RLHF alignment experiment',
    ],
    subsections: [
      {
        title: 'A. Fine-Tuning Methods',
        topics: [
          {
            name: 'Full fine-tuning vs parameter-efficient fine-tuning (PEFT)',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=eC6Hd1hFvos', label: 'Maxime Labonne — Fine-tune Llama 3' },
            ],
          },
          {
            name: 'LoRA: low-rank adaptation, rank selection, target modules',
            difficulty: 'Advanced',
            resources: [
              { level: 'Paper', url: 'https://arxiv.org/abs/2106.09685', label: 'LoRA — Hu et al. 2021' },
              { level: 'Video', url: 'https://www.youtube.com/watch?v=dA-NhCtrrVE', label: 'Tim Dettmers — QLoRA explained' },
            ],
          },
        ],
      },
      {
        title: 'B. QLoRA & Quantization',
        topics: [
          {
            name: 'QLoRA: 4-bit quantization + LoRA fine-tuning on consumer GPUs',
            difficulty: 'Advanced',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=eC6Hd1hFvos', label: 'Maxime Labonne — QLoRA Tutorial' },
              { level: 'Video', url: 'https://www.youtube.com/watch?v=dA-NhCtrrVE', label: 'Tim Dettmers — QLoRA explained' },
            ],
          },
          {
            name: 'Quantization: INT8, INT4, GPTQ, AWQ, GGUF',
            difficulty: 'Advanced',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=_3FctggJ9r4', label: 'PTQ, GPTQ, AWQ, GGUF, GGML Quantization Explained' },
            ],
          },
        ],
      },
      {
        title: 'C. Distillation & Alignment',
        topics: [
          {
            name: 'Knowledge distillation: teacher-student, feature distillation',
            difficulty: 'Advanced',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=riUYGZ-_fJY', label: 'Hugging Face — LLM Distillation' },
            ],
          },
          {
            name: 'RLHF concepts: reward modeling, PPO, DPO, Constitutional AI',
            difficulty: 'Advanced',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=nSrj1J6ODoM', label: 'Yannic Kilcher — RLHF explained' },
            ],
          },
        ],
      },
      {
        title: 'D. Evaluation',
        topics: [
          {
            name: 'LLM benchmarks: MMLU, HumanEval, MT-Bench, Arena',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=a3SMraZWNNs', label: 'How to Evaluate LLMs' },
            ],
          },
          {
            name: 'Custom evaluation: human eval, LLM-as-judge, A/B testing',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=a3SMraZWNNs', label: 'LLM Evaluation Best Practices' },
            ],
          },
        ],
      },
    ],
    buildTasks: [
      { name: 'Fine-tune Mistral-7B or Llama-3-8B with QLoRA on Google Colab on a custom QA dataset; push to HF Hub', hint: 'Use bitsandbytes + peft library' },
      { name: 'Quantize a model to INT4 and INT8, compare inference speed and quality', hint: 'Use bitsandbytes quantization' },
      { name: 'Build a custom chatbot by fine-tuning an open-source model on conversation data', hint: 'Format data as chat messages with system/user/assistant roles' },
      { name: 'Implement a simple RLHF reward model and compare with DPO training', hint: 'Use trl library for DPO training' },
    ],
  },

  /* ===== PHASE 12: RAG Engineering ===== */
  {
    id: 'phase12',
    name: 'RAG Engineering',
    goal: 'Build production-grade Retrieval-Augmented Generation systems.',
    color: '#c084fc',
    estimatedTime: '~8–10 weeks',
    outcomes: [
      'Implement vector embeddings and similarity search',
      'Build RAG pipelines with LangChain and vector databases',
      'Use hybrid search and advanced retrieval strategies',
      'Evaluate and optimize RAG system quality',
    ],
    projects: [
      'RAG chatbot over PDF documents',
      'Multi-source RAG with hybrid search',
      'Production RAG with evaluation metrics',
      'Knowledge base QA system',
    ],
    subsections: [
      {
        title: 'A. Embeddings & Vector Stores',
        topics: [
          {
            name: 'Text embeddings: OpenAI, sentence-transformers, BGE',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=tcqEUSNCn8I', label: 'Sam Witteveen — LangChain + RAG' },
            ],
          },
          {
            name: 'Vector databases: FAISS, Chroma, Qdrant, Pinecone, Weaviate',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=dN0lsF2NvmE', label: 'Vector Databases Explained' },
            ],
          },
        ],
      },
      {
        title: 'B. Retrieval Strategies',
        topics: [
          {
            name: 'Semantic search, keyword search, hybrid search (BM25 + embeddings)',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=tcqEUSNCn8I', label: 'Sam Witteveen — RAG Retrieval' },
            ],
          },
          {
            name: 'Chunking strategies: fixed, recursive, semantic chunking',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=pIGRwMjhMaQ', label: 'Chunking Strategies in RAG' },
            ],
          },
          {
            name: 'Re-ranking, query transformation, HyDE',
            difficulty: 'Advanced',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=tcqEUSNCn8I', label: 'Advanced RAG Techniques' },
            ],
          },
        ],
      },
      {
        title: 'C. RAG Pipelines',
        topics: [
          {
            name: 'LangChain RAG: document loaders, splitters, chains',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=tcqEUSNCn8I', label: 'Sam Witteveen — LangChain + RAG' },
              { level: '🇮🇳 Hindi', url: 'https://www.youtube.com/watch?v=tcqEUSNCn8I', label: 'LangChain RAG Tutorial' },
            ],
          },
          {
            name: 'LlamaIndex: indexing, querying, response synthesis',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=TRjq7t2Ms5I', label: 'LlamaIndex Full Tutorial' },
            ],
          },
        ],
      },
      {
        title: 'D. Advanced RAG',
        topics: [
          {
            name: 'Multi-modal RAG, structured data RAG, graph RAG',
            difficulty: 'Advanced',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=tcqEUSNCn8I', label: 'Advanced RAG Architectures' },
            ],
          },
          {
            name: 'RAG evaluation: faithfulness, relevance, context precision',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=tcqEUSNCn8I', label: 'RAG Evaluation with RAGAS' },
            ],
          },
        ],
      },
    ],
    buildTasks: [
      { name: 'Build a RAG chatbot over your own PDF documents using LangChain + FAISS', hint: 'Use LangChain document loaders and FAISS vector store' },
      { name: 'Implement hybrid search (BM25 + semantic) and compare with pure semantic search', hint: 'Use rank_bm25 library + sentence-transformers' },
      { name: 'Build a production RAG system with evaluation metrics (faithfulness, relevance)', hint: 'Use RAGAS or custom evaluation pipeline' },
      { name: 'Create a multi-source RAG that combines PDFs, web pages, and structured data', hint: 'Use different document loaders for each source' },
    ],
  },

  /* ===== PHASE 13: AI Agents ===== */
  {
    id: 'phase13',
    name: 'AI Agents',
    goal: 'Build autonomous AI agents that can plan, reason, use tools, and collaborate.',
    color: '#e879f9',
    estimatedTime: '~8–10 weeks',
    outcomes: [
      'Design and implement agent architectures',
      'Build agents that use external tools and APIs',
      'Implement memory systems for agents',
      'Create multi-agent collaborative systems',
    ],
    projects: [
      'Tool-using research agent',
      'Code generation agent',
      'Multi-agent debate system',
      'Autonomous planning agent',
    ],
    subsections: [
      {
        title: 'A. Agent Architectures',
        topics: [
          {
            name: 'ReAct pattern: reasoning + acting, chain-of-thought',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=DWUdGhRrv2c', label: 'Data Independent — LangChain Agents' },
            ],
          },
          {
            name: 'Tool use: function calling, tool descriptions, error handling',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=DWUdGhRrv2c', label: 'LangChain Agents — Tool Use' },
            ],
          },
        ],
      },
      {
        title: 'B. Planning & Reasoning',
        topics: [
          {
            name: 'Task decomposition, planning algorithms, reflection',
            difficulty: 'Advanced',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=DWUdGhRrv2c', label: 'Agent Planning Strategies' },
            ],
          },
          {
            name: 'Tree-of-thought, graph-of-thought, self-consistency',
            difficulty: 'Advanced',
            resources: [
              { level: 'Paper', url: 'https://arxiv.org/abs/2305.10601', label: 'Tree of Thoughts — Yao et al. 2023' },
            ],
          },
        ],
      },
      {
        title: 'C. Memory Systems',
        topics: [
          {
            name: 'Short-term vs long-term memory, conversation history',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=DWUdGhRrv2c', label: 'Agent Memory Systems' },
            ],
          },
          {
            name: 'Vector memory, episodic memory, semantic memory',
            difficulty: 'Advanced',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=DWUdGhRrv2c', label: 'Memory for AI Agents' },
            ],
          },
        ],
      },
      {
        title: 'D. Multi-Agent Systems',
        topics: [
          {
            name: 'CrewAI, AutoGen, multi-agent orchestration',
            difficulty: 'Advanced',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=DWUdGhRrv2c', label: 'Multi-Agent Systems with LangChain' },
            ],
          },
          {
            name: 'Agent communication protocols, shared state, delegation',
            difficulty: 'Advanced',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=DWUdGhRrv2c', label: 'Multi-Agent Collaboration' },
            ],
          },
        ],
      },
    ],
    buildTasks: [
      { name: 'Build a tool-using research agent that can search the web and summarize findings', hint: 'Use LangChain or custom ReAct implementation' },
      { name: 'Create a code generation agent that can write, test, and debug Python code', hint: 'Give it access to a Python interpreter tool' },
      { name: 'Build a multi-agent system where two agents debate a topic and a judge decides', hint: 'Use CrewAI or build from scratch' },
      { name: 'Implement a planning agent that can break down a complex task into subtasks and execute them', hint: 'Use chain-of-thought prompting + tool use' },
    ],
  },

  /* ===== PHASE 14: MLOps & Deployment ===== */
  {
    id: 'phase14',
    name: 'MLOps & Deployment',
    goal: 'Deploy ML models to production with Docker, CI/CD, and monitoring.',
    color: '#f43f5e',
    estimatedTime: '~8–10 weeks',
    outcomes: [
      'Containerize ML applications with Docker',
      'Set up CI/CD pipelines for ML workflows',
      'Track experiments with MLflow',
      'Monitor model performance in production',
    ],
    projects: [
      'Dockerized ML inference API',
      'CI/CD pipeline with GitHub Actions',
      'MLflow experiment tracking setup',
      'Model monitoring dashboard',
    ],
    subsections: [
      {
        title: 'A. Docker & Containers',
        topics: [
          {
            name: 'Docker: Dockerfile, docker-compose, containerize ML app',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=3c-iBn73dDE', label: 'TechWorld with Nana — Docker Full Course' },
              { level: '🇮🇳 Hindi', url: 'https://www.youtube.com/watch?v=ERCMXc8x7mc', label: 'Apna College — Docker (Hindi)' },
            ],
          },
          {
            name: 'Kubernetes basics: pods, services, deployments',
            difficulty: 'Advanced',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=X48VuDVv0do', label: 'TechWorld with Nana — Kubernetes Tutorial' },
            ],
          },
        ],
      },
      {
        title: 'B. CI/CD for ML',
        topics: [
          {
            name: 'GitHub Actions: automated testing, model training, deployment',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=R8_veViYyPw', label: 'GitHub Actions Tutorial' },
            ],
          },
          {
            name: 'ML pipelines: data validation, training, evaluation, deployment',
            difficulty: 'Advanced',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=R8_veViYyPw', label: 'MLOps Pipeline Design' },
            ],
          },
        ],
      },
      {
        title: 'C. MLflow & Experiment Tracking',
        topics: [
          {
            name: 'MLflow: tracking, projects, models, model registry',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=Z4unUK0vn4k', label: 'MLflow — Experiment Tracking' },
            ],
          },
          {
            name: 'W&B, Neptune.ai, experiment comparison',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=Z4unUK0vn4k', label: 'MLflow — Experiment Tracking' },
            ],
          },
        ],
      },
      {
        title: 'D. Monitoring & Scaling',
        topics: [
          {
            name: 'Model monitoring: data drift, concept drift, performance degradation',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=Z4unUK0vn4k', label: 'MLflow — Experiment Tracking' },
            ],
          },
          {
            name: 'Hugging Face Hub: push models, Spaces (deploy Gradio/Streamlit free)',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=xqdTFyRdtjQ', label: 'HF — Create a Hugging Face Space' },
            ],
          },
        ],
      },
    ],
    buildTasks: [
      { name: 'Dockerize your ML inference API and deploy it locally with docker-compose', hint: 'Create a Dockerfile with Python, FastAPI, and model weights' },
      { name: 'Set up a GitHub Actions CI/CD pipeline that runs tests and deploys on push', hint: 'Use GitHub Actions workflows' },
      { name: 'Track 3 different model experiments with MLflow and compare results', hint: 'Log parameters, metrics, and model artifacts' },
      { name: 'Deploy a Gradio or Streamlit app to Hugging Face Spaces', hint: 'Use the free tier for deployment' },
    ],
  },

  /* ===== PHASE 15: Distributed Training & Infrastructure ===== */
  {
    id: 'phase15',
    name: 'Distributed Training & Infrastructure',
    goal: 'Train large models across multiple GPUs and optimize inference at scale.',
    color: '#fb923c',
    estimatedTime: '~8–10 weeks',
    outcomes: [
      'Understand GPU computing and CUDA basics',
      'Implement distributed training with data and model parallelism',
      'Use DeepSpeed and FSDP for efficient training',
      'Optimize inference with vLLM and quantization',
    ],
    projects: [
      'Multi-GPU training pipeline',
      'DeepSpeed ZeRO training run',
      'vLLM inference server',
      'Model optimization benchmark',
    ],
    subsections: [
      {
        title: 'A. GPU Computing & CUDA',
        topics: [
          {
            name: 'GPU architecture, CUDA basics, memory management',
            difficulty: 'Advanced',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=86FAWCzIe_4', label: 'CUDA Programming Course' },
            ],
          },
          {
            name: 'PyTorch on GPU: .to(device), CUDA kernels, torch.compile',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=Ak4vq2ER6qQ', label: 'Aladdin Persson — PyTorch Advanced' },
            ],
          },
        ],
      },
      {
        title: 'B. Distributed Training',
        topics: [
          {
            name: 'Data parallelism, model parallelism, pipeline parallelism',
            difficulty: 'Advanced',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=Ak4vq2ER6qQ', label: 'Aladdin Persson — PyTorch Advanced' },
            ],
          },
          {
            name: 'PyTorch DDP: DistributedDataParallel, gradient synchronization',
            difficulty: 'Advanced',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=Ak4vq2ER6qQ', label: 'Aladdin Persson — PyTorch Advanced' },
            ],
          },
        ],
      },
      {
        title: 'C. DeepSpeed & FSDP',
        topics: [
          {
            name: 'DeepSpeed ZeRO: Stage 1/2/3, offloading, CPU memory',
            difficulty: 'Advanced',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=Ak4vq2ER6qQ', label: 'Aladdin Persson — PyTorch Advanced' },
            ],
          },
          {
            name: 'FSDP: Fully Sharded Data Parallel, activation checkpointing',
            difficulty: 'Advanced',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=Ak4vq2ER6qQ', label: 'Aladdin Persson — PyTorch Advanced' },
            ],
          },
        ],
      },
      {
        title: 'D. Inference Optimization',
        topics: [
          {
            name: 'vLLM: PagedAttention, continuous batching, high-throughput serving',
            difficulty: 'Advanced',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=Ak4vq2ER6qQ', label: 'Aladdin Persson — PyTorch Advanced' },
            ],
          },
          {
            name: 'TensorRT, ONNX Runtime, speculative decoding',
            difficulty: 'Advanced',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=Ak4vq2ER6qQ', label: 'Aladdin Persson — PyTorch Advanced' },
            ],
          },
        ],
      },
    ],
    buildTasks: [
      { name: 'Set up multi-GPU training with PyTorch DDP on a simple model', hint: 'Use torch.distributed.launch' },
      { name: 'Fine-tune a model with DeepSpeed ZeRO Stage 2 and compare memory usage', hint: 'Use Hugging Face Accelerate with DeepSpeed config' },
      { name: 'Deploy an LLM inference server with vLLM and benchmark throughput', hint: 'Use vLLM OpenAI-compatible API server' },
      { name: 'Optimize a model with torch.compile and measure inference speedup', hint: 'Compare eager mode vs compiled mode' },
    ],
  },

  /* ===== PHASE 16: Research Engineer Path ===== */
  {
    id: 'phase16',
    name: 'Research Engineer Path',
    goal: 'Read, reproduce, and contribute to AI research papers.',
    color: '#fbbf24',
    estimatedTime: '~6–8 weeks',
    outcomes: [
      'Read and understand ML research papers',
      'Reproduce results from published papers',
      'Design and run proper experiments',
      'Write clear technical reports',
    ],
    projects: [
      'Reproduce a recent paper',
      'Write a paper review',
      'Benchmark comparison study',
      'Technical blog post on a paper',
    ],
    subsections: [
      {
        title: 'A. Reading Papers',
        topics: [
          {
            name: 'How to read ML papers: abstract → figures → methods → results',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=RjG689EwG5g', label: 'MIT PhD — How to Read ML Papers' },
            ],
          },
          {
            name: 'Essential papers: Attention Is All You Need, BERT, GPT-2, GPT-3, LLaMA, LoRA',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Paper', url: 'https://arxiv.org/abs/1706.03762', label: 'Attention Is All You Need' },
              { level: 'Paper', url: 'https://arxiv.org/abs/1810.04805', label: 'BERT — Devlin et al. 2018' },
              { level: 'Paper', url: 'https://arxiv.org/abs/2005.14165', label: 'GPT-3 — Brown et al. 2020' },
              { level: 'Paper', url: 'https://arxiv.org/abs/2302.13971', label: 'LLaMA — Touvron et al. 2023' },
              { level: 'Paper', url: 'https://arxiv.org/abs/2106.09685', label: 'LoRA — Hu et al. 2021' },
            ],
          },
        ],
      },
      {
        title: 'B. Reproducing Papers',
        topics: [
          {
            name: 'Reproducing experiments: data, code, hyperparameters, seeds',
            difficulty: 'Advanced',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=RjG689EwG5g', label: 'MIT PhD — Reproducing Research' },
            ],
          },
          {
            name: 'Using published code: GitHub repos, checkpoints, configs',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=RjG689EwG5g', label: 'MIT PhD — Reproducing Research' },
            ],
          },
        ],
      },
      {
        title: 'C. Benchmarking & Evaluation',
        topics: [
          {
            name: 'Designing fair comparisons, ablation studies, statistical significance',
            difficulty: 'Advanced',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=RjG689EwG5g', label: 'MIT PhD — Benchmarking Best Practices' },
            ],
          },
          {
            name: 'Leaderboard culture: Open LLM Leaderboard, HELM, LM Evaluation Harness',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Resource', url: 'https://huggingface.co/spaces/open-llm-leaderboard/open_llm_leaderboard', label: 'Open LLM Leaderboard' },
            ],
          },
        ],
      },
      {
        title: 'D. Experiment Design & Technical Writing',
        topics: [
          {
            name: 'Hypothesis formation, controlled experiments, reporting negative results',
            difficulty: 'Advanced',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=RjG689EwG5g', label: 'MIT PhD — Experiment Design for ML' },
            ],
          },
          {
            name: 'Technical blogging: writing clear, accessible ML content',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Blog', url: 'https://lilianweng.github.io/', label: 'Lilian Weng\'s Blog — Example of Great ML Writing' },
            ],
          },
        ],
      },
    ],
    buildTasks: [
      { name: 'Read and write a detailed review of the Attention Is All You Need paper', hint: 'Cover motivation, method, results, and limitations' },
      { name: 'Reproduce a simple paper\'s results (e.g., LoRA fine-tuning) and document the process', hint: 'Follow the paper\'s methodology exactly' },
      { name: 'Run a benchmark comparison of 2-3 models on a custom evaluation task', hint: 'Use consistent evaluation metrics and report results' },
      { name: 'Write a technical blog post explaining a recent ML paper in simple terms', hint: 'Target audience: B.Tech students' },
    ],
  },

  /* ===== PHASE 17: Open Source & Global Portfolio ===== */
  {
    id: 'phase17',
    name: 'Open Source & Global Portfolio',
    goal: 'Build a world-class portfolio that demonstrates your AI engineering skills.',
    color: '#34d399',
    estimatedTime: '~4–6 weeks',
    outcomes: [
      'Build a professional GitHub portfolio',
      'Contribute to open-source AI projects',
      'Write technical blog posts and documentation',
      'Create a personal brand in the AI community',
    ],
    projects: [
      'Open source contribution to a popular repo',
      'Technical blog post series',
      'Personal portfolio website',
      'Capstone project showcase',
    ],
    subsections: [
      {
        title: 'A. GitHub Portfolio',
        topics: [
          {
            name: 'Profile README, pinned repos, contribution graph',
            difficulty: 'Beginner',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=zgqfWLHNKLk', label: 'GitHub Portfolio Tutorial' },
              { level: '🇮🇳 Hindi', url: 'https://www.youtube.com/watch?v=ERCMXc8x7mc', label: 'Apna College — GitHub Profile (Hindi)' },
            ],
          },
          {
            name: 'README best practices, project documentation, code quality',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=zgqfWLHNKLk', label: 'GitHub Portfolio Tutorial' },
            ],
          },
        ],
      },
      {
        title: 'B. Open Source Contributions',
        topics: [
          {
            name: 'Finding good-first-issue, understanding codebases, PR workflow',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=zgqfWLHNKLk', label: 'GitHub Portfolio Tutorial' },
            ],
          },
          {
            name: 'Contributing to Hugging Face, PyTorch, LangChain, or other AI projects',
            difficulty: 'Advanced',
            resources: [
              { level: 'Resource', url: 'https://github.com/huggingface/transformers', label: 'Hugging Face Transformers — Good First Issues' },
            ],
          },
        ],
      },
      {
        title: 'C. Technical Writing',
        topics: [
          {
            name: 'Blog on Medium, dev.to, or personal site; write about what you learn',
            difficulty: 'Beginner',
            resources: [
              { level: 'Blog', url: 'https://lilianweng.github.io/', label: 'Lilian Weng\'s Blog — Great Example' },
              { level: 'Blog', url: 'https://jalammar.github.io/', label: 'Jay Alammar\'s Blog — Visual Explanations' },
            ],
          },
          {
            name: 'LinkedIn: share projects, insights, and learning journey',
            difficulty: 'Beginner',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=zgqfWLHNKLk', label: 'GitHub Portfolio Tutorial' },
            ],
          },
        ],
      },
      {
        title: 'D. Personal Brand & Job Search',
        topics: [
          {
            name: 'Resume building for AI roles: projects, skills, impact',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=zgqfWLHNKLk', label: 'GitHub Portfolio Tutorial' },
            ],
          },
          {
            name: 'Interview prep: system design, coding, ML theory, behavioral',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Resource', url: 'https://www.youtube.com/watch?v=zgqfWLHNKLk', label: 'GitHub Portfolio Tutorial' },
            ],
          },
          {
            name: 'Off-campus hiring: referrals, cold outreach, job boards, networking',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=zgqfWLHNKLk', label: 'GitHub Portfolio Tutorial' },
            ],
          },
        ],
      },
    ],
    buildTasks: [
      { name: 'Make a meaningful open-source contribution to a popular AI project (Hugging Face, LangChain, etc.)', hint: 'Start with docs, tests, or good-first-issue labels' },
      { name: 'Write 3 technical blog posts explaining ML concepts you\'ve learned', hint: 'Publish on Medium, dev.to, or your own site' },
      { name: 'Build a personal portfolio website showcasing your projects and skills', hint: 'Use GitHub Pages or Vercel for free hosting' },
      { name: 'Create a capstone project that combines multiple skills from this roadmap', hint: 'Build an end-to-end AI product: model + API + frontend + deployment' },
    ],
  },
];

/* ============================================
   Helper: Get all topics from nested subsections
   ============================================ */
function getAllTopicsCount(phase) {
  let count = 0;
  phase.subsections.forEach(sub => { count += sub.topics.length; });
  return count;
}

function flattenPhaseTopics(phase) {
  const topics = [];
  phase.subsections.forEach(sub => {
    sub.topics.forEach(topic => topics.push(topic));
  });
  return topics;
}
