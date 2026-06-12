// ============================================
// GOALS TAB RENDERER
// ============================================

function renderGoals() {
  const container = document.getElementById('tab-goals');
  if (!container) return;

  container.innerHTML = `
    <div class="section-title">🎯 Career Goals</div>

    <!-- Career Paths -->
    ${CAREER_PATHS.map(cp => `
      <div class="career-path">
        <div class="cp-header">
          <span class="cp-emoji">${cp.emoji}</span>
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
                <div class="step-title">${phaseData?.emoji || '📌'} ${step.label}</div>
                <div class="step-desc">${completion}% complete</div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `).join('')}

    <!-- Priority Goals -->
    <div class="section-title" style="margin-top:20px;">🏆 Priority Goals</div>
    <div class="career-path">
      <div class="cp-header">
        <span class="cp-emoji">🤖</span>
        <div class="cp-title">Priority 1: Build Personal AI Assistant (v0 → v12)</div>
      </div>
      <div style="font-size:12px;color:var(--text-muted);margin:4px 0 8px;">Evolve from CLI chatbot → RAG agent → production-grade AI. One project thread across all 15 phases.</div>
      <div class="meter-group" style="margin-top:8px;">
        ${renderMeter('Personal AI Progress', calculatePersonalAIProgress())}
      </div>
    </div>
    <div class="career-path">
      <div class="cp-header">
        <span class="cp-emoji">💼</span>
        <div class="cp-title">Priority 2: Paid Internship Before 3rd Year</div>
      </div>
      <div class="meter-group" style="margin-top:8px;">
        ${renderMeter('Internship Readiness', calculateReadiness().internship)}
      </div>
    </div>
    <div class="career-path">
      <div class="cp-header">
        <span class="cp-emoji">🏢</span>
        <div class="cp-title">Priority 3: Placement-Ready by Semester 7</div>
      </div>
      <div class="meter-group" style="margin-top:8px;">
        ${renderMeter('Placement Readiness', calculateReadiness().placement)}
      </div>
    </div>
    <div class="career-path">
      <div class="cp-header">
        <span class="cp-emoji">🤖</span>
        <div class="cp-title">Priority 4: Become AI Engineer</div>
      </div>
      <div class="meter-group" style="margin-top:8px;">
        ${renderMeter('AI Engineer Readiness', calculateReadiness().aiEngineer)}
      </div>
    </div>

    <!-- Study Timeline -->
    <div class="section-title" style="margin-top:20px;">📅 Study Timeline</div>
    <div class="career-path">
      <div class="cp-timeline">
        <div class="cp-step done">
          <div class="step-title">Semester 1-2 (Current)</div>
          <div class="step-desc">Phase 0–3: Foundations, Programming, Math, Software Eng</div>
        </div>
        <div class="cp-step">
          <div class="step-title">Semester 3 (Summer)</div>
          <div class="step-desc">Phase 4–6: Frontend, Data Science, ML</div>
        </div>
        <div class="cp-step">
          <div class="step-title">Semester 4</div>
          <div class="step-desc">Phase 7–9: Deep Learning, NLP, Transformers</div>
        </div>
        <div class="cp-step">
          <div class="step-title">Semester 5</div>
          <div class="step-desc">Phase 10–12: Build GPT, LLM Eng, RAG</div>
        </div>
        <div class="cp-step">
          <div class="step-title">Semester 6-7</div>
          <div class="step-desc">Phase 13–14: Backend, MLOps + Internship</div>
        </div>
        <div class="cp-step">
          <div class="step-title">Semester 8</div>
          <div class="step-desc">Placement preparation & final portfolio</div>
        </div>
      </div>
    </div>

    <!-- Study Habits -->
    <div class="section-title" style="margin-top:20px;">⏰ Study Habits</div>
    <div class="career-path">
      <div class="topic-row"><div class="topic-info"><div class="topic-name">📚 Daily Study Time: 4-5 hours outside college</div></div></div>
      <div class="topic-row"><div class="topic-info"><div class="topic-name">💻 Hardware: RTX 3050 — local GPU training</div></div></div>
      <div class="topic-row"><div class="topic-info"><div class="topic-name">🎯 Focus: AI, LLMs, AI Products, Software Engineering</div></div></div>
      <div class="topic-row"><div class="topic-info"><div class="topic-name">📊 CGPA Target: 7.5+ → 8+</div></div></div>
    </div>
  `;
}

// renderMeter is defined in state.js as a shared utility
