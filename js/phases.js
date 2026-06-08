/* ============================================
   GRBS — Shared PHASES Data
   All 6 phases with topics, resources & build tasks
   ============================================ */

const PHASES = [
  {
    id: 'phase0',
    name: 'Programming Foundations',
    goal: 'Go from zero to ready for AI/ML. Cover the languages and tools needed before any ML code.',
    color: '#6366f1',
    estimatedTime: '~8–10 weeks',
    outcomes: [
      'Write clean Python scripts and CLI apps',
      'Use Git and GitHub confidently',
      'Solve basic data structure problems',
      'Set up a local ML development environment',
    ],
    projects: [
      'CSV filtering script',
      'CLI to-do list app',
      '2 GitHub projects with READMEs',
      '10 LeetCode Easy solutions',
    ],
    subsections: [
      {
        title: 'A. Python',
        topics: [
          {
            name: 'Python Basics (variables, data types, control flow, functions)',
            difficulty: 'Beginner',
            resources: [
              { level: 'Beginner', url: 'https://www.youtube.com/watch?v=_uQrJ0TkZlc', label: 'Programming with Mosh — Python for Beginners' },
              { level: 'Intermediate', url: 'https://www.youtube.com/watch?v=HGOBQPFzWKo', label: 'freeCodeCamp — Python Full Course' },
              { level: 'Advanced', url: 'https://www.youtube.com/watch?v=p15xzjzR9j0', label: 'Corey Schafer — Python OOP' },
            ],
          },
          {
            name: 'Object-Oriented Programming (classes, inheritance, dunder methods)',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Beginner', url: 'https://www.youtube.com/watch?v=JeznW_7DlB0', label: 'Tech With Tim — OOP Python' },
              { level: 'Intermediate', url: 'https://www.youtube.com/watch?v=Ej_02ICOIgs', label: 'Corey Schafer — OOP Playlist' },
              { level: 'Advanced', url: 'https://www.youtube.com/watch?v=p15xzjzR9j0', label: 'Corey Schafer — Dunder Methods' },
            ],
          },
          {
            name: 'List/Dict/Set Comprehensions, Generators, Decorators',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=3dt4OGnU5sM', label: 'Corey Schafer — Comprehensions' },
            ],
          },
          {
            name: 'File Handling, APIs, Web Scraping',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=tb8gHvYlCFs', label: 'freeCodeCamp — APIs in Python' },
            ],
          },
          {
            name: 'Virtual Environments, pip, conda',
            difficulty: 'Beginner',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=N5vscPTWKOk', label: 'Corey Schafer — venv' },
            ],
          },
        ],
      },
      {
        title: 'B. Command Line & Git',
        topics: [
          {
            name: 'Linux/Terminal Basics (ls, cd, mkdir, grep, chmod, ssh)',
            difficulty: 'Beginner',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=ZtqBQ68cfJc', label: 'freeCodeCamp — Linux CLI' },
            ],
          },
          {
            name: 'Git & GitHub (init, commit, push, branch, merge, pull requests)',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Beginner', url: 'https://www.youtube.com/watch?v=RGOj5yH7evk', label: 'freeCodeCamp — Git & GitHub' },
              { level: 'Intermediate', url: 'https://www.youtube.com/watch?v=Uszj_k0DGsg', label: 'freeCodeCamp — Advanced Git' },
            ],
          },
          {
            name: 'Markdown (for README files and documentation)',
            difficulty: 'Beginner',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=_PPWWRV6gbA', label: 'Traversy Media — Markdown Crash Course' },
            ],
          },
        ],
      },
      {
        title: 'C. Data Structures & Algorithms (Python)',
        topics: [
          {
            name: 'Arrays, Strings, HashMaps, Stacks, Queues',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=pkYVOmU3MgA', label: 'freeCodeCamp — DSA Full Course' },
            ],
          },
          {
            name: 'Trees, Graphs, Recursion',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=fAAZixBzIAI', label: 'freeCodeCamp — Trees and Graphs' },
            ],
          },
          {
            name: 'Sorting, Searching, Big-O Analysis',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=kPRA0W1kECg', label: 'freeCodeCamp — Algorithms' },
            ],
          },
          {
            name: 'LeetCode Easy Problems (aim for 20 solved)',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Resource', url: 'https://leetcode.com/problemset/all/?difficulty=EASY', label: 'LeetCode — Easy Problems' },
            ],
          },
        ],
      },
    ],
    buildTasks: [
      { name: 'Write a Python script that reads a CSV file, filters rows, and outputs results to a new file', hint: 'Use csv module or pandas for file I/O' },
      { name: 'Build a simple CLI to-do list app using Python with file persistence', hint: 'Use JSON or plain text for storage' },
      { name: 'Push 2 Python projects to GitHub with proper README files', hint: 'Include clear project descriptions and setup instructions' },
      { name: 'Solve 10 LeetCode Easy problems and commit solutions to GitHub', hint: 'Aim for clean, well-commented solutions' },
    ],
  },
  {
    id: 'phase1',
    name: 'Mathematics for AI',
    goal: 'Build the math intuition that powers every neural network.',
    color: '#0ea5e9',
    estimatedTime: '~6–8 weeks',
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
            name: 'Eigenvalues, Eigenvectors, SVD',
            difficulty: 'Advanced',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=PFDu9oVAE-g', label: '3Blue1Brown — Eigenvectors' },
            ],
          },
          {
            name: 'Matrix decompositions (PCA, QR)',
            difficulty: 'Advanced',
            resources: [
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
            name: 'MLE, cross-entropy loss',
            difficulty: 'Advanced',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=6xqv98r4Ml8', label: 'StatQuest — MLE' },
            ],
          },
          {
            name: 'Hypothesis testing, confidence intervals',
            difficulty: 'Intermediate',
            resources: [
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
              { level: 'Video', url: 'https://www.youtube.com/watch?v=mdKjMPmcWjY', label: 'Andrej Karpathy — Optimization' },
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
  {
    id: 'phase2',
    name: 'Data Science Toolkit',
    goal: 'Become fluent in the tools every ML engineer uses daily.',
    color: '#10b981',
    estimatedTime: '~5–7 weeks',
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
            ],
          },
          {
            name: 'Broadcasting rules and vectorized operations',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=vN5dAZrS58E', label: 'Keith Galli — NumPy Tutorial' },
            ],
          },
          {
            name: 'Linear algebra ops: dot, matmul, linalg',
            difficulty: 'Intermediate',
            resources: [
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
            ],
          },
          {
            name: 'Data cleaning: dropna, fillna, astype, duplicates',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=bDhvCp3_lYw', label: 'Rob Mulla — Pandas in 30 min' },
            ],
          },
          {
            name: 'groupby, merge, pivot tables, apply/map',
            difficulty: 'Intermediate',
            resources: [],
          },
        ],
      },
      {
        title: 'C. Matplotlib & Seaborn',
        topics: [
          {
            name: 'Line, bar, scatter, histogram, box plots',
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
          {
            name: 'Multi-panel figures and publication quality export',
            difficulty: 'Intermediate',
            resources: [],
          },
        ],
      },
      {
        title: 'D. Feature Engineering & Data Cleaning',
        topics: [
          {
            name: 'Missing value imputation strategies',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=WhWKMJeVVME', label: 'Krish Naik — Feature Engineering Playlist' },
            ],
          },
          {
            name: 'Encoding: one-hot, label, target encoding',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=wr9gUr-eWdA', label: 'Abhishek Thakur — Feature Engineering' },
            ],
          },
          {
            name: 'Scaling: StandardScaler, MinMaxScaler, RobustScaler',
            difficulty: 'Beginner',
            resources: [],
          },
          {
            name: 'Feature selection: correlation matrix, mutual info, RFECV',
            difficulty: 'Advanced',
            resources: [],
          },
        ],
      },
    ],
    buildTasks: [
      { name: 'Complete EDA on the Titanic dataset: cleaning, visualization, and a 5-insight report', hint: 'Use Kaggle Titanic dataset, focus on data quality' },
      { name: 'Build a data pipeline that loads a CSV, cleans missing values, encodes categoricals, and scales numerics', hint: 'Use sklearn Pipeline and ColumnTransformer' },
      { name: 'Create a Matplotlib/Seaborn dashboard with 6 chart types on one dataset', hint: 'Use plt.subplots for multi-panel layout' },
      { name: 'Submit a Kaggle notebook (any beginner competition) and make it public', hint: 'Start with the Titanic or House Prices competition' },
    ],
  },
  {
    id: 'phase3',
    name: 'Machine Learning',
    goal: 'Train, evaluate, and deploy classical ML models end-to-end.',
    color: '#f59e0b',
    estimatedTime: '~8–10 weeks',
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
        title: 'A. Regression',
        topics: [
          {
            name: 'Linear Regression: OLS, MSE, R², gradient descent',
            difficulty: 'Beginner',
            resources: [
              { level: 'Beginner', url: 'https://www.youtube.com/watch?v=nk2CQITm_eo', label: 'StatQuest — Linear Regression' },
              { level: 'Full course', url: 'https://www.youtube.com/watch?v=jGwO_UgTS7I', label: 'Andrew Ng — ML Week 1-3' },
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
            name: 'K-Means: centroid init, convergence, elbow method',
            difficulty: 'Beginner',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=4b5d3muPQmA', label: 'StatQuest — K-Means' },
            ],
          },
          {
            name: 'DBSCAN, Hierarchical Clustering',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=RDZUdRSDOok', label: 'StatQuest — DBSCAN' },
            ],
          },
          {
            name: 'PCA: variance explained, scree plots, 2D projection',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=FgakZw6K1QQ', label: 'StatQuest — PCA clearly explained' },
            ],
          },
          {
            name: 't-SNE and UMAP for visualization',
            difficulty: 'Advanced',
            resources: [
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
            resources: [],
          },
          {
            name: 'Hyperparameter tuning: GridSearchCV, RandomizedSearchCV',
            difficulty: 'Intermediate',
            resources: [],
          },
        ],
      },
    ],
    buildTasks: [
      { name: 'Build House Price Predictor: Linear Regression + Ridge + feature engineering; deploy on Streamlit', hint: 'Use Kaggle House Prices dataset' },
      { name: 'Customer Churn Model: XGBoost + SHAP values for interpretability; end-to-end sklearn pipeline', hint: 'Focus on feature importance and model explainability' },
      { name: 'Customer Segmentation: K-Means + PCA visualization on e-commerce dataset', hint: 'Use UCI Online Retail dataset' },
      { name: 'Enter a Kaggle tabular competition and reach top 40%', hint: 'Start with feature engineering and ensemble methods' },
    ],
  },
  {
    id: 'phase4',
    name: 'Deep Learning & NLP',
    goal: 'Understand neural networks deeply and build sequence models and BERT classifiers.',
    color: '#ef4444',
    estimatedTime: '~10–12 weeks',
    outcomes: [
      'Build neural networks from scratch with NumPy',
      'Train CNNs and transfer learning models in PyTorch',
      'Build LSTM-based sequence models',
      'Fine-tune BERT for text classification',
    ],
    projects: [
      'NumPy neural network on MNIST',
      'ResNet transfer learning on CIFAR-10',
      'LSTM sentiment classifier',
      'BERT fine-tuning on custom dataset',
    ],
    subsections: [
      {
        title: 'A. Neural Networks from Scratch',
        topics: [
          {
            name: 'Perceptron, MLP, activation functions (ReLU, Sigmoid, GELU, Tanh)',
            difficulty: 'Beginner',
            resources: [
              { level: 'Best resource', url: 'https://www.youtube.com/watch?v=VMj-3S1tku0', label: 'Karpathy — micrograd (zero to hero Ep.1)' },
              { level: 'Visual', url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi', label: '3Blue1Brown — Neural Networks Series' },
            ],
          },
          {
            name: 'Forward pass, loss, backpropagation (chain rule)',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=Ilg3gGewQ5U', label: '3Blue1Brown — Backpropagation Calculus' },
            ],
          },
          {
            name: 'Weight initialization: Xavier, He; batch normalization; dropout',
            difficulty: 'Advanced',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=dXB-KQYkzNU', label: 'DeepMind — Weight Init' },
            ],
          },
          {
            name: 'PyTorch fundamentals: tensors, autograd, nn.Module, DataLoader',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Full course', url: 'https://www.youtube.com/watch?v=Z_ikDlimN6A', label: 'freeCodeCamp — PyTorch for DL full course' },
            ],
          },
        ],
      },
      {
        title: 'B. Convolutional Neural Networks (CNN)',
        topics: [
          {
            name: 'Convolution op, kernels, stride, padding, pooling',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=YRhxdVk_sIs', label: 'Andrej Karpathy — CNN Stanford CS231n' },
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
            ],
          },
        ],
      },
      {
        title: 'C. RNN, LSTM, GRU',
        topics: [
          {
            name: 'RNN: hidden state, vanishing gradient problem',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=AsNTP8Kwu80', label: 'StatQuest — RNN' },
            ],
          },
          {
            name: 'LSTM: forget, input, output gates, cell state',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=YCzL96nL7j0', label: 'StatQuest — LSTM' },
            ],
          },
          {
            name: 'GRU, bidirectional RNNs, seq2seq',
            difficulty: 'Advanced',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=8HyCNIVRbSU', label: 'deeplizard — RNN/LSTM/GRU' },
            ],
          },
        ],
      },
      {
        title: 'D. NLP Foundations',
        topics: [
          {
            name: 'Text cleaning, tokenization types (word, char, BPE, SentencePiece)',
            difficulty: 'Beginner',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=zduSFxRajkE', label: 'Karpathy — Let\'s build the GPT Tokenizer' },
            ],
          },
          {
            name: 'TF-IDF, stemming, lemmatization, NER with spaCy',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Full NLP playlist', url: 'https://www.youtube.com/playlist?list=PLZoTAELRMXVMdJ5sqbCK2LiM0HhQVWNzm', label: 'Krish Naik — NLP Playlist' },
            ],
          },
          {
            name: 'Word2Vec (CBOW, Skip-gram), GloVe, cosine similarity',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=viZrOnJclY0', label: 'StatQuest — Word Embedding & Word2Vec' },
            ],
          },
          {
            name: 'BERT: MLM pretraining, fine-tuning for classification, NER, QA',
            difficulty: 'Advanced',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=-9vVhYEXeyQ', label: 'Yannic Kilcher — BERT paper explained' },
              { level: 'Hugging Face', url: 'https://www.youtube.com/watch?v=DQc2Mi7ZcS4', label: 'Sentdex — BERT fine-tuning' },
              { level: 'Full HF course', url: 'https://huggingface.co/learn/nlp-course/chapter1/1', label: 'Hugging Face NLP Course' },
            ],
          },
        ],
      },
    ],
    buildTasks: [
      { name: 'Implement a neural network from scratch using only NumPy (no PyTorch) and train on MNIST', hint: 'Start with a simple MLP, use cross-entropy loss' },
      { name: 'Train a CNN on CIFAR-10 with ResNet transfer learning; achieve >85% accuracy; deploy via Streamlit', hint: 'Use torchvision.models.resnet18 pretrained' },
      { name: 'Build a sentiment classifier using LSTM on IMDB dataset in PyTorch', hint: 'Use torchtext or custom DataLoader' },
      { name: 'Fine-tune BERT on a custom text classification dataset using Hugging Face; push to HF Hub', hint: 'Use transformers library Trainer API' },
    ],
  },
  {
    id: 'phase5',
    name: 'Transformers & Building LLMs',
    goal: 'Understand and implement the transformer architecture, build GPT from scratch, fine-tune open LLMs, and deploy a ChatGPT clone.',
    color: '#8b5cf6',
    estimatedTime: '~12–16 weeks',
    outcomes: [
      'Implement attention mechanisms from scratch',
      'Build a GPT model from scratch in PyTorch',
      'Fine-tune open LLMs with QLoRA',
      'Deploy a RAG-powered chatbot with FastAPI and Gradio',
    ],
    projects: [
      'Scaled dot-product attention from scratch',
      'GPT trained on Tiny Shakespeare',
      'BPE tokenizer from scratch',
      'Mistral-7B fine-tuned with QLoRA',
      'RAG chatbot over PDFs',
      'ChatGPT clone deployment',
    ],
    subsections: [
      {
        title: 'A. Attention Mechanism',
        topics: [
          {
            name: 'Bahdanau (additive) attention — intuition and math',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=quoGRI-1l0A', label: 'Karpathy — Attention explained intuitively' },
            ],
          },
          {
            name: 'Scaled dot-product attention: Q, K, V matrices; softmax(QK^T/√dk)V',
            difficulty: 'Advanced',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=eMlx5fFNoYc', label: '3Blue1Brown — Attention in Transformers' },
              { level: 'Paper', url: 'https://arxiv.org/abs/1706.03762', label: 'Attention Is All You Need — Vaswani et al. 2017' },
            ],
          },
          {
            name: 'Why attention beats recurrence for long sequences',
            difficulty: 'Intermediate',
            resources: [],
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
              { level: 'Video', url: 'https://www.youtube.com/watch?v=iDulhoQ2pro', label: 'Yannic Kilcher — Attention Is All You Need walkthrough' },
            ],
          },
          {
            name: 'Sinusoidal positional encoding; RoPE (used in Llama); ALiBi',
            difficulty: 'Advanced',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=dichIcUZfOw', label: 'Karpathy — Building GPT step by step' },
            ],
          },
          {
            name: 'Encoder stack: self-attention + FFN + LayerNorm + residuals',
            difficulty: 'Advanced',
            resources: [],
          },
          {
            name: 'Decoder stack: masked self-attention + cross-attention + FFN',
            difficulty: 'Advanced',
            resources: [],
          },
          {
            name: 'Encoder-only (BERT) vs Decoder-only (GPT) vs Seq2Seq (T5, BART)',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Resource', url: 'https://jalammar.github.io/illustrated-transformer/', label: 'Jay Alammar — The Illustrated Transformer' },
              { level: 'Full build', url: 'https://www.youtube.com/watch?v=kCc8FmEb1nY', label: 'Karpathy — Let\'s build GPT from scratch (ESSENTIAL)' },
            ],
          },
        ],
      },
      {
        title: 'C. Build LLMs Stage by Stage',
        topics: [
          {
            name: 'Stage 1 — Character-level language model (bigram → MLP → RNN baseline)',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=PaCmpygFfXo', label: 'Karpathy — makemore Part 1: bigrams' },
              { level: 'Dataset', url: 'https://raw.githubusercontent.com/karpathy/char-rnn/master/data/tinyshakespeare/input.txt', label: 'Tiny Shakespeare dataset' },
            ],
          },
          {
            name: 'Stage 2 — Build GPT from scratch in PyTorch (token embeddings + positional + transformer blocks + LM head)',
            difficulty: 'Advanced',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=kCc8FmEb1nY', label: 'Karpathy — Let\'s build GPT (2 hrs — WATCH ALL)' },
            ],
          },
          {
            name: 'Stage 3 — BPE Tokenizer from scratch + training pipeline (gradient accumulation, mixed precision, warmup)',
            difficulty: 'Advanced',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=zduSFxRajkE', label: 'Karpathy — Let\'s build the GPT Tokenizer' },
              { level: 'Series', url: 'https://www.youtube.com/watch?v=UU1WVnMk4E8', label: 'Sebastian Raschka — LLM from Scratch series' },
            ],
          },
          {
            name: 'Stage 4 — Fine-tune Open LLMs with LoRA/QLoRA (Llama 3 8B or Mistral 7B on Colab)',
            difficulty: 'Advanced',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=eC6Hd1hFvos', label: 'Maxime Labonne — Fine-tune Llama 3 with QLoRA' },
              { level: 'Explainer', url: 'https://www.youtube.com/watch?v=dA-NhCtrrVE', label: 'Tim Dettmers — QLoRA explained' },
            ],
          },
          {
            name: 'Stage 5 — RAG pipeline + LangChain Agents + ChatGPT clone deployment',
            difficulty: 'Advanced',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=tcqEUSNCn8I', label: 'Sam Witteveen — LangChain + RAG' },
              { level: 'Agents', url: 'https://www.youtube.com/watch?v=DWUdGhRrv2c', label: 'Data Independent — LangChain Agents' },
            ],
          },
        ],
      },
      {
        title: 'D. MLOps & Deployment',
        topics: [
          {
            name: 'Docker: Dockerfile, docker-compose, containerize ML app',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=3c-iBn73dDE', label: 'TechWorld with Nana — Docker Full Course' },
            ],
          },
          {
            name: 'FastAPI: REST endpoints for LLM inference, Pydantic, async',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Docs', url: 'https://fastapi.tiangolo.com/tutorial/', label: 'FastAPI Tutorial' },
              { level: 'Video', url: 'https://www.youtube.com/watch?v=0sOvCWFmrtA', label: 'freeCodeCamp — FastAPI' },
            ],
          },
          {
            name: 'Hugging Face Hub: push models, Spaces (deploy Gradio/Streamlit free)',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=2TqTEpg3aUk', label: 'HF — Deploy to Spaces' },
            ],
          },
          {
            name: 'AWS basics: EC2, S3, SageMaker',
            difficulty: 'Intermediate',
            resources: [
              { level: 'Video', url: 'https://www.youtube.com/watch?v=3hLmDS179YE', label: 'freeCodeCamp — AWS Practitioner full course' },
            ],
          },
        ],
      },
    ],
    buildTasks: [
      { name: 'Implement scaled dot-product attention from scratch in PyTorch and verify attention weights visually', hint: 'Use matplotlib to plot attention heatmap' },
      { name: 'Train a GPT model on the Tiny Shakespeare dataset following Karpathy\'s tutorial end-to-end', hint: 'Follow the full notebook step by step' },
      { name: 'Build a BPE tokenizer from scratch and tokenize a custom text corpus', hint: 'Implement merge rules, test on your own text' },
      { name: 'Fine-tune Mistral-7B or Llama-3-8B with QLoRA on Google Colab on a custom QA dataset; push to HF Hub', hint: 'Use bitsandbytes + peft library' },
      { name: 'Build a RAG chatbot over your own PDF documents using LangChain + FAISS', hint: 'Use LangChain document loaders and FAISS vector store' },
      { name: 'Deploy your personal ChatGPT clone: fine-tuned LLM + RAG + FastAPI backend + Gradio UI → Hugging Face Spaces', hint: 'Combine all previous build tasks into one system' },
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
