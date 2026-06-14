// ============================================
// GOALS TAB RENDERER
// ============================================

// Resume-worthy projects from Phases 0-7 (internship portfolio)
function getInternshipProjects() {
  return [
    // Phase 1 — Strong Python fundamentals
    { id: 'p1_proj2', name: 'Custom Data Structures (Hash Map, Heap, Graph)', phaseId: 1, skills: 'Python, DSA, OOP', level: 'Intermediate', emoji: '🏗️' },
    // Phase 2 — ML math foundations
    { id: 'p2_proj1', name: 'Micrograd — Autograd Engine from Scratch', phaseId: 2, skills: 'Python, Calculus, Backprop', level: 'Intermediate', emoji: '🧮' },
    // Phase 3 — Backend & systems
    { id: 'p3_proj3', name: 'Mini Database Engine with B-tree Index', phaseId: 3, skills: 'Python, Data Structures, Storage', level: 'Advanced', emoji: '🗄️' },
    { id: 'p3_proj4', name: 'HTTP Server from Raw Sockets', phaseId: 3, skills: 'Python, Networking, Concurrency', level: 'Internship', emoji: '🌐' },
    // Phase 4 — Frontend
    { id: 'p4_proj1', name: 'AI Chat Interface (React + Streaming)', phaseId: 4, skills: 'React, SSE, FastAPI', level: 'Intermediate', emoji: '💬' },
    // Phase 5 — Data Science
    { id: 'p5_proj2', name: 'Business Analytics Dashboard', phaseId: 5, skills: 'Pandas, Matplotlib, Jupyter', level: 'Intermediate', emoji: '📊' },
    // Phase 6 — ML
    { id: 'p6_proj2', name: 'Loan Default Prediction Pipeline', phaseId: 6, skills: 'Scikit-learn, EDA, Feature Eng', level: 'Intermediate', emoji: '🏦' },
    { id: 'p6_proj3', name: 'Credit Card Fraud Detection + SHAP', phaseId: 6, skills: 'ML, XGBoost, Explainability', level: 'Advanced', emoji: '🔍' },
    // Phase 7 — Deep Learning
    { id: 'p7_proj1', name: 'CNN Image Classifier on CIFAR-10', phaseId: 7, skills: 'PyTorch, CNNs, Transfer Learning', level: 'Intermediate', emoji: '🖼️' },
    { id: 'p7_proj3', name: 'Transfer Learning on Custom Dataset', phaseId: 7, skills: 'PyTorch, HuggingFace, Deployment', level: 'Internship', emoji: '🎯' },
  ];
}

