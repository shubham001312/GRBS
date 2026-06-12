// Difficulty Predictor
function getDifficultyPredictions() {
  var predictions = [];
  var activityData = getActivityData();
  var today = new Date();
  var totalTopicsCompleted = getTopicsCompleted();
  var totalTopics = getTotalTopics();

  // Calculate pace (topics per day over last 30 days)
  var recentActivity = 0;
  for (var i = 0; i < 30; i++) {
    var d = new Date(today);
    d.setDate(d.getDate() - i);
    var dateStr = d.toISOString().split('T')[0];
    recentActivity += (activityData[dateStr] || 0);
  }
  var pacePerDay = recentActivity / 30;

  for (var i = 0; i < PHASES.length; i++) {
    var phase = PHASES[i];
    var status = getPhaseStatus(phase.id);
    if (status === 'locked') continue;
    var stateData = appState.phases.find(function(p) { return p.id === phase.id; });
    var done = stateData ? Object.values(stateData.topicsDone).filter(function(v) { return v === true; }).length : 0;
    var remaining = phase.topics.length - done;
    if (remaining === 0) continue;
    var totalHours = 0;
    phase.topics.forEach(function(t) { totalHours += (t.hours || 4); });
    var avgHoursPerTopic = totalHours / phase.topics.length;
    var daysNeeded = pacePerDay > 0 ? Math.ceil(remaining / pacePerDay) : 999;
    var difficulty = avgHoursPerTopic > 8 ? 'Hard' : avgHoursPerTopic > 5 ? 'Medium' : 'Easy';
    predictions.push({ phaseId: phase.id, emoji: phase.emoji, title: phase.title, remaining: remaining, total: phase.topics.length, totalHours: totalHours, avgHours: avgHoursPerTopic.toFixed(1), daysNeeded: daysNeeded, difficulty: difficulty });
  }
  return predictions;
}

function renderDifficultyPredictor(containerId) {
  var container = document.getElementById(containerId);
  if (!container) return;
  var preds = getDifficultyPredictions();
  if (preds.length === 0) { container.innerHTML = '<p style="font-size:12px;color:var(--text-muted);padding:8px 0;">Complete some topics to see difficulty predictions.</p>'; return; }
  container.innerHTML = '<div class="career-path"><h3 style="font-family:var(--font-heading);font-size:16px;margin-bottom:8px;">Difficulty Predictor</h3>' +
  '<p style="font-size:11px;color:var(--text-muted);margin-bottom:12px;">Based on your current pace and topic complexity</p>' +
  '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:8px;">' +
  preds.map(function(p) {
    var color = p.difficulty === 'Hard' ? 'var(--danger)' : p.difficulty === 'Medium' ? 'var(--warning)' : 'var(--success)';
    var bg = p.difficulty === 'Hard' ? 'var(--red-dim)' : p.difficulty === 'Medium' ? 'var(--amber-dim)' : 'var(--green-dim)';
    return '<div style="padding:10px;border-radius:8px;background:' + bg + ';border:1px solid ' + color + ';">' +
    '<div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">' +
    '<span style="font-size:16px;">' + p.emoji + '</span>' +
    '<span style="font-size:12px;font-weight:600;">P' + p.phaseId + '</span>' +
    '<span style="font-size:10px;padding:2px 6px;border-radius:4px;background:' + color + ';color:white;margin-left:auto;">' + p.difficulty + '</span></div>' +
    '<div style="font-size:11px;color:var(--text-muted);">' + p.remaining + '/' + p.total + ' topics · ~' + p.daysNeeded + ' days</div>' +
    '<div style="font-size:10px;color:var(--text-dim);">' + p.avgHours + 'h avg/topic</div></div>';
  }).join('') + '</div></div>';
}
