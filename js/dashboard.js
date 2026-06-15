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

  // ── INTERNSHIP TRACKER (Phases 0-7) ──
  var internPhases = [0,1,2,3,4,5,6,7];
  var internDone = internPhases.filter(function(pid) { return getPhaseCompletion(pid) === 100; }).length;
  var internActive = null;
  for (var ip = 0; ip < internPhases.length; ip++) {
    var ips = getPhaseStatus(internPhases[ip]);
    if (ips === 'active' || ips === 'inprogress') { internActive = internPhases[ip]; break; }
  }
  var internPct = Math.round((internDone / internPhases.length) * 100);
  var internCirc = 2 * Math.PI * 36;
  var internOff = internCirc * (1 - internPct / 100);
  html += '<div class="dash-section">';
  html += '<div class="dash-section-header"><span class="dash-section-icon">' + icon('briefcase') + '</span><span class="dash-section-title">Internship Tracker</span>';
  html += '<span class="dash-section-badge">' + internDone + '/8 Phases</span></div>';
  html += '<div class="dash-section-body">';
  html += '<div style="display:flex;gap:16px;align-items:center;flex-wrap:wrap;">';
  html += '<div style="position:relative;width:80px;height:80px;flex-shrink:0;"><svg viewBox="0 0 80 80"><circle cx="40" cy="40" r="36" fill="none" stroke="var(--border)" stroke-width="5" /><circle cx="40" cy="40" r="36" fill="none" stroke="var(--accent)" stroke-width="5" stroke-dasharray="' + internCirc + '" stroke-dashoffset="' + internOff + '" transform="rotate(-90 40 40)" /></svg><div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;flex-direction:column;"><div style="font-size:16px;font-weight:700;color:var(--text);">' + internPct + '%</div><div style="font-size:9px;color:var(--text-muted);">Ready</div></div></div>';
  html += '<div style="flex:1;min-width:200px;">';
  internPhases.forEach(function(pid) {
    var phase = PHASES.find(function(p) { return p.id === pid; });
    if (!phase) return;
    var comp = getPhaseCompletion(pid);
    var st = getPhaseStatus(pid);
    var isDone = comp === 100;
    var isActive = st === 'active' || st === 'inprogress';
    var dotColor = isDone ? 'var(--green)' : isActive ? 'var(--accent)' : 'var(--text-muted)';
    var dotIcon = isDone ? icon('star') : (isActive ? icon(phase.icon) : icon('lock'));
    var barColor = isDone ? 'var(--green)' : isActive ? 'var(--accent)' : 'var(--border)';
    html += '<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;cursor:pointer;" onclick="switchTab(\'roadmap\');expandedPhase=' + pid + ';renderRoadmap();">';
    html += '<span style="font-size:12px;color:' + dotColor + ';width:16px;text-align:center;">' + dotIcon + '</span>';
    html += '<span style="font-size:11px;font-family:var(--font-mono);color:' + (isDone ? 'var(--green)' : isActive ? 'var(--accent)' : 'var(--text-muted)') + ';min-width:90px;">P' + pid + ' ' + phase.title + '</span>';
    html += '<div style="flex:1;height:4px;background:var(--border);border-radius:2px;overflow:hidden;"><div style="height:100%;width:' + comp + '%;background:' + barColor + ';border-radius:2px;transition:width 0.5s;"></div></div>';
    html += '<span style="font-size:10px;font-family:var(--font-mono);color:' + (isDone ? 'var(--green)' : isActive ? 'var(--accent)' : 'var(--text-muted)') + ';min-width:32px;text-align:right;">' + comp + '%</span>';
    html += '</div>';
  });
  html += '</div></div>';
  if (internDone < 8) {
    var remaining = internPhases.length - internDone;
    var nextPhase = internActive !== null ? internActive : internPhases.find(function(pid) { return getPhaseCompletion(pid) < 100; });
    var nextPhaseName = nextPhase !== undefined ? (PHASES.find(function(p) { return p.id === nextPhase; }) || {}).title : '';
    html += '<div style="margin-top:10px;padding:8px 12px;background:var(--bg);border-radius:var(--radius);border:1px solid var(--border);font-size:12px;color:var(--text-muted);">';
    html += icon('target') + ' <strong>' + remaining + ' phase' + (remaining > 1 ? 's' : '') + ' left</strong>';
    if (nextPhaseName) html += ' — Focus on <strong style="color:var(--accent);">Phase ' + nextPhase + ': ' + nextPhaseName + '</strong>';
    html += '</div>';
  } else {
    html += '<div style="margin-top:10px;padding:10px 12px;background:var(--green-dim);border-radius:var(--radius);border:1px solid var(--green);font-size:12px;color:var(--green);">' + icon('star') + ' <strong>Internship Ready!</strong> All 8 core phases complete. Start applying for AI/ML internships.</div>';
  }
  html += '</div></div>';

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