function renderGoals() {
  const container = document.getElementById('tab-goals');
  if (!container) return;

  container.innerHTML = `
    <div class="section-title">Career Goals</div>

    <!-- Career Paths -->
    ${CAREER_PATHS.map(cp => `
      <div class="career-path">
        <div class="cp-header">
          <span class="cp-emoji">${icon(cp.icon)}</span>
          <div>
            <div class="cp-title">${cp.title}</div>
            <div style="font-size:11px;color:var(--text-muted);font-family:var(--font-mono);">${cp.target}</div>
          </div>
        </div>
        <div class="cp-desc">${cp.description}</div>
        <div class="cp-timeline">
          ${cp.steps.map(step => {
            const phaseData = PHASES.find(p => p.id === step.phase);
            const completion = getPhaseCompletion(step.phase);
            const isDone = completion === 100;
            return `
              <div class="cp-step ${isDone ? 'done' : ''}">
                <div class="step-title">${icon(phaseData ? phaseData.icon : 'target')} ${step.label}</div>
                <div class="step-desc">${completion}% complete</div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `).join('')}

    <!-- Internship Portfolio -->
    <div class="section-title" style="margin-top:20px;">Internship Portfolio (Phases 0–7)</div>
    <div class="career-path">
      <div style="font-size:12px;color:var(--text-muted);margin-bottom:12px;">These are your <strong>resume-worthy projects</strong> — the ones interviewers will ask about. Mark them as Done/Deployed to track your portfolio readiness.</div>
      ${getInternshipProjects().map(p => {
        const proj = ALL_PROJECTS.find(ap => ap.id === p.id);
        const status = proj ? proj.status : 'notstarted';
        const statusCls = status === 'done' || status === 'deployed' ? 'status-done' : status === 'inprogress' ? 'status-progress' : 'status-active';
        const statusLabel = status === 'deployed' ? 'Deployed' : status === 'done' ? 'Done' : status === 'inprogress' ? 'In Progress' : 'To Do';
        const stars = p.level === 'Beginner' ? '⭐' : p.level === 'Intermediate' ? '⭐⭐' : '⭐⭐⭐';
        return `<div style="display:flex;align-items:center;gap:10px;padding:10px 12px;border-bottom:1px solid var(--border);">
          <div style="font-size:16px;">${p.emoji}</div>
          <div style="flex:1;">
            <div style="font-size:13px;font-weight:600;">${p.name}</div>
            <div style="font-size:11px;color:var(--text-muted);">Phase ${p.phaseId} · ${p.skills} · ${stars} ${p.level}</div>
          </div>
          <span class="ph-status ${statusCls}" style="font-size:10px;">${statusLabel}</span>
        </div>`;
      }).join('')}
      <div style="padding:10px 12px;background:var(--bg);border-radius:0 0 var(--radius) var(--radius);font-size:11px;color:var(--text-muted);">
        <strong>Tip:</strong> Deploy 3+ projects to GitHub Pages / HuggingFace Spaces before applying. Interviewers check live demos.
      </div>
    </div>

    <!-- Priority Goals -->
    <div class="section-title" style="margin-top:20px;">Priority Goals</div>
    <div class="career-path">
      <div class="cp-header">
        <span class="cp-emoji">${icon('cog')}</span>
        <div class="cp-title">Priority 1: Build Personal AI Assistant (v0 → v12)</div>
      </div>
      <div style="font-size:12px;color:var(--text-muted);margin:4px 0 8px;">Evolve from CLI chatbot → RAG agent → production-grade AI. One project thread across all 20 phases.</div>
      <div class="meter-group" style="margin-top:8px;">
        ${renderMeter('Personal AI Progress', calculatePersonalAIProgress())}
      </div>
    </div>
    <div class="career-path">
      <div class="cp-header">
        <span class="cp-emoji">${icon('briefcase')}</span>
        <div class="cp-title">Priority 2: Paid Internship Before 3rd Year</div>
      </div>
      <div class="meter-group" style="margin-top:8px;">
        ${renderMeter('Internship Readiness', calculateReadiness().internship)}
      </div>
    </div>
    <div class="career-path">
      <div class="cp-header">
        <span class="cp-emoji">${icon('building')}</span>
        <div class="cp-title">Priority 3: Placement-Ready by Semester 7</div>
      </div>
      <div class="meter-group" style="margin-top:8px;">
        ${renderMeter('Placement Readiness', calculateReadiness().placement)}
      </div>
    </div>
    <div class="career-path">
      <div class="cp-header">
        <span class="cp-emoji">${icon('brain')}</span>
        <div class="cp-title">Priority 4: Become AI Engineer</div>
      </div>
      <div class="meter-group" style="margin-top:8px;">
        ${renderMeter('AI Engineer Readiness', calculateReadiness().aiEngineer)}
      </div>
    </div>

    <!-- Study Timeline -->
    <div class="section-title" style="margin-top:20px;">Study Timeline</div>
    <div class="career-path">
      <div class="cp-timeline">
        <div class="cp-step done">
          <div class="step-title">Semester 1-2 (Current)</div>
          <div class="step-desc">Phase 0–3: Foundations, Programming, Math, Software Eng</div>
        </div>
        <div class="cp-step">
          <div class="step-title">Semester 3 (Summer) ⭐</div>
          <div class="step-desc">Phase 4–7: Frontend, Data Science, ML, Deep Learning → Internship Ready!</div>
        </div>
        <div class="cp-step">
          <div class="step-title">Semester 4</div>
          <div class="step-desc">Phase 8–11: NLP, Transformers, Build GPT, LLM Eng → Placement Ready</div>
        </div>
        <div class="cp-step">
          <div class="step-title">Semester 5</div>
          <div class="step-desc">Phase 12–14: RAG, Backend, MLOps → Full AI Stack</div>
        </div>
        <div class="cp-step">
          <div class="step-title">Semester 6</div>
          <div class="step-desc">Phase 15–18: Prompt Eng, CV, System Design, Cloud → Specialist</div>
        </div>
        <div class="cp-step">
          <div class="step-title">Semester 7-8</div>
          <div class="step-desc">Phase 19: Soft Skills + Final portfolio & placement prep</div>
        </div>
      </div>
    </div>

    <!-- Study Habits -->
    <div class="section-title" style="margin-top:20px;">Study Habits</div>
    <div class="career-path">
      <div class="topic-row"><div class="topic-info">          <div class="topic-name">Daily Study Time: 4-5 hours outside college</div></div></div>
      <div class="topic-row"><div class="topic-info">          <div class="topic-name">Hardware: RTX 3050 — local GPU training</div></div></div>
      <div class="topic-row"><div class="topic-info">          <div class="topic-name">Focus: AI, LLMs, AI Products, Software Engineering</div></div></div>
      <div class="topic-row"><div class="topic-info">          <div class="topic-name">CGPA Target: 7.5+ → 8+</div></div></div>
    </div>
  `;
}

// renderMeter is defined in state.js as a shared utility
