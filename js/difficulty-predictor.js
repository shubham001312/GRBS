// ============================================
// DIFFICULTY PREDICTOR - Pace-based Analysis
// ============================================

function getDifficultyPredictions() {
  var activityData = getActivityData();
  var today = new Date();
  var predictions = [];
  var recentTopics = 0;
  for (var i = 0; i < 28; i++) {
    var d = new Date(today);
    d.setDate(d.getDate() - i);
    var dateStr = d.toISOString().split('T')[0];
    recentTopics += (activityData[dateStr] || 0);
  }
  var avgPerWeek = recentTopics / 4;
  var avgPerDay = recentTopics / 28;
  for (var i = 0; i < PHASES.length; i++) {
    var phase = PHASES[i];
    var status = getPhaseStatus(phase.id);
    if (status !== 'active' && status !== 'inprogress') continue;
    var stateData = appState.phases.find(function(p) { return p.id === phase.id; });
    var incompleteTopics = phase.topics.filter(function(t) { return !stateData || !stateData.topicsDone[t.id]; });
    if (incompleteTopics.length === 0) continue;
    var remainingHours = 0;
    incompleteTopics.forEach(function(t) { remainingHours += (t.hours || 4); });
    var daysNeeded = Math.ceil(remainingHours / 4);
    var completionDate = new Date(today);
    completionDate.setDate(completionDate.getDate() + daysNeeded);
    var avgHoursPerTopic = remainingHours / incompleteTopics.length;
    var difficulty = 'Normal';
    var diffColor = 'var(--green)';
    if (avgHoursPerTopic >= 10) { difficulty = 'Hard'; diffColor = 'var(--danger)'; }
    else if (avgHoursPerTopic >= 6) { difficulty = 'Medium'; diffColor = 'var(--warning)'; }
    predictions.push({ phaseId: phase.id, phaseEmoji: phase.emoji, phaseTitle: phase.title, remainingTopics: incompleteTopics.length, remainingHours: remainingHours, daysNeeded: daysNeeded, completionDate: completionDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), difficulty: difficulty, diffColor: diffColor, weeklyPace: avgPerWeek.toFixed(1) });
  }
  return { predictions: predictions, avgPerWeek: avgPerWeek, recentTopics: recentTopics };
}

function renderDifficultyPredictor(containerId) {
  var container = document.getElementById(containerId);
  if (!container) return;
  var data = getDifficultyPredictions();
  var predictions = data.predictions;
  var avgPerWeek = data.avgPerWeek;
  var recentTopics = data.recentTopics;
  if (predictions.length === 0) { container.innerHTML = '<p style="font-size:12px;color:var(--text-dim);padding:8px 0;">No active phases to analyze.</p>'; return; }
  container.innerHTML = '<div class="career-path"><h3 style="font-family:var(--font-heading);font-size:16px;margin-bottom:12px;">📐 Difficulty Predictor</h3><div style="display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap;"><div class="stat-chip" style="min-width:auto;padding:8px 12px;"><div class="stat-val" style="font-size:14px;">' + avgPerWeek.toFixed(1) + '</div><div class="stat-lbl">Topics/Week</div></div><div class="stat-chip" style="min-width:auto;padding:8px 12px;"><div class="stat-val" style="font-size:14px;">' + recentTopics + '</div><div class="stat-lbl">Last 28 Days</div></div></div>' + predictions.map(function(p) { return '<div style="padding:10px;margin-bottom:8px;border-radius:8px;background:var(--bg);border:1px solid var(--border);border-left:3px solid ' + p.diffColor + ';"><div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px;"><div style="display:flex;align-items:center;gap:6px;"><span style="font-size:16px;">' + p.phaseEmoji + '</span><span style="font-size:13px;font-weight:600;">Phase ' + p.phaseId + ': ' + p.phaseTitle + '</span></div><span style="font-size:10px;font-family:var(--font-mono);padding:2px 8px;border-radius:10px;background:' + p.diffColor + '22;color:' + p.diffColor + ';font-weight:700;">' + p.difficulty + '</span></div><div style="display:flex;gap:12px;font-size:11px;color:var(--text-muted);font-family:var(--font-mono);"><span>' + p.remainingTopics + ' topics</span><span>' + p.remainingHours + 'h left</span><span>~' + p.completionDate + '</span></div></div>'; }).join('') + '</div>';
}
