// ============================================
// DASHBOARD TAB RENDERER - Reorganized with grouped sections
// ============================================

function renderDashboard() {
  var container = document.getElementById('tab-dashboard');
  if (!container) return;

  var overall = getOverallCompletion();
  var readiness = calculateReadiness();
  var topicsDone = getTopicsCompleted();
  var totalTopics = getTotalTopics();
  var projectsDone = ALL_PROJECTS.filter(function(p) { return p.status === 'done' || p.status === 'deployed'; }).length;
  var totalProjects = ALL_PROJECTS.length;

  var activePhase = null;
  for (var i = 0; i < PHASES.length; i++) {
    var status = getPhaseStatus(PHASES[i].id);
    if (status === 'active' || status === 'inprogress') { activePhase = PHASES[i]; break; }
  }

  var focusTopics = [];
  if (activePhase) {
    var stateData = appState.phases.find(function(p) { return p.id === activePhase.id; });
    for (var j = 0; j < activePhase.topics.length; j++) {
      if (!stateData || !stateData.topicsDone[activePhase.topics[j].id]) {
        focusTopics.push(activePhase.topics[j]);
        focusTopics[focusTopics.length - 1].phaseId = activePhase.id;
        if (focusTopics.length >= 3) break;
      }
    }
  }

  // ── HERO SECTION (Greeting + Ring + Stats) ──
  var html = '<div class="dash-hero">';
  html += '<div class="dash-greeting"><h2>' + getGreeting() + ', ' + (getUsername() || 'Shubham') + '!</h2><p class="text-muted">' + formatDate() + '</p></div>';
  html += '<div class="dash-hero-row">';
  html += '<div class="progress-ring-wrap"><svg viewBox="0 0 140 140"><circle class="ring-bg" cx="70" cy="70" r="62" /><circle class="ring-fill" cx="70" cy="70" r="62" stroke-dasharray="' + (2 * Math.PI * 62) + '" stroke-dashoffset="' + (2 * Math.PI * 62 * (1 - overall / 100)) + '" /></svg><div class="ring-text"><div class="pct">' + overall + '%</div><div class="label">Overall</div></div></div>';
  html += '<div class="dash-stats-col">';
  html += '<div class="stat-chip-sm"><div class="stat-val">' + topicsDone + '/' + totalTopics + '</div><div class="stat-lbl">Topics</div></div>';
  html += '<div class="stat-chip-sm"><div class="stat-val">' + projectsDone + '/' + totalProjects + '</div><div class="stat-lbl">Projects</div></div>';
  html += '<div class="stat-chip-sm"><div class="stat-val">' + icon('flame') + ' ' + appState.streak + '</div><div class="stat-lbl">Streak</div></div>';
  html += '</div>';
  html += '</div></div>';

  // ── TIMER SECTION ──
  html += '<div id="timer-button-container"></div>';

  // ── TODAY'S FOCUS ──
  if (focusTopics.length > 0) {
    html += '<div class="dash-section">';
    html += '<div class="dash-section-header"><span class="dash-section-icon">' + icon('target') + '</span><span class="dash-section-title">Today\'s Focus</span><span class="dash-section-badge">Phase ' + activePhase.id + '</span></div>';
    html += '<div class="dash-section-body">';
    html += focusTopics.map(function(t) { return '<div class="focus-item"><span class="fi-name">' + t.title + '</span><button class="fi-btn" onclick="markTopicDone(' + t.phaseId + ',\'' + t.id + '\')">Mark Done</button></div>'; }).join('');
    html += '</div></div>';
  }

  // ── READINESS SECTION ──
  html += '<div class="dash-section">';
  html += '<div class="dash-section-header"><span class="dash-section-icon">' + icon('chart') + '</span><span class="dash-section-title">Readiness Scores</span></div>';
  html += '<div class="dash-section-body">';
  html += '<div class="readiness-grid">';
  html += '<div class="readiness-item">' + renderMeter('Internship', readiness.internship) + '</div>';
  html += '<div class="readiness-item">' + renderMeter('Placement', readiness.placement) + '</div>';
  html += '<div class="readiness-item">' + renderMeter('AI Engineer', readiness.aiEngineer) + '</div>';
  html += '<div class="readiness-item">' + renderMeter('LLM Engineer', readiness.llmEngineer) + '</div>';
  html += '<div class="readiness-item">' + renderMeter('GPT Builder', readiness.gptBuilder) + '</div>';
  html += '<div class="readiness-item">' + renderMeter('Interview', readiness.interview) + '</div>';
  html += '<div class="readiness-item">' + renderMeter('Portfolio', readiness.projectPortfolio) + '</div>';
  html += '</div></div></div>';

  // ── INSIGHTS SECTION (Recommendations + Difficulty + Est. Completion) ──
  html += '<div class="dash-section">';
  html += '<div class="dash-section-header"><span class="dash-section-icon">' + icon('brain') + '</span><span class="dash-section-title">Insights</span></div>';
  html += '<div class="dash-section-body">';
  html += '<div id="smart-recs" class="dash-insight-block"></div>';
  html += '<div id="difficulty-pred" class="dash-insight-block"></div>';
  html += '<div id="estimated-completion" class="dash-insight-block"></div>';
  html += '</div></div>';

  // ── ACHIEVEMENTS & ACTIVITY SECTION ──
  html += '<div class="dash-section">';
  html += '<div class="dash-section-header"><span class="dash-section-icon">' + icon('medal') + '</span><span class="dash-section-title">Achievements & Activity</span></div>';
  html += '<div class="dash-section-body">';
  html += '<div id="achievements-section"></div>';
  html += '<div id="weekly-digest"></div>';
  html += '</div></div>';

  // ── NOTES & SYNC SECTION ──
  html += '<div class="dash-section">';
  html += '<div class="dash-section-header"><span class="dash-section-icon">' + icon('note') + '</span><span class="dash-section-title">Notes & Sync</span></div>';
  html += '<div class="dash-section-body">';
  html += '<div id="recent-notes"></div>';
  html += '<div id="gist-sync-section"></div>';
  html += '</div></div>';

  // ── AI & DATA SECTION ──
  html += '<div class="dash-section">';
  html += '<div class="dash-section-header"><span class="dash-section-icon">' + icon('cog') + '</span><span class="dash-section-title">AI & Data</span></div>';
  html += '<div class="dash-section-body">';
  html += '<div id="ai-timeline"></div>';
  html += '<div class="dash-data-tools">';
  html += '<button onclick="exportData()" class="dash-data-btn">' + icon('cloud') + ' Export JSON</button>';
  html += '<button onclick="document.getElementById(\'import-file\').click()" class="dash-data-btn">' + icon('settings') + ' Import JSON</button>';
  html += '<input type="file" id="import-file" accept=".json" style="display:none" onchange="importData(event)">';
  html += '</div>';
  html += '</div></div>';

  container.innerHTML = html;

  // Render sub-modules after DOM is ready
  setTimeout(function() {
    renderSmartRecommendations('smart-recs');
    renderDifficultyPredictor('difficulty-pred');
    renderEstimatedCompletion('estimated-completion');
    renderAchievements('achievements-section', 8);
    if (typeof renderWeeklyDigest === 'function') renderWeeklyDigest('weekly-digest');
    if (typeof renderRecentNotes === 'function') renderRecentNotes('recent-notes', 5);
    if (typeof gistSyncSetup === 'function') gistSyncSetup();
    if (typeof StudyTimer !== 'undefined') StudyTimer.renderTimerButton('timer-button-container');
    checkAchievements();
  }, 100);
}
