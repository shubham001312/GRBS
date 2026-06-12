// ============================================
// SMART RECOMMENDATIONS - Study Suggestions
// ============================================

function getSmartRecommendations() {
  var recs = [];
  for (var i = 0; i < PHASES.length; i++) {
    var phase = PHASES[i];
    var status = getPhaseStatus(phase.id);
    if (status === 'active' || status === 'inprogress') {
      var stateData = appState.phases.find(function(p) { return p.id === phase.id; });
      var incompleteTopics = phase.topics.filter(function(t) { return !stateData || !stateData.topicsDone[t.id]; });
      if (incompleteTopics.length > 0) {
        var next = incompleteTopics[0];
        var totalHrs = 0;
        incompleteTopics.forEach(function(t) { totalHrs += (t.hours || 4); });
        recs.push({ icon: phase.emoji, title: 'Continue ' + phase.title, detail: 'Next: \"' + next.title + '\" (' + (next.hours || 4) + 'h) - ' + incompleteTopics.length + ' topics remaining (~' + totalHrs + 'h)', priority: 'high', action: "switchTab('roadmap');setTimeout(function(){expandedPhase=" + phase.id + ";renderRoadmap();},100);", timeEstimate: (next.hours || 4) + 'h' });
        break;
      }
    }
  }
  for (var i = 0; i < PHASES.length; i++) {
    var phase = PHASES[i];
    var completion = getPhaseCompletion(phase.id);
    if (completion >= 60 && completion < 100) {
      var stateData = appState.phases.find(function(p) { return p.id === phase.id; });
      var incomplete = phase.topics.filter(function(t) { return !stateData || !stateData.topicsDone[t.id]; });
      if (incomplete.length <= 3 && incomplete.length > 0) {
        var hrs = 0;
        incomplete.forEach(function(t) { hrs += (t.hours || 4); });
        recs.push({ icon: '🎯', title: 'Finish Phase ' + phase.id + ': ' + phase.title, detail: incomplete.length + ' topic' + (incomplete.length > 1 ? 's' : '') + ' left - almost there!', priority: 'medium', action: "switchTab('roadmap');setTimeout(function(){expandedPhase=" + phase.id + ";renderRoadmap();},100);", timeEstimate: hrs + 'h' });
      }
    }
  }
  if (appState.streak === 0) {
    recs.push({ icon: '🔥', title: 'Start a Study Streak!', detail: 'Mark a topic as done today.', priority: 'low', action: "switchTab('roadmap');", timeEstimate: '0h' });
  } else if (appState.streak >= 3) {
    recs.push({ icon: '🔥', title: 'Keep Your ' + appState.streak + '-Day Streak!', detail: 'Complete at least one topic today.', priority: 'high', action: "switchTab('roadmap');", timeEstimate: '30min+' });
  }
  return recs;
}

function renderSmartRecommendations(containerId) {
  var container = document.getElementById(containerId);
  if (!container) return;
  var recs = getSmartRecommendations();
  if (recs.length === 0) { container.innerHTML = '<p style="font-size:12px;color:var(--text-dim);padding:8px 0;">All caught up!</p>'; return; }
  var priorityOrder = { high: 0, medium: 1, low: 2 };
  recs.sort(function(a, b) { return priorityOrder[a.priority] - priorityOrder[b.priority]; });
  container.innerHTML = '<div class="career-path" style="border-left:3px solid var(--accent);"><h3 style="font-family:var(--font-heading);font-size:16px;margin-bottom:12px;">🧠 Smart Recommendations</h3>' + recs.slice(0, 5).map(function(r) { return '<div class="rec-item" onclick="' + r.action + '" style="cursor:pointer;padding:10px;margin-bottom:8px;border-radius:8px;background:var(--bg);border:1px solid var(--border);transition:all 0.2s;"><div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;"><span style="font-size:18px;">' + r.icon + '</span><span style="font-size:13px;font-weight:600;color:var(--text);flex:1;">' + r.title + '</span>' + (r.timeEstimate ? '<span style="font-size:10px;font-family:var(--font-mono);color:var(--text-muted);background:var(--card);padding:2px 6px;border-radius:4px;">' + r.timeEstimate + '</span>' : '') + '</div><div style="font-size:11px;color:var(--text-muted);padding-left:26px;">' + r.detail + '</div></div>'; }).join('') + '</div>';
}
