// ============================================
// DASHBOARD TAB RENDERER - Enhanced with all new features
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

  container.innerHTML = '<div class="text-center mb-20"><h2 style="font-size:22px;margin-bottom:4px;">' + getGreeting() + ', ' + (getUsername() || 'Shubham') + '! 👋</h2><p class="text-muted">' + formatDate() + '</p></div>';

  container.innerHTML += '<div class="progress-ring-wrap" style="margin-bottom:20px;"><svg viewBox="0 0 140 140"><circle class="ring-bg" cx="70" cy="70" r="62" /><circle class="ring-fill" cx="70" cy="70" r="62" stroke-dasharray="' + (2 * Math.PI * 62) + '" stroke-dashoffset="' + (2 * Math.PI * 62 * (1 - overall / 100)) + '" /></svg><div class="ring-text"><div class="pct">' + overall + '%</div><div class="label">Overall</div></div></div>';

  container.innerHTML += '<div class="stats-row"><div class="stat-chip"><div class="stat-val">' + topicsDone + '/' + totalTopics + '</div><div class="stat-lbl">Topics</div></div><div class="stat-chip"><div class="stat-val">' + projectsDone + '/' + totalProjects + '</div><div class="stat-lbl">Projects</div></div><div class="stat-chip"><div class="stat-val">🔥 ' + appState.streak + '</div><div class="stat-lbl">Day Streak</div></div></div>';

  container.innerHTML += '<div class="section-title">Readiness Scores</div><div class="meter-group">' + renderMeter('Internship Readiness', readiness.internship) + renderMeter('Placement Readiness', readiness.placement) + renderMeter('AI Engineer Readiness', readiness.aiEngineer) + renderMeter('LLM Engineer Readiness', readiness.llmEngineer) + renderMeter('GPT Builder Readiness', readiness.gptBuilder) + renderMeter('Interview Readiness', readiness.interview) + renderMeter('Project Portfolio', readiness.projectPortfolio) + '</div>';

  if (focusTopics.length > 0) {
    container.innerHTML += '<div class="focus-panel"><div class="focus-title">Today\'s Focus - Phase ' + activePhase.id + '</div>' + focusTopics.map(function(t) { return '<div class="focus-item"><span class="fi-name">' + t.title + '</span><button class="fi-btn" onclick="markTopicDone(' + t.phaseId + ',\'' + t.id + '\')">Mark Done</button></div>'; }).join('') + '</div>';
  }

  container.innerHTML += '<div class="section-title">Estimated Completion</div><div id="estimated-completion"></div>';
  container.innerHTML += '<div class="section-title">Smart Recommendations</div><div id="smart-recs"></div>';
  container.innerHTML += '<div class="section-title">📐 Difficulty Predictor</div><div id="difficulty-pred"></div>';
  container.innerHTML += '<div class="section-title">Achievements</div><div id="achievements-section"></div>';
  container.innerHTML += '<div class="section-title">📋 Weekly Digest</div><div id="weekly-digest"></div>';
  container.innerHTML += '<div class="section-title">AI Assistant Evolution</div><div id="ai-timeline"></div>';
  container.innerHTML += '<div class="section-title">Recent Notes</div><div id="recent-notes"></div>';
  container.innerHTML += '<div class="section-title">Cloud Sync</div><div id="gist-sync-section"></div>';
  container.innerHTML += '<div class="section-title">Data</div><div class="toolbar"><button onclick="exportData()">Export JSON</button><button onclick="document.getElementById(\"import-file\").click()">Import JSON</button><input type="file" id="import-file" accept=".json" style="display:none" onchange="importData(event)"></div>';

  setTimeout(function() {
    renderEstimatedCompletion('estimated-completion');
    renderSmartRecommendations('smart-recs');
    renderDifficultyPredictor('difficulty-pred');
    renderAchievements('achievements-section', 8);
    if (typeof renderWeeklyDigest === 'function') renderWeeklyDigest('weekly-digest');
    if (typeof renderAITimeline === 'function') renderAITimeline('ai-timeline');
    if (typeof renderRecentNotes === 'function') renderRecentNotes('recent-notes', 5);
    if (typeof gistSyncSetup === 'function') gistSyncSetup();
    checkAchievements();
  }, 100);
}
