// Smart Recommendations
function getSmartRecommendations() {
  var recs = [];
  var phases = PHASES;
  var state = appState;

  // Find current active phase
  for (var i = 0; i < phases.length; i++) {
    var phase = phases[i];
    var status = getPhaseStatus(phase.id);
    if (status === 'active' || status === 'inprogress') {
      var stateData = state.phases.find(function(p) { return p.id === phase.id; });
      var incompleteTopics = phase.topics.filter(function(t) { return !stateData || !stateData.topicsDone[t.id]; });
      if (incompleteTopics.length > 0) {
        var next = incompleteTopics[0];
        recs.push({ icon: phase.emoji, title: 'Continue ' + phase.title, detail: 'Next: ' + next.title + ' (' + (next.hours || 4) + 'h)', priority: 'high', action: 'switchTab("roadmap");expandedPhase=' + phase.id + ';renderRoadmap();' });
        break;
      }
    }
  }

  // Suggest resources for active phases
  for (var i = 0; i < phases.length; i++) {
    var phase = phases[i];
    var status = getPhaseStatus(phase.id);
    if (status === 'active' || status === 'inprogress') {
      var stateData = state.phases.find(function(p) { return p.id === phase.id; });
      var doneCount = stateData ? Object.values(stateData.topicsDone).filter(function(v) { return v === true; }).length : 0;
      if (doneCount > 0 && doneCount < phase.topics.length) {
        var pct = Math.round((doneCount / phase.topics.length) * 100);
        recs.push({ icon: '💡', title: 'Rate resources for Phase ' + phase.id, detail: pct + '% complete - rate the resources you used', priority: 'low', action: 'switchTab("roadmap");expandedPhase=' + phase.id + ';renderRoadmap();' });
        break;
      }
    }
  }

  // Streak motivation
  if (state.streak >= 7) {
    recs.push({ icon: '🔥', title: 'Amazing ' + state.streak + '-day streak!', detail: 'Keep it up - consistency is key', priority: 'medium', action: '' });
  } else if (state.streak === 0) {
    recs.push({ icon: '⚠️', title: 'Start a streak today', detail: 'Complete at least one topic to begin', priority: 'high', action: 'switchTab("dashboard");' });
  }

  // Project suggestions
  var projectsDone = ALL_PROJECTS.filter(function(p) { return p.status === 'done' || p.status === 'deployed'; }).length;
  if (projectsDone < 5) {
    for (var i = 0; i < phases.length; i++) {
      var phase = phases[i];
      var status = getPhaseStatus(phase.id);
      if (status === 'active' || status === 'inprogress') {
        var proj = phase.projects[0];
        if (proj) {
          var projData = ALL_PROJECTS.find(function(p) { return p.id === proj.id; });
          if (projData && projData.status === 'notstarted') {
            recs.push({ icon: '🔨', title: 'Start a project', detail: proj.name, priority: 'medium', action: 'switchTab("projects");' });
            break;
          }
        }
      }
    }
  }

  return recs;
}

function renderSmartRecommendations(containerId) {
  var container = document.getElementById(containerId);
  if (!container) return;
  var recs = getSmartRecommendations();
  if (recs.length === 0) { container.innerHTML = '<p style="font-size:12px;color:var(--text-muted);padding:8px 0;">No recommendations right now. Keep going!</p>'; return; }
  container.innerHTML = '<div class="career-path"><h3 style="font-family:var(--font-heading);font-size:16px;margin-bottom:8px;">Smart Recommendations</h3>' +
  recs.map(function(r) {
    return '<div style="display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid var(--border);">' +
    '<span style="font-size:18px;">' + r.icon + '</span>' +
    '<div style="flex:1;"><div style="font-size:13px;font-weight:600;">' + r.title + '</div>' +
    '<div style="font-size:11px;color:var(--text-muted);">' + r.detail + '</div></div>' +
    (r.action ? '<button onclick="' + r.action + '" style="padding:4px 10px;border-radius:6px;font-size:11px;background:var(--accent);color:white;border:none;cursor:pointer;">Go</button>' : '') +
    '</div>';
  }).join('') + '</div>';
}
