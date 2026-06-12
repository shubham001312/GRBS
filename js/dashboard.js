// ============================================
// DASHBOARD TAB RENDERER
// ============================================

function renderDashboard() {
  const container = document.getElementById('tab-dashboard');
  if (!container) return;

  const overall = getOverallCompletion();
  const readiness = calculateReadiness();
  const topicsDone = getTopicsCompleted();
  const totalTopics = getTotalTopics();
  const projectsDone = ALL_PROJECTS.filter(p => p.status === 'done' || p.status === 'deployed').length;
  const totalProjects = ALL_PROJECTS.length;

  // Get current active phase
  let activePhase = null;
  for (const phase of PHASES) {
    const status = getPhaseStatus(phase.id);
    if (status === 'active' || status === 'inprogress') {
      activePhase = phase;
      break;
    }
  }

  // Get today's focus topics (next 3 incomplete)
  const focusTopics = [];
  if (activePhase) {
    const stateData = appState.phases.find(p => p.id === activePhase.id);
    for (const topic of activePhase.topics) {
      if (!stateData?.topicsDone[topic.id]) {
        focusTopics.push({ ...topic, phaseId: activePhase.id });
        if (focusTopics.length >= 3) break;
      }
    }
  }

  container.innerHTML = `
    <!-- Greeting -->
    <div class="text-center mb-20">
      <h2 style="font-size:22px;margin-bottom:4px;">${getGreeting()}, ${getUsername() || 'Shubham'}! 👋</h2>
      <p class="text-muted">${formatDate()}</p>
    </div>

    <!-- Overall Ring -->
    <div class="progress-ring-wrap" style="margin-bottom:20px;">
      <svg viewBox="0 0 140 140">
        <circle class="ring-bg" cx="70" cy="70" r="62" />
        <circle class="ring-fill" cx="70" cy="70" r="62"
          stroke-dasharray="${2 * Math.PI * 62}"
          stroke-dashoffset="${2 * Math.PI * 62 * (1 - overall / 100)}" />
      </svg>
      <div class="ring-text">
        <div class="pct">${overall}%</div>
        <div class="label">Overall</div>
      </div>
    </div>

    <!-- Stats Row -->
    <div class="stats-row">
      <div class="stat-chip">
        <div class="stat-val">${topicsDone}/${totalTopics}</div>
        <div class="stat-lbl">Topics</div>
      </div>
      <div class="stat-chip">
        <div class="stat-val">${projectsDone}/${totalProjects}</div>
        <div class="stat-lbl">Projects</div>
      </div>
      <div class="stat-chip">
        <div class="stat-val">🔥 ${appState.streak}</div>
        <div class="stat-lbl">Day Streak</div>
      </div>
    </div>

    <!-- Readiness Meters -->
    <div class="section-title">📈 Readiness Scores</div>
    <div class="meter-group">
      ${renderMeter('Internship Readiness', readiness.internship)}
      ${renderMeter('Placement Readiness', readiness.placement)}
      ${renderMeter('AI Engineer Readiness', readiness.aiEngineer)}
      ${renderMeter('LLM Engineer Readiness', readiness.llmEngineer)}
      ${renderMeter('GPT Builder Readiness', readiness.gptBuilder)}
      ${renderMeter('Interview Readiness', readiness.interview)}
      ${renderMeter('Project Portfolio', readiness.projectPortfolio)}
    </div>

    <!-- Today's Focus -->
    ${focusTopics.length > 0 ? `
    <div class="focus-panel">
      <div class="focus-title">🎯 Today's Focus — Phase ${activePhase.id}</div>
      ${focusTopics.map(t => `
        <div class="focus-item">
          <span class="fi-name">${t.title}</span>
          <button class="fi-btn" onclick="markTopicDone(${t.phaseId},'${t.id}')">Mark Done</button>
        </div>
      `).join('')}
    </div>` : ''}

    <!-- Weekly Digest -->
    <div class="section-title">📋 Weekly Digest</div>
    <div id="weekly-digest"></div>

    <!-- AI Assistant Timeline -->
    <div class="section-title">🤖 AI Assistant Evolution</div>
    <div id="ai-timeline"></div>

    <!-- Recent Notes -->
    <div class="section-title">📝 Recent Notes</div>
    <div id="recent-notes"></div>

    <!-- Cloud Sync -->
    <div class="section-title">☁️ Cloud Sync</div>
    <div id="gist-sync-section"></div>

    <!-- Export / Import -->
    <div class="section-title">⚙️ Data</div>
    <div class="toolbar">
      <button onclick="exportData()">📥 Export JSON</button>
      <button onclick="document.getElementById('import-file').click()">📤 Import JSON</button>
      <input type="file" id="import-file" accept=".json" style="display:none" onchange="importData(event)">
    </div>
  `;

  // Render async sections after DOM
  setTimeout(() => {
    renderWeeklyDigest('weekly-digest');
    renderAITimeline('ai-timeline');
    renderRecentNotes('recent-notes', 5);
    gistSyncSetup();
  }, 100);
}

// renderMeter is defined in state.js as a shared utility
